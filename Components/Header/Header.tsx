import Link from "next/link";
import React, { useState } from "react";

const header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogOut = () => {};

	return (
		<div className="Header">
			<div className="Bar">
				{isLoggedIn ? (
					<button className="logoutbtn" onClick={handleLogOut}>
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
			<div className="Logo">Book Manager</div>
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

					.Logo {
						color: midnightblue;
						margin-top: 10px;
						text-align: center;
						font-size: 32px;
						font-weight: bold;
						font-family: "Poppins";
					}

					.Bar {
						display: inline-block;
					}

					.Header {
						height: 100px;
						padding: 20px;
						padding-left: 30px;
						padding-right: 30px;
						text-align: end;
						border-top: 1px solid darkblue;
						border-bottom: 2px solid darkblue;
					}

					.logoutbtn {
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
