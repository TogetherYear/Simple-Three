import * as CANNON from 'cannon-es';

import { Core } from '@/Core/type';

let world!: CANNON.World;

let positions!: Float32Array;

let quaternions!: Float32Array;

const idMap = new Map<number, string>();

const bodyMap = new Map<string, CANNON.Body>();

/**
 * 物理计算间隔 毫秒
 */
const deltaTime = 1000 / 60;

self.onmessage = (e) => {
    if (e.data.type === 'Init') {
        Init(e.data);
    } else if (e.data.type === 'Add') {
        Add(e.data);
    } else if (e.data.type === 'Remove') {
        Remove(e.data);
    }
};

const Init = (data: Core.Worker.Physics.InitOptionsHasSharedArrayBuffer) => {
    world = new CANNON.World();
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.gravity.set(0, -9.82, 0);
    positions = new Float32Array(data.postionsSharedBuffer);
    quaternions = new Float32Array(data.quaternionsSharedBuffer);
    self.postMessage({
        type: 'Init'
    });
    Physics();
};

const Physics = () => {
    setInterval(() => {
        world.step(deltaTime / 1000);

        const ids: Array<string> = [];
        for (let i = 0; i < world.bodies.length; ++i) {
            const body = world.bodies[i];
            positions[i * 3 + 0] = body.position.x;
            positions[i * 3 + 1] = body.position.y;
            positions[i * 3 + 2] = body.position.z;
            quaternions[i * 4 + 0] = body.quaternion.x;
            quaternions[i * 4 + 1] = body.quaternion.y;
            quaternions[i * 4 + 2] = body.quaternion.z;
            quaternions[i * 4 + 3] = body.quaternion.w;
            ids.push(idMap.get(body.id)!);
        }
        self.postMessage({
            type: 'Physics',
            ids: ids
        });
    }, deltaTime);
};

const Add = (data: Core.Worker.Physics.AddBody) => {
    const Box = (options: Core.Worker.Physics.AddOptions) => {
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
    };

    const Sphere = (options: Core.Worker.Physics.AddOptions) => {
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
    };

    let body!: CANNON.Body;

    if (data.options.type === 'Box') {
        body = Box(data.options);
    } else if (data.options.type === 'Sphere') {
        body = Sphere(data.options);
    }
    world.addBody(body);
    idMap.set(body.id, data.id);
    bodyMap.set(data.id, body);
};

const Remove = (data: Core.Worker.Physics.RemoveBody) => {
    const body = bodyMap.get(data.id)!;
    bodyMap.delete(data.id);
    idMap.delete(body.id);
    world.removeBody(body);
};
