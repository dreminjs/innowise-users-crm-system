export const getLabel = (
  idx: number,
  el: string,
  segment: string | undefined,
) => {
  if (idx === 1) return segment || el;
  return el === "users" ? "Employees" : el;
};
