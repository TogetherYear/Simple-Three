import { TPlane } from '@/Core/Actor';
import { TBoxRigidBody } from '@/Core/Components';
import { Type } from '@/Core';

class CustomPlane extends TPlane {
    constructor(ctx: Type.Context, options: Type.Test.ICustomPlane) {
        super(ctx, options);
        this.body.position.copy(this.O.position);
        this.body.rotateX(this.O.rotate.x);
        this.body.rotateY(this.O.rotate.y);
        this.body.rotateZ(this.O.rotate.z);
        this.body.scale.copy(this.O.scale);
        this.AddComponent(new TBoxRigidBody(ctx, { fix: true, mass: 1, actor: this }));
    }

    public get O() {
        return this.options as Type.Test.ICustomPlane;
    }
}

export { CustomPlane };
