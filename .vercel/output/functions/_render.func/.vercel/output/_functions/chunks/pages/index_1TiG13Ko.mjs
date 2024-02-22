import { $ as $$RootLayout } from './404_BiPPFQJ1.mjs';
import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent } from '../astro_DAY-Qhva.mjs';
import { M as ModeToggle } from './confirm-email_j_M3I0Wp.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Le-Insight" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ModeToggle", ModeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/common/components/themes/mode-toggle", "client:component-export": "ModeToggle" })} ` })}`;
}, "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/index.astro", void 0);

const $$file = "/home/lenghak/Projects/le-insight/admin/frontend-astro/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
