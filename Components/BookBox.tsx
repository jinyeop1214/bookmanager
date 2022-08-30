import { useState } from "react";
import { Book } from "../Interfaces";

interface BookBoxProps {
	book: Book;
}

/**
 * start to end format function 필.
 * @param param0
 * @returns
 */
const BookBox = ({ book }: BookBoxProps) => {
	const { book_id, bookname, start, end, theme, review, user_id } = book;
	return (
		<div className="BookBox">
			<div className="BookBoxBookname">
				<span>Name: </span>
				<span className="BookBoxData">{bookname}</span>
			</div>
			<div className="BookBoxPeriod">
				<span>Period: </span>
				<span className="BookBoxData">
					{start} ~ {end}
				</span>
			</div>
			<div className="BookBoxTheme">
				<span>Theme: </span>
				<span className="BookBoxData">{theme}</span>
			</div>
		</div>
	);
};

export default BookBox;
