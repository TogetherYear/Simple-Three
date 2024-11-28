import { TBox } from '@/Core/Actor';
import { TBoxRigidBody } from '@/Core/Components';
import { TEvent } from '@/Core/Decorators';
import { Type } from '@/Core';

class CustomBox extends TBox {
    constructor(ctx: Type.Context, options: Type.Test.ICustomBox) {
        super(ctx, options);
        this.body.position.copy(this.O.position);
        this.body.rotateX(this.O.rotate.x);
        this.body.rotateY(this.O.rotate.y);
        this.body.rotateZ(this.O.rotate.z);
        this.body.scale.copy(this.O.scale);
        this.AddComponent(new TBoxRigidBody(ctx, { mass: 1, actor: this, fix: false }));
    }

    public get O() {
        return this.options as Type.Test.ICustomBox;
    }

    @TEvent.Listen<CustomBox>((instance) => instance.ctx.Game, Type.Manager.GameEvent.Update)
    private Update() {
        if (this.body.position.y < -3) {
            this.Destroy();
        }
    }
}

export { CustomBox };
