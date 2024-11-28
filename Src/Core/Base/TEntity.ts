import { Core } from '@/Core/type';
import { EventSystem, Time } from '@/Core/Utils';

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
