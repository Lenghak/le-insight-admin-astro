import{r as h}from"./index.BdjtwOc4.js";function V(){return V=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},V.apply(this,arguments)}function pe(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function ne(...e){return t=>e.forEach(r=>pe(r,t))}function Ye(...e){return h.useCallback(ne(...e),e)}const fe=h.forwardRef((e,t)=>{const{children:r,...o}=e,i=h.Children.toArray(r),n=i.find(ge);if(n){const s=n.props.children,a=i.map(u=>u===n?h.Children.count(s)>1?h.Children.only(null):h.isValidElement(s)?s.props.children:null:u);return h.createElement(B,V({},o,{ref:t}),h.isValidElement(s)?h.cloneElement(s,void 0,a):null)}return h.createElement(B,V({},o,{ref:t}),r)});fe.displayName="Slot";const B=h.forwardRef((e,t)=>{const{children:r,...o}=e;return h.isValidElement(r)?h.cloneElement(r,{...me(o,r.props),ref:t?ne(t,r.ref):r.ref}):h.Children.count(r)>1?h.Children.only(null):null});B.displayName="SlotClone";const be=({children:e})=>h.createElement(h.Fragment,null,e);function ge(e){return h.isValidElement(e)&&e.type===be}function me(e,t){const r={...t};for(const o in t){const i=e[o],n=t[o];/^on[A-Z]/.test(o)?i&&n?r[o]=(...a)=>{n(...a),i(...a)}:i&&(r[o]=i):o==="style"?r[o]={...i,...n}:o==="className"&&(r[o]=[i,n].filter(Boolean).join(" "))}return{...e,...r}}function se(e){var t,r,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=se(e[t]))&&(o&&(o+=" "),o+=r);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function he(){for(var e,t,r=0,o="";r<arguments.length;)(e=arguments[r++])&&(t=se(e))&&(o&&(o+=" "),o+=t);return o}const ee=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,re=he,De=(e,t)=>r=>{var o;if(t?.variants==null)return re(e,r?.class,r?.className);const{variants:i,defaultVariants:n}=t,s=Object.keys(i).map(c=>{const d=r?.[c],b=n?.[c];if(d===null)return null;const y=ee(d)||ee(b);return i[c][y]}),a=r&&Object.entries(r).reduce((c,d)=>{let[b,y]=d;return y===void 0||(c[b]=y),c},{}),u=t==null||(o=t.compoundVariants)===null||o===void 0?void 0:o.reduce((c,d)=>{let{class:b,className:y,...x}=d;return Object.entries(x).every(C=>{let[g,m]=C;return Array.isArray(m)?m.includes({...n,...a}[g]):{...n,...a}[g]===m})?[...c,b,y]:c},[]);return re(e,s,u,r?.class,r?.className)};function ie(e){var t,r,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(r=ie(e[t]))&&(o&&(o+=" "),o+=r)}else for(r in e)e[r]&&(o&&(o+=" "),o+=r);return o}function ye(){for(var e,t,r=0,o="",i=arguments.length;r<i;r++)(e=arguments[r])&&(t=ie(e))&&(o&&(o+=" "),o+=t);return o}const F="-";function xe(e){const t=we(e),{conflictingClassGroups:r,conflictingClassGroupModifiers:o}=e;function i(s){const a=s.split(F);return a[0]===""&&a.length!==1&&a.shift(),le(a,t)||ve(s)}function n(s,a){const u=r[s]||[];return a&&o[s]?[...u,...o[s]]:u}return{getClassGroupId:i,getConflictingClassGroupIds:n}}function le(e,t){if(e.length===0)return t.classGroupId;const r=e[0],o=t.nextPart.get(r),i=o?le(e.slice(1),o):void 0;if(i)return i;if(t.validators.length===0)return;const n=e.join(F);return t.validators.find(({validator:s})=>s(n))?.classGroupId}const te=/^\[(.+)\]$/;function ve(e){if(te.test(e)){const t=te.exec(e)[1],r=t?.substring(0,t.indexOf(":"));if(r)return"arbitrary.."+r}}function we(e){const{theme:t,prefix:r}=e,o={nextPart:new Map,validators:[]};return ke(Object.entries(e.classGroups),r).forEach(([n,s])=>{U(s,o,n,t)}),o}function U(e,t,r,o){e.forEach(i=>{if(typeof i=="string"){const n=i===""?t:oe(t,i);n.classGroupId=r;return}if(typeof i=="function"){if(Ce(i)){U(i(o),t,r,o);return}t.validators.push({validator:i,classGroupId:r});return}Object.entries(i).forEach(([n,s])=>{U(s,oe(t,n),r,o)})})}function oe(e,t){let r=e;return t.split(F).forEach(o=>{r.nextPart.has(o)||r.nextPart.set(o,{nextPart:new Map,validators:[]}),r=r.nextPart.get(o)}),r}function Ce(e){return e.isThemeGetter}function ke(e,t){return t?e.map(([r,o])=>{const i=o.map(n=>typeof n=="string"?t+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([s,a])=>[t+s,a])):n);return[r,i]}):e}function ze(e){if(e<1)return{get:()=>{},set:()=>{}};let t=0,r=new Map,o=new Map;function i(n,s){r.set(n,s),t++,t>e&&(t=0,o=r,r=new Map)}return{get(n){let s=r.get(n);if(s!==void 0)return s;if((s=o.get(n))!==void 0)return i(n,s),s},set(n,s){r.has(n)?r.set(n,s):i(n,s)}}}const ae="!";function Ae(e){const t=e.separator,r=t.length===1,o=t[0],i=t.length;return function(s){const a=[];let u=0,c=0,d;for(let g=0;g<s.length;g++){let m=s[g];if(u===0){if(m===o&&(r||s.slice(g,g+i)===t)){a.push(s.slice(c,g)),c=g+i;continue}if(m==="/"){d=g;continue}}m==="["?u++:m==="]"&&u--}const b=a.length===0?s:s.substring(c),y=b.startsWith(ae),x=y?b.substring(1):b,C=d&&d>c?d-c:void 0;return{modifiers:a,hasImportantModifier:y,baseClassName:x,maybePostfixModifierPosition:C}}}function Se(e){if(e.length<=1)return e;const t=[];let r=[];return e.forEach(o=>{o[0]==="["?(t.push(...r.sort(),o),r=[]):r.push(o)}),t.push(...r.sort()),t}function Me(e){return{cache:ze(e.cacheSize),splitModifiers:Ae(e),...xe(e)}}const $e=/\s+/;function Ee(e,t){const{splitModifiers:r,getClassGroupId:o,getConflictingClassGroupIds:i}=t,n=new Set;return e.trim().split($e).map(s=>{const{modifiers:a,hasImportantModifier:u,baseClassName:c,maybePostfixModifierPosition:d}=r(s);let b=o(d?c.substring(0,d):c),y=!!d;if(!b){if(!d)return{isTailwindClass:!1,originalClassName:s};if(b=o(c),!b)return{isTailwindClass:!1,originalClassName:s};y=!1}const x=Se(a).join(":");return{isTailwindClass:!0,modifierId:u?x+ae:x,classGroupId:b,originalClassName:s,hasPostfixModifier:y}}).reverse().filter(s=>{if(!s.isTailwindClass)return!0;const{modifierId:a,classGroupId:u,hasPostfixModifier:c}=s,d=a+u;return n.has(d)?!1:(n.add(d),i(u,c).forEach(b=>n.add(a+b)),!0)}).reverse().map(s=>s.originalClassName).join(" ")}function Pe(){let e=0,t,r,o="";for(;e<arguments.length;)(t=arguments[e++])&&(r=ce(t))&&(o&&(o+=" "),o+=r);return o}function ce(e){if(typeof e=="string")return e;let t,r="";for(let o=0;o<e.length;o++)e[o]&&(t=ce(e[o]))&&(r&&(r+=" "),r+=t);return r}function je(e,...t){let r,o,i,n=s;function s(u){const c=t.reduce((d,b)=>b(d),e());return r=Me(c),o=r.cache.get,i=r.cache.set,n=a,a(u)}function a(u){const c=o(u);if(c)return c;const d=Ee(u,r);return i(u,d),d}return function(){return n(Pe.apply(null,arguments))}}function p(e){const t=r=>r[e]||[];return t.isThemeGetter=!0,t}const de=/^\[(?:([a-z-]+):)?(.+)\]$/i,Re=/^\d+\/\d+$/,Ge=new Set(["px","full","screen"]),Ie=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Te=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ve=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Ne=/^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Oe=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function w(e){return S(e)||Ge.has(e)||Re.test(e)}function z(e){return M(e,"length",He)}function S(e){return!!e&&!Number.isNaN(Number(e))}function T(e){return M(e,"number",S)}function P(e){return!!e&&Number.isInteger(Number(e))}function Le(e){return e.endsWith("%")&&S(e.slice(0,-1))}function l(e){return de.test(e)}function A(e){return Ie.test(e)}const We=new Set(["length","size","percentage"]);function _e(e){return M(e,We,ue)}function Be(e){return M(e,"position",ue)}const Ue=new Set(["image","url"]);function Fe(e){return M(e,Ue,Je)}function qe(e){return M(e,"",Ze)}function j(){return!0}function M(e,t,r){const o=de.exec(e);return o?o[1]?typeof t=="string"?o[1]===t:t.has(o[1]):r(o[2]):!1}function He(e){return Te.test(e)&&!Ve.test(e)}function ue(){return!1}function Ze(e){return Ne.test(e)}function Je(e){return Oe.test(e)}function Ke(){const e=p("colors"),t=p("spacing"),r=p("blur"),o=p("brightness"),i=p("borderColor"),n=p("borderRadius"),s=p("borderSpacing"),a=p("borderWidth"),u=p("contrast"),c=p("grayscale"),d=p("hueRotate"),b=p("invert"),y=p("gap"),x=p("gradientColorStops"),C=p("gradientColorStopPositions"),g=p("inset"),m=p("margin"),k=p("opacity"),v=p("padding"),q=p("saturate"),N=p("scale"),H=p("sepia"),Z=p("skew"),J=p("space"),K=p("translate"),O=()=>["auto","contain","none"],L=()=>["auto","hidden","clip","visible","scroll"],W=()=>["auto",l,t],f=()=>[l,t],X=()=>["",w,z],R=()=>["auto",S,l],Q=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],G=()=>["solid","dashed","dotted","double","none"],Y=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter"],_=()=>["start","end","center","between","around","evenly","stretch"],$=()=>["","0",l],D=()=>["auto","avoid","all","avoid-page","page","left","right","column"],E=()=>[S,T],I=()=>[S,l];return{cacheSize:500,separator:":",theme:{colors:[j],spacing:[w,z],blur:["none","",A,l],brightness:E(),borderColor:[e],borderRadius:["none","","full",A,l],borderSpacing:f(),borderWidth:X(),contrast:E(),grayscale:$(),hueRotate:I(),invert:$(),gap:f(),gradientColorStops:[e],gradientColorStopPositions:[Le,z],inset:W(),margin:W(),opacity:E(),padding:f(),saturate:E(),scale:E(),sepia:$(),skew:I(),space:f(),translate:f()},classGroups:{aspect:[{aspect:["auto","square","video",l]}],container:["container"],columns:[{columns:[A]}],"break-after":[{"break-after":D()}],"break-before":[{"break-before":D()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Q(),l]}],overflow:[{overflow:L()}],"overflow-x":[{"overflow-x":L()}],"overflow-y":[{"overflow-y":L()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[g]}],"inset-x":[{"inset-x":[g]}],"inset-y":[{"inset-y":[g]}],start:[{start:[g]}],end:[{end:[g]}],top:[{top:[g]}],right:[{right:[g]}],bottom:[{bottom:[g]}],left:[{left:[g]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",P,l]}],basis:[{basis:W()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",l]}],grow:[{grow:$()}],shrink:[{shrink:$()}],order:[{order:["first","last","none",P,l]}],"grid-cols":[{"grid-cols":[j]}],"col-start-end":[{col:["auto",{span:["full",P,l]},l]}],"col-start":[{"col-start":R()}],"col-end":[{"col-end":R()}],"grid-rows":[{"grid-rows":[j]}],"row-start-end":[{row:["auto",{span:[P,l]},l]}],"row-start":[{"row-start":R()}],"row-end":[{"row-end":R()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",l]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",l]}],gap:[{gap:[y]}],"gap-x":[{"gap-x":[y]}],"gap-y":[{"gap-y":[y]}],"justify-content":[{justify:["normal",..._()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",..._(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[..._(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[m]}],mx:[{mx:[m]}],my:[{my:[m]}],ms:[{ms:[m]}],me:[{me:[m]}],mt:[{mt:[m]}],mr:[{mr:[m]}],mb:[{mb:[m]}],ml:[{ml:[m]}],"space-x":[{"space-x":[J]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[J]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",l,t]}],"min-w":[{"min-w":[l,t,"min","max","fit"]}],"max-w":[{"max-w":[l,t,"none","full","min","max","fit","prose",{screen:[A]},A]}],h:[{h:[l,t,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[l,t,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[l,t,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[l,t,"auto","min","max","fit"]}],"font-size":[{text:["base",A,z]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",T]}],"font-family":[{font:[j]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",l]}],"line-clamp":[{"line-clamp":["none",S,T]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",w,l]}],"list-image":[{"list-image":["none",l]}],"list-style-type":[{list:["none","disc","decimal",l]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[k]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[k]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...G(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",w,z]}],"underline-offset":[{"underline-offset":["auto",w,l]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:f()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",l]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",l]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[k]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Q(),Be]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",_e]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Fe]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[C]}],"gradient-via-pos":[{via:[C]}],"gradient-to-pos":[{to:[C]}],"gradient-from":[{from:[x]}],"gradient-via":[{via:[x]}],"gradient-to":[{to:[x]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-s":[{"border-s":[a]}],"border-w-e":[{"border-e":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[k]}],"border-style":[{border:[...G(),"hidden"]}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[k]}],"divide-style":[{divide:G()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:["",...G()]}],"outline-offset":[{"outline-offset":[w,l]}],"outline-w":[{outline:[w,z]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:X()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[k]}],"ring-offset-w":[{"ring-offset":[w,z]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",A,qe]}],"shadow-color":[{shadow:[j]}],opacity:[{opacity:[k]}],"mix-blend":[{"mix-blend":Y()}],"bg-blend":[{"bg-blend":Y()}],filter:[{filter:["","none"]}],blur:[{blur:[r]}],brightness:[{brightness:[o]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",A,l]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[d]}],invert:[{invert:[b]}],saturate:[{saturate:[q]}],sepia:[{sepia:[H]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[r]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[d]}],"backdrop-invert":[{"backdrop-invert":[b]}],"backdrop-opacity":[{"backdrop-opacity":[k]}],"backdrop-saturate":[{"backdrop-saturate":[q]}],"backdrop-sepia":[{"backdrop-sepia":[H]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[s]}],"border-spacing-x":[{"border-spacing-x":[s]}],"border-spacing-y":[{"border-spacing-y":[s]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",l]}],duration:[{duration:I()}],ease:[{ease:["linear","in","out","in-out",l]}],delay:[{delay:I()}],animate:[{animate:["none","spin","ping","pulse","bounce",l]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[N]}],"scale-x":[{"scale-x":[N]}],"scale-y":[{"scale-y":[N]}],rotate:[{rotate:[P,l]}],"translate-x":[{"translate-x":[K]}],"translate-y":[{"translate-y":[K]}],"skew-x":[{"skew-x":[Z]}],"skew-y":[{"skew-y":[Z]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",l]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",l]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":f()}],"scroll-mx":[{"scroll-mx":f()}],"scroll-my":[{"scroll-my":f()}],"scroll-ms":[{"scroll-ms":f()}],"scroll-me":[{"scroll-me":f()}],"scroll-mt":[{"scroll-mt":f()}],"scroll-mr":[{"scroll-mr":f()}],"scroll-mb":[{"scroll-mb":f()}],"scroll-ml":[{"scroll-ml":f()}],"scroll-p":[{"scroll-p":f()}],"scroll-px":[{"scroll-px":f()}],"scroll-py":[{"scroll-py":f()}],"scroll-ps":[{"scroll-ps":f()}],"scroll-pe":[{"scroll-pe":f()}],"scroll-pt":[{"scroll-pt":f()}],"scroll-pr":[{"scroll-pr":f()}],"scroll-pb":[{"scroll-pb":f()}],"scroll-pl":[{"scroll-pl":f()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",l]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[w,z,T]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}const Xe=je(Ke);function er(...e){return Xe(ye(e))}export{fe as $,V as _,De as a,Ye as b,er as c,ne as d};
