import { TBoxRigidBody } from '../Components/TBoxRigidBody';
import { TPlane } from '../Actor/TPlane';
import { ST } from '../type';

class CustomPlane extends TPlane {
    constructor(ctx: ST.Context, options: ST.Test.ICustomPlane = {}) {
        super(ctx, options);
        this.AddComponent(new TBoxRigidBody(ctx, { fix: true, mass: 1, actor: this }));
    }

    public get O() {
        return this.options as ST.Test.ICustomPlane;
    }
}

export { CustomPlane };
