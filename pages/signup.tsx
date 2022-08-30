import React from "react";

const signup = () => {
	return <div>signup</div>;
};

export default signup;
// import { NextPage } from "next";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { ChangeEvent, KeyboardEvent, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logIn } from "../store/reducers/user";

// const signup: NextPage = () => {
// 	const dispatch = useDispatch();
// 	const router = useRouter();
// 	const [id, setId] = useState<string>("");
// 	const [password, setPassword] = useState<string>("");
// 	const [nickname, setNickname] = useState<string>("");
// 	const [wrongtext, setWrongText] = useState<string>("");

// 	const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
// 		setId(e.target.value);
// 		setWrongText("");
// 	};

// 	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
// 		setPassword(e.target.value);
// 		setWrongText("");
// 	};

// 	const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
// 		setNickname(e.target.value);
// 		setWrongText("");
// 	};

// 	const onEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
// 		if (e.keyCode === 13) {
// 			handleSignUp();
// 		}
// 	};

// 	/**
// 	 * @returns
// 	 */
// 	const handleSignUp = async () => {
// 		if (id === "" || password === "" || nickname === "") {
// 			setWrongText("빈칸을 채워주세요.");
// 			return;
// 		}
// 		const user = {
// 			id,
// 			password,
// 			nickname,
// 		};
// 		const response = await fetch("/api/signup", {
// 			method: "post",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(user),
// 		});
// 		const body = await response.json();
// 		console.log(body);
// 		if (body.error) {
// 			switch (body.error) {
// 				case "ID":
// 					setWrongText("이미 존재하는 ID입니다.");
// 					break;
// 			}
// 			return;
// 		}
// 		dispatch(
// 			logIn({
// 				id,
// 				nickname,
// 			})
// 		);
// 		router.replace(`/feed`);
// 	};

// 	return (
// 		<div className="container">
// 			<div className="title">
// 				<Link href="/">
// 					<a className="link">Book Manager</a>
// 				</Link>
// 			</div>
// 			<div className="subtitle">Sign up</div>
// 			<input
// 				className="id"
// 				value={id}
// 				type="text"
// 				onChange={onChangeId}
// 				placeholder="ID"
// 				autoFocus
// 			/>
// 			<input
// 				className="password"
// 				value={password}
// 				type="text"
// 				onChange={onChangePassword}
// 				placeholder="Password"
// 			/>
// 			<input
// 				className="displayName"
// 				value={nickname}
// 				type="text"
// 				onChange={onChangeNickname}
// 				placeholder="Display Name"
// 				onKeyDown={onEnterDown}
// 			/>
// 			<div className="warning">{wrongtext}</div>
// 			<button className="btn" onClick={handleSignUp}>
// 				{" "}
// 				Sign up{" "}
// 			</button>
// 			<style jsx>{`
// 				.container {
// 					max-width: 376px;
// 					margin: 100px auto;
// 					padding: 0 16px;
// 					background-color: white;
// 					box-sizing: border-box;
// 					background: #fff;
// 					border-radius: 10px;
// 					box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
// 					border: 1px solid rgb(221, 221, 221);
// 				}

// 				.title {
// 					text-align: center;
// 					color: midnightblue;
// 					padding: 30px;
// 					border-bottom: 2px solid midnightblue;
// 					font-family: inherit;
// 					letter-spacing: -0.02em;
// 				}

// 				.link {
// 					font-size: 32px;
// 				}

// 				.subtitle {
// 					text-align: center;
// 					font-size: 30px;
// 					color: midnightblue;
// 					padding: 30px;
// 					padding-top: 35px;
// 					font-family: inherit;
// 					letter-spacing: -0.02em;
// 				}

// 				.id {
// 					display: block;
// 					width: 94%;
// 					margin: 10px;
// 					font-size: 20px;
// 					padding: 8px;
// 					margin-bottom: 12px;
// 					box-sizing: border-box;
// 					border: 2px solid #c4c4c4;
// 					border-radius: 10px;
// 				}

// 				.password {
// 					display: block;
// 					width: 94%;
// 					margin: 10px;
// 					font-size: 20px;
// 					padding: 8px;
// 					margin-bottom: 12px;
// 					box-sizing: border-box;
// 					border: 2px solid #c4c4c4;
// 					border-radius: 10px;
// 				}

// 				.displayName {
// 					display: block;
// 					width: 94%;
// 					margin: 10px;
// 					margin-bottom: 15px;
// 					font-size: 20px;
// 					padding: 8px;
// 					box-sizing: border-box;
// 					border: 2px solid #c4c4c4;
// 					border-radius: 10px;
// 				}

// 				.warning {
// 					color: red;
// 				}

// 				.btn {
// 					border-radius: 10px;
// 					text-align: center;
// 					font-size: 25px;
// 					margin: 10px;
// 					width: 94%;
// 					padding: 8px;
// 					border: 2px solid #c4c4c4;
// 					margin-bottom: 35px;
// 					cursor: pointer;
// 					font-family: inherit;
// 					letter-spacing: -0.02em;
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default signup;