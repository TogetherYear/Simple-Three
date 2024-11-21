import { TActor } from '../Base/TActor';
import { TGame } from '../Manager/TGame';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ST } from '../type';
import * as THREE from 'three';

class TGltfModel extends TActor {
    constructor(optons: ST.Actor.IGltfModelOptions) {
        super();
        this.options = optons;
        this.Create();
    }

    private options!: ST.Actor.IGltfModelOptions;

    private Create() {
        const loader = new GLTFLoader();
        loader.load(this.options.path, (model) => {
            // this.SetChildrenShadow(model.scene);
            this.body = model.scene;
            this.body.position.copy(this.options.position || new THREE.Vector3());
            TGame.Add(this.body);
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
