import React from "react";
import { Book } from "../Interfaces";

interface OpenedBoxProps {
	book: Book;
	toggleOpen: () => void;
	toggleUpdate: () => void;
}

const OpenedBox = (props: OpenedBoxProps) => {
	const { book_id, bookname, start, end, theme, review, user_id } =
		props.book;
	const toggleOpen = props.toggleOpen;
	const toggleUpdate = props.toggleUpdate;

	return (
		<div className="box">
			<div className="bookname">
				<span className="info">Name: </span>
				<span className="data">{bookname}</span>
			</div>
			<div className="period">
				<span className="info">Start: </span>
				<span className="data">{start}</span>
			</div>
			<div className="period">
				<span className="info">End: </span>
				<span className="data">{end}</span>
			</div>
			<div className="theme">
				<span className="info">Theme: </span>
				<span className="data">{theme}</span>
			</div>
			<div className="review">
				<div className="info">Review: </div>
				<div className="data">
					<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
					<span>{review}</span>
				</div>
			</div>
			<div className="btn-wrapper">
				<span></span>
				<button className="update-btn" onClick={toggleUpdate}>
					수정
				</button>
				<button className="delete-btn" onClick={undefined}>
					삭제
				</button>
				<button className="close-btn" onClick={toggleOpen}>
					닫기
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
