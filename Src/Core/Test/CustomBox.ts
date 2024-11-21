import { TBoxRigidBody } from '../Actor/Component/TBoxRigidBody';
import { TBox } from '../Actor/TBox';
import * as THREE from 'three';

class CustomBox extends TBox {
    constructor(position: THREE.Vector3, rotate: THREE.Vector3, scale: THREE.Vector3) {
        super();
        this.body.position.copy(position);
        this.body.rotateX(rotate.x);
        this.body.rotateY(rotate.y);
        this.body.rotateZ(rotate.z);
        this.body.scale.copy(scale);
        this.AddComponent(new TBoxRigidBody(this, { mass: 1 }));
    }
}

export { CustomBox };
