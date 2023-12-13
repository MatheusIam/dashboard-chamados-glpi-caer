import * as net from "net";

interface PingOptions {
  address?: string;
  port?: number;
  attempts?: number;
  timeout?: number;
}

interface PingResult {
  seq: number;
  time: number | undefined;
  err?: Error;
}

interface PingSummary {
  address: string;
  port: number;
  attempts: number;
  avg: number;
  max: number;
  min: number;
  results: PingResult[];
}

const ping = (
  options: PingOptions,
  callback: (err: Error | undefined, result: PingSummary) => void
) => {
  let i = 0;
  const results: PingResult[] = [];
  options.address = options.address || "localhost";
  options.port = options.port || 80;
  options.attempts = options.attempts || 10;
  options.timeout = options.timeout || 5000;

  const check = () => {
    if (i < options.attempts!) {
      connect();
    } else {
      const avg =
        results.reduce((prev, curr) => prev + (curr.time || 0), 0) /
        results.length;
      const max = results.reduce(
        (prev, curr) => (prev > curr.time! ? prev : curr.time!),
        results[0].time!
      );
      const min = results.reduce(
        (prev, curr) => (prev < curr.time! ? prev : curr.time!),
        results[0].time!
      );

      const out: PingSummary = {
        address: options.address!,
        port: options.port!,
        attempts: options.attempts!,
        avg,
        max,
        min,
        results,
      };
      callback(undefined, out);
    }
  };

  const connect = () => {
    const s = new net.Socket();
    const start = process.hrtime();

    s.connect(options.port!, options.address!, () => {
      const time_arr = process.hrtime(start);
      const time = (time_arr[0] * 1e9 + time_arr[1]) / 1e6;
      results.push({ seq: i, time });
      s.destroy();
      i++;
      check();
    });

    s.on("error", (e) => {
      results.push({ seq: i, time: undefined, err: e });
      s.destroy();
      i++;
      check();
    });

    s.setTimeout(options.timeout!, () => {
      results.push({
        seq: i,
        time: undefined,
        err: new Error("Request timeout"),
      });
      s.destroy();
      i++;
      check();
    });
  };

  connect();
};

export { ping };

export const probe = (
  address: string,
  port: number,
  callback: (err: Error | undefined, available: boolean) => void
) => {
  address = address || "localhost";
  port = port || 80;

  ping({ address, port, attempts: 1, timeout: 5000 }, (err, data) => {
    const available = data.min !== undefined;
    callback(err, available);
  });
};
