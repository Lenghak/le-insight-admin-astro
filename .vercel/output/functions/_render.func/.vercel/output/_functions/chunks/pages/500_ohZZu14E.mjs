import { H as H1, P, B as BackButton, $ as $$RootLayout } from './404_BiPPFQJ1.mjs';
import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../astro_DAY-Qhva.mjs';

const $$Astro = createAstro();
const $$500 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Le-Insight | 500" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex h-screen flex-col items-center justify-center"> ${renderComponent($$result2, "H1", H1, { "className": "text-7xl underline lg:text-9xl" }, { "default": ($$result3) => renderTemplate`500` })} ${renderComponent($$result2, "P", P, { "className": "max-w-sm text-center" }, { "default": ($$result3) => renderTemplate`
Internal Server Error! Looks like there is a problem with our server. Please try again
      later.
` })} <div class="mt-8 flex flex-row items-center justify-center gap-4"> ${renderComponent($$result2, "BackButton", BackButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/modules/error/components/back-button", "client:component-export": "BackButton" })} </div> </main> ` })}`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/500.astro", void 0);

const $$file = "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/500.astro";
const $$url = "/500";

export { $$500 as default, $$file as file, $$url as url };
