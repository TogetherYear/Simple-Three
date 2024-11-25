import { Generate } from './Core';
import { TAmbientLight } from './Core/Actor/TAmbientLight';
import { TDirectionalLight } from './Core/Actor/TDirectionalLight';
import { TFog } from './Core/Actor/TFog';
import { TGltfModel } from './Core/Actor/TGltfModel';
import { TPointLight } from './Core/Actor/TPointLight';
import { TWater } from './Core/Actor/TWater';
import { TFreeCameraControl } from './Core/Plugins/TFreeCameraControl';
import { TRoundCameraControl } from './Core/Plugins/TRoundCameraControl';
import { CustomPlane } from './Core/Test/CustomPlane';

Generate(document.querySelector('#App')!).then((ctx) => {
    const dire = new TDirectionalLight(ctx);

    const ambi = new TAmbientLight(ctx);

    const fog = new TFog(ctx);

    const water = new TWater(ctx);

    const plane = new CustomPlane(ctx);

    const room = new TGltfModel(ctx, { path: 'Model/Room.glb' });

    const pointLight = new TPointLight(ctx);

    ctx.Plugins.set('Free', new TFreeCameraControl(ctx));

    // ctx.Plugins.set('Round', new TRoundCameraControl(ctx));
});
