import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={(theme as ToasterProps["theme"]) ?? "system"}
			className="toaster group"
			closeButton={false}
			toastOptions={{
				classNames: {
					default:
						"bg-default group toast text-sm text-foreground border-primary rounded-xl",
					warning: "warning group toast group-[.toaster]:border-warning",
					info: "informative group toast group-[.toaster]:border-informative",
					success: "successive group toast group-[.toaster]:border-successive",
					error: "destructive group toast group-[.toaster]:border-destructive",
					toast:
						"group toast group-[.toaster]:bg-primary group-[.toaster]:text-primary-foreground group-[.toaster]:border-0 group-[.toaster]:shadow-lg group-[.toaster]:font-sans",
					description:
						"group-[.toast]:text-muted-foreground group-[.toast]:font-semibold",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton: "group-[.toast]:bg-muted group-[.toast]:!text-primary",
					title: "group-[.toast]:font-bold",
					closeButton:
						"group-[.toaster]:left-[97.5%] group-[.toaster]:bg-card group-[.toaster]:border-2 [&>svg]:stroke-[3] [&>svg]:text-foreground group-[.successive]:border-primary group-[.warning]:border-primary group-[.informative]:border-primary group-[.destructive]:border-primary",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
