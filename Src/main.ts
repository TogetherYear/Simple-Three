// import { Generate } from './Core';
// import { TAmbientLight } from './Core/Actor/TAmbientLight';
// import { TDirectionalLight } from './Core/Actor/TDirectionalLight';
// import { TFog } from './Core/Actor/TFog';
// import { TGltfModel } from './Core/Actor/TGltfModel';
// import { TPointLight } from './Core/Actor/TPointLight';
// import { TWater } from './Core/Actor/TWater';
// import { TFreeCameraControl } from './Core/Plugins/TFreeCameraControl';
// import { TRoundCameraControl } from './Core/Plugins/TRoundCameraControl';
// import { CustomPlane } from './Test/CustomPlane';

// Generate(document.querySelector('#App')!).then((ctx) => {
//     const dire = new TDirectionalLight(ctx);

//     const ambi = new TAmbientLight(ctx);

//     const fog = new TFog(ctx);

//     const water = new TWater(ctx);

//     const plane = new CustomPlane(ctx);

//     const room = new TGltfModel(ctx, { path: 'Model/Room.glb' });

//     const pointLight = new TPointLight(ctx);

//     const freeCameraControl = new TFreeCameraControl(ctx);

//     setTimeout(() => {
//         freeCameraControl.Destroy();
//         const roundCameraControl = new TRoundCameraControl(ctx);
//     }, 10000);

//     setTimeout(() => {
//         ctx.Destroy();
//     }, 20000);
// });

import { Generate } from './Blueprint';

Generate(document.querySelector('#App')!).then((ctx) => {});
