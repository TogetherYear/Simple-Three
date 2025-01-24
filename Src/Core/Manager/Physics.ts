import { Manager } from '../Base';
import { Core } from '../type';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Physics as PW, SharedBufferPhysics as PBW } from '@/Core/Worker';
import { BoxRigidBody, SphereRigidBody } from '@/Core/Components';
import { TEvent } from '../Decorators';
import { SubManager } from '../Base/SubManager';

@TEvent.Create([Core.Manager.PhysicsEvent.Update])
class Physics extends Manager {
    constructor(ctx: Core.Context, options: Core.Manager.IPhysics = {}) {
        super(ctx, options);
    }

    private dealInstance!: WebWorkerSharedArraybufferPhysics | WebWorkerPhysics | DefaultPhysics;

    public get O() {
        return this.options as Core.Manager.IPhysics;
    }

    public bodys = new Map<string, BoxRigidBody | SphereRigidBody>();

    public async Run() {
        if (this.O.webWorker && this.O.sharedArraybuffer) {
            this.dealInstance = new WebWorkerSharedArraybufferPhysics(this.ctx);
        } else if (this.O.webWorker && !this.O.sharedArraybuffer) {
            this.dealInstance = new WebWorkerPhysics(this.ctx);
        } else {
            this.dealInstance = new DefaultPhysics(this.ctx);
        }
        await this.dealInstance.Run();
    }

    public Add(target: BoxRigidBody | SphereRigidBody, options: Core.Worker.Physics.AddOptions) {
        this.dealInstance.Add(target, options);
    }

    public Remove(target: BoxRigidBody | SphereRigidBody) {
        this.dealInstance.Remove(target);
    }

    public override Destroy(): void {
        super.Destroy();
        this.dealInstance.Destroy();
    }
}

class WebWorkerSharedArraybufferPhysics extends SubManager {
    constructor(ctx: Core.Context, options: Core.Manager.IWebWorkerSharedArraybufferPhysics = {}) {
        super(ctx, options);
        this.SetDefault();
    }

    public get O() {
        return this.options as Core.Manager.IWebWorkerSharedArraybufferPhysics;
    }

    private worker!: Worker;

    private postionsSharedBuffer!: SharedArrayBuffer;

    private quaternionsSharedBuffer!: SharedArrayBuffer;

    private positions!: Float32Array;

    private quaternions!: Float32Array;

    private SetDefault() {
        this.worker = new PBW();
        this.postionsSharedBuffer = new SharedArrayBuffer(100 * 3 * Float32Array.BYTES_PER_ELEMENT);
        this.quaternionsSharedBuffer = new SharedArrayBuffer(100 * 4 * Float32Array.BYTES_PER_ELEMENT);
        this.positions = new Float32Array(this.postionsSharedBuffer);
        this.quaternions = new Float32Array(this.quaternionsSharedBuffer);
    }

    public async Run(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.worker!.postMessage({
                type: 'Init',
                postionsSharedBuffer: this.postionsSharedBuffer,
                quaternionsSharedBuffer: this.quaternionsSharedBuffer,
                sharedArraybuffer: true
            });
            this.worker!.addEventListener(
                'message',
                (e) => {
                    if (e.data.type === 'Init') {
                        resolve();
                    }
                },
                { once: true }
            );
        });
    }

    @TEvent.Listen<WebWorkerSharedArraybufferPhysics>((instance) => instance.worker!, 'message')
    private OnMessage(e: Record<string, any>) {
        if (e.data.type === 'Physics') {
            const ids = e.data.ids as Array<string>;
            for (let i = 0; i < ids.length; ++i) {
                const target = this.ctx.Physics.bodys.get(ids[i]);
                if (target) {
                    const position = new THREE.Vector3(this.positions[i * 3 + 0], this.positions[i * 3 + 1], this.positions[i * 3 + 2]);
                    const quaternion = new THREE.Quaternion(this.quaternions[i * 4 + 0], this.quaternions[i * 4 + 1], this.quaternions[i * 4 + 2], this.quaternions[i * 4 + 3]);
                    target.PhysicsUpdate(position, quaternion);
                }
            }
            this.ctx.Physics.Emit(Core.Manager.PhysicsEvent.Update);
        }
    }

    public Add(target: BoxRigidBody | SphereRigidBody, options: Core.Worker.Physics.AddOptions) {
        if (this.ctx.Physics.bodys.size < 100) {
            this.ctx.Physics.bodys.set(target.unique_Id, target);
            this.worker!.postMessage({
                type: 'Add',
                id: target.unique_Id,
                options
            });
        }
    }

    public Remove(target: BoxRigidBody | SphereRigidBody) {
        this.ctx.Physics.bodys.delete(target.unique_Id);
        this.worker!.postMessage({ type: 'Remove', id: target.unique_Id });
    }

    public override Destroy() {
        super.Destroy();
        this.worker.terminate();
    }
}

