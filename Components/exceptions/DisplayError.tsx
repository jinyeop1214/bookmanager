import React from "react";

const DisplayError = () => {
	return (
		<div className="error">
			<b>오류가 발생하였습니다. 다시 실행하여 주십시오.</b>
			<style jsx>{`
				.error {
					background-color: white;
					width: 100vw;
					height: 100vh;
					font-size: 18px;
					margin: 10px;
				}
			`}</style>
		</div>
	);
};

export default DisplayError;
