import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const scenes=[
 {a:0,b:4,title:"UNA NOCHE SIN DORMIR",sub:"Parece que no pasa nada…",color:"#17294b"},
 {a:4,b:8,title:"EL CANSANCIO TE ATRAPA",sub:"Tus ojos pesan. Tu cuerpo se apaga.",color:"#25405c"},
 {a:8,b:12,title:"TU CEREBRO SE RESIENTE",sub:"Concentrarte cuesta cada vez más.",color:"#3b285d"},
 {a:12,b:17,title:"TUS REFLEJOS FALLAN",sub:"Reaccionas tarde. Olvidas cosas.",color:"#542d48"},
 {a:17,b:22,title:"PUEDES ALUCINAR",sub:"Tu mente empieza a confundirse.",color:"#241d42"},
 {a:22,b:27,title:"SIETE DÍAS DESPUÉS",sub:"Tu cuerpo está al límite.",color:"#442d36"},
 {a:27,b:30,title:"DORMIR ES VITAL",sub:"No es un lujo. Es una necesidad.",color:"#173b3b"}
];

const Stickman:React.FC<{f:number; tired:number; x?:number; y?:number; scale?:number; action?:string}> =
({f,tired,x=540,y=1400,scale=1,action="stand"})=>{
 const t=clamp(tired), bob=Math.sin(f*.18)*7*(1-t*.7), lean=t*18;
 const blink=(f%97)<5 || (t>.7&&(f%37)<8);
 const eyeY=-222+t*9, headY=-265+t*18+bob;
 const arm=Math.sin(f*.16)*24;
 const mouth=t>.8?"M-17 -202 Q0 -182 17 -202":t>.45?"M-15 -203 Q0 -190 15 -203":"M-16 -207 Q0 -185 16 -207";
 return <g transform={`translate(${x} ${y+bob}) scale(${scale}) rotate(${lean} 0 -150)`} stroke="#161824" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round">
  <ellipse cx="0" cy="0" rx="94" ry="19" fill="#080d1c" opacity=".28" stroke="none"/>
  <path d="M0 -170 Q-8 -92 0 -15" fill="none"/>
  <path d={action==="sleep"?"M0 -145 Q-45 -120 -88 -155":"M0 -145 Q-70 -112 -92 "+(-65+arm)} fill="none"/>
  <path d={action==="sleep"?"M0 -145 Q45 -120 88 -155":"M0 -145 Q70 -112 92 "+(-65-arm)} fill="none"/>
  <path d="M0 -15 Q-42 48 -58 120 L-75 175 M0 -15 Q42 48 58 120 L75 175" fill="none"/>
  <path d={`M-75 175 q-23 4 -37 -8 M75 175 q23 4 37 -8`} fill="none"/>
  <ellipse cx="0" cy={headY} rx="79" ry="83" fill="#fff" strokeWidth="11"/>
  {action==="sleep"?<g fill="none" strokeWidth="8"><path d={`M-42 ${headY+4} q18 17 36 0 M8 ${headY+4} q18 17 36 0`}/><path d={`M-20 ${headY+43} q20 12 40 0`}/></g>:
   <g>
    <path d={blink?`M-48 ${eyeY} h28 M20 ${eyeY} h28`:`M-48 ${eyeY-14} q20 -17 36 0 M12 ${eyeY-14} q20 -17 36 0`} fill="none" strokeWidth="10"/>
    {!blink&&<><ellipse cx="-30" cy={eyeY+10} rx="13" ry="19" fill="#fff" strokeWidth="4"/><ellipse cx="30" cy={eyeY+10} rx="13" ry="19" fill="#fff" strokeWidth="4"/><circle cx="-27" cy={eyeY+12} r="8" fill="#171824" stroke="none"/><circle cx="27" cy={eyeY+12} r="8" fill="#171824" stroke="none"/><circle cx="-30" cy={eyeY+5} r="3" fill="#fff" stroke="none"/><circle cx="24" cy={eyeY+5} r="3" fill="#fff" stroke="none"/></>}
    <path d={mouth} fill="none" strokeWidth="8"/>
    {t>.55&&<g fill="#e98e9e" stroke="none"><ellipse cx="-53" cy={headY+33} rx="13" ry="8"/><ellipse cx="53" cy={headY+33} rx="13" ry="8"/></g>}
   </g>}
  {t>.25&&<g fill="none" stroke="#79d6f2" strokeWidth="7"><path d={`M-83 ${headY-22} l-20 -16 M83 ${headY-22} l20 -16`}/><path d="M-108 -65 l-13 20"/></g>}
 </g>;
};

const Spark:React.FC<{x:number;y:number;r?:number;color?:string;rot?:number}> = ({x,y,r=30,color="#ffe27a",rot=0})=>
 <path d={`M0 -${r} L${r*.22} -${r*.22} L${r} 0 L${r*.22} ${r*.22} L0 ${r} L-${r*.22} ${r*.22} L-${r} 0 L-${r*.22} -${r*.22}Z`} transform={`translate(${x} ${y}) rotate(${rot})`} fill={color}/>;

