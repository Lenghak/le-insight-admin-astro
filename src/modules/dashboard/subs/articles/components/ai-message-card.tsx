import { cn } from "@/common/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";

type Props = {
	title: React.ReactNode;
	actions?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

export default function AiMessageCard({
	content,
	title,
	actions,
	className,
	...props
}: Props) {
	return (
		<Card
			className={cn(
				"bg-transparent rounded-none border-0 space-y-2 shadow-none font-serif p-0",
				className,
			)}
			{...props}
		>
			<CardHeader className="p-0 px-2 w-fit">
				<CardTitle className="text-sm font-semibold text-muted-foreground capitalize w-fit">
					{title}
				</CardTitle>
			</CardHeader>

			<CardContent className="rounded-3xl p-0 w-fit">
				{props.children}
			</CardContent>

			<CardFooter className="flex items-center p-0 w-full">
				{actions}
			</CardFooter>
		</Card>
	);
}
