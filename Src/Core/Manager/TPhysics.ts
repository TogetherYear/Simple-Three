import { TManager } from '@/Core/Base';
import { Core } from '@/Core/type';
import * as THREE from 'three';
import { Physics } from '@/Core/Worker';
import { TBoxRigidBody, TSphereRigidBody } from '@/Core/Components';
import { TEvent } from '@/Core/Decorators';

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

    public override Destroy(): void {
        super.Destroy();
        this.worker.terminate();
    }
}

export { TPhysics };
