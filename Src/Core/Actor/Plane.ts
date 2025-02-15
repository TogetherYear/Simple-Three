import * as THREE from 'three';
import { Actor } from '../Base';
import bcT from '../Images/bc.png';
import hT from '../Images/h.png';
import nT from '../Images/n.png';
import mT from '../Images/m.png';
import rT from '../Images/r.png';
import { Core } from '../type';

class Plane extends Actor {
    constructor(ctx: Core.Context, options: Core.Actor.IPlane = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.IPlane;
    }

    private Create() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        this.body = new THREE.Mesh(geometry, this.GetInstanceMaterial(6, THREE.FrontSide));
        this.body.castShadow = false;
        this.body.receiveShadow = true;
        this.body.scale.set(14, 0.05, 14);
        this.ctx.Game.Add(this);
    }

    private GetInstanceMaterial(repeat: number, side: THREE.Side) {
        const basecolor = new THREE.TextureLoader().load(bcT);
        basecolor.wrapS = THREE.RepeatWrapping;
        basecolor.wrapT = THREE.RepeatWrapping;
        basecolor.repeat.set(repeat, repeat);
        const height = new THREE.TextureLoader().load(hT);
        height.wrapS = THREE.RepeatWrapping;
        height.wrapT = THREE.RepeatWrapping;
        height.repeat.set(repeat, repeat);
        const metallic = new THREE.TextureLoader().load(mT);
        metallic.wrapS = THREE.RepeatWrapping;
        metallic.wrapT = THREE.RepeatWrapping;
        metallic.repeat.set(repeat, repeat);
        const normal = new THREE.TextureLoader().load(nT);
        normal.wrapS = THREE.RepeatWrapping;
        normal.wrapT = THREE.RepeatWrapping;
        normal.repeat.set(repeat, repeat);
        const roughness = new THREE.TextureLoader().load(rT);
        roughness.wrapS = THREE.RepeatWrapping;
        roughness.wrapT = THREE.RepeatWrapping;
        roughness.repeat.set(repeat, repeat);
        const material = new THREE.MeshStandardMaterial({
            map: basecolor,
            side: side,
            bumpMap: height,
            normalMap: normal,
            metalnessMap: metallic,
            roughnessMap: roughness
        });
        return material;
    }
}

export { Plane };
