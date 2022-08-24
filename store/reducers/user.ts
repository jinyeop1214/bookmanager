import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { User, UserPayload } from "../../Interfaces";

const initialState: User = {
	isLoggedIn: false,
	id: null,
	nickname: null,
};

export const userSlice = createSlice({
	name: "loggedUser",
	initialState,
	reducers: {
		logIn: (state, action: PayloadAction<UserPayload>) => ({
			...state,
			isLoggedIn: true,
			id: action.payload.id,
			nickname: action.payload.nickname,
		}),
		logOut: () => initialState,
	},
});

export const { logIn, logOut } = userSlice.actions;
export const selectUser = (state: AppState) => state.userSlice;
export default userSlice.reducer;
