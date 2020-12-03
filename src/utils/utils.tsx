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

<<<<<<< HEAD
export const getStorageDataAsNumber = (
  key: string,
  defaultNumber: number
): number => {
  let string = localStorage.getItem(key);
  if (!string) string = "" + defaultNumber;
  return parseInt(string);
=======
export const convertSeconds = (seconds: number) => {
  const s = Math.floor(seconds);
  const date = new Date(s * 1000).toISOString();

  if (s < 10 * 60) return date.substr(15, 4);

  if (s < 3600) return date.substr(14, 5);

  if (s < 3600 * 10) return date.substr(12, 7);

  return date.substr(11, 8);
>>>>>>> master
};
