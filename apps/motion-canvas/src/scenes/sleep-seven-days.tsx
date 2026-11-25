import {Circle, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, easeInOutCubic, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const head=createRef<Circle>(), leftArm=createRef<Line>(), rightArm=createRef<Line>();
  const eyes=createRef<Txt>(), mouth=createRef<Txt>(), title=createRef<Txt>();
  const caption=createRef<Txt>(), brain=createRef<Circle>(), pulse=createRef<Circle>(), day=createRef<Txt>();
  view.add(<Rect size={[1080,1920]} fill={'#070b16'}>
    <Circle size={1050} x={-260} y={-360} fill={'#12284a'} opacity={0.38}/>
    <Circle size={820} x={390} y={420} fill={'#172d4d'} opacity={0.24}/>
    <Circle ref={pulse} size={360} y={90} stroke={'#53d8ff'} lineWidth={9} opacity={0.22}/>
    <Txt ref={title} text={'¿7 DÍAS SIN DORMIR?'} y={-760} fontSize={66} fontWeight={900} fill={'#f5f7ff'}/>
    <Txt ref={day} text={'DÍA 1'} y={-610} fontSize={44} fontWeight={800} fill={'#63d9ff'}/>
    <Circle ref={head} size={220} y={-170} fill={'#fff'} stroke={'#111827'} lineWidth={13}/>
    <Line points={[[0,-55],[0,250]]} stroke={'#111827'} lineWidth={29} lineCap={'round'}/>
    <Line ref={leftArm} points={[[-5,35],[-150,175]]} stroke={'#111827'} lineWidth={26} lineCap={'round'}/>
    <Line ref={rightArm} points={[[5,35],[150,175]]} stroke={'#111827'} lineWidth={26} lineCap={'round'}/>
    <Line points={[[0,250],[-115,450]]} stroke={'#111827'} lineWidth={29} lineCap={'round'}/>
    <Line points={[[0,250],[115,450]]} stroke={'#111827'} lineWidth={29} lineCap={'round'}/>
    <Txt ref={eyes} text={'•   •'} y={-190} fontSize={58} fontWeight={900} fill={'#111827'}/>
    <Txt ref={mouth} text={'﹏'} y={-90} fontSize={62} fontWeight={900} fill={'#111827'}/>
    <Circle ref={brain} size={150} x={310} y={-380} fill={'#ff5478'} opacity={0}/>
    <Txt ref={caption} text={'AL PRINCIPIO, SOLO CANSANCIO'} y={700} fontSize={39} fontWeight={850} fill={'#ffffff'} width={900}/>
  </Rect>);
  yield* all(title().y(-690,0.8,easeInOutCubic),head().y(-130,0.8,easeInOutCubic),pulse().scale(1.25,1.2).to(0.95,0.8));
  yield* waitFor(2.4);
  yield* all(day().text('DÍA 2–3',0.35),caption().text('TU CONCENTRACIÓN EMPIEZA A FALLAR',0.4),
    head().rotation(-12,0.35).to(12,0.35).to(-8,0.35).to(0,0.35),
    leftArm().rotation(-28,0.4).to(22,0.4).to(0,0.3),rightArm().rotation(28,0.4).to(-22,0.4).to(0,0.3));
  yield* waitFor(2.1);
  yield* all(day().text('DÍA 4',0.35),caption().text('REACCIONAS MÁS LENTO Y PIERDES MEMORIA',0.4),
    eyes().text('×   ×',0.25),mouth().text('O',0.25),brain().opacity(0.9,0.4),
    brain().scale(1.25,0.6).to(0.9,0.6),pulse().opacity(0.6,0.5).to(0.18,0.5));
  yield* waitFor(2.2);
  yield* all(day().text('DÍA 5–6',0.35),caption().text('PUEDEN APARECER ALUCINACIONES',0.4),
    eyes().text('◉   ◉',0.25),head().position([35,-125],0.25).to([-35,-125],0.25).to([0,-125],0.25),
    leftArm().rotation(-60,0.35).to(12,0.35),rightArm().rotation(60,0.35).to(-12,0.35));
  yield* waitFor(2.4);
  yield* all(day().text('DÍA 7',0.35),caption().text('TU CEREBRO ESTÁ AL LÍMITE',0.4),
    eyes().text('×   ×',0.2),mouth().text('O',0.2),head().rotation(20,0.35).to(-20,0.35).to(0,0.35),
    pulse().scale(1.5,0.6).to(0.85,0.6),brain().scale(1.45,0.6).to(0.75,0.6));
  yield* waitFor(2.4);
  yield* all(title().text('DORMIR ES VITAL',0.5),day().text('NO ES TIEMPO PERDIDO',0.5),
    caption().text('EL SUEÑO ES UNA NECESIDAD, NO UN LUJO',0.5),
    eyes().text('•   •',0.35),mouth().text('⌣',0.35),head().rotation(0,0.5),
    leftArm().rotation(0,0.5),rightArm().rotation(0,0.5),pulse().opacity(0.5,0.5));
  yield* waitFor(12.0);
});