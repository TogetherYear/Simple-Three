import { EventSystem } from '../Utils/EventSystem';
import { Time } from '../Utils/Time';

abstract class TEntity extends EventSystem {
    constructor() {
        super();
    }

    /**
     * 唯一ID
     */
    public unique_Id = Time.GenerateRandomUid();
}

export { TEntity };
