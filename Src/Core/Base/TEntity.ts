import { ST } from '../type';
import { EventSystem } from '../Utils/EventSystem';
import { Time } from '../Utils/Time';

abstract class TEntity extends EventSystem {
    constructor(ctx: ST.Context, options: ST.Base.IEntity) {
        super();
        this.ctx = ctx;
        this.options = options;
    }

    public get O() {
        return this.options as ST.Base.IEntity;
    }

    public ctx!: ST.Context;

    public options!: ST.Base.IEntity;

    /**
     * 唯一ID
     */
    public unique_Id = Time.GenerateRandomUid();
}

export { TEntity };
