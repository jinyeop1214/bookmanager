import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut, selectUser, useAppSelector } from "../../store/reducers/user";

const Header = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { uid, nickname } = useAppSelector(selectUser);

	const handleLogOut = () => {
		dispatch(logOut());
		router.replace(`/`);
	};

	const handleMyPage = () => {
		if (router.pathname.slice(0, 8) !== `/mypage/`)
			router.push(`/mypage/${uid}`);
	};

	const handleHomePage = () => {
		if (router.pathname !== "/feed") router.push(`/feed`);
	};

	return (
		<div className="header">
			<div></div>
			<div>
				<span className="logo-btn" onClick={handleHomePage}>
					Book Manager
				</span>
			</div>
			<div>
				<span className="btn-mypage" onClick={handleMyPage}>
					<img className="icon" src="/user.png" />
					<span className="text">My Page</span>
				</span>
				<span className="border-line"></span>
				<button className="btn" onClick={handleLogOut}>
					log out
				</button>
			</div>
			<style jsx>
				{`
					.header {
						display: grid;
						grid-auto-flow: column;
						grid-template-columns: 1fr 5fr 1fr;
						padding: 30px 20px 20px 20px;
						text-align: center;
					}

					.logo-btn {
						color: midnightblue;
						font-size: 32px;
						font-weight: bold;
						font-family: inherit;
						cursor: pointer;
					}

					.btn-mypage {
						color: midnightblue;
						font-size: 18px;
						line-height: 1.75em;
						letter-spacing: -0.05em;
						cursor: pointer;
					}

					.icon {
						vertical-align: middle;
						width: 38px;
						display: inline-block;
					}

					.text {
						margin-left: 10px;
						font-weight: 600;
					}

					.btn {
						display: inline-block;
						background-color: white;
						text-decoration: none;
						color: midnightblue;
						font-size: 18px;
						font-weight: 600;
						font-family: inherit;
						padding: 0px;
						line-height: 1.75em;
						border: none;
						letter-spacing: -0.05em;
						cursor: pointer;
					}

					.border-line {
						border-right: 1px solid #dadde1;
						margin: 13px;
					}
				`}
			</style>
		</div>
	);
};

export default Header;
