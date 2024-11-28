import { TEvent, TTest, TTool } from '@/Core/Decorators';
import { Core } from '@/Core/type';
import { TEntity } from './TEntity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class TComponent extends TEntity {
    constructor(ctx: Core.Context, options: Core.Base.IComponent) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Base.IComponent;
    }

    public Destroy() {}
}

export { TComponent };
