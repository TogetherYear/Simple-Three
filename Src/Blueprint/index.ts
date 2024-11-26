import { Blueprint } from './type';

/**
 * 这个函数只用来初始化 Manager
 */
const Generate = (dom: HTMLElement): Promise<Blueprint.Context> => {
    const target: Partial<Blueprint.Context> = {};

    /**
     * 后面可能加东西 先弄一层代理
     */
    const proxy = Proxy.revocable(target as Blueprint.Context, {
        get: (target: Blueprint.Context, p: keyof Blueprint.Context, receiver: any) => {
            return target[p];
        },
        set: (target: Blueprint.Context, p: keyof Blueprint.Context, newValue: any, receiver: any) => {
            target[p] = newValue;
            return true;
        }
    });

    const ctx = proxy.proxy;

    return new Promise(async (resolve, reject) => {
        ctx.dom = dom;

        resolve(ctx);
    });
};

export { Generate };
