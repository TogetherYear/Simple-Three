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

    private okDown = false;

    private errorEdge: X6.Edge | null = null;

    private errorDown = false;

    private Create() {
        this.body = this.ctx.Graph.graph.addNode({
            shape: 'TGenerate',
            x: ~~(Math.random() * 100),
            y: ~~(Math.random() * 100)
        });
    }

    public override Destroy(): void {
        super.Destroy();
        this.body.dispose();
    }

    @TEvent.Listen<TGenerate>((instance) => instance.body, 'TGenerate:Output:OK', 'on', 'off')
    private OnOkStart() {
        this.okDown = true;
        this.okEdge = this.ctx.Graph.graph.addEdge({
            source: this.body,
            attrs: {
                line: {
                    sourceMarker: 'ellipse',
                    targetMarker: 'block',
                    stroke: '#cccccc',
                    strokeWidth: 5,
                    cursor: 'pointer'
                }
            },
            connector: 'smooth'
        });
    }

    @TEvent.Listen<TGenerate>((instance) => instance.body, 'TGenerate:Output:Error', 'on', 'off')
    private OnErrorStart() {
        this.errorDown = true;
    }

    @TEvent.Listen<TGenerate>((instance) => instance.ctx.dom, 'mouseup')
    private OnMouseUp() {
        this.okDown = false;
        this.errorDown = false;
    }

    @TEvent.Listen<TGenerate>((instance) => instance.ctx.dom, 'mousemove')
    private OnMouseMove(e: MouseEvent) {
        if (this.okEdge && this.okDown) {
            const position = this.ctx.Graph.graph.pageToLocal({ x: e.pageX, y: e.pageY });
            this.okEdge.target = position;
        }
    }
}

export { TGenerate };
