import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const beats = [
  { start: 0, end: 4, caption: "¿7 DÍAS SIN DORMIR?", sub: "El cuerpo empieza a pasar factura" },
  { start: 4, end: 8, caption: "PRIMERAS HORAS", sub: "Cansancio y dificultad para concentrarte" },
  { start: 8, end: 12, caption: "EL CEREBRO SE RESIENTE", sub: "Reaccionas cada vez más lento" },
  { start: 12, end: 17, caption: "PIERDES EL CONTROL", sub: "La memoria y la atención fallan" },
  { start: 17, end: 22, caption: "PUEDEN APARECER ALUCINACIONES", sub: "Tu percepción empieza a distorsionarse" },
  { start: 22, end: 27, caption: "DÍA SIETE", sub: "Tu organismo necesita descansar" },
  { start: 27, end: 30, caption: "DORMIR ES VITAL", sub: "¿Aguantarías siete días?" },
];

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const Stickman: React.FC<{ frame: number; tired: number; x: number; scale?: number; sleeping?: boolean }> = ({ frame, tired, x, scale = 1, sleeping }) => {
  const bob = sleeping ? Math.sin(frame / 7) * 3 : Math.sin(frame / 5) * (5 - tired * 3);
  const slump = tired * 24;
  const arm = Math.sin(frame / 4) * 18;
  return <g transform={`translate(${x} ${bob}) scale(${scale})`} stroke="#171717" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <circle cx="0" cy={-118 + slump * .25} r="42" fill="#fff"/>
    {sleeping ? <><path d="M-17 -126 q9 9 18 0 M8 -126 q9 9 18 0" strokeWidth="5"/><path d="M-12 -103 q12 8 24 0" strokeWidth="5"/></> :
      <><circle cx={-14} cy={-126 + slump*.2} r="5" fill="#171717" stroke="none"/><circle cx="14" cy={-126 + slump*.2} r="5" fill="#171717" stroke="none"/>
      <path d={tired > .55 ? "M-12 -99 q12 -12 24 0" : "M-12 -98 q12 12 24 0"} strokeWidth="5"/>
      {tired > .35 && <path d="M-37 -151 l-10 -14 M35 -151 l10 -14" stroke="#d94841" strokeWidth="5"/>}</>}
    <path d={`M0 -76 Q${-slump*.3} -20 0 28`} />
    <path d={`M0 -62 Q-45 ${-35+arm*.15} -58 ${-4+slump*.25}`} />
    <path d={`M0 -62 Q42 ${-25-arm*.15} 55 ${-8+slump*.25}`} />
    <path d="M0 28 Q-28 66 -30 105 M0 28 Q28 66 30 105"/>
    {tired > .65 && <path d="M-48 -166 q-12 -12 -2 -22 M42 -170 q10 -12 22 -5" stroke="#58a6d6" strokeWidth="5"/>}
  </g>;
};

export const SleepSevenDays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const beat = beats.find((b) => sec >= b.start && sec < b.end) ?? beats[6];
  const tired = clamp(sec / 23);
  const enter = interpolate(frame % (fps * 4), [0, 10, 24], [0, 1, 1], { extrapolateRight: "clamp" });
  const x = sec < 4 ? 540 : sec < 12 ? 540 + Math.sin(sec * 2) * 35 : 540 + (sec > 22 ? 25 : 0);
  const sleeping = sec >= 27;
  return <AbsoluteFill style={{ backgroundColor: "#f7f7f4", fontFamily: "Arial, sans-serif", color: "#171717", overflow: "hidden" }}>
    <Audio src={staticFile("sleep-seven-days.mp3")} />
    <svg viewBox="0 0 1080 1920" width="100%" height="100%">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#ecece8"/></linearGradient></defs>
      <rect width="1080" height="1920" fill="url(#bg)"/>
      <circle cx="850" cy="330" r="170" fill="#e9e9e4"/>
      <path d="M0 1420 Q540 1370 1080 1420 V1920 H0Z" fill="#deded8"/>
      <path d="M0 1420 Q540 1370 1080 1420" fill="none" stroke="#b8b8b0" strokeWidth="8"/>
      {sec < 8 && <g transform="translate(820 750)"><circle r="85" fill="#fff" stroke="#171717" strokeWidth="9"/><path d="M0 0 L0 -58 M0 0 L42 20" stroke="#171717" strokeWidth="9" strokeLinecap="round"/><path d="M-18 -103 L18 -103" stroke="#d94841" strokeWidth="10"/></g>}
      <g opacity={sec > 17 && sec < 22 ? .35 : 0} transform={`translate(${760 + Math.sin(frame/3)*12} 1120) scale(.85)`}><Stickman frame={frame+9} tired={1} x={0}/></g>
      <g transform={`translate(0 ${sec < 4 ? 40 : 0})`}><Stickman frame={frame} tired={tired} x={x} scale={1.45} sleeping={sleeping}/></g>
      {sec > 7 && sec < 27 && <g fill="#d94841" opacity={.8}><path d="M710 930 l26 -42 26 42z"/><path d="M790 1020 l20 -32 20 32z"/></g>}
      {sleeping && <g fill="#171717" fontSize="66" fontWeight="bold"><text x="670" y="850">Z</text><text x="730" y="790" fontSize="48">Z</text><text x="775" y="740" fontSize="32">Z</text></g>}
      <g transform="translate(0 0)">
        <rect x="55" y="105" width="970" height="220" rx="34" fill="#171717"/>
        <text x="95" y="200" fill="#fff" fontSize="54" fontWeight="900">{beat.caption}</text>
        <text x="95" y="270" fill="#d9d9d2" fontSize="31">{beat.sub}</text>
      </g>
      <rect x="70" y="1775" width="940" height="10" rx="5" fill="#c7c7c0"/>
      <rect x="70" y="1775" width={940 * sec / 30} height="10" rx="5" fill="#d94841"/>
      <text x="75" y="1845" fill="#555" fontSize="28" letterSpacing="5">DATO Y RELATO</text>
    </svg>
  </AbsoluteFill>;
};
