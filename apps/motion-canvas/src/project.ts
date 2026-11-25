import {makeProject} from '@motion-canvas/core';
import sleepSevenDays from './scenes/sleep-seven-days?scene';

export default makeProject({
  experimentalFeatures: true,
  scenes: [sleepSevenDays],
});