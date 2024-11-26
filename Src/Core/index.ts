import { TCamera } from './Manager/TCamera';
import { TGame } from './Manager/TGame';
import { TInput } from './Manager/TInput';
import { TPhysics } from './Manager/TPhysics';
import { TRenderer } from './Manager/TRenderer';
import { Core } from './type';

/**
 * 这个函数只用来初始化 Manager
 */
const Generate = (dom: HTMLElement): Promise<Core.Context> => {
    const target: Partial<Core.Context> = {
        Plugins: new Map()
    };

    /**
     * 后面可能加东西 先弄一层代理
     */
    const proxy = Proxy.revocable(target as Core.Context, {
        get: (target: Core.Context, p: keyof Core.Context, receiver: any) => {
            return target[p];
        },
        set: (target: Core.Context, p: keyof Core.Context, newValue: any, receiver: any) => {
            target[p] = newValue;
            return true;
        }
    });

    const ctx = proxy.proxy;

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

        ctx.Destroy = () => {
            ctx.Renderer.Destroy();

            ctx.Camera.Destroy();

            ctx.Physics.Destroy();

            ctx.Input.Destroy();

            ctx.Game.Destroy();

            proxy.revoke();
        };

        resolve(ctx);
    });
};

export { Generate };
