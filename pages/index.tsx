/**
 * 새 계정 만들기 버튼 온클릭 핸들러 추가해야함. 페이지 이름 바꿔야함 이게 메인, 로그인되면 된걸로 ssr
 */
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../store/reducers/user";

const Home: NextPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [wrongText, setWrongText] = useState("");
	const [newAccount, setNewAccount] = useState(false);

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
		if (id === "" || password === "") {
			setWrongText("빈칸을 채워주세요.");
			return;
		}

		if (newAccount && nickname === "") {
			setWrongText("빈칸을 채워주세요.");
			return;
		}

		if (newAccount) {
			//회원가입일때
			const user = {
				id,
				password,
				nickname,
			};
			const response = await fetch("/api/signup", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const body = await response.json();
			if (body.error) {
				switch (body.error) {
					case "ID":
						setWrongText("이미 존재하는 ID입니다.");
						break;
				}
				return;
			}
			dispatch(
				logIn({
					uid: parseInt(body.user.user_id),
					id,
					nickname,
				})
			);
			router.replace(`/feed`);
		} else {
			//로그인일때
			const userQuery = { id, password };
			const response = await fetch("/api/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userQuery),
			});
			const body = await response.json();

			if (body.error) {
				switch (body.error) {
					case "ID":
						setWrongText("잘못된 ID입니다.");
						break;
					case "Password":
						setWrongText("잘못된 비밀번호입니다.");
						break;
				}
				return;
			}

			dispatch(
				logIn({
					uid: parseInt(body.user.user_id),
					id: body.user.id,
					nickname: body.user.nickname,
				})
			);
			router.replace(`/feed`);
		}
	};

	return (
		<div className="container">
			<div className="title">
				<Link href="/">
					<a className="link">Book Manager</a>
				</Link>
			</div>
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
			<button className="btn" onClick={onBtnClick}>
				{newAccount ? "회원가입" : "로그인"}
			</button>
			<div className="border-line"></div>
			<button className="signup-btn" onClick={onToggleClick}>
				{newAccount ? "로그인하러 가기" : "새 계정 만들기"}
			</button>
			<style jsx>{`
				.container {
					max-width: 376px;
					margin: 100px auto;
					padding: 20px 16px 15px;
					background-color: white;
					box-sizing: border-box;
					background: #fff;
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
					margin-bottom: 25px;
					font-family: inherit;
					letter-spacing: -0.02em;
				}

				.link {
					font-size: 32px;
				}

				.id {
					display: block;
					width: 94%;
					margin: 10px;
					font-size: 20px;
					padding: 8px;
					margin-bottom: 12px;
					box-sizing: border-box;
					border: 2px solid #c4c4c4;
					border-radius: 10px;
				}

				.password {
					display: block;
					width: 94%;
					margin: 10px;
					margin-bottom: 15px;
					font-size: 20px;
					padding: 8px;
					box-sizing: border-box;
					border: 2px solid #c4c4c4;
					border-radius: 10px;
				}

				.displayName {
					display: block;
					width: 94%;
					margin: 10px;
					margin-bottom: 15px;
					font-size: 20px;
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
					background-color: #191970;
					font-size: 20px;
					margin: 10px 10px 0px 10px;
					width: 94%;
					opacity: 0.95;
					padding: 8px;
					border: none;
					cursor: pointer;
					line-height: 30px;
				}

				.btn:hover {
					opacity: 1;
				}

				.signup-btn:hover {
					opacity: 1;
				}

				.signup-btn {
					border-radius: 6px;
					text-align: center;
					color: white;
					background-color: #42b72a;
					font-size: 17px;
					opacity: 0.95;
					padding: 8px;
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
	);
};

export default Home;
