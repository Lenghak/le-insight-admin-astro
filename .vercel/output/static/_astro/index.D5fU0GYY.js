import{r,e as P}from"./index.BdjtwOc4.js";import{b as x,$ as _,_ as w}from"./utils.BNAsO71c.js";import{$ as I,a as K}from"./index.BSwc26KH.js";import{$ as j,r as X}from"./index.B6I0esK7.js";function S(e,t,{checkForDefaultPrevented:n=!0}={}){return function(s){if(e?.(s),n===!1||!s.defaultPrevented)return t?.(s)}}function q(e,t=[]){let n=[];function o(c,f){const u=r.createContext(f),a=n.length;n=[...n,f];function i(l){const{scope:$,children:v,...m}=l,h=$?.[e][a]||u,p=r.useMemo(()=>m,Object.values(m));return r.createElement(h.Provider,{value:p},v)}function d(l,$){const v=$?.[e][a]||u,m=r.useContext(v);if(m)return m;if(f!==void 0)return f;throw new Error(`\`${l}\` must be used within \`${c}\``)}return i.displayName=c+"Provider",[i,d]}const s=()=>{const c=n.map(f=>r.createContext(f));return function(u){const a=u?.[e]||c;return r.useMemo(()=>({[`__scope${e}`]:{...u,[e]:a}}),[u,a])}};return s.scopeName=e,[o,G(s,...t)]}function G(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const o=e.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(c){const f=o.reduce((u,{useScope:a,scopeName:i})=>{const l=a(c)[`__scope${i}`];return{...u,...l}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:f}),[f])}};return n.scopeName=t.scopeName,n}function T(e){const t=r.useRef(e);return r.useEffect(()=>{t.current=e}),r.useMemo(()=>(...n)=>{var o;return(o=t.current)===null||o===void 0?void 0:o.call(t,...n)},[])}function ue({prop:e,defaultProp:t,onChange:n=()=>{}}){const[o,s]=J({defaultProp:t,onChange:n}),c=e!==void 0,f=c?e:o,u=T(n),a=r.useCallback(i=>{if(c){const l=typeof i=="function"?i(e):i;l!==e&&u(l)}else s(i)},[c,e,s,u]);return[f,a]}function J({defaultProp:e,onChange:t}){const n=r.useState(e),[o]=n,s=r.useRef(o),c=T(t);return r.useEffect(()=>{s.current!==o&&(c(o),s.current=o)},[o,s,c]),n}function le(e){const t=e+"CollectionProvider",[n,o]=q(t),[s,c]=n(t,{collectionRef:{current:null},itemMap:new Map}),f=v=>{const{scope:m,children:h}=v,p=P.useRef(null),E=P.useRef(new Map).current;return P.createElement(s,{scope:m,itemMap:E,collectionRef:p},h)},u=e+"CollectionSlot",a=P.forwardRef((v,m)=>{const{scope:h,children:p}=v,E=c(u,h),C=x(m,E.collectionRef);return P.createElement(_,{ref:C},p)}),i=e+"CollectionItemSlot",d="data-radix-collection-item",l=P.forwardRef((v,m)=>{const{scope:h,children:p,...E}=v,C=P.useRef(null),y=x(m,C),O=c(i,h);return P.useEffect(()=>(O.itemMap.set(C,{ref:C,...E}),()=>void O.itemMap.delete(C))),P.createElement(_,{[d]:"",ref:y},p)});function $(v){const m=c(e+"CollectionConsumer",v);return P.useCallback(()=>{const p=m.collectionRef.current;if(!p)return[];const E=Array.from(p.querySelectorAll(`[${d}]`));return Array.from(m.itemMap.values()).sort((O,g)=>E.indexOf(O.ref.current)-E.indexOf(g.ref.current))},[m.collectionRef,m.itemMap])}return[{Provider:f,Slot:a,ItemSlot:l},$,o]}function Q(e,t=globalThis?.document){const n=T(e);r.useEffect(()=>{const o=s=>{s.key==="Escape"&&n(s)};return t.addEventListener("keydown",o),()=>t.removeEventListener("keydown",o)},[n,t])}const A="dismissableLayer.update",V="dismissableLayer.pointerDownOutside",Y="dismissableLayer.focusOutside";let U;const B=r.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Z=r.forwardRef((e,t)=>{var n;const{disableOutsidePointerEvents:o=!1,onEscapeKeyDown:s,onPointerDownOutside:c,onFocusOutside:f,onInteractOutside:u,onDismiss:a,...i}=e,d=r.useContext(B),[l,$]=r.useState(null),v=(n=l?.ownerDocument)!==null&&n!==void 0?n:globalThis?.document,[,m]=r.useState({}),h=x(t,b=>$(b)),p=Array.from(d.layers),[E]=[...d.layersWithOutsidePointerEventsDisabled].slice(-1),C=p.indexOf(E),y=l?p.indexOf(l):-1,O=d.layersWithOutsidePointerEventsDisabled.size>0,g=y>=C,z=ee(b=>{const N=b.target,M=[...d.branches].some(D=>D.contains(N));!g||M||(c?.(b),u?.(b),b.defaultPrevented||a?.())},v),L=te(b=>{const N=b.target;[...d.branches].some(D=>D.contains(N))||(f?.(b),u?.(b),b.defaultPrevented||a?.())},v);return Q(b=>{y===d.layers.size-1&&(s?.(b),!b.defaultPrevented&&a&&(b.preventDefault(),a()))},v),r.useEffect(()=>{if(l)return o&&(d.layersWithOutsidePointerEventsDisabled.size===0&&(U=v.body.style.pointerEvents,v.body.style.pointerEvents="none"),d.layersWithOutsidePointerEventsDisabled.add(l)),d.layers.add(l),k(),()=>{o&&d.layersWithOutsidePointerEventsDisabled.size===1&&(v.body.style.pointerEvents=U)}},[l,v,o,d]),r.useEffect(()=>()=>{l&&(d.layers.delete(l),d.layersWithOutsidePointerEventsDisabled.delete(l),k())},[l,d]),r.useEffect(()=>{const b=()=>m({});return document.addEventListener(A,b),()=>document.removeEventListener(A,b)},[]),r.createElement(I.div,w({},i,{ref:h,style:{pointerEvents:O?g?"auto":"none":void 0,...e.style},onFocusCapture:S(e.onFocusCapture,L.onFocusCapture),onBlurCapture:S(e.onBlurCapture,L.onBlurCapture),onPointerDownCapture:S(e.onPointerDownCapture,z.onPointerDownCapture)}))}),H=r.forwardRef((e,t)=>{const n=r.useContext(B),o=r.useRef(null),s=x(t,o);return r.useEffect(()=>{const c=o.current;if(c)return n.branches.add(c),()=>{n.branches.delete(c)}},[n.branches]),r.createElement(I.div,w({},e,{ref:s}))});function ee(e,t=globalThis?.document){const n=T(e),o=r.useRef(!1),s=r.useRef(()=>{});return r.useEffect(()=>{const c=u=>{if(u.target&&!o.current){let i=function(){W(V,n,a,{discrete:!0})};const a={originalEvent:u};u.pointerType==="touch"?(t.removeEventListener("click",s.current),s.current=i,t.addEventListener("click",s.current,{once:!0})):i()}else t.removeEventListener("click",s.current);o.current=!1},f=window.setTimeout(()=>{t.addEventListener("pointerdown",c)},0);return()=>{window.clearTimeout(f),t.removeEventListener("pointerdown",c),t.removeEventListener("click",s.current)}},[t,n]),{onPointerDownCapture:()=>o.current=!0}}function te(e,t=globalThis?.document){const n=T(e),o=r.useRef(!1);return r.useEffect(()=>{const s=c=>{c.target&&!o.current&&W(Y,n,{originalEvent:c},{discrete:!1})};return t.addEventListener("focusin",s),()=>t.removeEventListener("focusin",s)},[t,n]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function k(){const e=new CustomEvent(A);document.dispatchEvent(e)}function W(e,t,n,{discrete:o}){const s=n.originalEvent.target,c=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&s.addEventListener(e,t,{once:!0}),o?K(s,c):s.dispatchEvent(c)}const de=Z,fe=H,F=globalThis?.document?r.useLayoutEffect:()=>{},ve=r.forwardRef((e,t)=>{var n;const{container:o=globalThis==null||(n=globalThis.document)===null||n===void 0?void 0:n.body,...s}=e;return o?j.createPortal(r.createElement(I.div,w({},s,{ref:t})),o):null});function ne(e,t){return r.useReducer((n,o)=>{const s=t[n][o];return s??n},e)}const oe=e=>{const{present:t,children:n}=e,o=se(t),s=typeof n=="function"?n({present:o.isPresent}):r.Children.only(n),c=x(o.ref,s.ref);return typeof n=="function"||o.isPresent?r.cloneElement(s,{ref:c}):null};oe.displayName="Presence";function se(e){const[t,n]=r.useState(),o=r.useRef({}),s=r.useRef(e),c=r.useRef("none"),f=e?"mounted":"unmounted",[u,a]=ne(f,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return r.useEffect(()=>{const i=R(o.current);c.current=u==="mounted"?i:"none"},[u]),F(()=>{const i=o.current,d=s.current;if(d!==e){const $=c.current,v=R(i);e?a("MOUNT"):v==="none"||i?.display==="none"?a("UNMOUNT"):a(d&&$!==v?"ANIMATION_OUT":"UNMOUNT"),s.current=e}},[e,a]),F(()=>{if(t){const i=l=>{const v=R(o.current).includes(l.animationName);l.target===t&&v&&X.flushSync(()=>a("ANIMATION_END"))},d=l=>{l.target===t&&(c.current=R(o.current))};return t.addEventListener("animationstart",d),t.addEventListener("animationcancel",i),t.addEventListener("animationend",i),()=>{t.removeEventListener("animationstart",d),t.removeEventListener("animationcancel",i),t.removeEventListener("animationend",i)}}else a("ANIMATION_END")},[t,a]),{isPresent:["mounted","unmountSuspended"].includes(u),ref:r.useCallback(i=>{i&&(o.current=getComputedStyle(i)),n(i)},[])}}function R(e){return e?.animationName||"none"}export{T as $,F as a,q as b,le as c,ue as d,S as e,oe as f,ve as g,Z as h,fe as i,de as j};
