import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { Book } from "../../../Interfaces";
import { selectUser, useAppSelector } from "../../../store/reducers/user";

/**
 * @returns
 */
const AddBookBox = () => {
	const { uid, isLoggedIn, id, nickname } = useAppSelector(selectUser);
	const [bookname, setBookname] = useState<string>("");
	const [start, setStart] = useState<string>("");
	const [end, setEnd] = useState<string>("");
	const [theme, setTheme] = useState<string>("");
	const [review, setReview] = useState<string>("");
	const router = useRouter();
	const isDisable =
		bookname === "" ||
		start === "" ||
		end === "" ||
		theme === "" ||
		review === "";

	const onChangeBookname = (e: ChangeEvent<HTMLInputElement>) => {
		setBookname(e.target.value);
	};

	const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
		if (end !== "" && e.target.value > end) setEnd("");
		setStart(e.target.value);
	};

	const onChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
		setEnd(e.target.value);
	};

	const onChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value);
	};

	const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReview(e.target.value);
	};

	const handleAddBook = async () => {
		const book: Omit<Book, "book_id"> = {
			bookname,
			start,
			end,
			theme,
			review,
			user_id: uid as number,
		};

		await fetch("/api/addBook", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(book),
		});

		setBookname("");
		setStart("");
		setEnd("");
		setTheme("");
		setReview("");
		router.replace("/feed");
	};

	return (
		<div className="container">
			<div className="new-book-data">
				<div>
					<div className="description-bookname">제목</div>
					<input
						className="bookname"
						value={bookname}
						type="text"
						onChange={onChangeBookname}
						placeholder="제목"
					/>
					<div className="description">읽기 시작한 날짜</div>
					<input
						className="period"
						value={start}
						type="date"
						onChange={onChangeStart}
						max={
							new Date(
								new Date().setDate(new Date().getDate() + 1)
							)
								.toISOString()
								.split("T")[0]
						}
					/>
					<div className="description">다 읽은 날짜</div>
					<input
						className="period"
						value={end}
						type="date"
						onChange={onChangeEnd}
						max={
							new Date(
								new Date().setDate(new Date().getDate() + 1)
							)
								.toISOString()
								.split("T")[0]
						}
						min={start === "" ? undefined : start}
					/>
					<div className="description">분야</div>
					<select
						className="theme"
						value={theme}
						onChange={onChangeTheme}
					>
						<option value="" disabled>
							선택
						</option>
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
				<textarea
					className="review"
					value={review}
					onChange={onChangeReview}
					placeholder="생각을 자유롭게 남겨주세요!"
				/>
			</div>
			<div className="btn-container">
				<button
					className="btn"
					onClick={isDisable ? undefined : handleAddBook}
				>
					등록
				</button>
			</div>
			<style jsx>{`
				.container {
					margin: 20px 25px;
					padding: 20px 15px;
					background-color: white;
					box-sizing: border-box;
					border-radius: 10px;
					box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
					border: 1px solid rgb(221, 221, 221);
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: 12fr 1fr;
					overflow: scroll;
				}

				.new-book-data {
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: 1fr 2fr;
				}

				.bookname {
					display: block;
					width: 90%;
					font-size: 20px;
					padding: 7px;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					letter-spacing: -0.02em;
				}

				.period {
					display: block;
					width: 50%;
					font-size: 15px;
					padding: 5px;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					letter-spacing: -0.02em;
				}

				.theme {
					display: block;
					font-size: 15px;
					padding: 5px;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					letter-spacing: -0.02em;
				}

				.description {
					font-family: inherit;
					letter-spacing: -0.02em;
					font-size: 14px;
					padding: 13px 5px 3px 5px;
				}

				.description-bookname {
					font-family: inherit;
					letter-spacing: -0.02em;
					font-size: 14px;
					padding: 3px 5px 3px 5px;
				}

				.review {
					display: block;
					width: auto;
					height: auto;
					font-size: 15px;
					margin-right: 10px;
					padding: 10px;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
					resize: none;
					font-family: inherit;
				}

				.btn-container {
					display: flex;
					justify-content: flex-end;
					flex-direction: column;
				}

				.btn {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					border: none;
					color: white;
					background-color: ${isDisable ? `gray` : `midnightblue`};
					opacity: 0.85;
					border-radius: 10px;
					font-size: 15px;
					cursor: ${isDisable ? `not-allowed` : `pointer`};
				}

				.btn:hover {
					opacity: ${isDisable ? `0.85` : `1`};
				}
			`}</style>
		</div>
	);
};

export default AddBookBox;
