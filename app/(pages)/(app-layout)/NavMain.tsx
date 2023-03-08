"use client";

import React, {useEffect, useState} from "react"
import {
	AppShell,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Navbar,
	ScrollArea,
	Box,
	useMantineTheme,
	Blockquote, createStyles, Stepper, Button, Group
} from '@mantine/core';
import {Logo} from "@/app/components/branding/logo";


const configLayout = {
	header: true,
	navBarLogo: false,
	productSwitcher: false,
	aside: false,
	footer: false,
}

export function NavMain(props:any) {

	const theme = useMantineTheme();
	const { classes } = useStyles();

	const [opened, setOpened] = useState(false);
	const [hasOtherProducts, setHasOtherProducts] = useState(configLayout.productSwitcher);

	const navBarHeight = configLayout?.header ? 'calc(100vh - 60px)' : '100vh';
	return (<>
		<Navbar className={classes.navbar} height={navBarHeight} p="xs" width={{ base: 300 }}>

			{/* Logo */}
			{ configLayout.navBarLogo ?
				<Navbar.Section mt="xs" mb="sm">
					<Logo size={36} darkModeSwitcher={true} />
				</Navbar.Section> : <></>
			}

			{/* Product Switcher */}
			{ hasOtherProducts ?
				<Navbar.Section className={`${classes.sectionBreakMargin} ${(!configLayout.navBarLogo)?classes.noTopBorder:''}`}>
					<ProductSwitcher />
				</Navbar.Section>
				: <></>
			}

			<Navbar.Section mt="xs" mb="md">
				<SearchInput />
			</Navbar.Section>

			<Navbar.Section grow component={ScrollArea} mx="-xs" px="xs" scrollbarSize={11} scrollHideDelay={250}>
				<LinksNavBar />
			</Navbar.Section>

			{/* NavBar footer area */}
			<Navbar.Section>
				<UserInNavBar />
			</Navbar.Section>

		</Navbar>
	</>);
}


const useStyles = createStyles((theme) => ({
	navbar: {
		paddingTop: 0,
	},
	sectionBreakMargin: {
		marginLeft: -theme.spacing.xs, // change xs, md, lg, xl, xxl as per NavBar padding used
		marginRight: -theme.spacing.xs,
		marginBottom: theme.spacing.xs,
		borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
		'&:not(:last-of-type)': {
			borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
		},
	},
	noTopBorder : {
		borderTop: 'none',
	}
}));
