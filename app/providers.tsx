'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
	children: ReactNode;
}
import { MantineProvider } from '@mantine/core';

export function Providers({ children }: ProvidersProps, session) {
	return (
		<SessionProvider session={session}>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			{children}
		</MantineProvider>
		</SessionProvider>
	);
}
