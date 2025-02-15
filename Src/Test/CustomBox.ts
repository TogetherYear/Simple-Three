import { Box } from '@/Core/Actor';
import { BoxRigidBody } from '@/Core/Components';
import { TEvent } from '@/Core/Decorators';
import { Type } from '@/Core';
import * as THREE from 'three';

interface ICustomBox extends Type.Base.IActor {
    position: THREE.Vector3;
    rotate: THREE.Vector3;
    scale: THREE.Vector3;
}

class CustomBox extends Box {
    constructor(ctx: Type.Context, options: ICustomBox) {
        super(ctx, options);
        this.body.position.copy(this.O.position);
        this.body.rotateX(this.O.rotate.x);
        this.body.rotateY(this.O.rotate.y);
        this.body.rotateZ(this.O.rotate.z);
        this.body.scale.copy(this.O.scale);
        this.AddComponent(new BoxRigidBody(ctx, { mass: 1, actor: this, fix: false }));
    }

    public get O() {
        return this.options as ICustomBox;
    }

    @TEvent.Listen<CustomBox>((instance) => instance.ctx.Game, Type.Manager.GameEvent.Update)
    private Update() {
        if (this.body.position.y < -3) {
            this.Destroy();
        }
    }
}

export { CustomBox };
