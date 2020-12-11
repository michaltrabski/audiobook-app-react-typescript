import slugify from "slugify";
import { AudioBookI } from "../components/FixedContainer";
import _ from "lodash";

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

  // if (s < 10 * 60) return date.substr(15, 4);
  if (s < 3600) return date.substr(14, 5);
  if (s < 3600 * 10) return date.substr(12, 7);
  return date.substr(11, 8);
};

export const mapArrayOrder = (
  arrToOrder: AudioBookI[],
  arrayWithKeysToOrderBy: string[],
  key: string
) => {
  // sort mp3 files
  const arr = arrToOrder.map((item) => {
    const files = item.files;
    item.files = _.sortBy(files, [(f) => f.mp3]);
    return item;
  });

  // sort array by title
  arr.sort(function (a: any, b: any) {
    let A = a[key];
    let B = b[key];

    if (arrayWithKeysToOrderBy.indexOf(A) > arrayWithKeysToOrderBy.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return arr;
};

export const saveData = (
  subFolder: string,
  fileNameIndex: number,
  currentTime: number
) => {
  localStorage.setItem(
    subFolder,
    JSON.stringify({ fileNameIndex, currentTime: Math.floor(currentTime) })
  );
};
export const getStorage = (key: string, defaultValue: any) => {
  let data = localStorage.getItem(key);

  if (!data) return defaultValue;
  data = JSON.parse(data);

  return data;
};
// export const getStorage = <T,>(key: string, defaultValue: T): T => {
//   let data = localStorage.getItem(key);

//   if (!data) return defaultValue;
//   try {
//     data = JSON.parse(data);
//   } catch (err) {
//     console.log(err);
//     return defaultValue;
//   }

//   if (typeof data === typeof defaultValue) {
//     return data;
//   } else {
//     return defaultValue;
//   }
// };

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
