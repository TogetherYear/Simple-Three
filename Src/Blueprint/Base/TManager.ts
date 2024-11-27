import { Blueprint } from '../type';
import { TEntity } from './TEntity';

class TManager extends TEntity {
    constructor(ctx: Blueprint.Context, options: Blueprint.Base.IManager = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Blueprint.Base.IManager;
    }

    public Destroy() {}
}

export { TManager };
