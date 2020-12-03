import { createElement, useEffect, useRef, useState } from "react";

export const useAudio = (folderWithMp3: string, fileNames: string[]) => {
  const [state, setState] = useState({
    fileNames,
    fileNameIndex: 0,
    paused: true,
    waiting: false,
    // autoplay: true,
    currentTime: 0,
    duration: 0,
    buffered: {
      start: 0,
      end: 0,
    },
  });
  const ref = useRef<HTMLAudioElement | null>(null);
  const src = folderWithMp3 + fileNames[state.fileNameIndex];

  const audioElement = createElement("audio", {
    src,
    ref,
    controls: true,
    onPlay: () => setState((s) => ({ ...s, paused: false })),
    onPause: () => setState((s) => ({ ...s, paused: true })),
    onWaiting: () => setState((s) => ({ ...s, waiting: true })),
    onPlaying: () => setState((s) => ({ ...s, waiting: false })),
    onLoadedData: () => {
      console.log("onLoadedData");
      const audio = ref.current;
      if (!audio) return;
      // audio.play();
    },
    onEnded: () => {
      const audio = ref.current;
      if (!audio) return;
      console.log("ended");
      setState((s) => ({
        ...s,
        ended: true,
        fileNameIndex: s.fileNameIndex + 1,
      }));
    },
    onTimeUpdate: () => {
      console.log("onTimeUpdate");
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
    changeFile: (fileNameIndex: number) => {
      console.log(fileNameIndex);
      if (fileNameIndex) setState((s) => ({ ...s, fileNameIndex }));
    },
  };

  useEffect(() => {
    console.log("useEffect src = ", src);
  }, [src]);
  return { audioElement, state, setState, controls };
};
