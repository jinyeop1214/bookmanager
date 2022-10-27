import React, { FC, useState } from "react";
import { Book } from "../../../Interfaces";
import OpenedBookModal from "../bookModal/OpenedBookModal";
import UpdatedBookModal from "../bookModal/UpdatedBookModal";
import ClosedBookBox from "./ClosedBookBox";
// import OpenedBox from "./OpenedBookBox";
// import UpdatedBox from "./UpdatedBookBox";

interface BookBoxProps {
	book: Book;
}

const BookBox = ({ book }: BookBoxProps) => {
	const { book_id, bookname, start, end, theme, review, user_id } = book;
	const [open, setOpen] = useState<Boolean>(false);
	const [update, setUpdate] = useState<Boolean>(false);
	const [newBook, setNewBook] = useState<Book>({
		book_id,
		bookname,
		start,
		end,
		theme,
		review,
		user_id,
	});

	const toggleOpen = () => setOpen((prev) => !prev);
	const toggleUpdate = () => setUpdate((prev) => !prev);

	return (
		<>
			{open &&
				(!update ? (
					<OpenedBookModal
						book={newBook}
						toggleOpen={toggleOpen}
						toggleUpdate={toggleUpdate}
					/>
				) : (
					<UpdatedBookModal
						book={newBook}
						toggleUpdate={toggleUpdate}
						handleSetNewBook={setNewBook}
					/>
				))}
			<ClosedBookBox book={newBook} toggleOpen={toggleOpen} />
		</>
	);

	// return !open ? ( //닫힘
	// 	<ClosedBookBox book={newBook} toggleOpen={toggleOpen} />
	// ) : //열림
	// !update ? ( //수정
	// 	<OpenedBox
	// 		book={newBook}
	// 		toggleOpen={toggleOpen}
	// 		toggleUpdate={toggleUpdate}
	// 	/>
	// ) : (
	// 	<UpdatedBox
	// 		book={newBook}
	// 		toggleUpdate={toggleUpdate}
	// 		handleSetNewBook={setNewBook}
	// 	/>
	// );
};

export default BookBox;
