import * as Core from '@/Core';
import { CustomPlugin } from '@/Test/CustomPlugin';

Core.Generate(document.querySelector('#App')!).then((ctx) => {
    const dire = new Core.Actor.DirectionalLight(ctx);

    const ambi = new Core.Actor.AmbientLight(ctx);

    const fog = new Core.Actor.Fog(ctx);

    const water = new Core.Actor.Water(ctx);

    const room = new Core.Actor.GltfModel(ctx, { path: 'Model/Room.glb' });

    const pointLight = new Core.Actor.PointLight(ctx);

    const CameraControl = new Core.Plugin.RoundCameraControl(ctx);

    const debug = new CustomPlugin(ctx);
});
