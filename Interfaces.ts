export interface User {
	isLoggedIn: boolean;
	id: string | null;
	nickname: string | null;
}

export interface UserPayload {
	id: string;
	nickname: string;
}
