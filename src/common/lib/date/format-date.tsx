import { intlFormat } from "date-fns/intlFormat";

export default function formatDate(date: string) {
  return intlFormat(new Date(date), {
    dateStyle: "medium",
  });
}
