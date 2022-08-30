import React, { FC, useState } from "react";
import { Book } from "../Interfaces";
import ClosedBookBox from "./ClosedBookBox";
import OpenedBox from "./OpenedBookBox";
import UpdatedBox from "./UpdatedBookBox";

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
	const updateNewBook = (book: Book) => setNewBook(book);

	return !open ? ( //not open
		<ClosedBookBox book={newBook} toggleOpen={toggleOpen} />
	) : //open
	!update ? ( //not update
		<OpenedBox
			book={newBook}
			toggleOpen={toggleOpen}
			toggleUpdate={toggleUpdate}
		/>
	) : (
		<UpdatedBox
			book={newBook}
			toggleUpdate={toggleUpdate}
			updateNewBook={updateNewBook}
		/>
	);
};

export default BookBox;
