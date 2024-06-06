import { cn } from "@/common/lib/utils";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";

type Props = {
  title: React.ReactNode;
  actions?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

export default function AiMessageCard({
  title,
  actions,
  className,
  ...props
}: Props) {
  return (
    <Card
      className={cn(
        "space-y-2 rounded-none border-0 bg-transparent p-0 font-serif shadow-none",
        className,
      )}
      {...props}
    >
      <CardHeader className="w-fit p-0 px-2">
        <CardTitle className="w-fit text-sm font-semibold capitalize">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="w-fit rounded-3xl p-0">
        {props.children}
      </CardContent>

      <CardFooter className="flex w-full items-center p-0">
        {actions}
      </CardFooter>
    </Card>
  );
}
