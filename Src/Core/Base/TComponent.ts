import { TEvent } from '../../Decorators/TEvent';
import { TTest } from '../../Decorators/TTest';
import { TTool } from '../../Decorators/TTool';
import { Core } from '../type';
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

    /**
     * 继承时 销毁物体必须调用 super.Destroy() 我要取消事件
     */
    public Destroy() {}
}

export { TComponent };
