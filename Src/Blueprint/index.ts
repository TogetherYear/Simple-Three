import * as X6 from '@antv/x6';
import { Blueprint } from './type';

import './Templates/index.scss';
import './Templates/TGenerate/TGenerate';

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
        const graph = new X6.Graph({
            container: dom,
            autoResize: true,
            panning: true,
            mousewheel: true,
            background: {
                color: '#212121'
            },
            grid: {
                visible: true,
                size: 10,
                type: 'doubleMesh',
                args: [
                    {
                        color: '#333333',
                        thickness: 1
                    },
                    {
                        color: '#000000',
                        thickness: 1,
                        factor: 10
                    }
                ]
            }
        });

        const node = graph.addNode({
            shape: 'TGenerate',
            x: 60,
            y: 100
        });

        graph.centerContent();

        resolve(ctx);
    });
};

export { Generate };
