import { c as cn, a as Button, $ as $$RootLayout } from './404_BiPPFQJ1.mjs';
import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent } from '../astro_DAY-Qhva.mjs';
import { $ as $$AuthLayout } from './confirm-email_j_M3I0Wp.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useFormContext, FormProvider, Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("space-y-2", className),
      ...props
    }
  ) });
});
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-destructive text-sm font-medium", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const ForgotPasswordFormSchema = z.object({
  email: z.string().email("Enter a valid email address")
});
function ForgotPasswordForm() {
  const form = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: ""
    }
  });
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: form.handleSubmit((values) => console.log(values)),
      className: "w-full space-y-4",
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
                  placeholder: "Enter email address",
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, { className: "ml-4 list-item text-xs font-semibold" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full rounded-md font-bold",
            children: "Send Link to Email"
          }
        )
      ]
    }
  ) });
}

const $$Astro = createAstro();
const $$ForgotPassword = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ForgotPassword;
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Le-Insight | Forgot Password" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthLayout", $$AuthLayout, { "title": "Forgot Password", "description": "Fill in the field to reset the password. The reset password link will be sent to the email." }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "ForgotPasswordForm", ForgotPasswordForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/modules/auth/components/forgot-password-form", "client:component-export": "default" })} ` })} ` })}`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/forgot-password.astro", void 0);

const $$file = "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/auth/forgot-password.astro";
const $$url = "/auth/forgot-password";

const forgotPassword = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ForgotPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Form as F, Input as I, FormField as a, FormItem as b, FormLabel as c, FormControl as d, FormMessage as e, forgotPassword as f };
