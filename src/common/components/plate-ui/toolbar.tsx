import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cn, withCn, withRef, withVariants } from "@udecode/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Separator } from "./separator";
import { withTooltip } from "./tooltip";

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  "relative flex select-none items-center gap-1 bg-background",
);

export const ToolbarToggleGroup = withCn(
  ToolbarPrimitive.ToolbarToggleGroup,
  "flex items-center",
);

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  "font-medium underline underline-offset-4",
);

export const ToolbarSeparator = withCn(
  ToolbarPrimitive.Separator,
  "my-1 w-[1px] shrink-0 bg-border",
);

const toolbarButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "[&_svg:not([data-icon])]:h-4 [&_svg:not([data-icon])]:w-4",
  ),
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-muted hover:text-foreground aria-checked:bg-accent aria-checked:text-accent-foreground [&>svg]:aria-checked:stroke-[3]",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-4",
        lg: "h-11 px-5",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

const ToolbarButton = withTooltip(
  React.forwardRef<
    React.ElementRef<typeof ToolbarToggleItem>,
    Omit<
      React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
      "asChild" | "value"
    > &
      VariantProps<typeof toolbarButtonVariants> & {
        pressed?: boolean;
        isDropdown?: boolean;
      }
  >(
    (
      { className, variant, size, isDropdown, children, pressed, ...props },
      ref,
    ) => {
      return typeof pressed === "boolean" ? (
        <ToolbarToggleGroup
          type="single"
          value="single"
          disabled={props.disabled}
        >
          <ToolbarToggleItem
            ref={ref}
            className={cn(
              toolbarButtonVariants({
                variant,
                size,
              }),
              isDropdown && "my-1 justify-between pr-3",
              className,
            )}
            value={pressed ? "single" : ""}
            {...props}
          >
            {isDropdown ? (
              <>
                <div className="flex flex-1 items-center">{children}</div>
                <div>
                  <ChevronDownIcon
                    className="ml-2 h-4 w-4"
                    data-icon
                  />
                </div>
              </>
            ) : (
              children
            )}
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      ) : (
        <ToolbarPrimitive.Button
          ref={ref}
          className={cn(
            toolbarButtonVariants({
              variant,
              size,
            }),
            isDropdown && "pr-3",
            className,
          )}
          {...props}
        >
          {children}
        </ToolbarPrimitive.Button>
      );
    },
  ),
);
ToolbarButton.displayName = "ToolbarButton";
export { ToolbarButton };

export const ToolbarToggleItem = withVariants(
  ToolbarPrimitive.ToggleItem,
  toolbarButtonVariants,
  ["variant", "size"],
);

export const ToolbarGroup = withRef<
  "div",
  {
    noSeparator?: boolean;
  }
>(({ className, children, noSeparator }, ref) => {
  const childArr = React.Children.map(children, (c) => c);
  if (!childArr || childArr.length === 0) return null;

  return (
    <div
      ref={ref}
      className={cn("flex", className)}
    >
      {!noSeparator && (
        <div className="flex h-full items-center px-2 py-3">
          <Separator orientation="vertical" />
        </div>
      )}

      <div className="mx-1 flex items-center gap-1">{children}</div>
    </div>
  );
});
