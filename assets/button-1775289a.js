import{V as g,R as a,ad as h,r as t,Q as $,w as b,c as v,$ as w}from"./index-d538a9d3.js";function E(n){return!!n&&typeof n=="object"&&typeof n.then=="function"}function C(){return g?/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()):!1}const o="adm-button",k={color:"default",fill:"solid",block:!1,loading:!1,loadingIcon:a.createElement(h,{color:"currentColor"}),type:"button",shape:"default",size:"middle"},I=t.forwardRef((n,d)=>{const e=$(k,n),[u,l]=t.useState(!1),i=t.useRef(null),s=e.loading==="auto"?u:e.loading,r=e.disabled||s;t.useImperativeHandle(d,()=>({get nativeElement(){return i.current}}));const f=p=>w(void 0,void 0,void 0,function*(){if(!e.onClick)return;const c=e.onClick(p);if(E(c))try{l(!0),yield c,l(!1)}catch(m){throw l(!1),m}});return b(e,a.createElement("button",{ref:i,type:e.type,onClick:f,className:v(o,e.color?`${o}-${e.color}`:null,{[`${o}-block`]:e.block,[`${o}-disabled`]:r,[`${o}-fill-outline`]:e.fill==="outline",[`${o}-fill-none`]:e.fill==="none",[`${o}-mini`]:e.size==="mini",[`${o}-small`]:e.size==="small",[`${o}-large`]:e.size==="large",[`${o}-loading`]:s},`${o}-shape-${e.shape}`),disabled:r,onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,onTouchStart:e.onTouchStart,onTouchEnd:e.onTouchEnd},s?a.createElement("div",{className:`${o}-loading-wrapper`},e.loadingIcon,e.loadingText):a.createElement("span",null,e.children)))});export{I as B,C as i};
