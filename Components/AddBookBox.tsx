import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { selectUser, useAppSelector } from "../store/reducers/user";

/**
 * start 날짜 고르면 end는 그 이후. 그 전으로는 disable하면 좋다.
 * @returns
 */
const AddBookBox = () => {
	const { uid, isLoggedIn, id, nickname } = useAppSelector(selectUser);
	const [bookname, setBookname] = useState<string>("");
	const [start, setStart] = useState<string>("");
	const [end, setEnd] = useState<string>("");
	const [theme, setTheme] = useState<string>("");
	const [review, setReview] = useState<string>("");
	const [wrongtext, setWrongText] = useState<string>("");
	const router = useRouter();

	const onChangeBookname = (e: ChangeEvent<HTMLInputElement>) => {
		setBookname(e.target.value);
		setWrongText("");
	};

	const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
		setStart(e.target.value);
		setWrongText("");
	};

	const onChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
		setEnd(e.target.value);
		setWrongText("");
	};

	const onChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value);
		setWrongText("");
	};

	const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReview(e.target.value);
		setWrongText("");
	};

	const handleAddBook = async () => {
		if (
			bookname === "" ||
			start === "" ||
			end === "" ||
			theme === "" ||
			review === ""
		) {
			setWrongText("빈칸을 채워주세요.");
			return;
		}

		const book = {
			bookname,
			start,
			end,
			theme,
			review,
			user_id: uid,
		};

		const response = await fetch("/api/addBook", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(book),
		});
		// const body = await response.json();
		setBookname("");
		setStart("");
		setEnd("");
		setTheme("");
		setReview("");
		router.replace("/feed");

		//
	};

	return (
		<div className="container">
			<div className="new-book-data">
				<div>
					<input
						className="bookname"
						value={bookname}
						type="text"
						onChange={onChangeBookname}
						placeholder="책 제목"
					/>
					<input
						className="period"
						value={start}
						type="date"
						onChange={onChangeStart}
					/>
					<input
						className="period"
						value={end}
						type="date"
						onChange={onChangeEnd}
					/>
					<select
						className="theme"
						value={theme}
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
					<div className="warning">{wrongtext}</div>
				</div>
				<div>
					<textarea
						className="review"
						value={review}
						cols={50}
						rows={7}
						onChange={onChangeReview}
						placeholder="생각을 자유롭게 남겨주세요!"
					/>
				</div>
			</div>
			<div className="btn-container">
				<div></div>
				<button className="btn" onClick={handleAddBook}>
					등록하기
				</button>
			</div>
			<style jsx>{`
				.container {
					/* margin-top: 10px;
    width: auto;
    padding: 0 16px; */
					margin: 30px 45px;
					width: auto;
					height: 200px;
					padding: 15px 30px;
					background-color: white;
					box-sizing: border-box;
					background: #fff;
					border-radius: 10px;
					box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
					border: 1px solid rgb(221, 221, 221);
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: 9fr 1fr;
				}

				.btn-container {
					display: grid;
					grid-auto-flow: row;
					grid-template-rows: 6fr 4fr;
				}

				.new-book-data {
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: 1fr 1.5fr;
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

				.btn {
					display: block;
					margin: 7px;
					cursor: pointer;
					text-align: center;
					background-color: midnightblue;
					border: none;
					border-radius: 10px;
					color: white;
					height: 60%;
					font-size: 17px;
					font-family: inherit;
					line-height: 1.75em;
					opacity: 0.9;
				}

				.btn:hover {
					opacity: 1;
				}
			`}</style>
		</div>
	);
};

export default AddBookBox;
