import moment from "moment";

export function formatDate(dateStr: string) {
  const formattedDate = moment(dateStr).format("MM/DD/YY");
  return formattedDate;
}

export function customFormatDate(dateStr: string) {
  const formattedDate = moment(dateStr).format("DD.MM.YY");
  return formattedDate;
}
