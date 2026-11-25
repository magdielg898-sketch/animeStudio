import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const scenes = [
  { a: 0, b: 4, title: "¿7 DÍAS SIN DORMIR?", line: "Todo empieza con una noche en vela" },
  { a: 4, b: 8, title: "PRIMERAS HORAS", line: "El cansancio empieza a vencerte" },
  { a: 8, b: 12, title: "TU CEREBRO FALLA", line: "Concentrarte se vuelve difícil" },
  { a: 12, b: 17, title: "PIERDES EL CONTROL", line: "Tu memoria y tus reflejos empeoran" },
  { a: 17, b: 22, title: "VES LO QUE NO EXISTE", line: "Pueden aparecer alucinaciones" },
  { a: 22, b: 27, title: "SIETE DÍAS DESPUÉS", line: "Tu cuerpo necesita dormir" },
  { a: 27, b: 30, title: "DORMIR ES VITAL", line: "¿Aguantarías siete días?" },
];
const clamp = (n:number) => Math.max(0,Math.min(1,n));

const Person: React.FC<{f:number; tired:number; pose?:string; x?:number; y?:number; s?:number}> = ({f,tired,pose="stand",x=0,y=0,s=1}) => {
 const tiredness=Math.max(0,Math.min(1,tired));
 const bounce=Math.sin(f/4.2)*5*(1-tiredness*.55);
 const sway=Math.sin(f/8)*7;
 const droop=tiredness*28;
 const blink=(f%113)<5 || (tiredness>.6 && (f%49)<7);
 const headY=-205+droop*.25+bounce;
 const squash=1+Math.sin(f/6)*.018;
 const armSwing=Math.sin(f/5.5)*25;
 const eyeY=headY-15;
 const mouth=tiredness>.82?"M-15 "+(headY+24)+" q15 -8 30 0":tiredness>.5?"M-15 "+(headY+25)+" q15 16 30 0":"M-15 "+(headY+22)+" q15 18 30 0";
 return <g transform={`translate(${x} ${y+sway}) scale(${s})`} stroke="#171717" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
  <ellipse cx="0" cy={headY} rx={48*squash} ry={48/squash} fill="#fff"/>
  {pose==="sleep" ? <><path d={`M-24 ${headY-5} q10 10 20 0 M7 ${headY-5} q10 10 20 0`} strokeWidth="6"/><path d={`M-13 ${headY+22} q13 8 26 0`} strokeWidth="5"/></> :
   <><path d={blink?`M-24 ${eyeY} h12 M12 ${eyeY} h12`:`M-18 ${eyeY-6} q7 -9 14 0 M11 ${eyeY-6} q7 -9 14 0`} strokeWidth="7"/>
    <circle cx="-17" cy={eyeY+2} r={blink?0:5} fill="#171717" stroke="none"/><circle cx="17" cy={eyeY+2} r={blink?0:5} fill="#171717" stroke="none"/>
    <path d={mouth} strokeWidth="6"/>
   </>}
  <path d={`M0 ${headY+48} Q${-droop*.4} -65 0 15`}/>
  {pose==="sit" ? <><path d="M0 -90 L-68 -35 L-70 15 M0 -90 L65 -40 L65 10"/><path d="M0 15 L-40 85 L-105 85 M0 15 L45 75 L105 75"/></> :
   <><path d={`M0 -100 Q-65 ${-70+armSwing} -75 -18`}/><path d={`M0 -100 Q65 ${-70-armSwing} 75 -18`}/><path d={`M0 15 L${-42+Math.sin(f/5)*10} 105 L${-52+Math.sin(f/5)*18} 180 M0 15 L${42-Math.sin(f/5)*10} 105 L${52-Math.sin(f/5)*18} 180`}/></>}
  <circle cx="-75" cy="-18" r="7" fill="#fff" strokeWidth="4"/><circle cx="75" cy="-18" r="7" fill="#fff" strokeWidth="4"/>
  {tiredness>.25 && <g stroke="#5aa5d6" strokeWidth="5"><path d={`M-49 ${headY-25} l-12 -12 M49 ${headY-25} l12 -12`}/><path d="M-86 -5 l-13 14"/></g>}
  {tiredness>.7 && <g fill="#e6a0a0" stroke="none"><ellipse cx="-31" cy={headY+12} rx="9" ry="5"/><ellipse cx="31" cy={headY+12} rx="9" ry="5"/></g>}
 </g>;
};

