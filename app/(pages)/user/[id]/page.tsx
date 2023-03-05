"use client";

import {useEffect, useState} from "react";
import {fetchJson} from "@/app/.core/http/fetch";

interface UserProps {
	params: {
		id: string;
	}
}

export default function User({params}: UserProps) {

	const [user, setUser] = useState<any>(null);

	let id = Number(params?.id??0);

	useEffect(() => {
		fetchJson(`/api/user/${id}`).then(r=>setUser(r))
	},[]);


	return (
		<div>
		<h1>Hello world, user!</h1>
			<p>URL id param = {id}</p>
			<br/>
			<h5>API Response</h5>
			<p>id: {user?.id??"Fetching ..."}</p>
			<p>username: {user?.username??"Fetching ..."}</p>
		</div>
	);
}