class WebWorkerPhysics extends SubManager {
    constructor(ctx: Core.Context, options: Core.Manager.IWebWorkerPhysics = {}) {
        super(ctx, options);
        this.SetDefault();
    }

    public get O() {
        return this.options as Core.Manager.IWebWorkerPhysics;
    }

    private worker!: Worker;

    private SetDefault() {
        this.worker = new PW();
    }

    public async Run(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.worker!.postMessage({
                type: 'Init',
                sharedArraybuffer: false
            });
            this.worker!.addEventListener(
                'message',
                (e) => {
                    if (e.data.type === 'Init') {
                        resolve();
                    }
                },
                { once: true }
            );
        });
    }

    @TEvent.Listen<WebWorkerPhysics>((instance) => instance.worker!, 'message')
    private OnMessage(e: Record<string, any>) {
        if (e.data.type === 'Physics') {
            const ids = e.data.ids as Array<string>;
            const positions = e.data.positions as Float32Array;
            const quaternions = e.data.quaternions as Float32Array;
            for (let i = 0; i < ids.length; ++i) {
                const target = this.ctx.Physics.bodys.get(ids[i]);
                if (target) {
                    const position = new THREE.Vector3(positions[i * 3 + 0], positions[i * 3 + 1], positions[i * 3 + 2]);
                    const quaternion = new THREE.Quaternion(quaternions[i * 4 + 0], quaternions[i * 4 + 1], quaternions[i * 4 + 2], quaternions[i * 4 + 3]);
                    target.PhysicsUpdate(position, quaternion);
                }
            }
            this.ctx.Physics.Emit(Core.Manager.PhysicsEvent.Update);
        }
    }

    public Add(target: BoxRigidBody | SphereRigidBody, options: Core.Worker.Physics.AddOptions) {
        if (this.ctx.Physics.bodys.size < 100) {
            this.ctx.Physics.bodys.set(target.unique_Id, target);
            this.worker!.postMessage({
                type: 'Add',
                id: target.unique_Id,
                options
            });
        }
    }

    public Remove(target: BoxRigidBody | SphereRigidBody) {
        this.ctx.Physics.bodys.delete(target.unique_Id);
        this.worker!.postMessage({ type: 'Remove', id: target.unique_Id });
    }

    public override Destroy() {
        super.Destroy();
        this.worker.terminate();
    }
}

class DefaultPhysics extends SubManager {
    constructor(ctx: Core.Context, options: Core.Manager.IDefaultPhysics = {}) {
        super(ctx, options);
        this.SetDefault();
    }

    public get O() {
        return this.options as Core.Manager.IDefaultPhysics;
    }

    private world!: CANNON.World;

    private positions!: Float32Array;

    private quaternions!: Float32Array;

    private timer!: number;

    private deltaTime = 1000 / 60;

    private bodyMap = new Map<number, string>();

