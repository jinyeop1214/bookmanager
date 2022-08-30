import { DateFormat } from "../functions/DateFormat";
import { Book } from "../Interfaces";

interface ClosedBookBoxProps {
	book: Book;
	toggleOpen: () => void;
}

/**
 * @param param0
 * @returns
 */
const ClosedBookBox = (props: ClosedBookBoxProps) => {
	const { book_id, bookname, start, end, theme, review, user_id } =
		props.book;
	const toggleOpen = props.toggleOpen;
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
			<div className="open-button-wrapper">
				<span></span>
				<button className="open-button" onClick={toggleOpen}>
					Open
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

				.data {
					font-size: 18px;
				}

				.info {
					opacity: 0.8;
				}

				.open-button-wrapper {
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: 3fr 1fr;
					margin-top: 20px;
					width: 258px;
				}

				.open-button {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					width: auto;
					height: auto;
					font-size: 15px;
				}
			`}</style>
		</div>
	);
};

export default ClosedBookBox;
