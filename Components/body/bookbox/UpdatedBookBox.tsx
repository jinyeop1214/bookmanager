import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { Book } from "../../../Interfaces";

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
	const isDisable =
		newBookname === "" ||
		newStart === "" ||
		newEnd === "" ||
		newTheme === "" ||
		newReview === "";

	const queryClient = useQueryClient();
	const updateBookMutation = useMutation(
		async (book: Omit<Book, "book_id" | "user_id">) => {
			const response = await fetch(`/api/book/${book_id}`, {
				method: "put",
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
				throw new Error("updateBookMutation Error.");
			},
			onSuccess: (data, variables, _context) => {
				console.log("updateBookData", data);

				toggleUpdate();
				handleSetNewBook({ ...props.book, ...variables }); //?

				//Updates from Mutation Responses
				queryClient.setQueryData(
					["books"],
					(prev: Book[] | undefined): Book[] | undefined =>
						prev?.map((book) =>
							book.book_id === book_id
								? { ...book, ...variables }
								: book
						)
				);

				//Invalidation from Mutations
				// queryClient.invalidateQueries(["books"]);
			},
		}
	);

	const onChangeBookname = (e: ChangeEvent<HTMLInputElement>) => {
		setNewBookname(e.target.value);
	};

	const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
		if (newEnd !== "" && e.target.value > newEnd) setNewEnd("");
		setNewStart(e.target.value);
	};

	const onChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
		setNewEnd(e.target.value);
	};

	const onChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
		setNewTheme(e.target.value);
	};

	const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNewReview(e.target.value);
	};

	const handleUpdateBook = async () => {
		try {
			const book: Omit<Book, "book_id" | "user_id"> = {
				bookname: newBookname,
				start: newStart,
				end: newEnd,
				theme: newTheme,
				review: newReview,
			};

			updateBookMutation.mutate(book);
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
				placeholder="제목"
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
				onChange={onChangeReview}
				placeholder="생각을 자유롭게 남겨주세요!"
				autoFocus
			/>
			<div className="btn-wrapper">
				<span></span>
				<button
					className="done-btn"
					onClick={isDisable ? undefined : handleUpdateBook}
				>
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
					padding: 20px 20px 15px 20px;
					background-color: white;
					box-sizing: border-box;
					border-radius: 10px;
					box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
					border: 1px solid rgb(221, 221, 221);
				}

				.bookname {
					display: block;
					width: 90%;
					font-size: 20px;
					padding: 5px;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					letter-spacing: -0.02em;
					margin: 0px 0px 15px 0px;
				}

				.period {
					display: block;
					width: 50%;
					font-size: 15px;
					padding: 3px;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					letter-spacing: -0.02em;
					margin: 0px 0px 5px 0px;
				}

				.theme {
					display: block;
					font-size: 15px;
					padding: 3px;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
					letter-spacing: -0.02em;
					margin: 0px 0px 10px 0px;
				}

				.review {
					display: block;
					width: 100%;
					min-height: 250px;
					padding: 5px;
					resize: none;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
					font-family: inherit;
				}

				.btn-wrapper {
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: 1fr 1fr 1fr;
					margin-top: 15px;
				}

				.done-btn {
					font-family: inherit;
					line-height: 1.75em;
					letter-spacing: -0.05em;
					border: none;
					color: white;
					background-color: ${isDisable ? `gray` : `midnightblue`};
					opacity: 0.85;
					border-radius: 10px;
					font-size: 15px;
					margin-left: 3px;
					cursor: ${isDisable ? `not-allowed` : `pointer`};
				}

				.done-btn:hover {
					opacity: ${isDisable ? `0.85` : `1`};
				}

				.cancel-btn {
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

				.cancel-btn:hover {
					opacity: 1;
				}
			`}</style>
		</div>
	);
};

export default UpdatedBox;
