import { Plane } from '@/Core/Actor';
import { BoxRigidBody } from '@/Core/Components';
import { Type } from '@/Core';
import * as THREE from 'three';

interface ICustomPlane extends Type.Base.IActor {
    position: THREE.Vector3;
    rotate: THREE.Vector3;
    scale: THREE.Vector3;
}

class CustomPlane extends Plane {
    constructor(ctx: Type.Context, options: ICustomPlane) {
        super(ctx, options);
        this.body.position.copy(this.O.position);
        this.body.rotateX(this.O.rotate.x);
        this.body.rotateY(this.O.rotate.y);
        this.body.rotateZ(this.O.rotate.z);
        this.body.scale.copy(this.O.scale);
        this.AddComponent(new BoxRigidBody(ctx, { fix: true, mass: 1, actor: this }));
    }

    public get O() {
        return this.options as ICustomPlane;
    }
}

export { CustomPlane };
