import { TTest } from '@/Decorators/TTest';
import { Blueprint } from '../type';
import { TEntity } from './TEntity';
import { TTool } from '@/Decorators/TTool';
import { TEvent } from '@/Decorators/TEvent';
import * as X6 from '@antv/x6';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class TActor extends TEntity {
    constructor(ctx: Blueprint.Context, options: Blueprint.Base.IActor = {}) {
        super(ctx, options);
    }

    public body!: X6.Node;

    public get O() {
        return this.options as Blueprint.Base.IActor;
    }

    public Destroy() {}
}

export { TActor };