export const SleepSevenDays: React.FC = () => {
 const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const sec=frame/fps;
 const scene=scenes.find(v=>sec>=v.a&&sec<v.b)??scenes[6];
 const tired=clamp(sec/23); const pulse=1+Math.sin(frame/5)*.035;
 const shake=sec>17&&sec<22?Math.sin(frame*1.7)*12:0;
 const bg=sec<8?"#17243a":sec<17?"#182b3d":sec<22?"#241d38":"#172b32";
 const cameraZoom=1.025+Math.sin(sec*.55)*.018+(sec>17&&sec<22?.035:0);
 const cameraX=Math.sin(sec*.8)*9;
 return <AbsoluteFill style={{backgroundColor:bg,fontFamily:"Arial,sans-serif",overflow:"hidden"}}>
  <Audio src={staticFile("sleep-seven-days.mp3")}/>
  <svg viewBox="0 0 1080 1920" width="100%" height="100%" style={{transform:`translateX(${cameraX}px) scale(${cameraZoom})`,transformOrigin:"50% 50%"}}>
   <defs>
    <linearGradient id="floor" x2="0" y2="1"><stop offset="0" stopColor="#34475a"/><stop offset="1" stopColor="#101a29"/></linearGradient>
    <radialGradient id="ambience"><stop offset="0" stopColor="#6da5c8" stopOpacity=".42"/><stop offset="1" stopColor="#101a29" stopOpacity="0"/></radialGradient>
    <linearGradient id="topGlow" x2="0" y2="1"><stop offset="0" stopColor="#83c8e8" stopOpacity=".22"/><stop offset="1" stopColor="#83c8e8" stopOpacity="0"/></linearGradient>
    <filter id="shadow"><feGaussianBlur stdDeviation="12"/></filter>
   </defs>
   <rect width="1080" height="1920" fill={bg}/>
   <circle cx="850" cy="470" r="440" fill="url(#ambience)"/>
   <rect width="1080" height="950" fill="url(#topGlow)"/>
   <path d="M0 0 L390 0 L0 920Z M1080 0 L690 0 L1080 920Z" fill="#9bdcff" opacity=".035"/>
   <g opacity=".16" fill="#bdeaff">{Array.from({length:22},(_,i)=><circle key={i} cx={(i*173+frame*0.7)%1080} cy={(i*257-frame*1.2+1920)%1920} r={2+(i%3)} />)}</g>
   <path d="M0 1450 Q540 1400 1080 1450 V1920 H0Z" fill="url(#floor)"/>
   <path d="M0 1480 Q540 1430 1080 1480" stroke="#8bc5e5" strokeWidth="3" opacity=".22" fill="none"/>
   <path d="M0 1450 Q540 1400 1080 1450" stroke="#bcb9b1" strokeWidth="5" fill="none"/>
   <g transform="translate(0 0)">
    <rect x="55" y="90" width="970" height="245" rx="38" fill="#081321" opacity=".94" stroke="#8bc5e5" strokeOpacity=".24" strokeWidth="3"/>
    <text x="95" y="195" fill="#f4fbff" fontSize="54" fontWeight="900">{scene.title}</text>
    <text x="95" y="270" fill="#a9c8dc" fontSize="31">{scene.line}</text>
   </g>
   {sec<4 && <g transform="translate(0 0)">
    <rect x="125" y="1110" width="830" height="35" rx="18" fill="#8d7767"/>
    <path d="M175 1145 v185 M900 1145 v185" stroke="#59483d" strokeWidth="22"/>
    <rect x="170" y="1040" width="320" height="78" rx="38" fill="#fff"/>
    <Person f={frame} tired={.1} pose="sleep" x={560} y={1090} s={1.65}/>
    <g fill="#171717" fontSize="55" fontWeight="bold"><text x="720" y="850">Z</text><text x="775" y="790" fontSize="40">Z</text></g>
   </g>}
   {sec>=4&&sec<8 && <g>
    <ellipse cx="540" cy="1335" rx="230" ry="35" fill="#888" opacity=".2" filter="url(#shadow)"/>
    <Person f={frame} tired={.3} x={540} y={1320} s={2.05}/>
    <g transform="translate(810 1020)"><circle r="105" fill="#fff" stroke="#171717" strokeWidth="9"/><path d="M0 0 L0 -70 M0 0 L58 28" stroke="#171717" strokeWidth="10" strokeLinecap="round"/><path d="M-22 -126 H22" stroke="#d94841" strokeWidth="12"/></g>
    <text x="540" y="1600" textAnchor="middle" fontSize="34" fill="#555">02:47 A. M.</text>
   </g>}
   {sec>=8&&sec<12 && <g>
    <g transform="translate(540 820) scale(1.2)"><path d="M-120 0 C-220 -140 -90 -250 0 -170 C90 -250 220 -140 120 0 C190 110 70 210 0 150 C-70 210 -190 110 -120 0Z" fill="#f1a0a0" stroke="#a53d49" strokeWidth="9"/><path d="M-100 -35 q45 -90 85 0 q45 -90 85 0 M-100 50 q45 90 85 0 q45 90 85 0" stroke="#a53d49" strokeWidth="8" fill="none"/></g>
    <Person f={frame} tired={.55} x={540} y={1420} s={1.65}/>
    <g fill="#ff765e"><path d="M210 700 l30 -50 30 50z"/><path d="M800 700 l30 -50 30 50z"/></g>
   </g>}
   {sec>=12&&sec<17 && <g>
    <rect x="150" y="1060" width="780" height="20" rx="10" fill="#b9b5ae"/>
    <rect x="190" y="1080" width="24" height="240" fill="#8e8981"/><rect x="865" y="1080" width="24" height="240" fill="#8e8981"/>
    <Person f={frame} tired={.8} pose="sit" x={540} y={1260} s={1.9}/>
    <g transform="translate(540 760)"><path d="M-150 0 H150" stroke="#d94841" strokeWidth="12" strokeLinecap="round"/><path d="M0 -120 V120" stroke="#d94841" strokeWidth="12" strokeLinecap="round"/><circle r="90" fill="none" stroke="#d94841" strokeWidth="8" strokeDasharray="18 16"/></g>
   </g>}
   {sec>=17&&sec<22 && <g transform={`translate(${shake} 0)`}>
    <path d="M130 820 q90 -160 180 0 t180 0 t180 0 t180 0" stroke="#b08bd5" strokeWidth="13" fill="none" opacity=".7"/>
    <g transform="translate(250 1040)"><circle r="62" fill="#fff" stroke="#8d6bb3" strokeWidth="9"/><path d="M-25 -10 l18 15 M25 -10 L7 5 M-18 32 q18 -20 36 0" stroke="#171717" strokeWidth="7" fill="none"/></g>
    <g transform="translate(820 980)"><circle r="52" fill="#fff" stroke="#8d6bb3" strokeWidth="9"/><path d="M-20 -8 l15 12 M20 -8 L5 4 M-15 25 q15 -15 30 0" stroke="#171717" strokeWidth="6" fill="none"/></g>
    <Person f={frame} tired={1} x={540} y={1420} s={1.8}/>
    <g fill="#8d6bb3" fontSize="75" fontWeight="bold"><text x="150" y="700">?</text><text x="840" y="760">?</text></g>
   </g>}
   {sec>=22&&sec<27 && <g>
    <circle cx="540" cy="960" r="250" fill="#fff" stroke="#d8d4cc" strokeWidth="8"/>
    <g transform="translate(540 960)"><path d="M0 -175 A175 175 0 1 1 -1 -175" fill="none" stroke="#d94841" strokeWidth="24" strokeLinecap="round"/><path d="M0 0 L0 -125 M0 0 L100 60" stroke="#171717" strokeWidth="14" strokeLinecap="round"/><circle r="18" fill="#171717"/></g>
    <Person f={frame} tired={1} x={540} y={1450} s={1.55}/>
    <text x="540" y="1280" textAnchor="middle" fill="#171717" fontSize="38" fontWeight="bold">DÍA 7</text>
   </g>}
   {sec>=27 && <g>
    <ellipse cx="540" cy="1410" rx="250" ry="35" fill="#888" opacity=".18"/>
    <rect x="160" y="1190" width="760" height="32" rx="16" fill="#8d7767"/>
    <path d="M210 1222 v140 M870 1222 v140" stroke="#59483d" strokeWidth="20"/>
    <rect x="200" y="1115" width="310" height="80" rx="38" fill="#fff"/>
    <Person f={frame} tired={0} pose="sleep" x={560} y={1160} s={1.7}/>
    <g fill="#171717" fontSize="60" fontWeight="bold"><text x="735" y="900">Z</text><text x="795" y="840" fontSize="42">Z</text></g>
   </g>}
   <rect x="70" y="1775" width="940" height="12" rx="6" fill="#577083"/>
   <rect x="70" y="1775" width={940*sec/30} height="12" rx="6" fill="#d94841"/>
   <text x="75" y="1850" fill="#d8edf8" fontSize="30" fontWeight="700" letterSpacing="6">DATO Y RELATO</text>
   <text x="1005" y="1850" textAnchor="end" fill="#a9c8dc" fontSize="28">{String(Math.floor(sec)).padStart(2,"0")} / 30</text>
  </svg>
 </AbsoluteFill>;
};