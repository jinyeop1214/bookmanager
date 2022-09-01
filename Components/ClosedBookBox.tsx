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

	return (
		<div className="box">
			<div className="bookname">{bookname}</div>
			<div className="period">
				{from} ~ {to}
			</div>
			<div className="theme">{theme}</div>
			<div className="open-button-wrapper">
				<span></span>
				<button className="open-button" onClick={toggleOpen}>
					펼치기
				</button>
			</div>
			<style jsx>{`
				.box {
					display: inline-table;
					margin: 30px 0px;
					margin-right: 45px;
					width: 300px;
					padding: 20px 20px 15px 20px;
					background-color: white;
					box-sizing: border-box;
					background: #fff;
					border-radius: 10px;
					box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
					border: 1px solid rgb(221, 221, 221);
				}

				.bookname {
					font-family: inherit;
					font-size: 25px;
					width: 258px;
					font-weight: 500;
					margin: 0px 0px 20px 0px;
					letter-spacing: -0.05em;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.period {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					font-size: 15px;
				}

				.theme {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					font-size: 16px;
				}

				.open-button-wrapper {
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: 3fr 1fr;
					margin-top: 15px;
				}

				.open-button {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					border: none;
					color: white;
					background-color: midnightblue;
					opacity: 0.85;
					border-radius: 10px;
					font-size: 15px;
					margin-left: 3px;
					cursor: pointer;
				}

				.open-button:hover {
					opacity: 1;
				}
			`}</style>
		</div>
	);
};

export default ClosedBookBox;
