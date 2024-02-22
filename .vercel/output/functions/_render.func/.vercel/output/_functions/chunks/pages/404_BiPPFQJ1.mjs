import crypto from 'node:crypto';
import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent, f as renderSlot, g as renderHead, h as addAttribute, m as maybeRenderHead } from '../astro_DAY-Qhva.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { MoveLeftIcon, X } from 'lucide-react';
/* empty css                                  */
import { useTheme } from 'next-themes';
import { Toaster as Toaster$2 } from 'sonner';
import * as ToastPrimitives from '@radix-ui/react-toast';

if (!globalThis.crypto) globalThis.crypto = crypto;
if (typeof globalThis.crypto.subtle === "undefined") globalThis.crypto.subtle = crypto.webcrypto.subtle;
if (typeof globalThis.crypto.randomUUID === "undefined") globalThis.crypto.randomUUID = crypto.randomUUID;

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const H1 = forwardRef(
  ({ className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "h1",
      {
        className: cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
          className
        ),
        ...props,
        ref,
        children
      }
    );
  }
);
H1.displayName = "H1";

const P = forwardRef(
  ({ children, className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "p",
      {
        className: cn("leading-7 [&:not(:first-child)]:mt-6", className),
        ...props,
        ref,
        children
      }
    );
  }
);
P.displayName = "P";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

function BackButton() {
  return /* @__PURE__ */ jsxs(
    Button,
    {
      size: "lg",
      className: "items-center gap-2 rounded-full font-bold",
      onClick: () => history.back(),
      children: [
        /* @__PURE__ */ jsx(MoveLeftIcon, { size: 18 }),
        /* @__PURE__ */ jsx("span", { children: "Go back" })
      ]
    }
  );
}

const Toaster$1 = ({ ...props }) => {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme: theme ?? "system",
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open)
          dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(
        Toast,
        {
          ...props,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
              title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
              description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
            ] }),
            action,
            /* @__PURE__ */ jsx(ToastClose, {})
          ]
        },
        id
      );
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$RootLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RootLayout;
  return renderTemplate(_a || (_a = __template(['<script>\n  const getThemePreference = () => {\n    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {\n      return localStorage.getItem("theme");\n    }\n    return window.matchMedia("(prefers-color-scheme: dark)").matches\n      ? "dark"\n      : "light";\n  };\n  const isDark = getThemePreference() === "dark";\n  document.documentElement.classList[isDark ? "add" : "remove"]("dark");\n\n  if (typeof localStorage !== "undefined") {\n    const observer = new MutationObserver(() => {\n      const isDark = document.documentElement.classList.contains("dark");\n      localStorage.setItem("theme", isDark ? "dark" : "light");\n    });\n    observer.observe(document.documentElement, {\n      attributes: true,\n      attributeFilter: ["class"],\n    });\n  }\n<\/script> <html lang="en"> <head>', '<meta charset="utf-8"><link rel="icon" href="/svg/logo-dark.svg" media="(prefers-color-scheme: dark)" sizes="any" type="image/svg+xml"><link rel="icon" href="/svg/logo-light.svg" media="(prefers-color-scheme:light)" sizes="any" type="image/svg+xml"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>", `</title><meta name="description" content="Le-Insight is a dynamic knowledge sharing platform that serves as a hub for writers, experts, and enthusiasts to share their insights, experiences, and expertise with a global audience. With its intuitive interface and user-friendly features, Le-Insight empowers individuals to publish, discover, and engage with high-quality articles spanning a wide range of topics. Whether you're passionate about technology, business, arts, or any other subject, Le-Insight provides a vibrant community where users can explore thought-provoking content, connect with like-minded individuals, and foster meaningful discussions."><meta name="keywords" content="Article, Newsletter, Journal, Tutorial">`, "</head> <body> ", " ", " ", " </body></html>"])), renderSlot($$result, $$slots["head"]), addAttribute(Astro2.generator, "content"), Astro2.props.title, renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "SonnerToaster", Toaster$1, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/common/components/ui/sonner", "client:component-export": "Toaster" }), renderComponent($$result, "Toaster", Toaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/common/components/ui/toaster", "client:component-export": "Toaster" }));
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/common/layouts/root-layout.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Le-Insight | 404" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex h-screen flex-col items-center justify-center"> ${renderComponent($$result2, "H1", H1, { "className": "text-7xl underline lg:text-9xl" }, { "default": ($$result3) => renderTemplate`404` })} ${renderComponent($$result2, "P", P, { "className": "max-w-sm text-center" }, { "default": ($$result3) => renderTemplate`
Not Found! Looks like you have stumble across a page that does not exist
      in our universe.
` })} <div class="mt-8 flex flex-row items-center justify-center gap-4"> ${renderComponent($$result2, "BackButton", BackButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/modules/error/components/back-button", "client:component-export": "BackButton" })} </div> </main> ` })}`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/404.astro", void 0);

const $$file = "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$RootLayout as $, BackButton as B, H1 as H, P, _404 as _, Button as a, buttonVariants as b, cn as c };
