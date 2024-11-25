import { ST } from '../type';
import { TPlugin } from '../Base/TPlugin';
import { TEvent } from '../Decorators/TEvent';
import * as THREE from 'three';
import { Mathf } from '../Utils/Mathf';

/**
 * 圆球视角控制器
 */
class TRoundCameraControl extends TPlugin {
    constructor(ctx: ST.Context, options: ST.Plugin.IRoundCameraControl = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as ST.Plugin.IRoundCameraControl;
    }

    @TEvent.Listen<TRoundCameraControl>((instance) => instance.ctx.Input, ST.Manager.InputEvent.MouseMoveDelta)
    private RotateDelta() {
        if (this.ctx.Input.mouseStatus.right) {
            if (this.ctx.Input.mouseMoveDelta.length() !== 0) {
                this.ctx.Camera.cameraObject.rotateOnWorldAxis(this.ctx.Input.DIRECTION.DOWN, 0.24 * this.ctx.Input.mouseMoveDelta.x * this.ctx.Game.deltaTime);
                this.ctx.Camera.camera.position.applyAxisAngle(this.ctx.Input.DIRECTION.LEFT, 0.24 * this.ctx.Input.mouseMoveDelta.y * this.ctx.Game.deltaTime);
                this.ctx.Camera.camera.lookAt(this.ctx.Input.DIRECTION.ORIGIN);
            }
        }
    }

    @TEvent.Listen<TRoundCameraControl>((instance) => instance.ctx.Input, ST.Manager.InputEvent.Wheel)
    private Wheel(e: { flag: boolean }) {
        const distance = this.ctx.Camera.camera.position.distanceTo(this.ctx.Input.DIRECTION.ORIGIN);
        const direction = new THREE.Vector3(this.ctx.Camera.camera.position.x, this.ctx.Camera.camera.position.y, this.ctx.Camera.camera.position.z).normalize();
        const target = direction.multiplyScalar(Mathf.Clamp(1, 14, distance * (e.flag ? 0.9 : 1.1)));
        this.ctx.Camera.camera.position.set(target.x, target.y, target.z);
    }
}

export { TRoundCameraControl };
