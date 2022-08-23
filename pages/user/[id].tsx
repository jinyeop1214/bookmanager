import type { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps } from "next";
import React from "react";

const id: NextPage = ({
	params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	console.log(params);
	const id = params.id;
	console.log(id);
	return <div>{id}</div>;
};

export default id;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			params,
		},
	};
};
