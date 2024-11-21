import { TComponent } from '@/Core/Base/TComponent';
import { TActor } from '@/Core/Base/TActor';
import { TEvent } from '@/Core/Decorators/TEvent';
import { TGame } from '@/Core/Manager/TGame';
import { ST } from '@/Core/type';
import { TPhysics } from '@/Core/Manager/TPhysics';
import * as THREE from 'three';

class TSphereRigidBody extends TComponent {
    constructor(actor: TActor, options?: Partial<ST.Component.IRigidBodyOptions>) {
        super(actor);
        this.options.fix = options?.fix || false;
        this.options.mass = options?.mass || 1;
        this.Create();
    }

    private options: ST.Component.IRigidBodyOptions = {
        fix: false,
        mass: 1
    };

    private Create() {
        TPhysics.Add(this, {
            mass: this.options.fix ? 0 : this.options.mass,
            type: 'Sphere',
            position: [this.actor.body.position.x, this.actor.body.position.y, this.actor.body.position.z],
            quaternion: [this.actor.body.quaternion.x, this.actor.body.quaternion.y, this.actor.body.quaternion.z, this.actor.body.quaternion.w],
            scale: [this.actor.body.scale.x * 0.5, this.actor.body.scale.y * 0.5, this.actor.body.scale.z * 0.5],
            material: {
                friction: 0.1,
                restitution: 0.5
            },
            allowSleep: true
        });
    }

    public PhysicsUpdate(position: THREE.Vector3, quaternion: THREE.Quaternion) {
        this.actor.body.position.copy(position);
        this.actor.body.quaternion.copy(quaternion);
    }

    public override Destroy() {
        super.Destroy();
        TPhysics.Remove(this);
    }
}

export { TSphereRigidBody };
