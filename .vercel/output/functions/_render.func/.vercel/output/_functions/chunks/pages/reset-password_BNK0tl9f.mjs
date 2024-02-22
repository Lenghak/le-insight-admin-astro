import { a as Button, $ as $$RootLayout } from './404_BiPPFQJ1.mjs';
import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent } from '../astro_DAY-Qhva.mjs';
import { $ as $$AuthLayout } from './confirm-email_j_M3I0Wp.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from './forgot-password_EQuyCvKb.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ResetPasswordFormSchema = z.object({
  newPassword: z.string().min(8, {
    message: "Enter a new passowrd"
  }),
  confirmPassword: z.string().min(8, {
    message: "Enter at least 8 characters password"
  })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
  // path of error
});
function ResetPasswordForm() {
  const form = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    }
  });
  const [isPasswordShowed, setShowPassword] = useState(false);
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: form.handleSubmit((values) => console.log(values)),
      className: "flex w-full flex-col gap-4",
      children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "newPassword",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(
                FormLabel,
                {
                  className: "font-semibold",
                  htmlFor: "new-password-field",
                  children: "New Password"
                }
              ),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "new-password-field",
                    placeholder: "Enter a new password",
                    className: "pr-12",
                    type: isPasswordShowed ? "text" : "password",
                    ...field
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    type: "button",
                    className: "absolute right-0 top-0",
                    onClick: () => setShowPassword(!isPasswordShowed),
                    children: isPasswordShowed ? /* @__PURE__ */ jsx(EyeIcon, { size: 18 }) : /* @__PURE__ */ jsx(EyeOffIcon, { size: 18 })
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(FormMessage, { className: "ml-4 list-item text-xs font-semibold" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "confirmPassword",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(
                FormLabel,
                {
                  className: "font-semibold",
                  htmlFor: "confirm-new-password",
                  children: "Confirm Password"
                }
              ),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "confirm-new-password",
                    placeholder: "Re-type your password",
                    className: "pr-12",
                    type: isPasswordShowed ? "text" : "password",
                    ...field
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    type: "button",
                    className: "absolute right-0 top-0",
                    onClick: () => setShowPassword(!isPasswordShowed),
                    children: isPasswordShowed ? /* @__PURE__ */ jsx(EyeIcon, { size: 18 }) : /* @__PURE__ */ jsx(EyeOffIcon, { size: 18 })
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(FormMessage, { className: "ml-4 list-item text-xs font-semibold" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "mt-4 w-full rounded-md font-bold",
            children: "Reset Password"
          }
        )
      ]
    }
  ) });
}

const $$Astro = createAstro();
const $$ResetPassword = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ResetPassword;
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Le-Insight | Reset Password" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthLayout", $$AuthLayout, { "title": "Reset Password", "description": "Time to reset your password. Enter a new one to proceed." }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "ResetPasswordForm", ResetPasswordForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/modules/auth/components/reset-password-form", "client:component-export": "default" })} ` })} ` })}`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/reset-password.astro", void 0);

const $$file = "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/reset-password.astro";
const $$url = "/auth/reset-password";

export { $$ResetPassword as default, $$file as file, $$url as url };
