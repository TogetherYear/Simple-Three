import { TCamera } from './Manager/TCamera';
import { TGame } from './Manager/TGame';
import { TInput } from './Manager/TInput';
import { TPhysics } from './Manager/TPhysics';
import { TRenderer } from './Manager/TRenderer';

/**
 * 这个函数只用来初始化 Manager
 */
const Generate = (dom: HTMLElement): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        TRenderer.Run(dom);

        TCamera.Run(dom);

        await TPhysics.Run();

        TInput.Run();

        TGame.Run();

        resolve();
    });
};

export { Generate };
