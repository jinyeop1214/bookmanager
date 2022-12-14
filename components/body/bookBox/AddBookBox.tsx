import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { Book } from "../../../Interfaces";
import { selectUser, useAppSelector } from "../../../store/reducers/user";

/**
 * @returns
 */
const AddBookBox = () => {
	const { uid } = useAppSelector(selectUser);
	const [bookname, setBookname] = useState<string>("");
	const [start, setStart] = useState<string>("");
	const [end, setEnd] = useState<string>("");
	const [theme, setTheme] = useState<string>("");
	const [review, setReview] = useState<string>("");
	const isDisable =
		bookname === "" ||
		start === "" ||
		end === "" ||
		theme === "" ||
		review === "";

	const queryClient = useQueryClient();
	const addBookMutation = useMutation(
		async (book: Omit<Book, "book_id">) => {
			const response = await fetch("/api/addBook", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(book),
			});
			return await response.json();
		},
		{
			onError: (error, _variables, _context) => {
				console.log(error);
				throw new Error("addBookMutation Error.");
			},
			onSuccess: (data, _variables, _context) => {
				setBookname("");
				setStart("");
				setEnd("");
				setTheme("");
				setReview("");

				// queryClient.setQueryData(
				// 	["books"],
				// 	(prev: Book[] | undefined): Book[] | undefined => [
				// 		...(prev ?? []),
				// 		data.book,
				// 	]
				// );
				queryClient.invalidateQueries(["books"]);
			},
		}
	);

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

		addBookMutation.mutate(book);
	};

	return (
		<div className="container">
			<div className="new-book-data">
				<div>
					<div className="description-bookname">??????</div>
					<input
						className="bookname"
						value={bookname}
						type="text"
						onChange={onChangeBookname}
						placeholder="??????"
					/>
					<div className="description">?????? ????????? ??????</div>
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
					<div className="description">??? ?????? ??????</div>
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
					<div className="description">??????</div>
					<select
						className="theme"
						value={theme}
						onChange={onChangeTheme}
					>
						<option value="" disabled>
							??????
						</option>
						<option value="??????">??????</option>
						<option value="??????">??????</option>
						<option value="??????">??????</option>
						<option value="??????">??????</option>
						<option value="??????">??????</option>
						<option value="??????">??????</option>
						<option value="??????">??????</option>
						<option value="??????">??????</option>
					</select>
				</div>
				<textarea
					className="review"
					value={review}
					onChange={onChangeReview}
					placeholder="????????? ???????????? ???????????????!"
				/>
			</div>
			<div className="btn-container">
				<button
					className="btn"
					onClick={isDisable ? undefined : handleAddBook}
				>
					??????
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
					width: 80%;
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
					color: gray;
				}

				.description-bookname {
					font-family: inherit;
					letter-spacing: -0.02em;
					font-size: 14px;
					padding: 3px 5px 3px 5px;
					color: gray;
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
