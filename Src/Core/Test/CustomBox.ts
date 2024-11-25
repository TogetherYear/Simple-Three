import { TBoxRigidBody } from '../Actor/Component/TBoxRigidBody';
import { TBox } from '../Actor/TBox';
import { ST } from '../type';

class CustomBox extends TBox {
    constructor(ctx: ST.Context, options: ST.Test.ICustomBox) {
        super(ctx, options);
        this.body.position.copy(this.O.position);
        this.body.rotateX(this.O.rotate.x);
        this.body.rotateY(this.O.rotate.y);
        this.body.rotateZ(this.O.rotate.z);
        this.body.scale.copy(this.O.scale);
        this.AddComponent(new TBoxRigidBody(ctx, { mass: 1, actor: this, fix: false }));

        setTimeout(() => {
            this.Destroy();
        }, 20000);
    }

    public get O() {
        return this.options as ST.Test.ICustomBox;
    }
}

export { CustomBox };
