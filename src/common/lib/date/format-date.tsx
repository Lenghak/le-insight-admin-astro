import { intlFormat } from "date-fns/intlFormat";

export default function formatDate(date: string | Date) {
	return intlFormat(new Date(date), {
		dateStyle: "medium",
	});
}
