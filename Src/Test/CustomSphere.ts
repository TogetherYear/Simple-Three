import { TSphere } from '@/Core/Actor';
import { TSphereRigidBody } from '@/Core/Components';
import { Type } from '@/Core';
import { TEvent } from '@/Core/Decorators';
import * as THREE from 'three';

interface ICustomSphere extends Type.Base.IActor {
    position: THREE.Vector3;
    rotate: THREE.Vector3;
    scale: THREE.Vector3;
}

class CustomSphere extends TSphere {
    constructor(ctx: Type.Context, options: ICustomSphere) {
        super(ctx, options);
        this.body.position.copy(this.O.position);
        this.body.rotateX(this.O.rotate.x);
        this.body.rotateY(this.O.rotate.y);
        this.body.rotateZ(this.O.rotate.z);
        this.body.scale.copy(this.O.scale);
        this.AddComponent(new TSphereRigidBody(ctx, { mass: 1, fix: false, actor: this }));
    }

    public get O() {
        return this.options as ICustomSphere;
    }

    @TEvent.Listen<CustomSphere>((instance) => instance.ctx.Game, Type.Manager.GameEvent.Update)
    private Update() {
        if (this.body.position.y < -3) {
            this.Destroy();
        }
    }
}

export { CustomSphere };
