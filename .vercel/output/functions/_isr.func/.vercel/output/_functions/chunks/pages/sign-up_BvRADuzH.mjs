import { a as Button, c as cn, b as buttonVariants, $ as $$RootLayout } from './404_BiPPFQJ1.mjs';
import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent } from '../astro_DAY-Qhva.mjs';
import { a as Muted, $ as $$AuthLayout } from './confirm-email_j_M3I0Wp.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { q as queryInstance, b as queryClient } from './__0HWJhrTK.mjs';
import { useMutation } from '@tanstack/react-query';
import { s as signIn } from './sign-in_BBsyJnFF.mjs';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from './forgot-password_EQuyCvKb.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const authKeys = {
  all: ["auth"],
  operations: () => [...authKeys.all, "operation"],
  operation: (operator) => [...authKeys.operations(), operator]
};

async function postSignUp(signUpRequest) {
  return queryInstance.post("/auth/sign-up", signUpRequest);
}

function useSignUp() {
  return useMutation(
    {
      mutationKey: authKeys.operation("sign-up"),
      mutationFn: async (signUpRequest) => {
        try {
          await postSignUp(signUpRequest);
        } catch (err) {
          if (err instanceof AxiosError) {
            toast.error(
              err.response?.status === 409 ? "Account Already Exist" : "Sign Up Error",
              {
                closeButton: true,
                duration: 10 * 1e3,
                description: err.response?.status === 409 ? "There is an account that already exist with the email. Please input another one." : "There was a technical problem while creating your account. Please try again later."
              }
            );
          }
        }
        return await signIn("credentials", {
          redirect: false,
          callbackUrl: "/auth/sign-up",
          ...signUpRequest
        });
      }
    },
    queryClient
  );
}

const SignUpFormSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name"),
  lastName: z.string().trim().min(1, "Enter your last name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, {
    message: "Enter at least 8 characters password"
  })
});
function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });
  const [isPasswordShowed, setShowPassword] = useState(false);
  const { mutate: signUp } = useSignUp();
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
    "form",
    {
      method: "POST",
      onSubmit: form.handleSubmit((values) => signUp(values)),
      className: "w-full space-y-2",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex w-full items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "firstName",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { className: "font-semibold", children: "First Name" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: "e. g. John",
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
              name: "lastName",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { className: "font-semibold", children: "Last Name" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: "e.g. Doe",
                    ...field
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, { className: "ml-4 list-item text-xs font-semibold" })
              ] })
            }
          )
        ] }),
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
        /* @__PURE__ */ jsxs(Muted, { className: "text-center", children: [
          "Already have an account?",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/auth/sign-in",
              className: cn(
                buttonVariants({ size: "sm", variant: "link" }),
                "font-bold"
              ),
              children: "Sign In"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full rounded-md font-bold",
            children: "Sign Up"
          }
        )
      ]
    }
  ) });
}

const $$Astro = createAstro();
const $$SignUp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SignUp;
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Le-Insight | Sign Up" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthLayout", $$AuthLayout, { "title": "Sign Up", "description": "Let's get started by enter some credential information below." }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SignUpForm", SignUpForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/modules/auth/components/sign-up-form", "client:component-export": "default" })} ` })} ` })}`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/sign-up.astro", void 0);

const $$file = "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/sign-up.astro";
const $$url = "/auth/sign-up";

export { $$SignUp as default, $$file as file, $$url as url };
