import { Generate } from './Core';
import { TAmbientLight } from './Core/Actor/TAmbientLight';
import { TDirectionalLight } from './Core/Actor/TDirectionalLight';
import { TFog } from './Core/Actor/TFog';
import { TWater } from './Core/Actor/TWater';
import { CustomPlane } from './Core/Test/CustomPlane';

Generate(document.querySelector('#App')!).then(() => {
    const dire = new TDirectionalLight();
    const ambi = new TAmbientLight();
    const fog = new TFog();
    const water = new TWater();

    // 测试 这个是 固定平面
    const plane = new CustomPlane();
});
