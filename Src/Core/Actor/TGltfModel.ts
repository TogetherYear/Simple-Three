import { TActor } from '../Base/TActor';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Core } from '../type';
import * as THREE from 'three';

class TGltfModel extends TActor {
    constructor(ctx: Core.Context, options: Core.Actor.IGltfModelOptions) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.IGltfModelOptions;
    }

    private Create() {
        const loader = new GLTFLoader();
        loader.load(this.O.path, (model) => {
            // this.SetChildrenShadow(model.scene);
            this.body = model.scene;
            this.body.position.copy(this.O.position || new THREE.Vector3());
            this.ctx.Game.Add(this.body);
        });
    }

    private SetChildrenShadow(target: any) {
        target.castShadow = true;
        target.receiveShadow = true;
        for (let c of target.children) {
            this.SetChildrenShadow(c);
        }
    }
}

export { TGltfModel };
