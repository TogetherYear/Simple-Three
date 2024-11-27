import { Resolve } from '@/Decorators';
import { TManager } from '../Base/TManager';
import { Blueprint } from '../type';
import * as X6 from '@antv/x6';
import { TTest } from '@/Decorators/TTest';

class TGraph extends TManager {
    constructor(ctx: Blueprint.Context, options: Blueprint.Manager.IGraph = {}) {
        super(ctx, options);
    }

    public graph!: X6.Graph;

    public get O() {
        return this.options as Blueprint.Manager.IGraph;
    }

    public Run() {
        this.graph = new X6.Graph({
            container: this.ctx.dom,
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

        Resolve.then(() => {
            this.graph.centerContent();
        });
    }

    public override Destroy(): void {
        super.Destroy();
        this.graph.dispose();
    }

    @TTest.BindFunction<TGraph>((instance) => `Shape`)
    private AddCustomShape() {
        const node = this.graph.addNode({
            shape: 'TGenerate',
            x: ~~(Math.random() * 100),
            y: ~~(Math.random() * 100)
        });
    }
}

export { TGraph };
