import { Button } from "@ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@ui/command";

import { SearchIcon } from "lucide-react";
import React, { Fragment } from "react";

export function DashboardCommandMenu() {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<Fragment>
			<Button
				variant={"outline"}
				className="absolute flex w-full max-w-md items-center justify-center bg-background pr-2 opacity-0 transition-all md:opacity-100"
				onClick={() => setOpen(true)}
			>
				<div className="w-full rounded-full border-0 font-semibold text-muted-foreground placeholder:ml-12 placeholder:text-center">
					Search Le-Insight
				</div>

				<SearchIcon className="absolute left-4 h-4 w-4 text-muted-foreground" />

				<CommandShortcut className="rounded-full border bg-card p-1 px-2">
					Ctr + K
				</CommandShortcut>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				{/* <CommandTrigger /> */}
				<CommandInput
					placeholder="Type a command or search..."
					className="gap-4 px-4 font-semibold"
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup
						heading={
							<span className="font-bold text-foreground">Suggestions</span>
						}
					>
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search Emoji</CommandItem>
						<CommandItem>Calculator</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</Fragment>
	);
}
