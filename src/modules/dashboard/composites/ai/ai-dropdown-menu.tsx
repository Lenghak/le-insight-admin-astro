import { AiToneTools } from "@dashboard/constants/ai-tools-constants";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	useOpenState,
} from "@plate-ui/dropdown-menu";
import { ToolbarButton } from "@plate-ui/toolbar";
import type { DropdownMenuProps as PrimitiveDropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "@udecode/cn";
// import { useEditorRef } from "@udecode/plate-common";
import { Small } from "@ui/small";
import {
	ArrowLeftFromLineIcon,
	ArrowRightFromLineIcon,
	MergeIcon,
	PencilLineIcon,
	ScissorsLineDashedIcon,
	SmilePlusIcon,
	SparklesIcon,
	SpeechIcon,
	SpellCheckIcon,
} from "lucide-react";
import { useId } from "react";

interface DropdownMenuProps extends PrimitiveDropdownMenuProps {
	triggerClassName?: string;
	isDropdown?: boolean;
	trigger?: React.ReactNode;
}

export function AiDropdownMenu({ trigger, ...props }: DropdownMenuProps) {
	// const editor = useEditorRef();
	const openState = useOpenState();

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				{trigger ?? (
					<ToolbarButton
						className={cn(
							props.triggerClassName,
							"text-orange-600 hover:bg-orange-600/10 hover:text-orange-600 flex items-center gap-4 focus-visible:ring-orange-500",
						)}
						pressed={openState.open}
						tooltip="AI Tools"
						isDropdown={props.isDropdown ?? true}
					>
						<SparklesIcon className="size-4 mr-4" />
						<Small className="font-bold">AI Tools</Small>
					</ToolbarButton>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64 relative font-semibold">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<MergeIcon className="mr-4 h-4 w-4" />
						<span>Simplify</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SpellCheckIcon className="mr-4 h-4 w-4" />
						<span>Fix Spellings & Grammar</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ArrowRightFromLineIcon className="mr-4 h-4 w-4" />
						<span>Lengthen</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ArrowLeftFromLineIcon className="mr-4 h-4 w-4" />
						<span>Shorten</span>
					</DropdownMenuItem>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<SpeechIcon className="mr-4 h-4 w-4" />
							<span>Adjust Tones</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent className="font-semibold">
								{AiToneTools.map((tone) => (
									<DropdownMenuItem key={useId()}>
										<tone.icon className="mr-4 h-4 w-4" />
										<span className="capitalize">{tone.label}</span>
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<DropdownMenuItem>
						<ScissorsLineDashedIcon className="mr-4 h-4 w-4" />
						<span>TL;DR</span>
					</DropdownMenuItem>

					<DropdownMenuItem>
						<SmilePlusIcon className="mr-4 h-4 w-4" />
						<span>Emojify</span>
					</DropdownMenuItem>

					<DropdownMenuItem>
						<PencilLineIcon className="mr-4 h-4 w-4" />
						<span>Auto Complete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
