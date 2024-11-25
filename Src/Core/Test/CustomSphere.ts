import { TSphere } from '../Actor/TSphere';
import { TSphereRigidBody } from '../Components/TSphereRigidBody';
import { ST } from '../type';

class CustomSphere extends TSphere {
    constructor(ctx: ST.Context, options: ST.Test.ICustomSphere) {
        super(ctx, options);
        this.body.position.copy(this.O.position);
        this.body.rotateX(this.O.rotate.x);
        this.body.rotateY(this.O.rotate.y);
        this.body.rotateZ(this.O.rotate.z);
        this.body.scale.copy(this.O.scale);
        this.AddComponent(new TSphereRigidBody(ctx, { mass: 1, fix: false, actor: this }));
        setTimeout(() => {
            this.Destroy();
        }, 20000);
    }

    public get O() {
        return this.options as ST.Test.ICustomSphere;
    }
}

export { CustomSphere };
