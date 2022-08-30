import React, { ChangeEvent, useState } from "react";
import { Book } from "../Interfaces";

interface UpdatedBoxProps {
	book: Book;
	toggleUpdate: () => void;
	updateNewBook: (book: Book) => void;
}

const UpdatedBox = (props: UpdatedBoxProps) => {
	const { book_id, bookname, start, end, theme, review, user_id } =
		props.book;
	const toggleUpdate = props.toggleUpdate;
	const updateNewBook = props.updateNewBook;

	const [newBookname, setNewBookname] = useState(bookname);
	const [newStart, setNewStart] = useState(start);
	const [newEnd, setNewEnd] = useState(end);
	const [newTheme, setNewTheme] = useState(theme);
	const [newReview, setNewReview] = useState(review);
	const [wrongtext, setWrongText] = useState("");

	const onChangeBookname = (e: ChangeEvent<HTMLInputElement>) => {
		setNewBookname(e.target.value);
		setWrongText("");
	};

	const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
		setNewStart(e.target.value);
		setWrongText("");
	};

	const onChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
		setNewEnd(e.target.value);
		setWrongText("");
	};

	const onChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
		setNewTheme(e.target.value);
		setWrongText("");
	};

	const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNewReview(e.target.value);
		setWrongText("");
	};

	return (
		<div className="box">
			<div className="bookname">
				<span className="info">Name: </span>
				<input
					className="data"
					value={newBookname}
					type="text"
					onChange={onChangeBookname}
				/>
			</div>
			<div className="period">
				<span className="info">Start: </span>
				<input
					className="data"
					value={newStart}
					type="text"
					onChange={onChangeStart}
				/>
			</div>
			<div className="period">
				<span className="info">End: </span>
				<input
					className="data"
					value={newEnd}
					type="text"
					onChange={onChangeEnd}
				/>
			</div>
			<div className="theme">
				<span className="info">Theme: </span>
				<select
					className="theme-data"
					value={newTheme}
					onChange={onChangeTheme}
				>
					<option value="">theme</option>
					<option value="문학">문학</option>
					<option value="철학">철학</option>
					<option value="소설">소설</option>
					<option value="학문">학문</option>
					<option value="계발">계발</option>
					<option value="역사">역사</option>
					<option value="예술">예술</option>
					<option value="기타">기타</option>
				</select>
			</div>
			<div className="review">
				<div>Review: </div>
				<textarea
					className="review-data"
					value={newReview}
					cols={32}
					rows={8}
					onChange={onChangeReview}
				/>
			</div>
			<div className="warning">{wrongtext}</div>
			<div className="btn-wrapper">
				<span></span>
				<button className="done-btn" onClick={undefined}>
					Done
				</button>
				<button className="cancel-btn" onClick={toggleUpdate}>
					Cancel
				</button>
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

				.review {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					width: 258px;
				}

				.data {
					font-size: 18px;
				}

				.info {
					opacity: 0.8;
				}

				.warning {
					color: red;
				}

				.theme-data {
					width: 35.4%;
					font-size: 15px;
					padding: 5px;
					margin-bottom: 7px;
					box-sizing: border-box;
					border: 2px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					/* line-height: 1.75em; */
					letter-spacing: -0.02em;
				}

				.review-data {
					resize: none;
					font-size: 15px;
					margin-right: 15px;
					padding: 7px;
					box-sizing: border-box;
					border: 2px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					/* line-height: 1.75em; */
					/* letter-spacing: -.03em; */
				}

				.btn-wrapper {
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: 1fr 1fr 1fr;
					margin-top: 20px;
					width: 258px;
				}

				.done-btn {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					width: auto;
					height: auto;
					font-size: 15px;
				}

				.cancel-btn {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					width: auto;
					height: auto;
					font-size: 15px;
					margin-left: 5px;
				}
			`}</style>
		</div>
	);
};

export default UpdatedBox;
