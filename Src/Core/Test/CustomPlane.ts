import { TBoxRigidBody } from '../Actor/Component/TBoxRigidBody';
import { TPlane } from '../Actor/TPlane';
import { ST } from '../type';

class CustomPlane extends TPlane {
    constructor(ctx: ST.Context) {
        super(ctx);
        this.AddComponent(new TBoxRigidBody(ctx, this, { fix: true }));
    }
}

export { CustomPlane };
