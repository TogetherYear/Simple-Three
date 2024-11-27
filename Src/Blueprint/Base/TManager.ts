import { TTest } from '@/Decorators/TTest';
import { Blueprint } from '../type';
import { TEntity } from './TEntity';
import { TTool } from '@/Decorators/TTool';
import { TEvent } from '@/Decorators/TEvent';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
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
