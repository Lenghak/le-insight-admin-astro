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

import { AiToneEnumSchema } from "@/common/types/ai-tone-type";

export const AIEnhanceTools = [
  {
    icon: MergeIcon,
    label: "Simplify",
    path: "/simplify",
    title: "Simplifiying Content",
  },
  {
    icon: SpellCheckIcon,
    label: "Fix Spellings & Grammar",
    path: "/grammar",
    title: "Grammar & Sellings Correction",
  },
  {
    icon: ArrowRightFromLineIcon,
    label: "Lengthen",
    path: "/lengthen",
    title: "Lengthening Content",
  },
  {
    icon: ArrowLeftFromLineIcon,
    label: "Shorten",
    path: "/shorten",
    title: "Shotening Content",
  },
  {
    icon: ScissorsLineDashedIcon,
    label: "TL;DR",
    path: "/tldr",
    title: "Summzarizing - TL;DR",
  },
  {
    icon: SmilePlusIcon,
    label: "Emojify",
    path: "/emojify",
    title: "Emojifying Content",
  },
  {
    icon: PencilLineIcon,
    label: "Auto Complete",
    path: "/complete",
    title: "Auto-completing Content",
  },
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
