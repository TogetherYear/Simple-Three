import * as X6 from '@antv/x6';
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
                size: 14,
                type: 'doubleMesh',
                args: [
                    {
                        color: '#ffffff11',
                        thickness: 1
                    },
                    {
                        color: '#ffffff99',
                        thickness: 1,
                        factor: 8
                    }
                ]
            }
        });

        const data = {
            nodes: [
                {
                    id: 'node1',
                    shape: 'rect',
                    x: 40,
                    y: 40,
                    width: 100,
                    height: 40,
                    label: 'hello',
                    attrs: {
                        body: {
                            stroke: '#8f8f8f',
                            strokeWidth: 1,
                            fill: '#fff',
                            rx: 4,
                            ry: 4
                        }
                    }
                },
                {
                    id: 'node2',
                    shape: 'rect',
                    x: 160,
                    y: 180,
                    width: 100,
                    height: 40,
                    label: 'world',
                    attrs: {
                        body: {
                            stroke: '#8f8f8f',
                            strokeWidth: 1,
                            fill: '#fff',
                            rx: 4,
                            ry: 4
                        }
                    }
                }
            ],
            edges: [
                {
                    shape: 'edge',
                    source: 'node1',
                    target: 'node2',
                    label: 'x6',
                    attrs: {
                        line: {
                            stroke: '#8f8f8f',
                            strokeWidth: 1
                        }
                    }
                }
            ]
        };

        graph.fromJSON(data);
        graph.centerContent();

        resolve(ctx);
    });
};

export { Generate };
