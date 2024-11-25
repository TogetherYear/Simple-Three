import { TCamera } from './Manager/TCamera';
import { TGame } from './Manager/TGame';
import { TInput } from './Manager/TInput';
import { TPhysics } from './Manager/TPhysics';
import { TRenderer } from './Manager/TRenderer';
import { ST } from './type';

/**
 * 这个函数只用来初始化 Manager
 */
const Generate = (dom: HTMLElement): Promise<ST.Context> => {
    const target: Partial<ST.Context> = {
        Plugins: new Map()
    };

    /**
     * 后面可能加东西 先弄一层代理
     */
    const ctx = new Proxy(target as ST.Context, {
        get: (target: ST.Context, p: keyof ST.Context, receiver: any) => {
            return target[p];
        },
        set: (target: ST.Context, p: keyof ST.Context, newValue: any, receiver: any) => {
            target[p] = newValue;
            return true;
        }
    });

    return new Promise(async (resolve, reject) => {
        ctx.dom = dom;

        ctx.Renderer = new TRenderer(ctx);

        ctx.Camera = new TCamera(ctx);

        ctx.Physics = new TPhysics(ctx);

        ctx.Input = new TInput(ctx);

        ctx.Game = new TGame(ctx);

        ctx.Renderer.Run();

        ctx.Camera.Run();

        await ctx.Physics.Run();

        ctx.Input.Run();

        ctx.Game.Run();

        resolve(ctx);
    });
};

export { Generate };
