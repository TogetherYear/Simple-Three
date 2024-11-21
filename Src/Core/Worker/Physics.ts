import * as CANNON from 'cannon-es';

// const world = new CANNON.World();
// world.broadphase = new CANNON.SAPBroadphase(world);
// world.gravity.set(0, -9.82, 0);

self.onmessage = (e) => {
    console.log('Worker:Physics:Thread', e.data);
};
