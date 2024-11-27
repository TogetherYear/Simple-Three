import { TPlane } from '@/Core/Actor/TPlane';
import { TBoxRigidBody } from '@/Core/Components/TBoxRigidBody';
import { Core } from '@/Core/type';

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
