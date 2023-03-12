"use client";

import {useEffect, useState} from "react";
import {fetchJson} from "@/app/.core/http/fetch";
import { useSession } from "next-auth/react"
import Link from "next/link"

interface UserProps {
	params: {
		id?: string;
	}
}

export default function User({params}: UserProps) {

	const [user, setUser] = useState<any>(null);
	const { data: session, status } = useSession()

	let id = Number(params?.id??'0');

	useEffect(() => {
		console.log("useEffect rx id",id);
		if(!id) return;
		fetchJson(`/api/user/${id}`).then(r=>setUser(r))
	},[id]);


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
			{ (status !== "authenticated") ? <Link href="/api/auth/signin">Sign in</Link> : <Link href="/api/auth/signout">Sign out</Link> }
			<br/><br/>
			<Link href="/">Home</Link>
		</div>
	);
}
