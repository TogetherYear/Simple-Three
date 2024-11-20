import { TEvent } from '../Decorators/TEvent';
import { TTest } from '../Decorators/TTest';
import { TTool } from '../Decorators/TTool';
import { TEntity } from './TEntity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate(TEvent.Lifecycle.Manager)
class TManager extends TEntity {
    constructor() {
        super();
    }
}

export { TManager };
