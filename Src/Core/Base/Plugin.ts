import { TEvent, TTest, TTool } from '../Decorators';
import { Core } from '../type';
import { Entity } from './Entity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class Plugin extends Entity {
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

export { Plugin };
