import React, { useEffect, useState } from "react";
import { Badge, IconButton } from "@material-ui/core";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { convertSeconds } from "../utils/utils";

interface Props {
  pause: () => void;
  paused: boolean;
  clicked: number;
}
export default function Timer(props: Props) {
  const defaultTime = 15; //60 * 30;
  const [time, setTime] = useState(defaultTime);
  const [isActive, setIsActive] = useState(true);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && !stop) {
      interval = setInterval(() => {
        console.log("paused = ", props.paused);
        if (time === 0) {
          clearInterval(interval);
          setStop(true);
          props.pause();
        } else {
          setTime((prevTime) => prevTime - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    setTime(defaultTime);
  }, [props.clicked]);

  const setTimer = () => {
    setStop(false);
    if (isActive) {
      time === defaultTime ? setIsActive(false) : setTime(defaultTime);
    } else {
      setIsActive(true);
    }
  };

  return (
    <IconButton color={isActive ? "primary" : "inherit"} onClick={setTimer}>
      <Badge
        badgeContent={convertSeconds(time)}
        color="secondary"
        invisible={!isActive}
      >
        <HourglassEmptyIcon />
      </Badge>
    </IconButton>
  );
}
