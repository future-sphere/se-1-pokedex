export const zeroFilled = (id: string | number): string => {
  return ('0000' + id).slice(-3);
};