export const SleepSevenDays:React.FC=()=>{
 const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const sec=frame/fps;
 const scene=scenes.find(s=>sec>=s.a&&sec<s.b)??scenes[6];
 const t=clamp(sec/22), wobble=sec>17&&sec<22?Math.sin(frame*1.4)*13:0;
 const pulse=1+Math.sin(frame*.12)*.035;
 return <AbsoluteFill style={{backgroundColor:scene.color,fontFamily:"Arial,sans-serif",overflow:"hidden"}}>
  <Audio src={staticFile("sleep-seven-days.mp3")}/>
  <svg viewBox="0 0 1080 1920" width="100%" height="100%">
   <defs>
    <linearGradient id="night" x2="0" y2="1"><stop stopColor="#18213e"/><stop offset="1" stopColor="#080d1d"/></linearGradient>
    <linearGradient id="floor" x2="0" y2="1"><stop stopColor="#52647c"/><stop offset="1" stopColor="#182237"/></linearGradient>
    <radialGradient id="spot"><stop stopColor="#8edfff" stopOpacity=".5"/><stop offset="1" stopColor="#8edfff" stopOpacity="0"/></radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="18"/></filter>
   </defs>
   <rect width="1080" height="1920" fill={scene.color}/>
   <circle cx="550" cy="900" r="650" fill="url(#spot)"/>
   <g opacity=".22" fill="#d9efff">{Array.from({length:35},(_,i)=><circle key={i} cx={(i*191+frame*.55)%1080} cy={(i*277-frame*.7+1920)%1920} r={2+i%4}/>)}</g>
   <path d="M0 1490 Q540 1420 1080 1490 V1920 H0Z" fill="url(#floor)"/>
   <path d="M0 1490 Q540 1420 1080 1490" fill="none" stroke="#b7d9ed" strokeWidth="5" opacity=".5"/>
   <rect x="48" y="70" width="984" height="250" rx="42" fill="#080d1c" opacity=".83" stroke="#fff" strokeOpacity=".2" strokeWidth="3"/>
   <text x="92" y="174" fill="#fff" fontSize="52" fontWeight="900" letterSpacing="1">{scene.title}</text>
   <text x="94" y="250" fill="#d6e6f2" fontSize="31">{scene.sub}</text>
   {sec<4&&<g>
    <rect x="120" y="1110" width="840" height="48" rx="24" fill="#a9bed0"/><path d="M180 1150 v210 M900 1150 v210" stroke="#687b91" strokeWidth="28"/>
    <rect x="175" y="1040" width="330" height="75" rx="34" fill="#dce9f4"/>
    <Stickman f={frame} tired={.08} x={620} y={1120} scale={1.35} action="sleep"/>
    <g fill="#fff" fontWeight="900"><text x="760" y="830" fontSize="78">Z</text><text x="820" y="760" fontSize="50">Z</text></g>
    <g transform="translate(230 710)"><circle r="104" fill="#ffda72"/><circle r="84" fill="#1d2947"/><path d="M0 -60 V-4 L48 22" stroke="#fff" strokeWidth="12" fill="none" strokeLinecap="round"/><circle r="9" fill="#fff"/></g>
   </g>}
   {sec>=4&&sec<8&&<g>
    <g transform="translate(540 920)"><circle r="210" fill="#f5c95d" opacity=".18" filter="url(#glow)"/><circle r="145" fill="#ffd76e" stroke="#fff1b4" strokeWidth="12"/><path d="M-95 -15 Q-65 -75 -35 -15 M35 -15 Q65 -75 95 -15" stroke="#27304a" strokeWidth="15" fill="none" strokeLinecap="round"/><path d="M-58 55 Q0 110 58 55" stroke="#27304a" strokeWidth="14" fill="none" strokeLinecap="round"/></g>
    <Stickman f={frame} tired={.38} x={540} y={1460} scale={1.65}/>
    <g fill="#8fdcf7"><path d="M190 720 l28 -70 28 70z"/><path d="M840 700 l28 -70 28 70z"/></g>
    <g transform="translate(850 1090)"><circle r="98" fill="#fff" stroke="#161824" strokeWidth="10"/><path d="M0 -62 V0 L47 27" stroke="#161824" strokeWidth="12" fill="none" strokeLinecap="round"/></g>
   </g>}
   {sec>=8&&sec<12&&<g>
    <g transform={`translate(540 820) scale(${pulse})`}><path d="M-170 0 C-270 -170 -95 -270 0 -170 C95 -270 270 -170 170 0 C270 160 100 250 0 170 C-100 250 -270 160 -170 0Z" fill="#f28a9a" stroke="#ffd3dc" strokeWidth="12"/><path d="M-125 -70 q60 -85 110 0 q65 -85 130 0 M-130 60 q70 100 130 0 q65 100 130 0" fill="none" stroke="#a83d65" strokeWidth="13"/></g>
    {Array.from({length:8},(_,i)=><Spark key={i} x={180+(i*103)%720} y={610+(i*157)%460} r={18+i%3*8} color="#ffe27a" rot={frame*2+i*30}/>)}
    <Stickman f={frame} tired={.58} x={540} y={1480} scale={1.55}/>
   </g>}
   {sec>=12&&sec<17&&<g>
    <g transform="translate(540 860)"><rect x="-310" y="-170" width="620" height="340" rx="42" fill="#fff" opacity=".13" stroke="#fff" strokeWidth="7"/><path d="M-220 90 L-100 -30 L0 45 L140 -105 L230 -20" fill="none" stroke="#ffcf66" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/><circle cx="140" cy="-105" r="22" fill="#ffcf66"/></g>
    <Stickman f={frame} tired={.82} x={540+wobble} y={1480} scale={1.55}/>
    <g transform="translate(180 1110)"><path d="M0 -75 L22 -22 L80 0 L22 22 L0 75 L-22 22 L-80 0 L-22 -22Z" fill="#ffce69"/></g>
    <g transform="translate(900 1050)"><path d="M0 -75 L22 -22 L80 0 L22 22 L0 75 L-22 22 L-80 0 L-22 -22Z" fill="#ffce69"/></g>
   </g>}
   {sec>=17&&sec<22&&<g transform={`translate(${wobble} 0)`}>
    <path d="M80 880 Q250 650 420 880 T760 880 T1100 880" fill="none" stroke="#b99aff" strokeWidth="17" opacity=".7"/>
    <g transform="translate(250 1030)"><circle r="100" fill="#b99aff" opacity=".2"/><circle r="65" fill="#fff" stroke="#b99aff" strokeWidth="10"/><path d="M-25 -10 l18 18 M25 -10 L7 8 M-22 32 q22 -25 44 0" stroke="#24203a" strokeWidth="9" fill="none"/></g>
    <g transform="translate(825 940)"><circle r="80" fill="#ffcf72" opacity=".22"/><circle r="58" fill="#fff" stroke="#ffcf72" strokeWidth="10"/><path d="M-23 -10 l16 16 M23 -10 L7 6 M-18 30 q18 -20 36 0" stroke="#24203a" strokeWidth="8" fill="none"/></g>
    <Stickman f={frame} tired={1} x={540} y={1480} scale={1.55}/>
    {Array.from({length:7},(_,i)=><text key={i} x={90+i*145} y={600+(i%2)*100} fill="#d5baff" fontSize="74" fontWeight="900">{i%2?"?":"!"}</text>)}
   </g>}
   {sec>=22&&sec<27&&<g>
    <g transform="translate(540 900)"><circle r="260" fill="#ffdf8b" opacity=".15" filter="url(#glow)"/><circle r="215" fill="#fff1c9" stroke="#ffcf70" strokeWidth="20"/><path d="M0 -165 A165 165 0 1 1 -1 -165" fill="none" stroke="#e45e59" strokeWidth="24" strokeLinecap="round"/><path d="M0 0 L0 -130 M0 0 L105 65" stroke="#25243b" strokeWidth="17" strokeLinecap="round"/><circle r="19" fill="#25243b"/></g>
    <text x="540" y="1210" textAnchor="middle" fill="#fff" fontSize="60" fontWeight="900">DÍA 7</text>
    <Stickman f={frame} tired={1} x={540} y={1530} scale={1.4}/>
   </g>}
   {sec>=27&&<g>
    <ellipse cx="540" cy="1450" rx="340" ry="60" fill="#fff" opacity=".12" filter="url(#glow)"/>
    <rect x="120" y="1190" width="840" height="52" rx="26" fill="#b7d5e8"/><path d="M180 1235 v190 M900 1235 v190" stroke="#738ba0" strokeWidth="26"/>
    <rect x="175" y="1110" width="330" height="80" rx="38" fill="#fff"/>
    <Stickman f={frame} tired={0} x={620} y={1190} scale={1.32} action="sleep"/>
    <g fill="#fff" fontWeight="900"><text x="770" y="890" fontSize="82">Z</text><text x="845" y="810" fontSize="54">Z</text></g>
    {Array.from({length:10},(_,i)=><Spark key={i} x={120+i*92} y={650+(i%3)*75} r={15} color="#ffe27a" rot={frame*2+i*25}/>)}
   </g>}
   <rect x="58" y="1775" width="964" height="14" rx="7" fill="#ffffff" opacity=".25"/>
   <rect x="58" y="1775" width={964*sec/30} height="14" rx="7" fill="#ffcf70"/>
   <text x="65" y="1855" fill="#fff" fontSize="32" fontWeight="900" letterSpacing="5">DATO Y RELATO</text>
   <text x="1015" y="1855" textAnchor="end" fill="#e1e9f2" fontSize="28">{String(Math.floor(sec)).padStart(2,"0")} / 30</text>
  </svg>
 </AbsoluteFill>;
};
