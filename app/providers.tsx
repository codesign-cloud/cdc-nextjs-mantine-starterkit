'use client';

import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
	children: ReactNode;
	session: any;
}

export function Providers({ children, session }: ProvidersProps) {
	return (
		<SessionProvider session={session}>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				{children}
			</MantineProvider>
		</SessionProvider>
	);
}
