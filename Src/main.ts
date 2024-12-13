import * as Core from '@/Core';
import { CustomPlugin } from '@/Test/CustomPlugin';

Core.Generate(document.querySelector('#App')!).then((ctx) => {
    const dire = new Core.Actor.TDirectionalLight(ctx);

    const ambi = new Core.Actor.TAmbientLight(ctx);

    const fog = new Core.Actor.TFog(ctx);

    const water = new Core.Actor.TWater(ctx);

    const room = new Core.Actor.TGltfModel(ctx, { path: 'Model/Room.glb' });

    const pointLight = new Core.Actor.TPointLight(ctx);

    const CameraControl = new Core.Plugin.TRoundCameraControl(ctx);

    const debug = new CustomPlugin(ctx);
});
