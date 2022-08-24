import React from "react";
import Seo from "./Seo";

interface layoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
	return (
		<>
			<Seo />
			<div>{children}</div>
		</>
	);
};

export default Layout;
