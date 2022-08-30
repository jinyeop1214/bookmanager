import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { AppState } from ".";
import { User, UserPayload } from "../../Interfaces";

const initialState: User = {
	isLoggedIn: false,
	uid: null,
	id: null,
	nickname: null,
};

export const userSlice = createSlice({
	name: "loggedUser",
	initialState,
	reducers: {
		getData: (state) => state,
		logIn: (_state, action: PayloadAction<UserPayload>) => {
			return {
				isLoggedIn: true,
				uid: action.payload.uid,
				id: action.payload.id,
				nickname: action.payload.nickname,
			};
		},
		logOut: () => initialState,
	},
});

export const { getData, logIn, logOut } = userSlice.actions;
export const selectUser = (state: AppState) => state.userSlice;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default userSlice.reducer;
