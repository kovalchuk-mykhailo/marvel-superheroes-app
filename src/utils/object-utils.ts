export const doesObjectContain: <T extends { [key: string]: unknown }>(
  key: string,
  obj: T
) => boolean = (key, obj) => {
  return Object.values(obj).includes(key);
};
