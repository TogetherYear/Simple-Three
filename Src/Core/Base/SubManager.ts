import { TEvent, TTest, TTool } from '../Decorators';
import { Core } from '../type';
import { Entity } from './Entity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class SubManager extends Entity {
    constructor(ctx: Core.Context, options: Core.Base.ISubManager = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Base.ISubManager;
    }

    public Destroy() {}
}

export { SubManager };
