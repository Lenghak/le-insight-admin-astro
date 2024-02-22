import { a as Button, c as cn, b as buttonVariants, $ as $$RootLayout } from './404_BiPPFQJ1.mjs';
import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent } from '../astro_DAY-Qhva.mjs';
import { a as Muted, $ as $$AuthLayout } from './confirm-email_j_M3I0Wp.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { z } from 'zod';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from './forgot-password_EQuyCvKb.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ProfilesSchema = z.object({
  type: z.literal("profile"),
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  image_id: z.string().uuid().nullable(),
  bio: z.string().nullable(),
  gender: z.string().nullable(),
  sex: z.enum(["male", "female", "rather not say"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

const createReponseSchema = ({
  id,
  type,
  attributes,
  relationships = z.object({}),
  included = z.array(z.NEVER),
  meta = z.object({})
}) => z.object({
  jsonapi: z.object({ version: z.string().default("1.0") }),
  meta,
  data: z.object({
    type,
    id,
    attributes,
    relationships
  }),
  included
});
const createEntitySchema = ({
  id,
  type,
  attributes
}) => z.object({
  id,
  type,
  attributes
});

const UsersSchema = z.object({
  type: z.literal("user"),
  id: z.string().uuid(),
  profile_id: z.string().uuid(),
  phone: z.string().nullable(),
  email: z.string().email(),
  role: z.string(),
  banned_until: z.string().datetime().nullable(),
  deleted_at: z.string().datetime().nullable(),
  invited_at: z.string().datetime().nullable(),
  confirmed_at: z.string().datetime().nullable(),
  confirmation_sent_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

const SignInRequestSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, {
    message: "Enter at least 8 characters password"
  })
});
createReponseSchema({
  id: UsersSchema.shape.id,
  type: UsersSchema.shape.type,
  attributes: UsersSchema.omit({ id: true, type: true }),
  included: z.array(
    createEntitySchema({
      id: ProfilesSchema.shape.id,
      type: ProfilesSchema.shape.type,
      attributes: ProfilesSchema.omit({ id: true, type: true })
    })
  ),
  meta: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  })
});

async function signIn$1(providerId, options, authorizationParams) {
  const { callbackUrl = window.location.href, redirect = true } = options ?? {};
  const { prefix = "/api/auth", ...opts } = options ?? {};
  const isCredentials = providerId === "credentials";
  const isEmail = providerId === "email";
  const isSupportingReturn = isCredentials || isEmail;
  const signInUrl = `${prefix}/${isCredentials ? "callback" : "signin"}/${providerId}`;
  const _signInUrl = `${signInUrl}?${new URLSearchParams(authorizationParams)}`;
  const csrfTokenResponse = await fetch(`${prefix}/csrf`);
  const { csrfToken } = await csrfTokenResponse.json();
  const res = await fetch(_signInUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1"
    },
    // @ts-expect-error -- ignore
    body: new URLSearchParams({
      ...opts,
      csrfToken,
      callbackUrl
    })
  });
  const data = await res.clone().json();
  const error = new URL(data.url).searchParams.get("error");
  if (redirect || !isSupportingReturn || !error) {
    window.location.href = data.url ?? callbackUrl;
    if (data.url.includes("#"))
      window.location.reload();
    return;
  }
  return res;
}

function SignInForm() {
  const form = useForm({
    resolver: zodResolver(SignInRequestSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [isPasswordShowed, setShowPassword] = useState(false);
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
    "form",
    {
      method: "POST",
      onSubmit: form.handleSubmit((values) => {
        signIn$1("credentials", {
          redirect: false,
          callbackUrl: "/auth/sign-in",
          ...values
        }).then(async (res) => {
          const json = await res?.json();
          if (json?.url?.includes("?"))
            toast.error("Invalid Credential", {
              closeButton: true,
              duration: 10 * 1e3,
              description: "The email and password are invalid. Please check and try again."
            });
        }).catch(
          (err) => toast.error(
            err instanceof AxiosError && err.response?.status === 401 ? "Invalid Credential" : "Sign In Failed",
            {
              closeButton: true,
              duration: 10 * 1e3,
              description: err instanceof AxiosError && err.response?.status === 401 ? "The email and password are invalid. Please check and try again." : "There was a technical problem while creating your account. Please try again later."
            }
          )
        );
      }),
      className: "w-full space-y-2",
      children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "email",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { className: "font-semibold", children: "Email" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "someone@example.com",
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, { className: "ml-4 list-item text-xs font-semibold" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "password",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { className: "font-semibold", children: "Password" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: "Enter a password",
                    className: "pr-12",
                    type: isPasswordShowed ? "text" : "password",
                    autoComplete: "on",
                    ...field
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    type: "button",
                    className: "absolute right-0 top-0 rounded-md hover:bg-transparent",
                    onClick: () => setShowPassword(!isPasswordShowed),
                    children: isPasswordShowed ? /* @__PURE__ */ jsx(EyeIcon, { size: 18 }) : /* @__PURE__ */ jsx(EyeOffIcon, { size: 18 })
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(FormMessage, { className: "ml-4 list-item text-xs font-semibold" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-end", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "/auth/forgot-password",
            className: cn(
              buttonVariants({
                variant: "link",
                size: "sm"
              }),
              "font-bold"
            ),
            children: "Forgot Password?"
          }
        ) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full rounded-md font-bold",
            children: "Sign In"
          }
        ),
        /* @__PURE__ */ jsxs(Muted, { className: "text-center", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/auth/sign-up",
              className: cn(
                buttonVariants({ size: "sm", variant: "link" }),
                "font-bold"
              ),
              children: "Create One"
            }
          )
        ] })
      ]
    }
  ) });
}

const $$Astro = createAstro();
const $$SignIn = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SignIn;
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Le-Insight | Sign In" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthLayout", $$AuthLayout, { "title": "Sign In", "description": "Let's get started by enter some credential information below." }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SignInForm", SignInForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/modules/auth/components/sign-in-form", "client:component-export": "default" })} ` })} ` })}`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/sign-in.astro", void 0);

const $$file = "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/sign-in.astro";
const $$url = "/auth/sign-in";

const signIn = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SignIn,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { signIn as a, signIn$1 as s };
