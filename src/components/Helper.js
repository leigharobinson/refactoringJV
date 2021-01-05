export function makeStringPath(str) {
  str = str.replace(/-+/g, " ");
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makeUrlPath(str) {
  str = str.split("&").join("and");
  str = str.split(",").join("");
  str = str.replace(/[()\\]/g, " ");
  str = str.replace(/\s+/g, "-").toLowerCase();
  return str;
}

export function removeDash(str) {
  return str.replace(/-+/g, " ");
}

export function splitTypeArray(arr) {
  return arr.join(" and ");
}
