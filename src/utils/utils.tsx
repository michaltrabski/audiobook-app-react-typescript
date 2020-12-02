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

export const getStorageDataAsNumber = (
  key: string,
  defaultNumber: number
): number => {
  let string = localStorage.getItem(key);
  if (!string) string = "" + defaultNumber;
  return parseInt(string);
};
