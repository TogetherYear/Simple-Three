import { TActor } from '../Base/TActor';
import { Blueprint } from '../type';

class TGenerate extends TActor {
    constructor(ctx: Blueprint.Context, options: Blueprint.Actor.IGenerate = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Blueprint.Actor.IGenerate;
    }

    private Create() {
        this.body = this.ctx.Graph.graph.addNode({
            shape: 'TGenerate',
            x: ~~(Math.random() * 100),
            y: ~~(Math.random() * 100)
        });
    }
}

export { TGenerate };
