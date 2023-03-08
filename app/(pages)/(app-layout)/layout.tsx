"use client"

import AppBreadcrumbs from "@/app/(pages)/(app-layout)/AppBreadcrumbs";
import React, {useState} from "react"
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
import {HeaderDefault} from "@/app/components/headers/HeaderDefault";
import {Logo} from "@/app/components/branding/logo";
import ProductSwitcher from "@/app/(pages)/(app-layout)/ProductSwitcher";
import SearchInput from "@/app/(pages)/(app-layout)/SearchInput";
import LinksNavBar from "@/app/(pages)/(app-layout)/LinksNavBar";
import UserInNavBar from "@/app/(pages)/(app-layout)/UserInNavBar";


const configLayout = {
	header: true,
	navBarLogo: false,
	productSwitcher: false,
	aside: false,
	footer: false,
}

export default function AppLayout({children,}: {children: React.ReactNode}) {

	const theme = useMantineTheme();
	const { classes } = useStyles();

	const [opened, setOpened] = useState(false);
	const [hasOtherProducts, setHasOtherProducts] = useState(configLayout.productSwitcher);


	/* ==== Header ==== */
	const RenderHeader = () => {
		return ( configLayout?.header ? <>
					<HeaderDefault links={
						[
							{ "link": "/about", "label": "Features", links: [] },
							{
								"link": "#1",
								"label": "Learn",
								"links": [
									{ "link": "/docs", "label": "Documentation" },
									{ "link": "/resources", "label": "Resources" },
									{ "link": "/community", "label": "Community" },
									{ "link": "/blog", "label": "Blog" }
								]
							},
							{ "link": "/about", "label": "About", links: [] },
							{ "link": "/pricing", "label": "Pricing", links: [] },
							{
								"link": "#2",
								"label": "Support",
								"links": [
									{ "link": "/faq", "label": "FAQ" },
									{ "link": "/demo", "label": "Book a demo" },
									{ "link": "/forums", "label": "Forums" }
								]
							}
						]
					} />
				</> :
				<></>
		);
	}

	/* ==== Main Navigation (Left Nav) ==== */
	const RenderMainNavigation = () => {
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

	/* ==== Footer ==== */
	const RenderFooter = () => {
		return ( configLayout?.footer ? <>
				<Footer height={60} p="md">
					&copy; 2022 @thinkdj
				</Footer>
			</> : <></>
		);
	}

	/* ==== Aside: Right Sidebar ==== */
	const RenderAside = () => {
		const [active, setActive] = useState(1);
		return configLayout?.aside? <>
			<MediaQuery smallerThan="xl" styles={{ display: 'none' }}>
				<Aside p="md" hiddenBreakpoint="xl" width={{ md: 200, lg: 300, xl: 320 }}>
					<span>Application sidebar - TEMP LEFT NAV</span>
					{/*<NavbarLeft />*/}
					{/**/}
					<Stepper active={active} onStepClick={setActive} orientation="vertical">
						<Stepper.Step label="Step 1" description="Create an account" />
						<Stepper.Step label="Step 2" description="Verify email" />
						<Stepper.Step label="Step 3" description="Get full access" />
					</Stepper>
					{/**/}
				</Aside>
			</MediaQuery>
		</> : <></>
	};

	return(
		<AppShell
			padding="md" styles={(theme) => ({ main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },})}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			header= {RenderHeader()}
			navbar= {RenderMainNavigation()}
			aside = {RenderAside()}
			footer= {RenderFooter()}
		>
			{/* Your application here */}
			<ScrollArea sx={{height: '100vh'}} mx="-xs" px="xs" scrollbarSize={11} scrollHideDelay={250}>

				<AppBreadcrumbs />

				<div>
					<Blockquote cite="– Forrest Gump">
						Life is like an npm install – you never know what you are going to get.
					</Blockquote>

					{ children }

				</div>
			</ScrollArea>
		</AppShell>
	)
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
