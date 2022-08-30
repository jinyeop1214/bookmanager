interface FormatedDate {
	from: string;
	to: string;
}

export const DateFormat = (start: string, end: string): FormatedDate => {
	const startArr = start.split("T")[0].split("-");
	const endArr = end.split("T")[0].split("-");

	return {
		from: `${startArr[0]}년 ${startArr[1]}월 ${startArr[2]}일`,
		to: `${endArr[0]}년 ${endArr[1]}월 ${endArr[2]}일`,
	};
};
