import { TEvent, TTest, TTool } from '@/Core/Decorators';
import { Core } from '@/Core/type';
import { TEntity } from './TEntity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class TPlugin extends TEntity {
    constructor(ctx: Core.Context, options: Core.Base.IPlugin = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Base.IPlugin;
    }

    /**
     * 继承时 销毁物体必须调用 super.Destroy() 我要取消事件
     */
    public Destroy() {}
}

export { TPlugin };
