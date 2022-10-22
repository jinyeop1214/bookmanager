import { useMutation } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LogInRequestVariables, SignUpRequestVariables } from "../Interfaces";
import { logIn, selectUser, useAppSelector } from "../store/reducers/user";

const Sign: NextPage = () => {
	const { isLoggedIn } = useAppSelector(selectUser);
	const dispatch = useDispatch();
	const router = useRouter();
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [wrongText, setWrongText] = useState("");
	const [newAccount, setNewAccount] = useState(false);
	const isDisable =
		id === "" || password === "" || (newAccount && nickname === "");

	useEffect(() => {
		if (isLoggedIn) router.replace(`/feed`);
	}, [isLoggedIn, router]);

	const logInMutation = useMutation(
		async (query: LogInRequestVariables) => {
			const response = await fetch("/api/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(query),
			});
			return await response.json();
		},
		{
			onError: (error, _variables, _context) => {
				console.log(error);
				throw new Error("logInMutation Error.");
			},
			onSuccess: (data, _variables, _context) => {
				if (data.error) {
					switch (data.error) {
						case "ID":
							setWrongText("존재하지 않는 ID입니다.");
							break;
						case "Password":
							setWrongText("잘못된 비밀번호입니다.");
							break;
					}
					return;
				}
				dispatch(
					logIn({
						uid: parseInt(data.user.user_id),
						id: data.user.id,
						nickname: data.user.nickname,
					})
				);
				router.replace(`/feed`);
			},
		}
	);
	const signUpMutation = useMutation(
		async (user: SignUpRequestVariables) => {
			const response = await fetch("/api/signup", {
				method: "post",
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
				throw new Error("signUpMutation Error.");
			},
			onSuccess: (data, _variables, _context) => {
				if (data.error) {
					switch (data.error) {
						case "ID":
							setWrongText("이미 존재하는 ID입니다.");
							break;
					}
					return;
				}
				dispatch(
					logIn({
						uid: parseInt(data.user.user_id),
						id,
						nickname,
					})
				);
				router.replace(`/feed`);
			},
		}
	);

	const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value);
		setWrongText("");
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setWrongText("");
	};

	const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
		setWrongText("");
	};

	const onEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === 13) {
			onBtnClick();
		}
	};

	const onToggleClick = () => {
		setId("");
		setPassword("");
		setNickname("");
		setWrongText("");
		setNewAccount((prev) => !prev);
	};

	/**
	 * @returns
	 */
	const onBtnClick = async () => {
		if (id === "" || password === "") return;
		if (newAccount && nickname === "") return;
		if (newAccount) {
			//회원가입
			signUpMutation.mutate({
				id,
				password,
				nickname,
			});
		} else {
			//로그인
			logInMutation.mutate({
				id,
				password,
			});
		}
	};

	return (
		<>
			<Head>
				<title>
					Book Manager - {newAccount ? "회원가입" : "로그인"}
				</title>
				<meta
					name={newAccount ? "Sign Up Page" : "Sign In Page"}
					content="sign in or sign up to Book Manager App"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container">
				<div className="title">Book Manager</div>
				<input
					className="id"
					value={id}
					type="text"
					onChange={onChangeId}
					placeholder="ID"
					autoFocus
				/>
				<input
					className="password"
					value={password}
					type="password"
					onChange={onChangePassword}
					placeholder="Password"
					onKeyDown={onEnterDown}
				/>
				{newAccount && (
					<input
						className="displayName"
						value={nickname}
						type="text"
						onChange={onChangeNickname}
						placeholder="Display Name"
						onKeyDown={onEnterDown}
					/>
				)}
				<div className="warning">{wrongText}</div>
				<button
					className="btn"
					onClick={isDisable ? undefined : onBtnClick}
				>
					{newAccount ? "회원가입" : "로그인"}
				</button>
				<div className="border-line"></div>
				<button className="toggle-btn" onClick={onToggleClick}>
					{newAccount ? "로그인하러 가기" : "새 계정 만들기"}
				</button>
				<style jsx>{`
					.container {
						max-width: 350px;
						margin: 80px auto;
						padding: 20px 16px 15px;
						background-color: white;
						box-sizing: border-box;
						border-radius: 10px;
						box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
						border: 1px solid rgb(221, 221, 221);
						text-align: center;
					}

					.title {
						text-align: center;
						color: midnightblue;
						padding: 0px 0px 30px 0px;
						border-bottom: 2px solid midnightblue;
						margin-bottom: 40px;
						font-family: inherit;
						letter-spacing: -0.02em;
						font-size: 32px;
					}

					.id {
						display: block;
						margin: 10px auto;
						font-size: 20px;
						padding: 8px;
						width: 80%;
						box-sizing: border-box;
						border: 2px solid #c4c4c4;
						border-radius: 10px;
					}

					.password {
						display: block;
						margin: 10px auto;
						width: 80%;
						font-size: 20px;
						padding: 8px;
						box-sizing: border-box;
						border: 2px solid #c4c4c4;
						border-radius: 10px;
					}

					.displayName {
						display: block;
						margin: 10px auto;
						font-size: 20px;
						width: 80%;
						padding: 8px;
						box-sizing: border-box;
						border: 2px solid #c4c4c4;
						border-radius: 10px;
					}

					.warning {
						color: red;
					}

					.btn {
						border-radius: 6px;
						text-align: center;
						color: white;
						background-color: ${isDisable
							? `gray`
							: `midnightblue`};
						font-size: 20px;
						margin: 30px 10px 0px 10px;
						opacity: 0.85;
						padding: 8px;
						border: none;
						cursor: ${isDisable ? `not-allowed` : `pointer`};
						line-height: 30px;
					}

					.btn:hover {
						opacity: ${isDisable ? `0.85` : `1`};
					}

					.toggle-btn:hover {
						opacity: 1;
					}

					.toggle-btn {
						border-radius: 6px;
						text-align: center;
						color: white;
						background-color: #42b72a;
						font-size: 17px;
						opacity: 0.9;
						padding: 8px;
						width: auto;
						border: none;
						cursor: pointer;
						line-height: 30px;
					}

					.border-line {
						align-items: center;
						border-bottom: 1px solid #dadde1;
						display: flex;
						margin: 20px 16px;
						text-align: center;
					}
				`}</style>
			</div>
		</>
	);
};

export default Sign;
