import {Circle, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, easeInOutCubic, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const head = createRef<Circle>();
  const torso = createRef<Line>();
  const leftArm = createRef<Line>();
  const rightArm = createRef<Line>();
  const leftLeg = createRef<Line>();
  const rightLeg = createRef<Line>();
  const eyes = createRef<Txt>();
  const mouth = createRef<Txt>();
  const title = createRef<Txt>();
  const brain = createRef<Circle>();
  const pulse = createRef<Circle>();

  view.add(
    <Rect size={[1080, 1920]} fill={'#080c18'}>
    <Circle size={760} x={0} y={-170} fill={'#152442'} opacity={0.45} />,
    <Circle size={560} x={360} y={480} fill={'#1a2d4d'} opacity={0.22} />,
    <Txt ref={title} text={'7 DÍAS SIN DORMIR'} y={-760} fontSize={64} fontWeight={900} fill={'#f5f7ff'} />,
    <Circle ref={pulse} size={340} x={0} y={100} stroke={'#53d8ff'} lineWidth={8} opacity={0.2} />,
    <Circle ref={head} size={210} x={0} y={-160} fill={'#ffffff'} stroke={'#151a25'} lineWidth={12} />,
    <Line ref={torso} points={[[0, -50], [0, 250]]} stroke={'#111827'} lineWidth={26} lineCap={'round'} />,
    <Line ref={leftArm} points={[[-5, 30], [-145, 170]]} stroke={'#111827'} lineWidth={24} lineCap={'round'} />,
    <Line ref={rightArm} points={[[5, 30], [145, 170]]} stroke={'#111827'} lineWidth={24} lineCap={'round'} />,
    <Line ref={leftLeg} points={[[0, 250], [-110, 440]]} stroke={'#111827'} lineWidth={28} lineCap={'round'} />,
    <Line ref={rightLeg} points={[[0, 250], [110, 440]]} stroke={'#111827'} lineWidth={28} lineCap={'round'} />,
    <Txt ref={eyes} text={'•   •'} x={0} y={-180} fontSize={54} fontWeight={900} fill={'#111827'} />,
    <Txt ref={mouth} text={'o'} x={0} y={-95} fontSize={58} fontWeight={900} fill={'#111827'} />,
    <Circle ref={brain} size={125} x={310} y={-380} fill={'#ff6482'} opacity={0} />,
    <Txt text={'CEREBRO EN ALERTA'} x={0} y={650} fontSize={42} fontWeight={800} fill={'#ffcf70'} />
    </Rect>,
  );

  yield* waitFor(0.4);
  yield* all(
    title().y(-690, 0.7, easeInOutCubic),
    head().y(-110, 0.7, easeInOutCubic),
    pulse().scale(1.35, 1.2, easeInOutCubic).to(0.92, 0.8),
  );
  yield* waitFor(0.4);
  yield* all(
    leftArm().rotation(-35, 0.45).to(25, 0.45).to(0, 0.35),
    rightArm().rotation(35, 0.45).to(-25, 0.45).to(0, 0.35),
    head().rotation(-12, 0.25).to(12, 0.25).to(0, 0.25),
    eyes().text('×   ×', 0.6),
    mouth().text('O', 0.5),
    brain().opacity(1, 0.4),
  );
  yield* waitFor(0.5);
  yield* all(
    brain().scale(1.35, 0.6).to(0.8, 0.6),
    pulse().opacity(0.65, 0.5).to(0.12, 0.5),
    head().y(-145, 0.7, easeInOutCubic),
  );
  yield* waitFor(0.5);
  yield* all(
    leftArm().rotation(-70, 0.4),
    rightArm().rotation(70, 0.4),
    head().rotation(18, 0.4),
    eyes().text('•   •', 0.3),
    mouth().text('﹏', 0.3),
  );
  yield* waitFor(1);
});