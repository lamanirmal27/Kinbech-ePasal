import{d as a}from"./@babel-CJmEs7-u.js";import{j as $,r as Ye}from"./react-oSGf88E_.js";import{r as _n}from"./fuse.js-CC_NdGZp.js";import{r as E}from"./styled-components-C50vXw02.js";var ne={},Ze={},T={};Object.defineProperty(T,"__esModule",{value:!0});T.defaultFuseOptions=T.defaultTheme=void 0;var xn={height:"44px",border:"1px solid #dfe1e5",borderRadius:"24px",backgroundColor:"white",boxShadow:"rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",hoverBackgroundColor:"#eee",color:"#212121",fontSize:"16px",fontFamily:"Arial",iconColor:"grey",lineColor:"rgb(232, 234, 237)",placeholderColor:"grey",zIndex:0,clearIconMargin:"3px 14px 0 0",searchIconMargin:"0 0 0 16px"};T.defaultTheme=xn;var bn={shouldSort:!0,threshold:.6,location:0,distance:100,minMatchCharLength:1,keys:["name"]};T.defaultFuseOptions=bn;var X={};Object.defineProperty(X,"__esModule",{value:!0});X.debounce=void 0;function wn(e,t,o){var c;return function(){var i=this,d=arguments,m=function(){c=null,o||e.apply(i,d)};o&&!c&&e.apply(i,d),c&&clearTimeout(c),c=setTimeout(m,t)}}X.debounce=wn;var te={},k={},Sn=a&&a.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},Z=a&&a.__assign||function(){return Z=Object.assign||function(e){for(var t,o=1,c=arguments.length;o<c;o++){t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},Z.apply(this,arguments)},jn=a&&a.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(k,"__esModule",{value:!0});k.SearchIcon=void 0;var qe=$,yn=jn(E),On=function(e){var t=e.showIcon;return t?(0,qe.jsx)(In,Z({className:"search-icon",width:20,height:20,focusable:"false",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},{children:(0,qe.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"})})):null};k.SearchIcon=On;var In=yn.default.svg(Xe||(Xe=Sn([`
  flex-shrink: 0;
  margin: `,`;
  fill: `,`;
`],[`
  flex-shrink: 0;
  margin: `,`;
  fill: `,`;
`])),function(e){return e.theme.searchIconMargin},function(e){return e.theme.iconColor}),Xe,Cn=a&&a.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},N=a&&a.__assign||function(){return N=Object.assign||function(e){for(var t,o=1,c=arguments.length;o<c;o++){t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},N.apply(this,arguments)},Rn=a&&a.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(te,"__esModule",{value:!0});var g=$,Fn=Rn(E),We=k;function Nn(e){var t=e.results,o=t===void 0?[]:t,c=e.onClick,i=e.setSearchString,d=e.showIcon,m=e.maxResults,_=e.resultStringKeyName,y=_===void 0?"name":_,h=e.highlightedItem,R=e.setHighlightedItem,w=e.formatResult,F=e.showNoResultsFlag,O=F===void 0?!0:F,x=e.showNoResultsText,I=x===void 0?"No results":x,D=w||function(r){return r[y]},C=function(r){c(r),i(r[y])},n=function(r){var l=r.event,f=r.result;l.button===0&&(l.preventDefault(),C(f))};return O?(0,g.jsx)(Ge,{children:(0,g.jsxs)("li",N({"data-test":"no-results-message"},{children:[(0,g.jsx)(We.SearchIcon,{showIcon:d}),(0,g.jsx)("div",N({className:"ellipsis"},{children:I}))]}))}):(o==null?void 0:o.length)<=0&&!O?null:(0,g.jsx)(Ge,{children:o.slice(0,m).map(function(r,l){return(0,g.jsxs)("li",N({className:h===l?"selected":"",onMouseEnter:function(){return R({index:l})},"data-test":"result",onMouseDown:function(f){return n({event:f,result:r})},onClick:function(){return C(r)}},{children:[(0,g.jsx)(We.SearchIcon,{showIcon:d}),(0,g.jsx)("div",N({className:"ellipsis",title:r[y]},{children:D(r)}))]}),"rsa-result-".concat(r.id))})})}te.default=Nn;var Ge=function(e){var t=e.children;return(0,g.jsxs)(Tn,{children:[(0,g.jsx)("div",{className:"line"}),(0,g.jsx)("ul",{children:t})]})},Tn=Fn.default.div(Ve||(Ve=Cn([`
  > div.line {
    border-top-color: `,`;
    border-top-style: solid;
    border-top-width: 1px;

    margin-bottom: 0px;
    margin-left: 14px;
    margin-right: 20px;
    margin-top: 0px;

    padding-bottom: 4px;
  }

  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0px 0 16px 0;
    max-height: `,`;

    > li {
      display: flex;
      align-items: center;
      padding: 4px 0 4px 0;

      > div {
        margin-left: 13px;
      }
    }
  }

  .ellipsis {
    text-align: left;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .selected {
    background-color: `,`;
  }
`],[`
  > div.line {
    border-top-color: `,`;
    border-top-style: solid;
    border-top-width: 1px;

    margin-bottom: 0px;
    margin-left: 14px;
    margin-right: 20px;
    margin-top: 0px;

    padding-bottom: 4px;
  }

  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0px 0 16px 0;
    max-height: `,`;

    > li {
      display: flex;
      align-items: center;
      padding: 4px 0 4px 0;

      > div {
        margin-left: 13px;
      }
    }
  }

  .ellipsis {
    text-align: left;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .selected {
    background-color: `,`;
  }
`])),function(e){return e.theme.lineColor},function(e){return e.theme.maxHeight},function(e){return e.theme.hoverBackgroundColor}),Ve,re={},W={},Dn=a&&a.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},q=a&&a.__assign||function(){return q=Object.assign||function(e){for(var t,o=1,c=arguments.length;o<c;o++){t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},q.apply(this,arguments)},Pn=a&&a.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(W,"__esModule",{value:!0});W.ClearIcon=void 0;var Y=$,Mn=Pn(E),$n=function(e){var t=e.showClear,o=e.setSearchString,c=e.searchString,i=e.setFocus,d=e.onClear,m=function(){o({target:{value:""}}),i(),d()};return!t||!c||(c==null?void 0:c.length)<=0?null:(0,Y.jsx)(En,q({className:"clear-icon",onClick:m},{children:(0,Y.jsx)("svg",q({width:20,height:20,focusable:"false",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},{children:(0,Y.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.58 12 5 17.58 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})}))}))};W.ClearIcon=$n;var En=Mn.default.div(Je||(Je=Dn([`
  margin: `,`;

  &:hover {
    cursor: pointer;
  }

  > svg {
    fill: `,`;
  }
`],[`
  margin: `,`;

  &:hover {
    cursor: pointer;
  }

  > svg {
    fill: `,`;
  }
`])),function(e){return e.theme.clearIconMargin},function(e){return e.theme.iconColor}),Je,kn=a&&a.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},ee=a&&a.__assign||function(){return ee=Object.assign||function(e){for(var t,o=1,c=arguments.length;o<c;o++){t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},ee.apply(this,arguments)},Ln=a&&a.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(re,"__esModule",{value:!0});var K=$,An=Ye,zn=Ln(E),Un=W,Hn=k;function Bn(e){var t=e.searchString,o=e.setSearchString,c=e.setHighlightedItem,i=e.eraseResults,d=e.autoFocus,m=e.onFocus,_=e.onClear,y=e.placeholder,h=e.showIcon,R=h===void 0?!0:h,w=e.showClear,F=w===void 0?!0:w,O=e.maxLength,x=(0,An.useRef)(null),I=!0,D=function(){I=!1,x!=null&&x.current&&x.current.focus(),I=!0},C=function(r){I&&m(r)},n=O?{maxLength:O}:{};return(0,K.jsxs)(Kn,{children:[(0,K.jsx)(Hn.SearchIcon,{showIcon:R}),(0,K.jsx)("input",ee({type:"text",ref:x,spellCheck:!1,value:t,onChange:o,onFocus:C,placeholder:y,autoFocus:d,onBlur:function(){return i()},onKeyDown:function(r){return c({event:r})},"data-test":"search-input"},n)),(0,K.jsx)(Un.ClearIcon,{showClear:F,setSearchString:o,searchString:t,onClear:_,setFocus:D})]})}re.default=Bn;var Kn=zn.default.div(Qe||(Qe=kn([`
  min-height: `,`;
  width: 100%;

  display: flex;
  align-items: center;

  > input {
    width: 100%;

    padding: 0 0 0 13px;

    border: none;
    outline: none;

    background-color: rgba(0, 0, 0, 0);
    font-size: inherit;
    font-family: inherit;

    color: `,`;

    ::placeholder {
      color: `,`;
      opacity: 1;

      :-ms-input-placeholder {
        color: `,`;
      }

      ::-ms-input-placeholder {
        color: `,`;
      }
    }
  }
`],[`
  min-height: `,`;
  width: 100%;

  display: flex;
  align-items: center;

  > input {
    width: 100%;

    padding: 0 0 0 13px;

    border: none;
    outline: none;

    background-color: rgba(0, 0, 0, 0);
    font-size: inherit;
    font-family: inherit;

    color: `,`;

    ::placeholder {
      color: `,`;
      opacity: 1;

      :-ms-input-placeholder {
        color: `,`;
      }

      ::-ms-input-placeholder {
        color: `,`;
      }
    }
  }
`])),function(e){return e.theme.height},function(e){return e.theme.color},function(e){return e.theme.placeholderColor},function(e){return e.theme.placeholderColor},function(e){return e.theme.placeholderColor}),Qe;(function(e){var t=a&&a.__makeTemplateObject||function(n,r){return Object.defineProperty?Object.defineProperty(n,"raw",{value:r}):n.raw=r,n},o=a&&a.__assign||function(){return o=Object.assign||function(n){for(var r,l=1,f=arguments.length;l<f;l++){r=arguments[l];for(var v in r)Object.prototype.hasOwnProperty.call(r,v)&&(n[v]=r[v])}return n},o.apply(this,arguments)},c=a&&a.__createBinding||(Object.create?function(n,r,l,f){f===void 0&&(f=l);var v=Object.getOwnPropertyDescriptor(r,l);(!v||("get"in v?!r.__esModule:v.writable||v.configurable))&&(v={enumerable:!0,get:function(){return r[l]}}),Object.defineProperty(n,f,v)}:function(n,r,l,f){f===void 0&&(f=l),n[f]=r[l]}),i=a&&a.__setModuleDefault||(Object.create?function(n,r){Object.defineProperty(n,"default",{enumerable:!0,value:r})}:function(n,r){n.default=r}),d=a&&a.__importStar||function(n){if(n&&n.__esModule)return n;var r={};if(n!=null)for(var l in n)l!=="default"&&Object.prototype.hasOwnProperty.call(n,l)&&c(r,n,l);return i(r,n),r},m=a&&a.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0}),e.MAX_RESULTS=e.DEFAULT_INPUT_DEBOUNCE=void 0;var _=$,y=m(_n),h=d(Ye),R=d(E),w=T,F=X,O=m(te),x=m(re);e.DEFAULT_INPUT_DEBOUNCE=200,e.MAX_RESULTS=10;function I(n){var r=n.items,l=r===void 0?[]:r,f=n.fuseOptions,v=f===void 0?w.defaultFuseOptions:f,oe=n.inputDebounce,ae=oe===void 0?e.DEFAULT_INPUT_DEBOUNCE:oe,ie=n.onSearch,G=ie===void 0?function(){}:ie,le=n.onHover,ue=le===void 0?function(){}:le,se=n.onSelect,ce=se===void 0?function(){}:se,he=n.onFocus,en=he===void 0?function(){}:he,fe=n.onClear,nn=fe===void 0?function(){}:fe,de=n.showIcon,ve=de===void 0?!0:de,pe=n.showClear,tn=pe===void 0?!0:pe,me=n.maxResults,L=me===void 0?e.MAX_RESULTS:me,ge=n.placeholder,rn=ge===void 0?"":ge,_e=n.autoFocus,on=_e===void 0?!1:_e,xe=n.styling,an=xe===void 0?{}:xe,be=n.resultStringKeyName,A=be===void 0?"name":be,we=n.inputSearchString,z=we===void 0?"":we,ln=n.formatResult,Se=n.showNoResults,je=Se===void 0?!0:Se,ye=n.showNoResultsText,un=ye===void 0?"No results":ye,Oe=n.showItemsOnFocus,Ie=Oe===void 0?!1:Oe,Ce=n.maxLength,sn=Ce===void 0?0:Ce,cn=n.className,hn=o(o({},w.defaultTheme),an),fn=o(o({},w.defaultFuseOptions),v),Re=new y.default(l,fn);Re.setCollection(l);var Fe=(0,h.useState)(z),b=Fe[0],P=Fe[1],Ne=(0,h.useState)([]),u=Ne[0],M=Ne[1],Te=(0,h.useState)(-1),S=Te[0],U=Te[1],De=(0,h.useState)(!1),V=De[0],Pe=De[1],Me=(0,h.useState)(!1),$e=Me[0],Ee=Me[1],ke=(0,h.useState)(!1),dn=ke[0],Le=ke[1],Ae=(0,h.useState)(!1),ze=Ae[0],Ue=Ae[1];(0,h.useEffect)(function(){P(z);var s=setTimeout(function(){return M(J(z))},0);return function(){return clearTimeout(s)}},[z]),(0,h.useEffect)(function(){(b==null?void 0:b.length)>0&&u&&(u==null?void 0:u.length)>0&&M(J(b))},[l]),(0,h.useEffect)(function(){je&&b.length>0&&!$e&&u.length===0&&!V?Le(!0):Le(!1)},[$e,je,V,b,u]),(0,h.useEffect)(function(){Ie&&u.length===0&&b.length===0&&ze&&M(l.slice(0,L))},[Ie,u,b,ze]),(0,h.useEffect)(function(){var s=function(){H(),Ue(!1)};return document.addEventListener("click",s),function(){return document.removeEventListener("click",s)}},[]);var vn=function(s){en(s),Ue(!0)},He=function(s){var p=[];(s==null?void 0:s.length)>0&&(p=J(s)),M(p),G(s,p),Ee(!1)},pn=h.default.useCallback(ae>0?(0,F.debounce)(function(s){return He(s)},ae):function(s){return He(s)},[l]),mn=function(s){H(),ce(s),P(s[A]),U(0)},J=function(s){return Re.search(s,{limit:L}).map(function(p){return o({},p.item)}).slice(0,L)},gn=function(s){var p=s.target,j=p.value;P(j),pn(j),Ee(!0),V&&Pe(!1)},H=function(){M([]),Pe(!0)},Be=function(s){var p=s.index,j=s.event,B=-1,Ke=function(Q){U(Q),u!=null&&u[Q]&&ue(u[Q])};if(p!==void 0)U(p),u!=null&&u[p]&&ue(u[p]);else if(j)switch(j.key){case"Enter":u.length>0&&u[S]?(j.preventDefault(),ce(u[S]),P(u[S][A]),G(u[S][A],u)):G(b,u),U(-1),H();break;case"ArrowUp":j.preventDefault(),B=S>-1?S-1:u.length-1,Ke(B);break;case"ArrowDown":j.preventDefault(),B=S<u.length-1?S+1:-1,Ke(B);break}};return(0,_.jsx)(R.ThemeProvider,o({theme:hn},{children:(0,_.jsx)(D,o({className:cn},{children:(0,_.jsxs)("div",o({className:"wrapper"},{children:[(0,_.jsx)(x.default,{searchString:b,setSearchString:gn,eraseResults:H,autoFocus:on,onFocus:vn,onClear:nn,placeholder:rn,showIcon:ve,showClear:tn,setHighlightedItem:Be,maxLength:sn}),(0,_.jsx)(O.default,{results:u,onClick:mn,setSearchString:P,showIcon:ve,maxResults:L,resultStringKeyName:A,formatResult:ln,highlightedItem:S,setHighlightedItem:Be,showNoResultsFlag:dn,showNoResultsText:un})]}))}))}))}e.default=I;var D=R.default.div(C||(C=t([`
  position: relative;

  height: `,`;

  .wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;

    border: `,`;
    border-radius: `,`;

    background-color: `,`;
    color: `,`;

    font-size: `,`;
    font-family: `,`;

    z-index: `,`;

    &:hover {
      box-shadow: `,`;
    }
    &:active {
      box-shadow: `,`;
    }
    &:focus-within {
      box-shadow: `,`;
    }
  }
`],[`
  position: relative;

  height: `,`;

  .wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;

    border: `,`;
    border-radius: `,`;

    background-color: `,`;
    color: `,`;

    font-size: `,`;
    font-family: `,`;

    z-index: `,`;

    &:hover {
      box-shadow: `,`;
    }
    &:active {
      box-shadow: `,`;
    }
    &:focus-within {
      box-shadow: `,`;
    }
  }
`])),function(n){return parseInt(n.theme.height)+2+"px"},function(n){return n.theme.border},function(n){return n.theme.borderRadius},function(n){return n.theme.backgroundColor},function(n){return n.theme.color},function(n){return n.theme.fontSize},function(n){return n.theme.fontFamily},function(n){return n.theme.zIndex},function(n){return n.theme.boxShadow},function(n){return n.theme.boxShadow},function(n){return n.theme.boxShadow}),C})(Ze);var qn=a&&a.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ne,"__esModule",{value:!0});var Xn=ne.ReactSearchAutocomplete=void 0,Wn=qn(Ze);Xn=ne.ReactSearchAutocomplete=Wn.default;export{Xn as R};
