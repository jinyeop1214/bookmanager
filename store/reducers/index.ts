import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import userSlice from "./user";
import { User } from "../../Interfaces";

export interface ReducerStates {
	user: User;
}

export const rootReducer = (
	state: ReducerStates | undefined,
	action: AnyAction
): CombinedState<ReducerStates> => {
	if (action.type === HYDRATE) {
		return {
			...action.payload,
		};
	} else {
		const combinedReducer = combineReducers({
			user: userSlice.reducer,
		});
		return combinedReducer(state, action);
	}
};

export type AppState = ReturnType<typeof rootReducer>;
