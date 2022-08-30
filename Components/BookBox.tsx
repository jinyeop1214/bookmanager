import { useState } from "react";
import { DateFormat } from "../functions/DateFormat";
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
	const { from, to } = DateFormat(start, end);
	console.log(from, to);

	return (
		<div className="box">
			<div className="bookname">
				<span className="info">Name: </span>
				<span className="data">{bookname}</span>
			</div>
			<div className="period">
				<span className="info">Period: </span>
				<span className="data">
					{from} ~ {to}
				</span>
			</div>
			<div className="theme">
				<span className="info">Theme: </span>
				<span className="data">{theme}</span>
			</div>
			<style jsx>{`
				.box {
					display: inline-table;
					margin: 30px 0px;
					margin-right: 45px;
					width: 300px;
					min-height: 200px;
					padding: 20px;
					background-color: white;
					box-sizing: border-box;
					background: #fff;
					border-radius: 10px;
					box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
					border: 1px solid rgb(221, 221, 221);
				}

				.bookname {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					margin-top: 5px;
					margin-bottom: 5px;
					width: 258px;
				}

				.period {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					margin-bottom: 5px;
					width: 258px;
				}

				.theme {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					margin-bottom: 5px;
					width: 258px;
				}

				.data {
					font-size: 18px;
				}

				.info {
					opacity: 0.8;
				}
			`}</style>
		</div>
	);
};

export default BookBox;
