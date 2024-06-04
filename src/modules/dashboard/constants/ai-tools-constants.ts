import { AiToneEnumSchema } from "@/common/types/ai-tone-type";
import {
	ArrowLeftFromLineIcon,
	ArrowRightFromLineIcon,
	BabyIcon,
	BriefcaseBusinessIcon,
	DramaIcon,
	FeatherIcon,
	GraduationCapIcon,
	HandMetalIcon,
	HandshakeIcon,
	HeartCrackIcon,
	InfoIcon,
	LaughIcon,
	LightbulbIcon,
	MergeIcon,
	MessageCircleIcon,
	MicVocalIcon,
	PencilLineIcon,
	ScissorsLineDashedIcon,
	SmilePlusIcon,
	SpellCheckIcon,
	TargetIcon,
} from "lucide-react";

export const AIEnhanceTools = [
	{ icon: MergeIcon, label: "Simplify", path: "/simplify" },
	{ icon: SpellCheckIcon, label: "Fix Spellings & Grammar", path: "/grammar" },
	{ icon: ArrowRightFromLineIcon, label: "Lengthen", path: "/lengthen" },
	{ icon: ArrowLeftFromLineIcon, label: "Shorten", path: "/shorten" },
	{ icon: ScissorsLineDashedIcon, label: "TL;DR", path: "/tldr" },
	{ icon: SmilePlusIcon, label: "Emojify", path: "/emojify" },
	{ icon: PencilLineIcon, label: "Auto Complete", path: "/complete" },
];

export const AiToneTools = [
	{
		label: AiToneEnumSchema.Enum.academic,
		icon: GraduationCapIcon,
	},
	{
		label: AiToneEnumSchema.Enum.business,
		icon: BriefcaseBusinessIcon,
	},
	{
		label: AiToneEnumSchema.Enum.casual,
		icon: HandMetalIcon,
	},
	{
		label: AiToneEnumSchema.Enum.childfriendly,
		icon: BabyIcon,
	},
	{
		label: AiToneEnumSchema.Enum.conversational,
		icon: MessageCircleIcon,
	},
	{
		label: AiToneEnumSchema.Enum.emotional,
		icon: HeartCrackIcon,
	},
	{
		label: AiToneEnumSchema.Enum.humorous,
		icon: DramaIcon,
	},
	{
		label: AiToneEnumSchema.Enum.informative,
		icon: InfoIcon,
	},
	{
		label: AiToneEnumSchema.Enum.inspirational,
		icon: LightbulbIcon,
	},
	{
		label: AiToneEnumSchema.Enum.memeified,
		icon: LaughIcon,
	},
	{
		label: AiToneEnumSchema.Enum.narrative,
		icon: MicVocalIcon,
	},
	{
		label: AiToneEnumSchema.Enum.objective,
		icon: TargetIcon,
	},
	{
		label: AiToneEnumSchema.Enum.persuasive,
		icon: HandshakeIcon,
	},
	{
		label: AiToneEnumSchema.Enum.poetic,
		icon: FeatherIcon,
	},
];
