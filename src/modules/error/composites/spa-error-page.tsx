import { BackButton } from "@/modules/error/components/back-button";
import ErrorSection from "@/modules/error/components/error-section";

import {
	BombIcon,
	CoffeeIcon,
	OrigamiIcon,
	PawPrintIcon,
	SnailIcon,
} from "lucide-react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RootBoundary() {
	const error = useRouteError();
	const display = {
		title: "Internal Server Error",
		description:
			"Looks there's been a problem on our end. Sit tight! We'll get this fixed as soon as possible.",
		icon: BombIcon,
	};

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			display.title = "Page Not Found";
			display.icon = PawPrintIcon;
			display.description =
				"Looks like you have stumbled across a page that does not exist in our universe.";
		}

		if (error.status === 401) {
			display.title = "Unauthorized";
			display.icon = OrigamiIcon;
			display.description =
				"You aren't authorized or your don't have the permission to see this.";
		}

		if (error.status === 503) {
			display.title = "Service Unavailable";
			display.icon = SnailIcon;
			display.description =
				"Looks like our API is down. Please sit tight while we get this fixed.";
		}

		if (error.status === 418) {
			display.title = "I am a Teapot";
			display.icon = CoffeeIcon;
			display.description =
				"Even though you would like some coffee, but I am just a teapot.";
		}
	}

	return (
		<ErrorSection
			img={<display.icon size={96} strokeWidth={2} className="mb-6" />}
			title={display.title}
			description={display.description}
			action={<BackButton className="mt-6" />}
		/>
	);
}
