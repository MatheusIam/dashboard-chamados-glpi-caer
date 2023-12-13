"use client";
import net from "net";

interface PingOptions {
  address?: string;
  port?: number;
  attempts?: number;
  timeout?: number;
}

interface PingResult {
  seq: number;
  time?: number;
  err?: Error;
}

interface PingStatistics {
  address: string;
  port: number;
  attempts: number;
  avg: number;
  max: number;
  min: number;
  results: PingResult[];
}

function ping(
  options?: PingOptions,
  callback?: (err?: Error, data?: PingStatistics) => void
): void {
  if (!callback) {
    throw new Error("Callback function is required");
  }

  const defaultOptions: PingOptions = {
    address: "localhost",
    port: 80,
    attempts: 10,
    timeout: 5000,
  };

  options = { ...defaultOptions, ...options };

  let i = 0;
  const results: PingResult[] = [];

  const check = (
    options: PingOptions,
    callback: (err?: Error, data?: PingStatistics) => void
  ): void => {
    if (i < options.attempts) {
      connect(options, callback);
    } else {
      const avg =
        results.reduce((prev, curr) => prev + curr.time, 0) / results.length;
      const max = results.reduce(
        (prev, curr) => (prev > curr.time ? prev : curr.time),
        results[0].time
      );
      const min = results.reduce(
        (prev, curr) => (prev < curr.time ? prev : curr.time),
        results[0].time
      );

      const out: PingStatistics = {
        address: options.address!, // Use non-null assertion as "address" is guaranteed to be set due to type annotation
        port: options.port!,
        attempts: options.attempts,
        avg,
        max,
        min,
        results,
      };

      callback(undefined, out);
    }
  };

  const connect = (
    options: PingOptions,
    callback: (err?: Error, data?: PingStatistics) => void
  ): void => {
    const socket = new net.Socket();
    const start = process.hrtime();

    socket.connect(options.port!, options.address!, () => {
      const timeArr = process.hrtime(start);
      const time = (timeArr[0] * 1e9 + timeArr[1]) / 1e6;

      results.push({ seq: i, time });
      socket.destroy();
      i++;
      check(options, callback);
    });

    socket.on("error", (e) => {
      results.push({ seq: i, err: e });
      socket.destroy();
      i++;
      check(options, callback);
    });

    socket.setTimeout(options.timeout!, () => {
      results.push({ seq: i, err: new Error("Request timeout") });
      socket.destroy();
      i++;
      check(options, callback);
    });
  };

  connect(options, callback);
}

module.exports = {
  ping,
  probe(
    address?: string,
    port?: number,
    callback?: (err?: Error, available?: boolean) => void
  ) {
    address = address || "localhost";
    port = port || 80;

    ping({ address, port, attempts: 1, timeout: 5000 }, (err, data) => {
      if (err) {
        callback(err);
        return;
      }
      callback(undefined, data.min !== undefined);
    });
  },
};
