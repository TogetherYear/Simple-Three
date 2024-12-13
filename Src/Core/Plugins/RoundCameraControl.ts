import { Core } from '@/Core/type';
import { Plugin } from '@/Core/Base';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * 圆球视角控制器
 */
class RoundCameraControl extends Plugin {
    constructor(ctx: Core.Context, options: Core.Plugin.IRoundCameraControl = {}) {
        super(ctx, options);
        this.control = new OrbitControls(this.ctx.Camera.camera, this.ctx.dom);
        this.control.enablePan = false;
        this.control.rotateSpeed = 0.5;
        this.control.zoomSpeed = 1.5;
    }

    private control!: OrbitControls;

    public get O() {
        return this.options as Core.Plugin.IRoundCameraControl;
    }

    public override Destroy(): void {
        super.Destroy();
    }
}

export { RoundCameraControl };
