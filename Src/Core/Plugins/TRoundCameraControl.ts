import { ST } from '../type';
import { TPlugin } from '../Base/TPlugin';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * 圆球视角控制器
 */
class TRoundCameraControl extends TPlugin {
    constructor(ctx: ST.Context, options: ST.Plugin.IRoundCameraControl = {}) {
        super(ctx, options);
        this.control = new OrbitControls(this.ctx.Camera.camera, this.ctx.dom);
        this.control.enablePan = false;
        this.control.rotateSpeed = 0.5;
        this.control.zoomSpeed = 1.5;
        this.ctx.Plugins.set(this.constructor.name, this);
    }

    private control!: OrbitControls;

    public get O() {
        return this.options as ST.Plugin.IRoundCameraControl;
    }

    public override Destroy(): void {
        super.Destroy();
        this.ctx.Plugins.delete(this.constructor.name);
    }
}

export { TRoundCameraControl };
