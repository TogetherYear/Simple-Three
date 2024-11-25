import { ST } from '../type';
import { EventSystem } from '../Utils/EventSystem';
import { Time } from '../Utils/Time';

abstract class TEntity extends EventSystem {
    constructor(ctx: ST.Context) {
        super();
        this.ctx = ctx;
    }

    public ctx!: ST.Context;

    /**
     * 唯一ID
     */
    public unique_Id = Time.GenerateRandomUid();
}

export { TEntity };
