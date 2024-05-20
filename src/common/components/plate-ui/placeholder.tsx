import { cn } from "@udecode/cn";
import {
	type PlaceholderProps,
	createNodeHOC,
	createNodesHOC,
	usePlaceholderState,
} from "@udecode/plate-common";
import { ELEMENT_H1 } from "@udecode/plate-heading";
import React from "react";

export const Placeholder = (props: PlaceholderProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { children, placeholder, nodeProps } = props;

	const { enabled } = usePlaceholderState(props);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return React.Children.map(children, (child) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return React.cloneElement(child, {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			className: child.props.className,
			nodeProps: {
				...nodeProps,
				className: cn(
					enabled &&
						"before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]",
				),
				placeholder,
			},
		});
	});
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const withPlaceholders = (components: any) =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	withPlaceholdersPrimitive(components, [
		{
			key: ELEMENT_H1,
			placeholder: "Title",
			hideOnBlur: false,
		},
	]);
