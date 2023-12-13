"use client";
import Typography from "@mui/material/Typography";
import { ping } from "./ping";

const ip = "172.16.95.125";

ping({ address: ip, attempts: 30, timeout: 10 }, (err, data) => {
  console.log(data);
});

const PingComponent = () => {
  return (
    <div>
      <Typography variant="body1" color="initial">
        teste
      </Typography>
    </div>
  );
};

export default PingComponent;
