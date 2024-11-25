import { TBoxRigidBody } from '../Actor/Component/TBoxRigidBody';
import { TBox } from '../Actor/TBox';
import * as THREE from 'three';
import { ST } from '../type';

class CustomBox extends TBox {
    constructor(ctx: ST.Context, position: THREE.Vector3, rotate: THREE.Vector3, scale: THREE.Vector3) {
        super(ctx);
        this.body.position.copy(position);
        this.body.rotateX(rotate.x);
        this.body.rotateY(rotate.y);
        this.body.rotateZ(rotate.z);
        this.body.scale.copy(scale);
        this.AddComponent(new TBoxRigidBody(ctx, this, { mass: 1 }));

        setTimeout(() => {
            this.Destroy();
        }, 20000);
    }
}

export { CustomBox };
