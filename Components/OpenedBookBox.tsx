import { useRouter } from "next/router";
import React from "react";
import { DateFormat } from "../functions/DateFormat";
import { Book } from "../Interfaces";

interface OpenedBoxProps {
	book: Book;
	toggleOpen: () => void;
	toggleUpdate: () => void;
}

const OpenedBox = (props: OpenedBoxProps) => {
	const router = useRouter();
	const { book_id, bookname, start, end, theme, review, user_id } =
		props.book;
	const toggleOpen = props.toggleOpen;
	const toggleUpdate = props.toggleUpdate;
	const { from, to } = DateFormat(start, end);

	const handleDeleteBook = async () => {
		const ok = confirm("정말로 삭제하나요?");
		if (ok) {
			try {
				const response = await fetch(`/api/book/${book_id}`, {
					method: "delete",
				});
			} catch (error) {
				console.log(error);
			}
		}
		router.replace(`/feed`);
	};

	return (
		<div className="box">
			<div className="bookname">
				<span className="info">제목: </span>
				<span className="data">{bookname}</span>
			</div>
			<div className="period">
				<div className="info">기간: </div>
				<div className="data">
					{from}
					<br />~ {to}
				</div>
			</div>
			<div className="theme">
				<span className="info">분야: </span>
				<span className="data">{theme}</span>
			</div>
			<div className="review">
				<div className="data">&nbsp;{review}</div>
			</div>
			<div className="btn-wrapper">
				<span></span>
				<button className="update-btn" onClick={toggleUpdate}>
					수정
				</button>
				<button className="delete-btn" onClick={handleDeleteBook}>
					삭제
				</button>
				<button className="close-btn" onClick={toggleOpen}>
					접기
				</button>
			</div>
			<style jsx>
				{`
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
						display: grid;
						grid-auto-flow: column;
						grid-template-columns: 1fr 6fr;
						font-family: inherit;
						line-height: 1.75em;
						letter-spacing: -0.05em;
						margin-top: 5px;
						margin-bottom: 5px;
						width: 258px;
					}

					.period {
						display: grid;
						grid-auto-flow: column;
						grid-template-columns: 1fr 6fr;
						font-family: inherit;
						line-height: 1.75em;
						letter-spacing: -0.05em;
						margin-bottom: 5px;
						width: 258px;
					}

					.theme {
						display: grid;
						grid-auto-flow: column;
						grid-template-columns: 1fr 6fr;
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

					.btn-wrapper {
						display: grid;
						grid-auto-flow: column;
						grid-template-columns: 1fr 1fr 1fr 1fr;
						margin-top: 20px;
						width: 258px;
					}

					.update-btn {
						font-family: inherit;
						line-height: 1.75em;
						letter-spacing: -0.05em;
						width: auto;
						height: auto;
						font-size: 15px;
					}

					.delete-btn {
						font-family: inherit;
						line-height: 1.75em;
						letter-spacing: -0.05em;
						width: auto;
						height: auto;
						font-size: 15px;
						margin-left: 5px;
					}

					.close-btn {
						font-family: inherit;
						line-height: 1.75em;
						letter-spacing: -0.05em;
						width: auto;
						height: auto;
						font-size: 15px;
						margin-left: 5px;
					}
				`}
			</style>
		</div>
	);
};

export default OpenedBox;
