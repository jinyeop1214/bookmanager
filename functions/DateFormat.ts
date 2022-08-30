interface FormatedDate {
	from: string;
	to: string;
}

export const DateFormat = (start: string, end: string): FormatedDate => {
	return { from: start.split("T")[0], to: end.split("T")[0] };
};
