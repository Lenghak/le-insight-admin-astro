import { cn } from "@/common/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";

type Props = {
	title: React.ReactNode;
	actions?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

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
				"bg-transparent rounded-none border-0 space-y-2",
				className,
			)}
			{...props}
		>
			<CardHeader className="p-0 px-2">
				<CardTitle className="text-sm font-semibold text-muted-foreground capitalize">
					{title}
				</CardTitle>
			</CardHeader>

			<CardContent className="rounded-lg px-0">{props.children}</CardContent>

			<CardFooter>{actions}</CardFooter>
		</Card>
	);
}
