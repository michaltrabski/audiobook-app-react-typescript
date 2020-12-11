import { createElement, useEffect, useRef, useState } from "react";
import { FileI } from "../components/FixedContainer";
import { getStorage, saveData, setStorage } from "../utils/utils";

export const useAudio = (
  folderWithMp3: string,
  subFolder: string,
  files: FileI[]
) => {
  const [state, setState] = useState({
    ready: false,
    files,
    fileNameIndex: getStorage(`${subFolder}-fileNameIndex`, 0),
    paused: true,
    waiting: false,
    autoplay: false,
    currentTime: getStorage(`${subFolder}-currentTime`, 0),
    duration: 0,
    buffered: {
      start: 0,
      end: 0,
    },
  });

  const ref = useRef<HTMLAudioElement | null>(null);
  const src = folderWithMp3 + subFolder + files[state.fileNameIndex].mp3;

  const audioElement = createElement("audio", {
    src,
    ref,
    controls: false,
    onPlay: () => setState((s) => ({ ...s, paused: false })),
    onPause: () => setState((s) => ({ ...s, paused: true })),
    onWaiting: () => setState((s) => ({ ...s, waiting: true })),
    onPlaying: () =>
      setState((s) => ({ ...s, waiting: false, autoplay: true })),
    onLoadedData: () => {
      console.log("onLoadedData");
      const audio = ref.current;
      if (!audio) return;
    },
    onEnded: () => {
      const audio = ref.current;
      if (!audio) return;
      console.log("ended");
      setState((s) => ({
        ...s,
        ended: true,
        fileNameIndex:
          files.length > s.fileNameIndex + 1
            ? s.fileNameIndex + 1
            : s.fileNameIndex,
      }));
    },
    onTimeUpdate: () => {
      console.log("onTimeUpdate");
      const audio = ref.current;
      if (!audio) return;

      setState((s) => ({ ...s, currentTime: audio.currentTime }));
      setStorage(`${subFolder}-fileNameIndex`, state.fileNameIndex);
      setStorage(`${subFolder}-currentTime`, Math.floor(state.currentTime));

      saveData(subFolder, state.fileNameIndex, state.currentTime);
    },
    onDurationChange: () => {
      const audio = ref.current;
      if (!audio) return;

      const { duration, buffered } = audio;
      console.log("onDurationChange", duration);
      setState((s) => ({ ...s, duration }));
    },
  });

  const controls = {
    play: () => {
      const audio = ref.current;
      if (!audio) return;

      audio.currentTime = state.currentTime;
      audio.play();
    },
    pause: () => ref?.current?.pause(),
    seek: (newCurrentTime: number | number[]) => {
      const audio = ref.current;
      if (!audio) return;

      if (newCurrentTime instanceof Array) newCurrentTime = newCurrentTime[0];
      // newCurrentTime = Math.min(state.duration, Math.max(0, newCurrentTime));
      console.log("xxxxxxxxxxxxxx", Math.floor(newCurrentTime));
      audio.currentTime = Math.floor(newCurrentTime) || 0;
      audio.play();
    },
    changeFile: (fileNameIndex: number) => {
      // console.log("changeFile", fileNameIndex);
      setState((s) => ({ ...s, fileNameIndex }));
    },
  };

  useEffect(() => {
    console.log("useEffect src = ", src);
    const audio = ref.current;
    if (!audio) return;
    if (state.autoplay) audio.play();

    setState((s) => ({ ...s, ended: false, duration: 0 }));
  }, [src]);

  useEffect(() => {
    console.log("state.duration");
    setState((s) => ({ ...s, ready: false }));
    if (state.duration > 0) {
      setState((s) => ({ ...s, ready: true }));
    }
  }, [src, state.duration]);

  return { audioElement, state, setState, controls, ready: state.ready };
};
