'use client';

import React, {ReactNode} from 'react';
import {MantineProvider, ColorSchemeProvider, ColorScheme} from '@mantine/core';
import {SessionProvider} from "next-auth/react"
import {PREFIX_STORAGE_APP} from "@/app/.core/config";
import {useHotkeys, useLocalStorage} from '@mantine/hooks';

interface ProvidersProps {
	children: ReactNode;
	session: any;
}

export function Providers({ children, session }: ProvidersProps) {

	const storageKeyTheme = PREFIX_STORAGE_APP+'colorScheme';
	const isBrowser = typeof window !== 'undefined';
	const localValue = isBrowser ? localStorage.getItem(storageKeyTheme) : 'light';
	const systemTheme = (isBrowser && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';

	/* Theme switch: save to local storage */
	const [colorScheme, setColorScheme] = useLocalStorage<any>({
		key: storageKeyTheme,
		defaultValue: localValue || systemTheme,
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<SessionProvider session={session}>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider withGlobalStyles withNormalizeCSS
			                 theme={{
				                 colorScheme: colorScheme,
				                 //colors: { brand: ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82','#AD1374' ], },
				                 primaryColor: 'blue',
			                 }}
			>
				{children}
			</MantineProvider>
			</ColorSchemeProvider>
		</SessionProvider>
	);
}
