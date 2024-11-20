import { TBoxRigidBody } from '../Actor/Component/TBoxRigidBody';
import { TPlane } from '../Actor/TPlane';

class Plane extends TPlane {
    constructor() {
        super();
        this.AddComponent(new TBoxRigidBody(this, { fix: true }));
    }
}

export { Plane };
