/* 
Tool Cool Range Slider - Moving Tooltip Plugin
Version: 1.0.3
Documentation: https://github.com/toolcool-org/toolcool-range-slider 
License: MIT License        
Author: Tool Cool, toolcool.org@gmail.com>                          
*/
(()=>{var Z=n=>!isNaN(parseFloat(n))&&isFinite(n),p=(n,o)=>Z(n)?Number(n):o;var L=n=>n==null?!1:typeof n=="boolean"?n:n.trim().toLowerCase()==="true";window.tcRangeSliderPlugins=window.tcRangeSliderPlugins||[];var A=40,U=35,O=30,q="#475569",N="#fff",j=()=>{let n=null,o=null,d=!1,c=A,h=U,x=O,P=q,I=N,T="",E="",m=[],i=null,b=null,w=()=>{i==null||i.classList.toggle("is-after",c<=0)},X=()=>{var e;let t=(e=n==null?void 0:n.shadowRoot)==null?void 0:e.querySelector("#range-slider");i=document.createElement("div"),i.classList.add("tooltips"),t.prepend(i),w()},D=t=>{let e=document.createElement("div");return e.className=t,e},S=(t,e,u,r)=>{!t||(e==="vertical"?(t.style.left=`${-c}px`,t.style.top=r!=null?r:"0"):(t.style.left=u!=null?u:"0",t.style.top=`${-c}px`),t.style.width=`${h}px`,t.style.height=`${x}px`,t.style.background=P,t.style.color=I)},C=t=>E==="prefix"?`${T}${t}`:`${t}${T}`,a=()=>{var r,y,s,g;let t=(r=o==null?void 0:o.getValues())!=null?r:[],e=(y=o==null?void 0:o.getPointerElements())!=null?y:[],u=(s=o==null?void 0:o.getType())!=null?s:"horizontal";if(!!t)for(let l=0;l<t.length;l++){let v=m[l];if(!v)continue;let f=((g=t[l])!=null?g:"").toString();v.textContent=C(f),S(v,u,e[l].style.left,e[l].style.top)}},J=()=>{var e;let t=(e=o==null?void 0:o.getValues())!=null?e:[];if(!!t){for(let u=0;u<t.length;u++){let r=D(`tooltip tooltip-${u+1}`);r.style.position="absolute",m.push(r),i==null||i.prepend(r)}a()}},K=()=>{!n||(b=new ResizeObserver(t=>{for(let e of t)a()}),b.observe(n))},H=t=>{d=t,d?(X(),J(),K()):W()},M=t=>{c=t,a()},B=t=>{h=t,a()},F=t=>{x=t,a()},R=t=>{P=t,a()},z=t=>{I=t,a()},k=t=>{T=t,a()},G=t=>{E=t,a()},Q=t=>{var r,y;if(!d||!t.values)return;let e=(r=o==null?void 0:o.getPointerElements())!=null?r:[],u=(y=o==null?void 0:o.getType())!=null?y:"horizontal";for(let s=0;s<t.values.length;s++){let g=t.values[s],l=m[s];if(g===void 0&&!!l){l.remove(),l[s]=void 0;continue}if(g!==void 0&&!l){let f=D(`tooltip tooltip-${s+1}`),Y=(g!=null?g:"").toString();f.textContent=C(Y),f.style.position="absolute",S(f,u,e[s].style.left,e[s].style.top),m[s]=f,i==null||i.append(f)}if(!l)continue;let v=(g!=null?g:"").toString();l.textContent=C(v),S(l,u,e[s].style.left,e[s].style.top)}},W=()=>{i==null||i.remove();for(let t of m)!t||t.remove();m=[],b==null||b.disconnect()};return{get name(){return"Moving Tooltip"},init:(t,e,u,r)=>{n=t,o=r,c=p(t.getAttribute("moving-tooltip-distance-to-pointer"),A),h=p(t.getAttribute("moving-tooltip-width"),U),x=p(t.getAttribute("moving-tooltip-height"),O),P=t.getAttribute("moving-tooltip-bg")||q,I=t.getAttribute("moving-tooltip-text-color")||N,T=t.getAttribute("moving-tooltip-units")||"",E=t.getAttribute("moving-tooltip-units-type")||"",H(L(t.getAttribute("moving-tooltip")))},update:Q,onAttrChange:(t,e)=>{t==="moving-tooltip"&&H(L(e)),t==="moving-tooltip-distance-to-pointer"&&M(p(e,A)),t==="moving-tooltip-width"&&B(p(e,U)),t==="moving-tooltip-height"&&F(p(e,O)),t==="moving-tooltip-bg"&&R(e),t==="moving-tooltip-text-color"&&z(e),t==="moving-tooltip-units"&&k(e),t==="moving-tooltip-units-type"&&G(e)},gettersAndSetters:[{name:"movingTooltip",attributes:{get(){return d!=null?d:!1},set:t=>{H(L(t))}}},{name:"distanceToPointer",attributes:{get(){return c!=null?c:!1},set:t=>{M(p(t,A))}}},{name:"tooltipWidth",attributes:{get(){return h},set:t=>{B(p(t,U))}}},{name:"tooltipHeight",attributes:{get(){return x},set:t=>{F(p(t,O))}}},{name:"tooltipBg",attributes:{get(){return P},set:t=>{R(t)}}},{name:"tooltipTextColor",attributes:{get(){return I},set:t=>{z(t)}}},{name:"tooltipUnits",attributes:{get(){return T},set:t=>{k(t)}}},{name:"tooltipUnitType",attributes:{get(){return E},set:t=>{G(t)}}}],css:`
.tooltip{
  background: #475569;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translate(-50%, -50%);
  pointer-events: none;
}  

.tooltip::after {
    content: '';
    position: absolute;
    width: 20%;
    height: 20%;
    transform: translate(0%, -50%) rotate(45deg);
    background-color: inherit;
    z-index: -1;
    top: 100%;
}

.is-after .tooltip::after {
  top: 0;
}

.type-vertical .tooltip::after{
  transform: translate(-50%, 0%) rotate(45deg);
  left: 100%;
  top: auto;
}

.type-vertical .is-after .tooltip::after{
  left: 0%;
}

.animate-on-click .tooltip{
    transition: all var(--animate-onclick);
}
    `,destroy:W}};window.tcRangeSliderPlugins.push(j);var et=j;})();