import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { DateFormat } from "../../../functions/DateFormat";
import { Book, UserPayload } from "../../../Interfaces";
import { selectUser, useAppSelector } from "../../../store/reducers/user";
import DisplayError from "../../exceptions/DisplayError";
import Loading from "../../exceptions/Loading";

interface OpenedBoxProps {
	book: Book;
	toggleOpen: () => void;
	toggleUpdate: () => void;
}

const OpenedBox = (props: OpenedBoxProps) => {
	const { uid } = useAppSelector(selectUser);
	const { book_id, bookname, start, end, theme, review, user_id } =
		props.book;
	const toggleOpen = props.toggleOpen;
	const toggleUpdate = props.toggleUpdate;
	const { from, to } = DateFormat(start, end);

	const queryClient = useQueryClient();
	const { data, isLoading, isError, isFetching } = useQuery(
		["user", `${user_id}`],
		async () => {
			const response = await fetch(`/api/user/${user_id}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) throw new Error("getUser Query error.");
			const body: { user: UserPayload } = await response.json();
			return body.user;
		}
	);

	if (!isLoading && isError) return <DisplayError />;

	const deleteBookMutation = useMutation(
		async (book_id: number) => {
			const response = await fetch(`/api/book/${book_id}`, {
				method: "delete",
			});
			return await response.json();
		},
		{
			onError: (error, _variables, _context) => {
				console.log(error);
				throw new Error("deleteBookMutation Error.");
			},
			onSuccess: (_data, variables, _context) => {
				queryClient.setQueriesData(
					["books"],
					(prev: Book[] | undefined): Book[] | undefined =>
						prev?.filter((book) => book.book_id !== variables)
				);
			},
		}
	);

	const handleDeleteBook = async () => {
		const ok = confirm("정말로 삭제하나요?");
		if (ok) {
			try {
				deleteBookMutation.mutate(book_id);
			} catch (error) {
				console.log(error);
				throw new Error("delete confirm Error.");
			}
		}
	};

	return (
		<>
			<Loading loading={isLoading} />
			<div className="box">
				<div className="bookname">{bookname}</div>
				<div className="period">
					{from} ~ {to}
				</div>
				<div className="theme">{theme}</div>
				{data && <div className="user">{data.nickname}</div>}
				<p className="review">&nbsp;{review}</p>
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
							padding: 20px 20px 15px 20px;
							background-color: white;
							box-sizing: border-box;
							border-radius: 10px;
							box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
							border: 1px solid rgb(221, 221, 221);
						}

						.bookname {
							font-family: inherit;
							font-size: 25px;
							font-weight: 500;
							margin: 0px 0px 20px 0px;
							letter-spacing: -0.05em;
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

						.user {
							font-family: inherit;
							line-height: 1.75em;
							letter-spacing: -0.05em;
							font-size: 16px;
						}

						.review {
							font-family: inherit;
							line-height: 1.75em;
							letter-spacing: -0.05em;
							padding: 5px 10px 5px 10px;
							max-height: 300px;
							overflow-y: auto;
						}

						.btn-wrapper {
							display: grid;
							grid-auto-flow: column;
							grid-template-columns: 1fr 1fr 1fr 1fr;
							margin-top: 15px;
						}

						.update-btn {
							visibility: ${uid === user_id
								? `visible`
								: `hidden`};
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

						.update-btn:hover {
							opacity: 1;
						}

						.delete-btn {
							visibility: ${uid === user_id
								? `visible`
								: `hidden`};
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

						.delete-btn:hover {
							opacity: 1;
						}

						.close-btn {
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

						.close-btn:hover {
							opacity: 1;
						}
					`}
				</style>
			</div>
		</>
	);
};

export default OpenedBox;
