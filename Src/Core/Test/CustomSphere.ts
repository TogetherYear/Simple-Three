import { TSphere } from '@/Core/Actor/TSphere';
import { TSphereRigidBody } from '@/Core/Components/TSphereRigidBody';
import { Core } from '@/Core/type';

class CustomSphere extends TSphere {
    constructor(ctx: Core.Context, options: Core.Test.ICustomSphere) {
        super(ctx, options);
        this.body.position.copy(this.O.position);
        this.body.rotateX(this.O.rotate.x);
        this.body.rotateY(this.O.rotate.y);
        this.body.rotateZ(this.O.rotate.z);
        this.body.scale.copy(this.O.scale);
        this.AddComponent(new TSphereRigidBody(ctx, { mass: 1, fix: false, actor: this }));
    }

    public get O() {
        return this.options as Core.Test.ICustomSphere;
    }
}

export { CustomSphere };
