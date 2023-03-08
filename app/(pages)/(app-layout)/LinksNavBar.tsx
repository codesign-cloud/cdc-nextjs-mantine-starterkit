"use client";

import { useState } from 'react';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';
import {Box, NavLink, rem} from '@mantine/core';

const configNavBarLinks = {
	width: '100%', // css string or px. value as integer
	iconSize: 16, // px
	iconStrokeWidth: 1.5, // px
	variant: 'filled', // filled, subtle, light
}

const data = [
	{ icon: IconGauge, label: 'Dashboard', description: 'Item with description' },
	{
		icon: IconFingerprint,
		label: 'Security',
		rightSection: <IconChevronRight size={rem(14)} stroke={1.5} />,
	},
	{ icon: IconActivity, label: 'Activity' },
];

export default function LinksNavBar() {

	const [active, setActive] = useState(0);

	const items = data.map((item, index) => (
		<NavLink
			key={item.label}
			active={index === active}
			label={item.label}
			description={item.description}
			rightSection={item.rightSection}
			icon={<item.icon size={rem(configNavBarLinks.iconSize)} stroke={configNavBarLinks.iconStrokeWidth} />}
			onClick={() => setActive(index)}
			// @ts-ignore
			variant={configNavBarLinks.variant}
		/>
	));

	return <Box sx={{ width: configNavBarLinks.width }}>
		{/* Looped */}
		{items}

		{/* Trial */}
		{ [1,2,3,4,5,6,7,8,9,10].map((item, index) => (
			<NavLink
				label={`Link ${index+1}`}
				icon={<IconFingerprint size={rem(16)} stroke={1.5} />}
				childrenOffset={32}
				defaultOpened={false}
				variant="light"
				key={index}
			>
				<NavLink label="First child link" />
				<NavLink label="Second child link" />
				<NavLink label={`Third child link ${index+1}`} />
			</NavLink>
		)) }

	</Box>;

}
