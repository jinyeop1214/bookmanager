import "dayjs/locale/ko";
import dayjs from "dayjs";

interface FormatedDate {
	from: string;
	to: string;
}

export const DateFormat = (start: string, end: string): FormatedDate => {
	dayjs.locale("ko");

	return {
		from: dayjs(start).format("YYYY년 MM월 DD일"),
		to: dayjs(end).format("YYYY년 MM월 DD일"),
	};
};
