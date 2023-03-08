import {IconSelector} from "@tabler/icons-react";
import {useState} from "react";
import {UserButton} from "@/app/(pages)/(app-layout)/UserButton";

export default function ProductSwitcher() {

	const [opened, setOpened] = useState(false);

	return (<>
		<UserButton
			image={"https://i.pinimg.com/originals/b9/bb/fe/b9bbfe668f1242a633e106b397e519b9.jpg?./logo_upp.png"}
			name="Trailer Surfer"
			email="Trailers galore"
			icon={<IconSelector size={14} stroke={1.5} />}
		/>
	</>);

}
