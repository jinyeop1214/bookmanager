import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { UserPayload } from "../../../Interfaces";
import {
	useAppSelector,
	selectUser,
	modifyUser,
} from "../../../store/reducers/user";

interface UserInfoBoxProps {
	booksLen: number;
}

const UserInfoBox = ({ booksLen }: UserInfoBoxProps) => {
	const { uid, id, nickname } = useAppSelector(selectUser);
	const [name, setName] = useState<string>(nickname as string);
	const isDisable = name === "" || name === nickname;

	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const modifyUserMutation = useMutation(
		async (user: Omit<UserPayload, "id" | "uid">) => {
			const response = await fetch(`/api/user/${uid}`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			return await response.json();
		},
		{
			onError: (error, _variables, _context) => {
				console.log(error);
				throw new Error("modifyUserMutation Error.");
			},
			onSuccess: (_data, variables, _context) => {
				dispatch(modifyUser(variables));

				queryClient.setQueryData(
					["user", `${uid}`],
					(
						prev: UserPayload | undefined
					): UserPayload | undefined => ({
						uid: prev ? prev.uid : (uid as number),
						id: prev ? prev.id : (id as string),
						nickname: variables.nickname,
					})
				);
			},
		}
	);

	const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleModifyUserInfo = async () => {
		const user: Omit<UserPayload, "id" | "uid"> = {
			nickname: name,
		};

		modifyUserMutation.mutate(user);
	};

	return (
		<div className="container">
			<div className="description-name">닉네임</div>
			<input
				className="name"
				value={name}
				type="text"
				placeholder="닉네임"
				onChange={onChangeNickname}
			/>
			<div className="description">등록한 책</div>
			<div className="books">{booksLen}권</div>
			<button
				className="btn"
				onClick={isDisable ? undefined : handleModifyUserInfo}
			>
				편집
			</button>
			<style jsx>{`
				.container {
					max-width: 350px;
					margin: 0 auto 30px;
					padding: 20px 16px 15px;
					background-color: white;
					box-sizing: border-box;
					border-radius: 10px;
					box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
					border: 1px solid rgb(221, 221, 221);
				}

				.description-name {
					font-family: inherit;
					letter-spacing: -0.02em;
					font-size: 14px;
					padding: 3px 5px 3px 5px;
					color: gray;
				}

				.description {
					font-family: inherit;
					letter-spacing: -0.02em;
					font-size: 14px;
					padding: 13px 5px 3px 5px;
					color: gray;
				}

				.name {
					font-size: 18px;
					padding: 5px;
					box-sizing: border-box;
					border: 1.5px solid #c4c4c4;
					border-radius: 10px;
				}

				.books {
					font-size: 20px;
					padding: 3px 5px 3px 5px;
				}

				.btn {
					position: relative;
					left: 80%;
					border-radius: 6px;
					color: white;
					background-color: ${isDisable ? `gray` : `midnightblue`};
					font-size: 18px;
					margin: 23px 5px 3px 5px;
					opacity: 0.85;
					padding: 8px;
					border: none;
					cursor: ${isDisable ? `not-allowed` : `pointer`};
					line-height: 20px;
				}

				.btn:hover {
					opacity: ${isDisable ? `0.85` : `1`};
				}
			`}</style>
		</div>
	);
};

export default UserInfoBox;
