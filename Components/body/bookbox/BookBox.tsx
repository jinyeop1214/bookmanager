import React, { forwardRef, useState } from "react";
import { Book } from "../../../Interfaces";
import OpenedBookModal from "../bookModal/OpenedBookModal";
import UpdatedBookModal from "../bookModal/UpdatedBookModal";
import ClosedBookBox from "./ClosedBookBox";

interface BookBoxProps {
	book: Book;
}

const BookBox = forwardRef<HTMLDivElement, BookBoxProps>(({ book }, ref) => {
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
		<div className="box" ref={ref}>
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
			<style jsx>{`
				.box {
					display: inline-table;
				}
			`}</style>
		</div>
	);
});

BookBox.displayName = "BookBox";

export default BookBox;
