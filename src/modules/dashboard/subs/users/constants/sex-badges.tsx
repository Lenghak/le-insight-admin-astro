import { Badge } from "@/common/components/ui/badge";

export const sexesBages = {
	MALE: (
		<Badge variant={"dot"} colored={"cyan"} className="font-bold uppercase">
			Male
		</Badge>
	),
	FEMALE: (
		<Badge variant={"dot"} colored={"pink"} className="font-bold uppercase">
			Female
		</Badge>
	),
	RNTS: (
		<Badge variant={"dot"} colored={"purple"} className="font-bold uppercase">
			Hidden
		</Badge>
	),
};
