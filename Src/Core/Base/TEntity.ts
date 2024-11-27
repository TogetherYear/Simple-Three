import { Core } from '../type';
import { EventSystem } from '../../Utils/EventSystem';
import { Time } from '../../Utils/Time';

abstract class TEntity extends EventSystem {
    constructor(ctx: Core.Context, options: Core.Base.IEntity = {}) {
        super();
        this.ctx = ctx;
        this.options = options;
    }

    public get O() {
        return this.options as Core.Base.IEntity;
    }

    public ctx!: Core.Context;

    public options!: Core.Base.IEntity;

    /**
     * 唯一ID
     */
    public unique_Id = Time.GenerateRandomUid();
}

export { TEntity };
