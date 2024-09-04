import{a as V,r as a}from"./react-oSGf88E_.js";const S=typeof document<"u"?V.useLayoutEffect:()=>{};function O(t){const n=a.useRef(null);return S(()=>{n.current=t},[t]),a.useCallback((...e)=>{const r=n.current;return r==null?void 0:r(...e)},[])}const m=t=>{var n;return(n=t==null?void 0:t.ownerDocument)!==null&&n!==void 0?n:document},b=t=>t&&"window"in t&&t.window===t?t:m(t).defaultView||window;function _(t){var n;return typeof window>"u"||window.navigator==null?!1:((n=window.navigator.userAgentData)===null||n===void 0?void 0:n.brands.some(e=>t.test(e.brand)))||t.test(window.navigator.userAgent)}function R(t){var n;return typeof window<"u"&&window.navigator!=null?t.test(((n=window.navigator.userAgentData)===null||n===void 0?void 0:n.platform)||window.navigator.platform):!1}function j(){return R(/^Mac/i)}function G(){return _(/Android/i)}function U(t){return t.mozInputSource===0&&t.isTrusted?!0:G()&&t.pointerType?t.type==="click"&&t.buttons===1:t.detail===0&&!t.pointerType}class z{isDefaultPrevented(){return this.nativeEvent.defaultPrevented}preventDefault(){this.defaultPrevented=!0,this.nativeEvent.preventDefault()}stopPropagation(){this.nativeEvent.stopPropagation(),this.isPropagationStopped=()=>!0}isPropagationStopped(){return!1}persist(){}constructor(n,e){this.nativeEvent=e,this.target=e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget,this.bubbles=e.bubbles,this.cancelable=e.cancelable,this.defaultPrevented=e.defaultPrevented,this.eventPhase=e.eventPhase,this.isTrusted=e.isTrusted,this.timeStamp=e.timeStamp,this.type=n}}function D(t){let n=a.useRef({isFocused:!1,observer:null});S(()=>{const r=n.current;return()=>{r.observer&&(r.observer.disconnect(),r.observer=null)}},[]);let e=O(r=>{t==null||t(r)});return a.useCallback(r=>{if(r.target instanceof HTMLButtonElement||r.target instanceof HTMLInputElement||r.target instanceof HTMLTextAreaElement||r.target instanceof HTMLSelectElement){n.current.isFocused=!0;let o=r.target,s=d=>{n.current.isFocused=!1,o.disabled&&e(new z("blur",d)),n.current.observer&&(n.current.observer.disconnect(),n.current.observer=null)};o.addEventListener("focusout",s,{once:!0}),n.current.observer=new MutationObserver(()=>{if(n.current.isFocused&&o.disabled){var d;(d=n.current.observer)===null||d===void 0||d.disconnect();let i=o===document.activeElement?null:document.activeElement;o.dispatchEvent(new FocusEvent("blur",{relatedTarget:i})),o.dispatchEvent(new FocusEvent("focusout",{bubbles:!0,relatedTarget:i}))}}),n.current.observer.observe(o,{attributes:!0,attributeFilter:["disabled"]})}},[e])}function N(t){let{isDisabled:n,onFocus:e,onBlur:r,onFocusChange:o}=t;const s=a.useCallback(c=>{if(c.target===c.currentTarget)return r&&r(c),o&&o(!1),!0},[r,o]),d=D(s),i=a.useCallback(c=>{const f=m(c.target);c.target===c.currentTarget&&f.activeElement===c.target&&(e&&e(c),o&&o(!0),d(c))},[o,e,d]);return{focusProps:{onFocus:!n&&(e||o||r)?i:void 0,onBlur:!n&&(r||o)?s:void 0}}}let w=null,H=new Set,h=new Map,p=!1,P=!1;const Y={Tab:!0,Escape:!0};function k(t,n){for(let e of H)e(t,n)}function q(t){return!(t.metaKey||!j()&&t.altKey||t.ctrlKey||t.key==="Control"||t.key==="Shift"||t.key==="Meta")}function T(t){p=!0,q(t)&&(w="keyboard",k("keyboard",t))}function l(t){w="pointer",(t.type==="mousedown"||t.type==="pointerdown")&&(p=!0,k("pointer",t))}function W(t){U(t)&&(p=!0,w="virtual")}function I(t){t.target===window||t.target===document||(!p&&!P&&(w="virtual",k("virtual",t)),p=!1,P=!1)}function B(){p=!1,P=!0}function M(t){if(typeof window>"u"||h.get(b(t)))return;const n=b(t),e=m(t);let r=n.HTMLElement.prototype.focus;n.HTMLElement.prototype.focus=function(){p=!0,r.apply(this,arguments)},e.addEventListener("keydown",T,!0),e.addEventListener("keyup",T,!0),e.addEventListener("click",W,!0),n.addEventListener("focus",I,!0),n.addEventListener("blur",B,!1),typeof PointerEvent<"u"?(e.addEventListener("pointerdown",l,!0),e.addEventListener("pointermove",l,!0),e.addEventListener("pointerup",l,!0)):(e.addEventListener("mousedown",l,!0),e.addEventListener("mousemove",l,!0),e.addEventListener("mouseup",l,!0)),n.addEventListener("beforeunload",()=>{A(t)},{once:!0}),h.set(n,{focus:r})}const A=(t,n)=>{const e=b(t),r=m(t);n&&r.removeEventListener("DOMContentLoaded",n),h.has(e)&&(e.HTMLElement.prototype.focus=h.get(e).focus,r.removeEventListener("keydown",T,!0),r.removeEventListener("keyup",T,!0),r.removeEventListener("click",W,!0),e.removeEventListener("focus",I,!0),e.removeEventListener("blur",B,!1),typeof PointerEvent<"u"?(r.removeEventListener("pointerdown",l,!0),r.removeEventListener("pointermove",l,!0),r.removeEventListener("pointerup",l,!0)):(r.removeEventListener("mousedown",l,!0),r.removeEventListener("mousemove",l,!0),r.removeEventListener("mouseup",l,!0)),h.delete(e))};function J(t){const n=m(t);let e;return n.readyState!=="loading"?M(t):(e=()=>{M(t)},n.addEventListener("DOMContentLoaded",e)),()=>A(t,e)}typeof document<"u"&&J();function K(){return w!=="pointer"}const Q=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]);function X(t,n,e){var r;const o=typeof window<"u"?b(e==null?void 0:e.target).HTMLInputElement:HTMLInputElement,s=typeof window<"u"?b(e==null?void 0:e.target).HTMLTextAreaElement:HTMLTextAreaElement,d=typeof window<"u"?b(e==null?void 0:e.target).HTMLElement:HTMLElement,i=typeof window<"u"?b(e==null?void 0:e.target).KeyboardEvent:KeyboardEvent;return t=t||(e==null?void 0:e.target)instanceof o&&!Q.has(e==null||(r=e.target)===null||r===void 0?void 0:r.type)||(e==null?void 0:e.target)instanceof s||(e==null?void 0:e.target)instanceof d&&(e==null?void 0:e.target.isContentEditable),!(t&&n==="keyboard"&&e instanceof i&&!Y[e.key])}function Z(t,n,e){M(),a.useEffect(()=>{let r=(o,s)=>{X(!!(e!=null&&e.isTextInput),o,s)&&t(K())};return H.add(r),()=>{H.delete(r)}},n)}function ee(t){let{isDisabled:n,onBlurWithin:e,onFocusWithin:r,onFocusWithinChange:o}=t,s=a.useRef({isFocusWithin:!1}),d=a.useCallback(f=>{s.current.isFocusWithin&&!f.currentTarget.contains(f.relatedTarget)&&(s.current.isFocusWithin=!1,e&&e(f),o&&o(!1))},[e,o,s]),i=D(d),c=a.useCallback(f=>{!s.current.isFocusWithin&&document.activeElement===f.target&&(r&&r(f),o&&o(!0),s.current.isFocusWithin=!0,i(f))},[r,o,i]);return n?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus:c,onBlur:d}}}let L=!1,F=0;function x(){L=!0,setTimeout(()=>{L=!1},50)}function C(t){t.pointerType==="touch"&&x()}function te(){if(!(typeof document>"u"))return typeof PointerEvent<"u"?document.addEventListener("pointerup",C):document.addEventListener("touchend",x),F++,()=>{F--,!(F>0)&&(typeof PointerEvent<"u"?document.removeEventListener("pointerup",C):document.removeEventListener("touchend",x))}}function re(t){let{onHoverStart:n,onHoverChange:e,onHoverEnd:r,isDisabled:o}=t,[s,d]=a.useState(!1),i=a.useRef({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:"",target:null}).current;a.useEffect(te,[]);let{hoverProps:c,triggerHoverEnd:f}=a.useMemo(()=>{let g=(u,$)=>{if(i.pointerType=$,o||$==="touch"||i.isHovered||!u.currentTarget.contains(u.target))return;i.isHovered=!0;let y=u.currentTarget;i.target=y,n&&n({type:"hoverstart",target:y,pointerType:$}),e&&e(!0),d(!0)},E=(u,$)=>{if(i.pointerType="",i.target=null,$==="touch"||!i.isHovered)return;i.isHovered=!1;let y=u.currentTarget;r&&r({type:"hoverend",target:y,pointerType:$}),e&&e(!1),d(!1)},v={};return typeof PointerEvent<"u"?(v.onPointerEnter=u=>{L&&u.pointerType==="mouse"||g(u,u.pointerType)},v.onPointerLeave=u=>{!o&&u.currentTarget.contains(u.target)&&E(u,u.pointerType)}):(v.onTouchStart=()=>{i.ignoreEmulatedMouseEvents=!0},v.onMouseEnter=u=>{!i.ignoreEmulatedMouseEvents&&!L&&g(u,"mouse"),i.ignoreEmulatedMouseEvents=!1},v.onMouseLeave=u=>{!o&&u.currentTarget.contains(u.target)&&E(u,"mouse")}),{hoverProps:v,triggerHoverEnd:E}},[n,e,r,o,i]);return a.useEffect(()=>{o&&f({currentTarget:i.target},i.pointerType)},[o]),{hoverProps:c,isHovered:s}}function oe(t={}){let{autoFocus:n=!1,isTextInput:e,within:r}=t,o=a.useRef({isFocused:!1,isFocusVisible:n||K()}),[s,d]=a.useState(!1),[i,c]=a.useState(()=>o.current.isFocused&&o.current.isFocusVisible),f=a.useCallback(()=>c(o.current.isFocused&&o.current.isFocusVisible),[]),g=a.useCallback(u=>{o.current.isFocused=u,d(u),f()},[f]);Z(u=>{o.current.isFocusVisible=u,f()},[],{isTextInput:e});let{focusProps:E}=N({isDisabled:r,onFocusChange:g}),{focusWithinProps:v}=ee({isDisabled:!r,onFocusWithinChange:g});return{isFocused:s,isFocusVisible:i,focusProps:r?v:E}}export{oe as $,re as a};
