import { TEvent } from '../Decorators/TEvent';
import { TTest } from '../Decorators/TTest';
import { TTool } from '../Decorators/TTool';
import { ST } from '../type';
import { TEntity } from './TEntity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate(TEvent.Lifecycle.Component)
class TComponent extends TEntity {
    constructor(ctx: ST.Context, options: ST.Base.IComponent) {
        super(ctx, options);
    }

    /**
     * 继承时 销毁物体必须调用 super.Destroy() 我要取消事件
     */
    public Destroy() {}
}

export { TComponent };
