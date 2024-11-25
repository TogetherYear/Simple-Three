import * as THREE from 'three';
import { TSphere } from '../Actor/TSphere';
import { TSphereRigidBody } from '../Actor/Component/TSphereRigidBody';
import { ST } from '../type';

class CustomSphere extends TSphere {
    constructor(ctx: ST.Context, position: THREE.Vector3, rotate: THREE.Vector3, scale: THREE.Vector3) {
        super(ctx);
        this.body.position.copy(position);
        this.body.rotateX(rotate.x);
        this.body.rotateY(rotate.y);
        this.body.rotateZ(rotate.z);
        this.body.scale.copy(scale);
        this.AddComponent(new TSphereRigidBody(ctx, this, { mass: 1 }));
        setTimeout(() => {
            this.Destroy();
        }, 20000);
    }
}

export { CustomSphere };
