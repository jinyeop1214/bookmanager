import React, { ChangeEvent, useState } from "react";

const AddBookBox = () => {
	const [bookname, setBookname] = useState<string>("");
	const [period, setPeriod] = useState<string>("");
	const [theme, setTheme] = useState<string>("");
	const [review, setReview] = useState<string>("");
	const [wrongtext, setWrongText] = useState<string>("");

	const onChangeBookname = (e: ChangeEvent<HTMLInputElement>) => {
		setBookname(e.target.value);
		setWrongText("");
	};

	const onChangePeriod = (e: ChangeEvent<HTMLInputElement>) => {
		setPeriod(e.target.value);
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

	const handleAddBook = (
		bookname: string,
		period: string,
		theme: string,
		review: string
	) => {
		if (bookname === "" || period === "" || theme === "" || review === "") {
			setWrongText("Please fill all blanks.");
			return;
		}
		// createBook({
		//     variables: {
		//         bookname: bookname,
		//         period: period,
		//         theme: theme,
		//         review: review,
		//         userId: user.id
		//     },
		// }).then(() => {
		//     if(error) console.log(error);
		//     else window.location.reload();
		// })
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
						value={period}
						type="date"
						onChange={onChangePeriod}
						placeholder="독서 기간"
					/>
					<input
						className="period"
						value={period}
						type="date"
						onChange={onChangePeriod}
						placeholder="독서 기간"
					/>
					<select className="theme" onChange={onChangeTheme}>
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
				{/* <div> */}
				<div></div>
				<button
					className="btn"
					onClick={() =>
						handleAddBook(bookname, period, theme, review)
					}
				>
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
