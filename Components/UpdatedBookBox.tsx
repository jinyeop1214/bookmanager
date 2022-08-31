import React, { ChangeEvent, useState } from "react";
import { Book } from "../Interfaces";

interface UpdatedBoxProps {
	book: Book;
	toggleUpdate: () => void;
	handleSetNewBook: (book: Book) => void;
}

const UpdatedBox = (props: UpdatedBoxProps) => {
	const { book_id, bookname, start, end, theme, review, user_id } =
		props.book;
	const toggleUpdate = props.toggleUpdate;
	const handleSetNewBook = props.handleSetNewBook;

	const [newBookname, setNewBookname] = useState(bookname);
	const [newStart, setNewStart] = useState(start.split("T")[0]);
	const [newEnd, setNewEnd] = useState(end.split("T")[0]);
	const [newTheme, setNewTheme] = useState(theme);
	const [newReview, setNewReview] = useState(review);
	const [wrongtext, setWrongText] = useState("");

	const onChangeBookname = (e: ChangeEvent<HTMLInputElement>) => {
		setNewBookname(e.target.value);
		setWrongText("");
	};

	const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
		if (newEnd !== "" && e.target.value > newEnd) setNewEnd("");
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

	const handleUpdateBook = async () => {
		try {
			if (
				newBookname === "" ||
				newStart === "" ||
				newEnd === "" ||
				newTheme === "" ||
				newReview === ""
			) {
				setWrongText("빈칸을 모두 채워주세요.");
				return;
			}

			const book: Omit<Book, "book_id" | "user_id"> = {
				bookname: newBookname,
				start: newStart,
				end: newEnd,
				theme: newTheme,
				review: newReview,
			};

			await fetch(`/api/book/${book_id}`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(book),
			});
			toggleUpdate();
			handleSetNewBook({ ...props.book, ...book });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="box">
			<input
				className="bookname"
				value={newBookname}
				type="text"
				onChange={onChangeBookname}
			/>
			<input
				className="period"
				value={newStart}
				type="date"
				onChange={onChangeStart}
				max={
					new Date(new Date().setDate(new Date().getDate() + 1))
						.toISOString()
						.split("T")[0]
				}
			/>
			<input
				className="period"
				value={newEnd}
				type="date"
				onChange={onChangeEnd}
				min={newStart === "" ? undefined : newStart}
			/>
			<select className="theme" value={newTheme} onChange={onChangeTheme}>
				<option value="문학">문학</option>
				<option value="철학">철학</option>
				<option value="소설">소설</option>
				<option value="학문">학문</option>
				<option value="계발">계발</option>
				<option value="역사">역사</option>
				<option value="예술">예술</option>
				<option value="기타">기타</option>
			</select>
			<textarea
				className="review"
				value={newReview}
				cols={32}
				rows={8}
				onChange={onChangeReview}
			/>
			<div className="warning">{wrongtext}</div>
			<div className="btn-wrapper">
				<span></span>
				<button className="done-btn" onClick={handleUpdateBook}>
					완료
				</button>
				<button className="cancel-btn" onClick={toggleUpdate}>
					취소
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
					display: block;
					width: 80%;
					/* margin: 0px; */
					/* margin-right: 0px; */
					font-size: 15px;
					padding: 8px;
					margin-bottom: 7px;
					box-sizing: border-box;
					border: 2px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					/* line-height: 1.75em; */
					letter-spacing: -0.02em;
				}

				.period {
					display: block;
					width: 80%;
					/* margin: 0px; */
					/* margin-right: 0px; */
					font-size: 15px;
					padding: 8px;
					margin-bottom: 7px;
					box-sizing: border-box;
					border: 2px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					/* line-height: 1.75em; */
					letter-spacing: -0.02em;
				}

				.theme {
					display: block;
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

				.warning {
					color: red;
				}

				.review {
					display: block;
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
