import { createElement, useRef, useState } from "react";

export const useAudio = (src: string) => {
  const [state, setState] = useState({
    paused: true,
    waiting: false,
    time: 0,
    duration: 0,
    buffered: {
      start: 0,
      end: 0,
    },
  });
  const ref = useRef<HTMLAudioElement | null>(null);

  const audioElement = createElement("audio", {
    src,
    ref,
    controls: true,
    onPlay: () => setState((s) => ({ ...s, paused: false })),
    onPause: () => setState((s) => ({ ...s, paused: true })),
    onWaiting: () => setState((s) => ({ ...s, waiting: true })),
    onPlaying: () => setState((s) => ({ ...s, waiting: false })),
    onTimeUpdate: () => {
      const audio = ref.current;
      if (!audio) return;
      setState((s) => ({ ...s, time: audio.currentTime }));
    },
    onDurationChange: () => {
      const audio = ref.current;
      if (!audio) return;
      const { duration, buffered } = audio;

      console.log("buffered", buffered);
      setState((s) => ({ ...s, duration }));
    },
  });

  const controls = {
    play: () => ref?.current?.play(),
    pause: () => ref?.current?.pause(),
  };
  return { audioElement, state, controls };
};
