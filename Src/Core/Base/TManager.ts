import { TEvent } from '../Decorators/TEvent';
import { TTest } from '../Decorators/TTest';
import { TTool } from '../Decorators/TTool';
import { ST } from '../type';
import { TEntity } from './TEntity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate(TEvent.Lifecycle.Manager)
class TManager extends TEntity {
    constructor(ctx: ST.Context) {
        super(ctx);
    }
}

export { TManager };