    private SetDefault() {
        this.world = new CANNON.World();
        this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        this.world.gravity.set(0, -9.82, 0);
        this.positions = new Float32Array(100 * 3 * Float32Array.BYTES_PER_ELEMENT);
        this.quaternions = new Float32Array(100 * 4 * Float32Array.BYTES_PER_ELEMENT);
    }

    public async Run(): Promise<void> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.timer = setInterval(() => {
                this.Update();
            }, this.deltaTime);
            resolve();
        });
    }

    private Update() {
        this.world.step(this.deltaTime / 1000);
        const ids: Array<number> = [];
        for (let i = 0; i < this.world.bodies.length; ++i) {
            const body = this.world.bodies[i];
            this.positions[i * 3 + 0] = body.position.x;
            this.positions[i * 3 + 1] = body.position.y;
            this.positions[i * 3 + 2] = body.position.z;
            this.quaternions[i * 4 + 0] = body.quaternion.x;
            this.quaternions[i * 4 + 1] = body.quaternion.y;
            this.quaternions[i * 4 + 2] = body.quaternion.z;
            this.quaternions[i * 4 + 3] = body.quaternion.w;
            ids.push(body.id);
        }
        for (let i = 0; i < ids.length; ++i) {
            const target = this.ctx.Physics.bodys.get(this.bodyMap.get(ids[i])!);
            if (target) {
                const position = new THREE.Vector3(this.positions[i * 3 + 0], this.positions[i * 3 + 1], this.positions[i * 3 + 2]);
                const quaternion = new THREE.Quaternion(this.quaternions[i * 4 + 0], this.quaternions[i * 4 + 1], this.quaternions[i * 4 + 2], this.quaternions[i * 4 + 3]);
                target.PhysicsUpdate(position, quaternion);
            }
        }
        this.ctx.Physics.Emit(Core.Manager.PhysicsEvent.Update);
    }

    public Add(target: BoxRigidBody | SphereRigidBody, options: Core.Worker.Physics.AddOptions) {
        if (this.ctx.Physics.bodys.size < 100) {
            let body!: CANNON.Body;
            if (options.type === 'Box') {
                body = this.AddBox(options);
            } else if (options.type === 'Sphere') {
                body = this.AddSphere(options);
            }
            this.world.addBody(body);
            this.bodyMap.set(body.id, target.unique_Id);
            this.ctx.Physics.bodys.set(target.unique_Id, target);
        }
    }

    private AddBox(options: Core.Worker.Physics.AddOptions) {
        const body = new CANNON.Body({
            mass: options.mass,
            position: new CANNON.Vec3(options.position[0], options.position[1], options.position[2]),
            quaternion: new CANNON.Quaternion(options.quaternion[0], options.quaternion[1], options.quaternion[2], options.quaternion[3]),
            shape: new CANNON.Box(new CANNON.Vec3(options.scale[0], options.scale[1], options.scale[2])),
            material: new CANNON.Material({
                friction: options.material.friction,
                restitution: options.material.restitution
            }),
            allowSleep: options.allowSleep
        });
        return body;
    }

    private AddSphere(options: Core.Worker.Physics.AddOptions) {
        const body = new CANNON.Body({
            mass: options.mass,
            position: new CANNON.Vec3(options.position[0], options.position[1], options.position[2]),
            quaternion: new CANNON.Quaternion(options.quaternion[0], options.quaternion[1], options.quaternion[2], options.quaternion[3]),
            shape: new CANNON.Sphere(options.scale[0]),
            material: new CANNON.Material({
                friction: options.material.friction,
                restitution: options.material.restitution
            }),
            allowSleep: options.allowSleep
        });
        return body;
    }

    public Remove(target: BoxRigidBody | SphereRigidBody) {
        this.ctx.Physics.bodys.delete(target.unique_Id);
    }

    public override Destroy() {
        super.Destroy();
        clearInterval(this.timer);
        //@ts-ignore
        this.world = null;
    }
}

export { Physics };
