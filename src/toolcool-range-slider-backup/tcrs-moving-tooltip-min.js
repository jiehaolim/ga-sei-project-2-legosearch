/* 
Tool Cool Range Slider - Moving Tooltip Plugin
Version: 1.0.3
Documentation: https://github.com/toolcool-org/toolcool-range-slider 
License: MIT License        
Author: Tool Cool, toolcool.org@gmail.com>                          
*/
(()=>{var K=n=>!isNaN(parseFloat(n))&&isFinite(n),a=(n,o)=>K(n)?Number(n):o;var E=n=>n==null?!1:typeof n=="boolean"?n:n.trim().toLowerCase()==="true";window.tcRangeSliderPlugins=window.tcRangeSliderPlugins||[];var L=40,A=35,O=30,k="#475569",G="#fff",W=()=>{let n=null,o=null,d=!1,p=L,v=A,x=O,P=k,I=G,m="",b=[],i=null,T=null,N=()=>{i==null||i.classList.toggle("is-after",p<=0)},q=()=>{var e;let t=(e=n==null?void 0:n.shadowRoot)==null?void 0:e.querySelector("#range-slider");i=document.createElement("div"),i.classList.add("tooltips"),t.prepend(i),N()},H=t=>{let e=document.createElement("div");return e.className=t,e},S=(t,e,u,r)=>{!t||(e==="vertical"?(t.style.left=`${-p}px`,t.style.top=r!=null?r:"0"):(t.style.left=u!=null?u:"0",t.style.top=`${-p}px`),t.style.width=`${v}px`,t.style.height=`${x}px`,t.style.background=P,t.style.color=I)},c=()=>{var r,y,l,g;let t=(r=o==null?void 0:o.getValues())!=null?r:[],e=(y=o==null?void 0:o.getPointerElements())!=null?y:[],u=(l=o==null?void 0:o.getType())!=null?l:"horizontal";if(!!t)for(let s=0;s<t.length;s++){let h=b[s];if(!h)continue;let f=((g=t[s])!=null?g:"").toString();h.textContent=`${f}${m}`,S(h,u,e[s].style.left,e[s].style.top)}},w=()=>{var e;let t=(e=o==null?void 0:o.getValues())!=null?e:[];if(!!t){for(let u=0;u<t.length;u++){let r=H(`tooltip tooltip-${u+1}`);r.style.position="absolute",b.push(r),i==null||i.prepend(r)}c()}},j=()=>{!n||(T=new ResizeObserver(t=>{for(let e of t)c()}),T.observe(n))},C=t=>{d=t,d?(q(),w(),j()):z()},U=t=>{p=t,c()},D=t=>{v=t,c()},M=t=>{x=t,c()},B=t=>{P=t,c()},F=t=>{I=t,c()},R=t=>{m=t,c()},X=t=>{var r,y;if(!d||!t.values)return;let e=(r=o==null?void 0:o.getPointerElements())!=null?r:[],u=(y=o==null?void 0:o.getType())!=null?y:"horizontal";for(let l=0;l<t.values.length;l++){let g=t.values[l],s=b[l];if(g===void 0&&!!s){s.remove(),s[l]=void 0;continue}if(g!==void 0&&!s){let f=H(`tooltip tooltip-${l+1}`),J=(g!=null?g:"").toString();f.textContent=`${J}${m}`,f.style.position="absolute",S(f,u,e[l].style.left,e[l].style.top),b[l]=f,i==null||i.append(f)}if(!s)continue;let h=(g!=null?g:"").toString();s.textContent=`${h}${m}`,S(s,u,e[l].style.left,e[l].style.top)}},z=()=>{i==null||i.remove();for(let t of b)!t||t.remove();b=[],T==null||T.disconnect()};return{get name(){return"Moving Tooltip"},init:(t,e,u,r)=>{n=t,o=r,p=a(t.getAttribute("moving-tooltip-distance-to-pointer"),L),v=a(t.getAttribute("moving-tooltip-width"),A),x=a(t.getAttribute("moving-tooltip-height"),O),P=t.getAttribute("moving-tooltip-bg")||k,I=t.getAttribute("moving-tooltip-text-color")||G,m=t.getAttribute("moving-tooltip-units")||"",C(E(t.getAttribute("moving-tooltip")))},update:X,onAttrChange:(t,e)=>{t==="moving-tooltip"&&C(E(e)),t==="moving-tooltip-distance-to-pointer"&&U(a(e,L)),t==="moving-tooltip-width"&&D(a(e,A)),t==="moving-tooltip-height"&&M(a(e,O)),t==="moving-tooltip-bg"&&B(e),t==="moving-tooltip-text-color"&&F(e),t==="moving-tooltip-units"&&R(e)},gettersAndSetters:[{name:"movingTooltip",attributes:{get(){return d!=null?d:!1},set:t=>{C(E(t))}}},{name:"distanceToPointer",attributes:{get(){return p!=null?p:!1},set:t=>{U(a(t,L))}}},{name:"tooltipWidth",attributes:{get(){return v},set:t=>{D(a(t,A))}}},{name:"tooltipHeight",attributes:{get(){return x},set:t=>{M(a(t,O))}}},{name:"tooltipBg",attributes:{get(){return P},set:t=>{B(t)}}},{name:"tooltipTextColor",attributes:{get(){return I},set:t=>{F(t)}}},{name:"tooltipUnits",attributes:{get(){return m},set:t=>{R(t)}}}],css:`
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
    `,destroy:z}};window.tcRangeSliderPlugins.push(W);var V=W;})();