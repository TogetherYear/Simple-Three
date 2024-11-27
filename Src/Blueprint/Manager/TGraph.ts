import { TManager } from '../Base/TManager';
import { Blueprint } from '../type';

class TGraph extends TManager {
    constructor(ctx: Blueprint.Context, options: Blueprint.Manager.IGraph = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Blueprint.Manager.IGraph;
    }

    public override Destroy(): void {
        super.Destroy();
    }
}

export { TGraph };
