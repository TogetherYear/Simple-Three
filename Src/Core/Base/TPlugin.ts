import { TEvent, TTest, TTool } from '@/Core/Decorators';
import { Core } from '@/Core/type';
import { TEntity } from './TEntity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class TPlugin extends TEntity {
    constructor(ctx: Core.Context, options: Core.Base.IPlugin = {}) {
        super(ctx, options);
        this.ctx.Plugins.push(this);
    }

    public get O() {
        return this.options as Core.Base.IPlugin;
    }

    public Destroy() {
        this.ctx.Plugins = this.ctx.Plugins.filter((p) => p !== this);
    }
}

export { TPlugin };
