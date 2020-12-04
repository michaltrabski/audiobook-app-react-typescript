import slugify from "slugify";
import { SingleAudioBookI } from "../components/FixedContainer";

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
  const s = Math.floor(seconds);
  const date = new Date(s * 1000).toISOString();

  if (s < 10 * 60) return date.substr(15, 4);
  if (s < 3600) return date.substr(14, 5);
  if (s < 3600 * 10) return date.substr(12, 7);
  return date.substr(11, 8);
};

export const mapArrayOrder = (
  arrayWithDataToOrder: SingleAudioBookI[],
  arrayWithTitleOrder: string[],
  key: string
) => {
  arrayWithDataToOrder.sort(function (a: any, b: any) {
    let A = a[key];
    let B = b[key];

    if (arrayWithTitleOrder.indexOf(A) > arrayWithTitleOrder.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return arrayWithDataToOrder;
};

export const getStorage = (key: string, defaultValue: any) => {
  let data = localStorage.getItem(key);

  if (!data) return defaultValue;
  data = JSON.parse(data);

  return data;
};

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
