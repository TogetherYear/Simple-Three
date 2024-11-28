import * as Base from './Base';
import * as Actor from './Actor';
import * as Component from './Components';
import * as Plugin from './Plugins';
import * as Manager from './Manager';
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

        ctx.Renderer = new Manager.TRenderer(ctx);

        ctx.Camera = new Manager.TCamera(ctx);

        ctx.Physics = new Manager.TPhysics(ctx);

        ctx.Input = new Manager.TInput(ctx);

        ctx.Game = new Manager.TGame(ctx);

        ctx.Renderer.Run();

        ctx.Camera.Run();

        await ctx.Physics.Run();

        ctx.Input.Run();

        ctx.Game.Run();

        ctx.Destroy = () => {
            for (let p of ctx.Plugins) {
                p[1].Destroy();
            }

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

export { Generate, Base, Actor, Component, Plugin, Manager, Core as Type };
