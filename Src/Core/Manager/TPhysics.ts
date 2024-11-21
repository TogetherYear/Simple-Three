import { TManager } from '../Base/TManager';
import { TGame } from './TGame';
import { ST } from '../type';
import { TEvent } from '../Decorators/TEvent';
import * as CANNON from 'cannon-es';
import { TTest } from '../Decorators/TTest';
import { CustomBox } from '../Test/CustomBox';
import * as THREE from 'three';
import { Mathf } from '../Utils/Mathf';
import Physics from '@/Core/Worker/Physics?worker';

class TPhysics extends TManager {
    constructor() {
        super();
    }

    // private worker = new Physics();

    private world!: CANNON.World;

    public Run() {
        this.CreateWorld();
    }

    // @TEvent.Listen<TPhysics>((instance)=>instance.worker,'message')
    // private OnMessage(e:SharedArrayBuffer){
    //     console.log("Worker:Physics:Main",e)
    // }

    private CreateWorld() {
        this.world = new CANNON.World();
        this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        this.world.gravity.set(0, -9.82, 0);
    }

    @TEvent.Listen(TGame, ST.Manager.TGame.Event.Update)
    public Update() {
        this.world.step(TGame.deltaTime);
    }

    public Add(body: CANNON.Body) {
        this.world.addBody(body);
    }

    public Remove(body: CANNON.Body) {
        this.world.removeBody(body);
    }

    @TTest.BindFunction('AddBox')
    private AddBox() {
        const box = new CustomBox(
            new THREE.Vector3(Math.random() * 12 - 6, Math.random() * 6 + 3, Math.random() * 12 - 6),
            new THREE.Vector3(Math.random() * 360, Math.random() * 360, Math.random() * 360),
            new THREE.Vector3(
                Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6),
                Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6),
                Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6)
            )
        );

        setTimeout(() => {
            box.Destroy();
        }, 5000);
    }
}

const TPhysicsInstance = new TPhysics();

export { TPhysicsInstance as TPhysics };
