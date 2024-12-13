import { Component } from '@/Core/Base';
import { Core } from '@/Core/type';
import * as THREE from 'three';

class BoxRigidBody extends Component {
    constructor(ctx: Core.Context, options: Core.Component.IRigidBodyOptions) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Component.IRigidBodyOptions;
    }

    private Create() {
        this.ctx.Physics.Add(this, {
            mass: this.O.fix ? 0 : this.O.mass,
            type: 'Box',
            position: [this.O.actor.body.position.x, this.O.actor.body.position.y, this.O.actor.body.position.z],
            quaternion: [this.O.actor.body.quaternion.x, this.O.actor.body.quaternion.y, this.O.actor.body.quaternion.z, this.O.actor.body.quaternion.w],
            scale: [this.O.actor.body.scale.x * 0.5, this.O.actor.body.scale.y * 0.5, this.O.actor.body.scale.z * 0.5],
            material: {
                friction: 0.1,
                restitution: 0.5
            },
            allowSleep: true
        });
    }

    public PhysicsUpdate(position: THREE.Vector3, quaternion: THREE.Quaternion) {
        this.O.actor.body.position.copy(position);
        this.O.actor.body.quaternion.copy(quaternion);
    }

    public override Destroy() {
        super.Destroy();
        this.ctx.Physics.Remove(this);
    }
}

export { BoxRigidBody };
