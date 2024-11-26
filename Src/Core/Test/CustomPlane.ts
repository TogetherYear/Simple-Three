import { TBoxRigidBody } from '../Components/TBoxRigidBody';
import { TPlane } from '../Actor/TPlane';
import { Core } from '../type';

class CustomPlane extends TPlane {
    constructor(ctx: Core.Context, options: Core.Test.ICustomPlane = {}) {
        super(ctx, options);
        this.AddComponent(new TBoxRigidBody(ctx, { fix: true, mass: 1, actor: this }));
    }

    public get O() {
        return this.options as Core.Test.ICustomPlane;
    }
}

export { CustomPlane };
