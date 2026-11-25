import {defineConfig} from 'vite';
import * as motionCanvasPackage from '@motion-canvas/vite-plugin';
import * as ffmpegPackage from '@motion-canvas/ffmpeg';

const motionCanvas = ((motionCanvasPackage as any).default?.default ?? (motionCanvasPackage as any).default ?? motionCanvasPackage) as (options?: any) => any;
const ffmpeg = ((ffmpegPackage as any).default?.default ?? (ffmpegPackage as any).default ?? ffmpegPackage) as (options?: any) => any;

export default defineConfig({
  plugins: [motionCanvas(), ffmpeg()],
  server: {host: '0.0.0.0'},
});