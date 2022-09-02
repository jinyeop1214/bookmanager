import React from "react";
import Title from "./Title";

interface layoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
	return (
		<>
			<Title />
			<div>{children}</div>
		</>
	);
};

export default Layout;
