import Link from "next/link";
import React, { useState } from "react";
import { User } from "../../Interfaces";

interface headerProps {
	user: User;
	setUser: (user: User) => void;
}

const header = ({ user, setUser }: headerProps) => {
	const handleLogOut = () => {
		setUser({ isLoggedIn: false });
	};

	return (
		<div className="header">
			<div className="bar">
				{user.isLoggedIn ? (
					<button className="btn" onClick={handleLogOut}>
						log out
					</button>
				) : (
					<>
						<Link href="/login">
							<a>Log In</a>
						</Link>{" "}
						|{" "}
						<Link href="/signup">
							<a>Sign Up</a>
						</Link>
					</>
				)}
			</div>
			<div className="logo">Book Manager</div>
			<style jsx>
				{`
					a {
						text-decoration: none;
						color: midnightblue;
						font-size: 17px;
						font-weight: bold;
						font-family: "Poppins";
						line-height: 1.75em;
						letter-spacing: -0.05em;
					}

					.logo {
						color: midnightblue;
						margin-top: 10px;
						text-align: center;
						font-size: 32px;
						font-weight: bold;
						font-family: "Poppins";
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
						background-color: white;
						text-decoration: none;
						color: midnightblue;
						font-size: 16.5px;
						font-weight: bold;
						font-family: "Poppins";
						padding: 0px;
						line-height: 1.75em;
						border: none;
						letter-spacing: -0.05em;
						cursor: pointer;
					}
				`}
			</style>
		</div>
	);
};

export default header;
