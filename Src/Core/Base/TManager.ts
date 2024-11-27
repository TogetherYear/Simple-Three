import { TEvent } from '../../Decorators/TEvent';
import { TTest } from '../../Decorators/TTest';
import { TTool } from '../../Decorators/TTool';
import { Core } from '../type';
import { TEntity } from './TEntity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class TManager extends TEntity {
    constructor(ctx: Core.Context, options: Core.Base.IManager = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Base.IManager;
    }

    /**
     * 继承时 销毁物体必须调用 super.Destroy() 我要取消事件
     */
    public Destroy() {}
}

export { TManager };
