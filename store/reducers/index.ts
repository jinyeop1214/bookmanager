import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { User } from "../../Interfaces";

import userSlice from "./user";

const appReducer = combineReducers({
	userSlice,
});

/**
 * Next에서는 getServerSideProps가 있는 page가 매 렌더링 될때마다 HYDRATE action이 dispatched되는데, client side와 동기화시키기 위해 이전 상태로 덮어줘야 한다.
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
