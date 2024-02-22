import { c as cn, a as Button, b as buttonVariants, H as H1, $ as $$RootLayout } from './404_BiPPFQJ1.mjs';
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, e as renderComponent, f as renderSlot } from '../astro_DAY-Qhva.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRight, Check, Circle, Sun, Moon, ChevronLeftIcon, DotIcon, MoveRightIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { g as getSession, a as authConfig } from './__0HWJhrTK.mjs';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked: checked ?? false,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("bg-muted -mx-1 my-1 h-px", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

function ModeToggle({ className }) {
  const [theme, setThemeState] = React.useState("theme-light");
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);
  React.useEffect(() => {
    const isDark = theme === "dark" || theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "icon",
        className,
        children: [
          /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
          /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setThemeState("theme-light"), children: "Light" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setThemeState("dark"), children: "Dark" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setThemeState("system"), children: "System" })
    ] })
  ] });
}

const Muted = forwardRef(
  ({ className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "p",
      {
        className: cn("text-sm text-muted-foreground", className),
        ...props,
        ref,
        children
      }
    );
  }
);
Muted.displayName = "Muted";

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

const $$Astro$1 = createAstro();
const $$AuthLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AuthLayout;
  const pathname = Astro2.url.pathname;
  const { title, description, className, hideSignIn } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<main${addAttribute(cn("container flex h-screen w-full flex-row items-center", className), "class")}> <section class="relative flex h-full w-full flex-col items-center justify-center"> <a${addAttribute("/auth/sign-in", "href")}${addAttribute(cn(
    buttonVariants({
      variant: "link"
    }),
    "absolute left-0 top-8 items-center gap-4 font-bold",
    pathname === "/auth/sign-in" || hideSignIn ? "hidden" : ""
  ), "class")}> ${renderComponent($$result, "ChevronLeftIcon", ChevronLeftIcon, { "size": 18 })} <span>Sign In</span> </a> ${renderComponent($$result, "ModeToggle", ModeToggle, { "className": "absolute right-8 top-8", "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/common/components/themes/mode-toggle", "client:component-export": "ModeToggle" })} <div class="flex flex-col items-center justify-center gap-6">  <div class="flex flex-col items-center justify-center gap-4"> ${renderComponent($$result, "H1", H1, {}, { "default": ($$result2) => renderTemplate`${title}` })} ${renderComponent($$result, "Muted", Muted, { "className": "max-w-xs text-center" }, { "default": ($$result2) => renderTemplate`${description}` })} </div> ${renderSlot($$result, $$slots["default"])} </div> ${renderComponent($$result, "Muted", Muted, { "className": "mt-12 max-w-xs text-center" }, { "default": ($$result2) => renderTemplate`
By continuing, you agree to our
<a${addAttribute("/terms", "href")}${addAttribute(cn(
    buttonVariants({
      size: "sm",
      variant: "link"
    }),
    "font-bold"
  ), "class")}>
Terms of Service
</a>
and our
<a${addAttribute("/privacy", "href")}${addAttribute(cn(
    buttonVariants({
      size: "sm",
      variant: "link"
    }),
    "font-bold"
  ), "class")}>
Privacy Policy
</a> ` })} </section> <section class="hidden h-full w-1/4 items-center md:flex"> <div id="auth_app_logo" class="grid h-full w-fit grid-cols-1 grid-rows-[1fr,_auto,_1fr] place-items-center items-center justify-center gap-4"> ${renderComponent($$result, "Separator", Separator, { "orientation": "vertical", "className": "h-full w-[0.031rem] bg-foreground" })} <div class="flex w-fit flex-col items-start justify-center"> ${renderComponent($$result, "DotIcon", DotIcon, { "className": "fill-foreground" })} </div> ${renderComponent($$result, "Separator", Separator, { "orientation": "vertical", "className": "h-full w-[0.031rem] bg-foreground" })} </div> </section> </main>`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/common/layouts/auth-layout.astro", void 0);

const $$Astro = createAstro();
const $$ConfirmEmail = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ConfirmEmail;
  const session = await getSession(Astro2.request, authConfig);
  if (!session?.user) {
    return Astro2.redirect("/auth/sign-in");
  }
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Le-Insight | Forgot Password" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthLayout", $$AuthLayout, { "title": "Email Verified", "description": "Thank you. Your email has been verified. Please continue to the application." }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<a href="/"${addAttribute(cn(
    buttonVariants({
      variant: "default",
      size: "lg"
    }),
    "gap-4 font-bold"
  ), "class")}> <span>Go to home</span> ${renderComponent($$result3, "MoveRightIcon", MoveRightIcon, { "className": "size-5" })} </a> ` })} ` })}`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/confirm-email.astro", void 0);

const $$file = "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/confirm-email.astro";
const $$url = "/auth/confirm-email";

const confirmEmail = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ConfirmEmail,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$AuthLayout as $, ModeToggle as M, Muted as a, confirmEmail as c };
