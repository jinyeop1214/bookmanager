export interface User {
	isLoggedIn: boolean;
	uid: number | null;
	id: string | null;
	nickname: string | null;
}

export interface SignUpRequestVariables {
	id: string;
	password: string;
	nickname: string;
}

export interface LogInRequestVariables {
	id: string;
	password: string;
}

export interface UserPayload {
	uid: number;
	id: string;
	nickname: string;
}

export interface Book {
	book_id: number;
	bookname: string;
	start: string;
	end: string;
	theme: string;
	review: string;
	user_id: number;
}
