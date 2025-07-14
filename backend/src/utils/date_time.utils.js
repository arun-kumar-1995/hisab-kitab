export const GetCurrentUTCTime = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date - offset).toISOString().slice(0, -1) + "Z";
};
