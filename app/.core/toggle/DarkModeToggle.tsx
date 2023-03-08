import {IconMoonStars, IconSun} from "@tabler/icons-react";
import {ActionIcon, rem, Switch, useMantineColorScheme, useMantineTheme} from "@mantine/core";

export default function DarkModeToggle(props:any) {

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const theme = useMantineTheme();

	const { type } = props;

	return (
		type === "switch" ?
			<Switch
				size="md"
				color={dark ? 'gray' : 'dark'}
				onClick={() => toggleColorScheme()}
				onLabel={<IconSun size={rem(16)} stroke={2.5} color={theme.colors.yellow[4]} />}
				offLabel={<IconMoonStars size={rem(16)} stroke={2.5} color={theme.colors.blue[6]} />}
			/>
			:
			<ActionIcon
				variant="outline"
				color={dark ? 'yellow' : 'blue'}
				onClick={() => toggleColorScheme()}
				title="Toggle color scheme"
			>
				{dark ? <IconSun size={rem(18)} /> : <IconMoonStars size={rem(18)} />}
			</ActionIcon>
	)
}
