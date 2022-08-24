import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { User } from "../../Interfaces";

import userSlice from "./user";

const appReducer = combineReducers({
	userSlice,
});

const reducer = (
	state: CombinedState<{ userSlice: User }> | undefined,
	action: AnyAction
) => {
	if (action.type === HYDRATE) {
		return {
			...state,
			...action.payload,
		};
	}
	return appReducer(state, action);
};

export default reducer;
export type AppState = ReturnType<typeof appReducer>;
