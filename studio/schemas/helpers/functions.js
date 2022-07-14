export const listFormat = (value) => ({ title: value, value });

export const convertObjectToList = (object) =>
  Object.values(object).map((value) => listFormat(value));
