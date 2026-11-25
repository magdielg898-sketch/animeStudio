# DATO Y RELATO — Motion Canvas

Motor de animación 2D independiente integrado en animeStudio.

- Motor: Motion Canvas 3.17.2 (MIT)
- Renderizador: Motion Canvas 2D
- Exportación: FFmpeg MP4
- Lienzo vertical: 1080 × 1920, 30 fps
- Proyecto inicial: Stickman de DATO Y RELATO

## Desarrollo

Desde la raíz del repositorio:

```bash
pnpm install --no-frozen-lockfile
pnpm --dir apps/motion-canvas dev
```

El editor abre en el puerto 5173. Para compilar:

```bash
pnpm --dir apps/motion-canvas build
```

La exportación MP4 se realiza desde el panel de exportación del editor Motion Canvas.
