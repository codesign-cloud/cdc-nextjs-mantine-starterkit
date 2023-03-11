"use client"

import { Breadcrumbs, Space, Anchor } from '@mantine/core';
import {useRouter} from "next/navigation";
import React from 'react';

/* Ref == https://stackoverflow.com/a/67767054/849829 */
type Crumb = {
	link: string;
	route: string;
	label: string;
};

const RouteLabelMap = {
	"/": "Home",
	//"/admin": "Admin/Editor",
	"/movie/[movie_id]": "Movie",
	"/profile/[barrel_id]/settings": "Settings",
};

/* Crumbs output
* [ {"link":"/","route":"/","label":"Home"},
*   {"link":"/admin","route":"/admin","label":"Admin/Editor"} ]
*/
export default function AppBreadcrumbs() {

	const [crumbs, setCrumbs] = React.useState<Crumb[]>([]);

	const router = useRouter();
	React.useEffect(() => {
		// @ts-ignore
		const segmentsPath = router?.asPath?.split("/");
		// @ts-ignore
		const segmentsRoute = router?.route?.split("/");
		const crumbLinks = CombineCumulatively(segmentsPath);
		const crumbLabels = CombineCumulatively(segmentsRoute);

		const crumbs = crumbLinks?.map((link:string, index:number) => {
			const route = crumbLabels[index];
			console.log(`route`,route)
			const crumb = {
				link: link,
				route: route,
				// @ts-ignore
				label: RouteLabelMap[route] || humanizeRoute(route),
			};
			return crumb;
		});
		setCrumbs(crumbs);

		console.log({
			router,
			segmentsPath,
			segmentsRoute,
			crumbLinks,
			crumbLabels,
			crumbs,
		});
	// @ts-ignore
	}, [router.route]);

	return (
		<>
			<Space h="xs" />
			{/*<Breadcrumbs separator="\">{items}</Breadcrumbs>*/}
			<Breadcrumbs separator="\">{crumbs?.map((c:any,i:number)=>{
				return <Anchor href={c.link} key={i}>
					{c.label}
				</Anchor>
			})}</Breadcrumbs>
		</>
	);
}


function humanizeRoute(route:string) {
	/* route samples = `/`, `/admin` */
	// Replace / and capitalize first letter
	if (!route) return "";
	return route.replace("/", "").charAt(0).toUpperCase() + route.replace("/", "")?.slice(1);
}

function CombineCumulatively(segments: string[]) {
	if (!segments) return [];
	/*
	when segments = ['1','2','3']
	returns ['1','1/2','1/2/3']
	*/
	const links = segments.reduce((acc: string[], cur: string, curIndex: number) => {
		const last = curIndex > 1 ? acc[curIndex - 1] : "";
		const newPath = last + "/" + cur;
		acc.push(newPath);
		return acc;
	}, []);
	return links;
}
