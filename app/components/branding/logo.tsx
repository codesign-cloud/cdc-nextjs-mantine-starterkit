import React from "react";
import {Flex,Group,Title,Image} from "@mantine/core";
import DarkModeToggle from "@/app/.core/toggle/DarkModeToggle";
import {APP_CONFIG} from "@/app/.core/config";

export function Logo(props: any) {

	const { size, darkModeSwitcher } = props;
	const minimumWidth = 279;

	return (
		<>
			<Flex justify="space-between" align="center" direction="row" wrap="nowrap" sx={{minWidth:minimumWidth}}>
				<Group spacing="xs">
					<Image src={'/logo.png'} alt={''} width={size??32} height={size??32} radius={4} fit="contain" />
					<Title order={4}>{APP_CONFIG?.appName??'CDC Starter Kit'}</Title>
				</Group>
				{ darkModeSwitcher ? <DarkModeToggle type="switch"/> : <></> }
			</Flex>
		</>
	)
}
