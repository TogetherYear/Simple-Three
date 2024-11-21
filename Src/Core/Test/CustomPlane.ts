import { TBoxRigidBody } from '../Actor/Component/TBoxRigidBody';
import { TPlane } from '../Actor/TPlane';

class CustomPlane extends TPlane {
    constructor() {
        super();
        this.AddComponent(new TBoxRigidBody(this, { fix: true }));
    }
}

export { CustomPlane };
