import{g as at}from"./@babel-DKaM8VOn.js";function I(e){return Array.isArray?Array.isArray(e):et(e)==="[object Array]"}const lt=1/0;function ut(e){if(typeof e=="string")return e;let t=e+"";return t=="0"&&1/e==-lt?"-0":t}function ft(e){return e==null?"":ut(e)}function E(e){return typeof e=="string"}function q(e){return typeof e=="number"}function dt(e){return e===!0||e===!1||gt(e)&&et(e)=="[object Boolean]"}function tt(e){return typeof e=="object"}function gt(e){return tt(e)&&e!==null}function M(e){return e!=null}function P(e){return!e.trim().length}function et(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const pt="Incorrect 'index' type",Mt=e=>`Invalid value for key ${e}`,mt=e=>`Pattern length exceeds max of ${e}.`,xt=e=>`Missing ${e} property in key`,_t=e=>`Property 'weight' in key '${e}' must be a positive integer`,U=Object.prototype.hasOwnProperty;class Et{constructor(t){this._keys=[],this._keyMap={};let s=0;t.forEach(n=>{let r=st(n);s+=r.weight,this._keys.push(r),this._keyMap[r.id]=r,s+=r.weight}),this._keys.forEach(n=>{n.weight/=s})}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function st(e){let t=null,s=null,n=null,r=1,i=null;if(E(e)||I(e))n=e,t=Q(e),s=K(e);else{if(!U.call(e,"name"))throw new Error(xt("name"));const c=e.name;if(n=c,U.call(e,"weight")&&(r=e.weight,r<=0))throw new Error(_t(c));t=Q(c),s=K(c),i=e.getFn}return{path:t,id:s,weight:r,src:n,getFn:i}}function Q(e){return I(e)?e:e.split(".")}function K(e){return I(e)?e.join("."):e}function yt(e,t){let s=[],n=!1;const r=(i,c,o)=>{if(M(i))if(!c[o])s.push(i);else{let h=c[o];const a=i[h];if(!M(a))return;if(o===c.length-1&&(E(a)||q(a)||dt(a)))s.push(ft(a));else if(I(a)){n=!0;for(let l=0,f=a.length;l<f;l+=1)r(a[l],c,o+1)}else c.length&&r(a,c,o+1)}};return r(e,E(t)?t.split("."):t,0),n?s:s[0]}const It={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},St={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1},At={location:0,threshold:.6,distance:100},wt={useExtendedSearch:!1,getFn:yt,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var u={...St,...It,...At,...wt};const Lt=/[^ ]+/g;function bt(e=1,t=3){const s=new Map,n=Math.pow(10,t);return{get(r){const i=r.match(Lt).length;if(s.has(i))return s.get(i);const c=1/Math.pow(i,.5*e),o=parseFloat(Math.round(c*n)/n);return s.set(i,o),o},clear(){s.clear()}}}class V{constructor({getFn:t=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){this.norm=bt(s,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach((s,n)=>{this._keysMap[s.id]=n})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,E(this.docs[0])?this.docs.forEach((t,s)=>{this._addString(t,s)}):this.docs.forEach((t,s)=>{this._addObject(t,s)}),this.norm.clear())}add(t){const s=this.size();E(t)?this._addString(t,s):this._addObject(t,s)}removeAt(t){this.records.splice(t,1);for(let s=t,n=this.size();s<n;s+=1)this.records[s].i-=1}getValueForItemAtKeyId(t,s){return t[this._keysMap[s]]}size(){return this.records.length}_addString(t,s){if(!M(t)||P(t))return;let n={v:t,i:s,n:this.norm.get(t)};this.records.push(n)}_addObject(t,s){let n={i:s,$:{}};this.keys.forEach((r,i)=>{let c=r.getFn?r.getFn(t):this.getFn(t,r.path);if(M(c)){if(I(c)){let o=[];const h=[{nestedArrIndex:-1,value:c}];for(;h.length;){const{nestedArrIndex:a,value:l}=h.pop();if(M(l))if(E(l)&&!P(l)){let f={v:l,i:a,n:this.norm.get(l)};o.push(f)}else I(l)&&l.forEach((f,d)=>{h.push({nestedArrIndex:d,value:f})})}n.$[i]=o}else if(E(c)&&!P(c)){let o={v:c,n:this.norm.get(c)};n.$[i]=o}}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function nt(e,t,{getFn:s=u.getFn,fieldNormWeight:n=u.fieldNormWeight}={}){const r=new V({getFn:s,fieldNormWeight:n});return r.setKeys(e.map(st)),r.setSources(t),r.create(),r}function Rt(e,{getFn:t=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){const{keys:n,records:r}=e,i=new V({getFn:t,fieldNormWeight:s});return i.setKeys(n),i.setIndexRecords(r),i}function C(e,{errors:t=0,currentLocation:s=0,expectedLocation:n=0,distance:r=u.distance,ignoreLocation:i=u.ignoreLocation}={}){const c=t/e.length;if(i)return c;const o=Math.abs(n-s);return r?c+o/r:o?1:c}function Nt(e=[],t=u.minMatchCharLength){let s=[],n=-1,r=-1,i=0;for(let c=e.length;i<c;i+=1){let o=e[i];o&&n===-1?n=i:!o&&n!==-1&&(r=i-1,r-n+1>=t&&s.push([n,r]),n=-1)}return e[i-1]&&i-n>=t&&s.push([n,i-1]),s}const R=32;function Ot(e,t,s,{location:n=u.location,distance:r=u.distance,threshold:i=u.threshold,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,includeMatches:h=u.includeMatches,ignoreLocation:a=u.ignoreLocation}={}){if(t.length>R)throw new Error(mt(R));const l=t.length,f=e.length,d=Math.max(0,Math.min(n,f));let g=i,p=d;const m=o>1||h,L=m?Array(f):[];let y;for(;(y=e.indexOf(t,p))>-1;){let x=C(t,{currentLocation:y,expectedLocation:d,distance:r,ignoreLocation:a});if(g=Math.min(x,g),p=y+l,m){let S=0;for(;S<l;)L[y+S]=1,S+=1}}p=-1;let N=[],b=1,k=l+f;const ht=1<<l-1;for(let x=0;x<l;x+=1){let S=0,A=k;for(;S<A;)C(t,{errors:x,currentLocation:d+A,expectedLocation:d,distance:r,ignoreLocation:a})<=g?S=A:k=A,A=Math.floor((k-S)/2+S);k=A;let Y=Math.max(1,d-A+1),j=c?f:Math.min(d+A,f)+l,O=Array(j+2);O[j+1]=(1<<x)-1;for(let _=j;_>=Y;_-=1){let v=_-1,G=s[e.charAt(v)];if(m&&(L[v]=+!!G),O[_]=(O[_+1]<<1|1)&G,x&&(O[_]|=(N[_+1]|N[_])<<1|1|N[_+1]),O[_]&ht&&(b=C(t,{errors:x,currentLocation:v,expectedLocation:d,distance:r,ignoreLocation:a}),b<=g)){if(g=b,p=v,p<=d)break;Y=Math.max(1,2*d-p)}}if(C(t,{errors:x+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:a})>g)break;N=O}const F={isMatch:p>=0,score:Math.max(.001,b)};if(m){const x=Nt(L,o);x.length?h&&(F.indices=x):F.isMatch=!1}return F}function $t(e){let t={};for(let s=0,n=e.length;s<n;s+=1){const r=e.charAt(s);t[r]=(t[r]||0)|1<<n-s-1}return t}class rt{constructor(t,{location:s=u.location,threshold:n=u.threshold,distance:r=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:h=u.isCaseSensitive,ignoreLocation:a=u.ignoreLocation}={}){if(this.options={location:s,threshold:n,distance:r,includeMatches:i,findAllMatches:c,minMatchCharLength:o,isCaseSensitive:h,ignoreLocation:a},this.pattern=h?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(d,g)=>{this.chunks.push({pattern:d,alphabet:$t(d),startIndex:g})},f=this.pattern.length;if(f>R){let d=0;const g=f%R,p=f-g;for(;d<p;)l(this.pattern.substr(d,R),d),d+=R;if(g){const m=f-R;l(this.pattern.substr(m),m)}}else l(this.pattern,0)}searchIn(t){const{isCaseSensitive:s,includeMatches:n}=this.options;if(s||(t=t.toLowerCase()),this.pattern===t){let p={isMatch:!0,score:0};return n&&(p.indices=[[0,t.length-1]]),p}const{location:r,distance:i,threshold:c,findAllMatches:o,minMatchCharLength:h,ignoreLocation:a}=this.options;let l=[],f=0,d=!1;this.chunks.forEach(({pattern:p,alphabet:m,startIndex:L})=>{const{isMatch:y,score:N,indices:b}=Ot(t,p,m,{location:r+L,distance:i,threshold:c,findAllMatches:o,minMatchCharLength:h,includeMatches:n,ignoreLocation:a});y&&(d=!0),f+=N,y&&b&&(l=[...l,...b])});let g={isMatch:d,score:d?f/this.chunks.length:1};return d&&n&&(g.indices=l),g}}class w{constructor(t){this.pattern=t}static isMultiMatch(t){return X(t,this.multiRegex)}static isSingleMatch(t){return X(t,this.singleRegex)}search(){}}function X(e,t){const s=e.match(t);return s?s[1]:null}class kt extends w{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const s=t===this.pattern;return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class vt extends w{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const n=t.indexOf(this.pattern)===-1;return{isMatch:n,score:n?0:1,indices:[0,t.length-1]}}}class Ct extends w{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const s=t.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class Tt extends w{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const s=!t.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}}class Ft extends w{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const s=t.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[t.length-this.pattern.length,t.length-1]}}}class jt extends w{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const s=!t.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}}class it extends w{constructor(t,{location:s=u.location,threshold:n=u.threshold,distance:r=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:h=u.isCaseSensitive,ignoreLocation:a=u.ignoreLocation}={}){super(t),this._bitapSearch=new rt(t,{location:s,threshold:n,distance:r,includeMatches:i,findAllMatches:c,minMatchCharLength:o,isCaseSensitive:h,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class ct extends w{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let s=0,n;const r=[],i=this.pattern.length;for(;(n=t.indexOf(this.pattern,s))>-1;)s=n+i,r.push([n,s-1]);const c=!!r.length;return{isMatch:c,score:c?0:1,indices:r}}}const D=[kt,ct,Ct,Tt,jt,Ft,vt,it],J=D.length,Pt=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,Kt="|";function Dt(e,t={}){return e.split(Kt).map(s=>{let n=s.trim().split(Pt).filter(i=>i&&!!i.trim()),r=[];for(let i=0,c=n.length;i<c;i+=1){const o=n[i];let h=!1,a=-1;for(;!h&&++a<J;){const l=D[a];let f=l.isMultiMatch(o);f&&(r.push(new l(f,t)),h=!0)}if(!h)for(a=-1;++a<J;){const l=D[a];let f=l.isSingleMatch(o);if(f){r.push(new l(f,t));break}}}return r})}const Wt=new Set([it.type,ct.type]);class zt{constructor(t,{isCaseSensitive:s=u.isCaseSensitive,includeMatches:n=u.includeMatches,minMatchCharLength:r=u.minMatchCharLength,ignoreLocation:i=u.ignoreLocation,findAllMatches:c=u.findAllMatches,location:o=u.location,threshold:h=u.threshold,distance:a=u.distance}={}){this.query=null,this.options={isCaseSensitive:s,includeMatches:n,minMatchCharLength:r,findAllMatches:c,ignoreLocation:i,location:o,threshold:h,distance:a},this.pattern=s?t:t.toLowerCase(),this.query=Dt(this.pattern,this.options)}static condition(t,s){return s.useExtendedSearch}searchIn(t){const s=this.query;if(!s)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:r}=this.options;t=r?t:t.toLowerCase();let i=0,c=[],o=0;for(let h=0,a=s.length;h<a;h+=1){const l=s[h];c.length=0,i=0;for(let f=0,d=l.length;f<d;f+=1){const g=l[f],{isMatch:p,indices:m,score:L}=g.search(t);if(p){if(i+=1,o+=L,n){const y=g.constructor.type;Wt.has(y)?c=[...c,...m]:c.push(m)}}else{o=0,i=0,c.length=0;break}}if(i){let f={isMatch:!0,score:o/i};return n&&(f.indices=c),f}}return{isMatch:!1,score:1}}}const W=[];function Bt(...e){W.push(...e)}function z(e,t){for(let s=0,n=W.length;s<n;s+=1){let r=W[s];if(r.condition(e,t))return new r(e,t)}return new rt(e,t)}const T={AND:"$and",OR:"$or"},B={PATH:"$path",PATTERN:"$val"},H=e=>!!(e[T.AND]||e[T.OR]),Ht=e=>!!e[B.PATH],Vt=e=>!I(e)&&tt(e)&&!H(e),Z=e=>({[T.AND]:Object.keys(e).map(t=>({[t]:e[t]}))});function ot(e,t,{auto:s=!0}={}){const n=r=>{let i=Object.keys(r);const c=Ht(r);if(!c&&i.length>1&&!H(r))return n(Z(r));if(Vt(r)){const h=c?r[B.PATH]:i[0],a=c?r[B.PATTERN]:r[h];if(!E(a))throw new Error(Mt(h));const l={keyId:K(h),pattern:a};return s&&(l.searcher=z(a,t)),l}let o={children:[],operator:i[0]};return i.forEach(h=>{const a=r[h];I(a)&&a.forEach(l=>{o.children.push(n(l))})}),o};return H(e)||(e=Z(e)),n(e)}function Yt(e,{ignoreFieldNorm:t=u.ignoreFieldNorm}){e.forEach(s=>{let n=1;s.matches.forEach(({key:r,norm:i,score:c})=>{const o=r?r.weight:null;n*=Math.pow(c===0&&o?Number.EPSILON:c,(o||1)*(t?1:i))}),s.score=n})}function Gt(e,t){const s=e.matches;t.matches=[],M(s)&&s.forEach(n=>{if(!M(n.indices)||!n.indices.length)return;const{indices:r,value:i}=n;let c={indices:r,value:i};n.key&&(c.key=n.key.src),n.idx>-1&&(c.refIndex=n.idx),t.matches.push(c)})}function Ut(e,t){t.score=e.score}function Qt(e,t,{includeMatches:s=u.includeMatches,includeScore:n=u.includeScore}={}){const r=[];return s&&r.push(Gt),n&&r.push(Ut),e.map(i=>{const{idx:c}=i,o={item:t[c],refIndex:c};return r.length&&r.forEach(h=>{h(i,o)}),o})}class ${constructor(t,s={},n){this.options={...u,...s},this.options.useExtendedSearch,this._keyStore=new Et(this.options.keys),this.setCollection(t,n)}setCollection(t,s){if(this._docs=t,s&&!(s instanceof V))throw new Error(pt);this._myIndex=s||nt(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){M(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=()=>!1){const s=[];for(let n=0,r=this._docs.length;n<r;n+=1){const i=this._docs[n];t(i,n)&&(this.removeAt(n),n-=1,r-=1,s.push(i))}return s}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:s=-1}={}){const{includeMatches:n,includeScore:r,shouldSort:i,sortFn:c,ignoreFieldNorm:o}=this.options;let h=E(t)?E(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return Yt(h,{ignoreFieldNorm:o}),i&&h.sort(c),q(s)&&s>-1&&(h=h.slice(0,s)),Qt(h,this._docs,{includeMatches:n,includeScore:r})}_searchStringList(t){const s=z(t,this.options),{records:n}=this._myIndex,r=[];return n.forEach(({v:i,i:c,n:o})=>{if(!M(i))return;const{isMatch:h,score:a,indices:l}=s.searchIn(i);h&&r.push({item:i,idx:c,matches:[{score:a,value:i,norm:o,indices:l}]})}),r}_searchLogical(t){const s=ot(t,this.options),n=(o,h,a)=>{if(!o.children){const{keyId:f,searcher:d}=o,g=this._findMatches({key:this._keyStore.get(f),value:this._myIndex.getValueForItemAtKeyId(h,f),searcher:d});return g&&g.length?[{idx:a,item:h,matches:g}]:[]}const l=[];for(let f=0,d=o.children.length;f<d;f+=1){const g=o.children[f],p=n(g,h,a);if(p.length)l.push(...p);else if(o.operator===T.AND)return[]}return l},r=this._myIndex.records,i={},c=[];return r.forEach(({$:o,i:h})=>{if(M(o)){let a=n(s,o,h);a.length&&(i[h]||(i[h]={idx:h,item:o,matches:[]},c.push(i[h])),a.forEach(({matches:l})=>{i[h].matches.push(...l)}))}}),c}_searchObjectList(t){const s=z(t,this.options),{keys:n,records:r}=this._myIndex,i=[];return r.forEach(({$:c,i:o})=>{if(!M(c))return;let h=[];n.forEach((a,l)=>{h.push(...this._findMatches({key:a,value:c[l],searcher:s}))}),h.length&&i.push({idx:o,item:c,matches:h})}),i}_findMatches({key:t,value:s,searcher:n}){if(!M(s))return[];let r=[];if(I(s))s.forEach(({v:i,i:c,n:o})=>{if(!M(i))return;const{isMatch:h,score:a,indices:l}=n.searchIn(i);h&&r.push({score:a,key:t,value:i,idx:c,norm:o,indices:l})});else{const{v:i,n:c}=s,{isMatch:o,score:h,indices:a}=n.searchIn(i);o&&r.push({score:h,key:t,value:i,norm:c,indices:a})}return r}}$.version="6.6.2";$.createIndex=nt;$.parseIndex=Rt;$.config=u;$.parseQuery=ot;Bt(zt);const Xt=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"})),qt=at(Xt);export{qt as r};
