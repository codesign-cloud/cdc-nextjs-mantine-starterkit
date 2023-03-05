"use client";

import {useEffect, useState} from "react";
import {fetchJson} from "@/app/.core/http/fetch";
import { useSession } from "next-auth/react"

interface UserProps {
	params: {
		id: string;
	}
}

export default function User({params}: UserProps) {

	const [user, setUser] = useState<any>(null);
	const { data: session, status } = useSession()

	let id = Number(params?.id??0);

	useEffect(() => {
		fetchJson(`/api/user/${id}`).then(r=>setUser(r))
	},[]);


	return (
		<div>
		<h1>Hello world, user!</h1>
			<p>URL id param = {id}</p>
			<br/>
			<h5>Public API Response</h5>
			<p>id: {user?.id??"Fetching ..."}</p>
			<p>username: {user?.username??"Fetching ..."}</p>
			<h5>Session info</h5>
			{
				status === "loading" && <p>Loading session...</p>
			}
			{
				status === "unauthenticated" && <p>Not authenticated</p>
			}
			{
				status === "authenticated" && <p>Authenticated</p>
			}
			<p>Session status: {session?.user?.name??"Not logged in"}</p>
			{ (status !== "authenticated") ? <a href="/api/auth/signin">Sign in</a> : <a href="/api/auth/signout">Sign out</a> }
		</div>
	);
}
