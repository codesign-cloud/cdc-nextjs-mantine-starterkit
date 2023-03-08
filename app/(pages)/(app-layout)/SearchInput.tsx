import {IconSearch} from "@tabler/icons-react";
import {Code, createStyles, Box, Kbd, TextInput, Flex, Center} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	searchCode: {
		fontWeight: 700,
		fontSize: 10,
		lineHeight: 1,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
		border: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
		}`,
	},
	searchCodeKbd: {
		fontWeight: 700,
		fontSize: 10,
		display: 'flex',
		alignItems: 'center',
		lineHeight: 1,
		flexGrow: 0,
	},
}));

export default function SearchInput() {

	const {classes} = useStyles();

	const RenderKbdShortcut = () => {
		const showKbd: boolean = false;
		return (showKbd ?
				<Box className={classes.searchCodeKbd}><Kbd>Ctrl</Kbd> <Box>+</Box> <Kbd>K</Kbd></Box>
				:
				<Code className={classes.searchCode}>Ctrl + K</Code>
		);
	}

	return ( <>
			<Box>
				<TextInput
					placeholder="Search"
					size="xs"
					icon={<IconSearch size={16} stroke={2.5} />}
					rightSectionWidth={90}
					rightSection={RenderKbdShortcut()}
					styles={{ rightSection: { pointerEvents: 'none' } }}
				/>
			</Box>
		</>
	);
}
