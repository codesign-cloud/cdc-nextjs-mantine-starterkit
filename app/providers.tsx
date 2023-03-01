'use client';

import React, { ReactNode } from 'react';

interface ProvidersProps {
	children: ReactNode;
}
import { MantineProvider } from '@mantine/core';

export function Providers({ children }: ProvidersProps) {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			{children}
		</MantineProvider>
	);
}
