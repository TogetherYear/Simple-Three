import * as Core from './Core';
import { CustomPlugin } from './Test';

Core.Generate(document.querySelector('#App')!).then((ctx) => {
    const dire = new Core.Actor.TDirectionalLight(ctx);

    const ambi = new Core.Actor.TAmbientLight(ctx);

    const fog = new Core.Actor.TFog(ctx);

    const water = new Core.Actor.TWater(ctx);

    const room = new Core.Actor.TGltfModel(ctx, { path: 'Model/Room.glb' });

    const pointLight = new Core.Actor.TPointLight(ctx);

    const freeCameraControl = new Core.Plugin.TFreeCameraControl(ctx);

    // setTimeout(() => {
    //     freeCameraControl.Destroy();
    //     const roundCameraControl = new Core.Plugin.TRoundCameraControl(ctx);
    // }, 10000);

    // setTimeout(() => {
    //     ctx.Destroy();
    // }, 20000);

    const debug = new CustomPlugin(ctx);
});
