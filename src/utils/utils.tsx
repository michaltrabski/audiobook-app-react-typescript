import slugify from "slugify";

export const makeSlug = (text: string) => {
  return slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
  });
};

export const convertSeconds = (seconds: number) => {
  let s = seconds < 0 ? 0 : Math.floor(seconds);
  let m = Math.floor(s / 60);
  s = s - m * 60;
  if (seconds < 60 * 60) return `${m}:${s}`;

  return `> 1h`;

  // s = s - m * 60;
  // h = m - h * 60;
};
