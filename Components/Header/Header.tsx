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
			<div className="bar">
				<button className="btn-nickname" onClick={handleMyPage}>
					{nickname}
				</button>
				<span className="border-line"></span>
				<button className="btn" onClick={handleLogOut}>
					log out
				</button>
			</div>
			<div className="logo">
				<span className="logo-btn" onClick={handleHomePage}>
					Book Manager
				</span>
			</div>
			<style jsx>
				{`
					a {
						text-decoration: none;
						color: midnightblue;
						font-size: 17px;
						font-weight: bold;
						font-family: inherit;
						line-height: 1.75em;
						letter-spacing: -0.05em;
					}

					.logo {
						text-align: center;
					}

					.logo-btn {
						color: midnightblue;
						font-size: 32px;
						font-weight: bold;
						font-family: inherit;
						cursor: pointer;
					}

					.bar {
						display: inline-block;
					}

					.header {
						height: 100px;
						padding: 20px;
						padding-left: 30px;
						padding-right: 30px;
						text-align: end;
						border-top: 1px solid darkblue;
						border-bottom: 2px solid darkblue;
					}

					.btn-nickname {
						display: inline-block;
						background-color: white;
						text-decoration: none;
						color: midnightblue;
						font-size: 18px;
						font-weight: bold;
						font-family: inherit;
						padding: 0px;
						line-height: 1.75em;
						border: none;
						letter-spacing: -0.05em;
						cursor: pointer;
					}

					.btn {
						display: inline-block;
						background-color: white;
						text-decoration: none;
						color: midnightblue;
						font-size: 18px;
						font-weight: bold;
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
