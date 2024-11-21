import { TComponent } from '@/Core/Base/TComponent';
import { TActor } from '@/Core/Base/TActor';
import { TEvent } from '@/Core/Decorators/TEvent';
import { TGame } from '@/Core/Manager/TGame';
import { ST } from '@/Core/type';
import * as CANNON from 'cannon-es';
import { TPhysics } from '@/Core/Manager/TPhysics';

class TBoxRigidBody extends TComponent {
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

    private body!: CANNON.Body;

    private Create() {
        this.body = new CANNON.Body({
            mass: this.options.fix ? 0 : this.options.mass,
            position: new CANNON.Vec3(this.actor.body.position.x, this.actor.body.position.y, this.actor.body.position.z),
            quaternion: new CANNON.Quaternion(this.actor.body.quaternion.x, this.actor.body.quaternion.y, this.actor.body.quaternion.z, this.actor.body.quaternion.w),
            shape: new CANNON.Box(new CANNON.Vec3(this.actor.body.scale.x * 0.5, this.actor.body.scale.y * 0.5, this.actor.body.scale.z * 0.5)),
            material: new CANNON.Material({
                friction: 0.1,
                restitution: 0.5
            }),
            allowSleep: true
        });
        TPhysics.Add(this.body);
    }

    @TEvent.Listen(TGame, ST.Manager.TGame.Event.Update)
    private Update() {
        this.actor.body.position.copy(this.body.position);
        this.actor.body.quaternion.copy(this.body.quaternion);
    }

    public override Destroy() {
        super.Destroy();
        TPhysics.Remove(this.body);
    }

    @TEvent.Listen<TBoxRigidBody>((instance) => instance.body, 'collide')
    private OnCollide(target: any) {}
}

export { TBoxRigidBody };
