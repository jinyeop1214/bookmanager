import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import userSlice from "./user";
import { User } from "../../Interfaces";

const appReducer = combineReducers({
	userSlice,
});

/**
 * @param state
 * @param action
 * @returns
 */
const reducer = (
	state: CombinedState<{ userSlice: User }> | undefined,
	action: AnyAction
) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...action.payload,
			...state,
		};
		return nextState;
	} else {
		return appReducer(state, action);
	}
};

export default reducer;
export type AppState = ReturnType<typeof appReducer>;
