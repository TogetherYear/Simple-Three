import { TEvent } from '@/Decorators/TEvent';
import { TActor } from '../Base/TActor';
import { Blueprint } from '../type';
import * as X6 from '@antv/x6';

class TGenerate extends TActor {
    constructor(ctx: Blueprint.Context, options: Blueprint.Actor.IGenerate = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Blueprint.Actor.IGenerate;
    }

    private okEdge: X6.Edge | null = null;

    private errorEdge: X6.Edge | null = null;

    private Create() {
        this.body = this.ctx.Graph.graph.addNode({
            shape: 'TGenerate',
            x: ~~(Math.random() * 100),
            y: ~~(Math.random() * 100)
        });
    }

    public override Destroy(): void {
        super.Destroy();
    }

    @TEvent.Listen<TGenerate>((instance) => instance.body, 'TGenerate:Output:OK', 'on', 'off')
    private OnOkStart() {
        console.log('OK');
    }

    @TEvent.Listen<TGenerate>((instance) => instance.body, 'TGenerate:Output:Error', 'on', 'off')
    private OnErrorStart() {
        console.log('Error');
    }
}

export { TGenerate };
