import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut, selectUser, useAppSelector } from "../../store/reducers/user";

const header = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { isLoggedIn, id, nickname } = useAppSelector(selectUser);

	const handleLogOut = () => {
		dispatch(logOut());
		router.replace(`/`);
	};

	return (
		<div className="header">
			<div className="bar">
				{/* {user.isLoggedIn ? ( */}
				<button className="btn">{nickname}</button>
				<span className="border-line"></span>
				<button className="btn" onClick={handleLogOut}>
					log out
				</button>
				{/* ) : (
					<>
						<Link href="/login">
							<a>Log In</a>
						</Link>{" "}
						|{" "}
						<Link href="/signup">
							<a>Sign Up</a>
						</Link>
					</>
				)} */}
			</div>
			<div className="logo">Book Manager</div>
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
						color: midnightblue;
						margin-top: 10px;
						text-align: center;
						font-size: 32px;
						font-weight: bold;
						font-family: inherit;
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

					.btn {
						display: inline-block;
						background-color: white;
						text-decoration: none;
						color: midnightblue;
						font-size: 16.5px;
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

export default header;
