import { TManager } from '../Base/TManager';
import { Core } from '../type';
import { TEvent } from '../Decorators/TEvent';
import { TTest } from '../Decorators/TTest';
import { CustomBox } from '../Test/CustomBox';
import * as THREE from 'three';
import { Mathf } from '../Utils/Mathf';
import Physics from '@/Core/Worker/Physics?worker';
import { TBoxRigidBody } from '../Components/TBoxRigidBody';
import { TSphereRigidBody } from '../Components/TSphereRigidBody';
import { CustomSphere } from '../Test/CustomSphere';

@TEvent.Create([Core.Manager.PhysicsEvent.FixedUpdate])
class TPhysics extends TManager {
    constructor(ctx: Core.Context, options: Core.Manager.IPhysics = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Manager.IPhysics;
    }

    private worker = new Physics();

    private postionsSharedBuffer = new SharedArrayBuffer(100 * 3 * Float32Array.BYTES_PER_ELEMENT);

    private quaternionsSharedBuffer = new SharedArrayBuffer(100 * 4 * Float32Array.BYTES_PER_ELEMENT);

    private positions!: Float32Array;

    private quaternions!: Float32Array;

    private bodys = new Map<string, TBoxRigidBody | TSphereRigidBody>();

    public async Run() {
        await this.CreateWorker();
    }

    private CreateWorker(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.positions = new Float32Array(this.postionsSharedBuffer);
            this.quaternions = new Float32Array(this.quaternionsSharedBuffer);
            this.worker.postMessage({
                type: 'Init',
                postionsSharedBuffer: this.postionsSharedBuffer,
                quaternionsSharedBuffer: this.quaternionsSharedBuffer
            });
            resolve();
        });
    }

    @TEvent.Listen<TPhysics>((instance) => instance.worker, 'message')
    private OnMessage(e: Record<string, any>) {
        if (e.data.type === 'Physics') {
            const ids = e.data.ids as Array<string>;
            for (let i = 0; i < ids.length; ++i) {
                const target = this.bodys.get(ids[i]);
                if (target) {
                    const position = new THREE.Vector3(this.positions[i * 3 + 0], this.positions[i * 3 + 1], this.positions[i * 3 + 2]);
                    const quaternion = new THREE.Quaternion(this.quaternions[i * 4 + 0], this.quaternions[i * 4 + 1], this.quaternions[i * 4 + 2], this.quaternions[i * 4 + 3]);
                    target.PhysicsUpdate(position, quaternion);
                }
            }
            this.Emit(Core.Manager.PhysicsEvent.FixedUpdate);
        }
    }

    public Add(target: TBoxRigidBody | TSphereRigidBody, options: Core.Worker.Physics.AddOptions) {
        this.bodys.set(target.unique_Id, target);
        this.worker.postMessage({
            type: 'Add',
            id: target.unique_Id,
            options
        });
    }

    public Remove(target: TBoxRigidBody | TSphereRigidBody) {
        this.bodys.delete(target.unique_Id);
        this.worker.postMessage({ type: 'Remove', id: target.unique_Id });
    }

    @TTest.BindFunction<TPhysics>((instance) => `RigidBody`)
    private AddCustomPhysicsBody() {
        if (Math.random() < 0.5) {
            new CustomBox(this.ctx, {
                position: new THREE.Vector3(Math.random() * 12 - 6, Math.random() * 6 + 3, Math.random() * 12 - 6),
                rotate: new THREE.Vector3(Math.random() * 360, Math.random() * 360, Math.random() * 360),
                scale: new THREE.Vector3(
                    Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6),
                    Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6),
                    Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6)
                )
            });
        } else {
            const scale = Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6);
            new CustomSphere(this.ctx, {
                position: new THREE.Vector3(Math.random() * 12 - 6, Math.random() * 6 + 3, Math.random() * 12 - 6),
                rotate: new THREE.Vector3(Math.random() * 360, Math.random() * 360, Math.random() * 360),
                scale: new THREE.Vector3(scale, scale, scale)
            });
        }
    }

    public override Destroy(): void {
        super.Destroy();
        this.worker.terminate();
    }
}

export { TPhysics };
