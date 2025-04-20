export const validateObject = (data: object) => {
  if (!data || Object.keys(data).length === 0) {
    return false;
  }
  return true;
};

export const dateFormat = (date: string) => {
  const dateObj = new Date(date);

  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const year = dateObj.getUTCFullYear();

  const dateFormatted = `${day}/${month}/${year}`;

  return dateFormatted;
};

export const currentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const dateToday = `${day}/${month}/${year}`;
  return dateToday;
};
