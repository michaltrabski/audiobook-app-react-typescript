import { createElement, useRef, useState } from "react";

export const useAudio = (folderWithMp3: string, fileNames: string[]) => {
  const [state, setState] = useState({
    fileNameIndex: 0,
    paused: true,
    waiting: false,
    currentTime: 0,
    duration: 0,
    buffered: {
      start: 0,
      end: 0,
    },
  });
  const ref = useRef<HTMLAudioElement | null>(null);

  // console.log(folderWithMp3 + fileNames[state.fileNameIndex]);

  const audioElement = createElement("audio", {
    src: folderWithMp3 + fileNames[state.fileNameIndex],
    ref,
    controls: true,
    onPlay: () => setState((s) => ({ ...s, paused: false })),
    onPause: () => setState((s) => ({ ...s, paused: true })),
    onWaiting: () => setState((s) => ({ ...s, waiting: true })),
    onPlaying: () => setState((s) => ({ ...s, waiting: false })),
    onTimeUpdate: () => {
      const audio = ref.current;
      if (!audio) return;
      setState((s) => ({ ...s, currentTime: audio.currentTime }));
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
    seek: (newCurrentTime: number | number[]) => {
      const audio = ref.current;
      if (!audio) return;
      if (newCurrentTime instanceof Array) newCurrentTime = newCurrentTime[0];
      newCurrentTime = Math.min(state.duration, Math.max(0, newCurrentTime));
      audio.currentTime = newCurrentTime || 0;
      audio.play();
    },
  };
  return { audioElement, state, controls };
};
