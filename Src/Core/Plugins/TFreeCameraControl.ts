import { Core } from '../type';
import { TPlugin } from '../Base/TPlugin';
import { TEvent } from '../Decorators/TEvent';

/**
 * 自由视角控制器
 */
class TFreeCameraControl extends TPlugin {
    constructor(ctx: Core.Context, options: Core.Plugin.IFreeCameraControl = {}) {
        super(ctx, options);
        this.ctx.Plugins.set(this.constructor.name, this);
    }

    public get O() {
        return this.options as Core.Plugin.IFreeCameraControl;
    }

    @TEvent.Listen<TFreeCameraControl>((instance) => instance.ctx.Game, Core.Manager.GameEvent.Update)
    private Update() {
        if (this.ctx.Input.mouseStatus.right) {
            if (this.ctx.Input.direction.length() !== 0) {
                this.ctx.Camera.camera.translateZ(4.3 * -this.ctx.Input.direction.y * this.ctx.Game.deltaTime);
                this.ctx.Camera.camera.translateX(4.3 * this.ctx.Input.direction.x * this.ctx.Game.deltaTime);
                this.ctx.Camera.camera.translateY(4.3 * this.ctx.Input.direction.z * this.ctx.Game.deltaTime);
            }
        }
    }

    @TEvent.Listen<TFreeCameraControl>((instance) => instance.ctx.Input, Core.Manager.InputEvent.MouseMoveDelta)
    private RotateDelta() {
        if (this.ctx.Input.mouseStatus.right) {
            if (this.ctx.Input.mouseMoveDelta.length() !== 0) {
                this.ctx.Camera.camera.rotateOnAxis(this.ctx.Input.DIRECTION.LEFT, 0.24 * this.ctx.Input.mouseMoveDelta.y * this.ctx.Game.deltaTime);
                this.ctx.Camera.camera.rotateOnWorldAxis(this.ctx.Input.DIRECTION.DOWN, 0.24 * this.ctx.Input.mouseMoveDelta.x * this.ctx.Game.deltaTime);
            }
        }
    }

    public override Destroy(): void {
        super.Destroy();
        this.ctx.Plugins.delete(this.constructor.name);
    }
}

export { TFreeCameraControl };
