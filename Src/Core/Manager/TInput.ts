import { TManager } from '../Base/TManager';
import { Core } from '../type';
import { TEvent } from '../Decorators/TEvent';
import * as THREE from 'three';
import { TTool } from '../Decorators/TTool';

@TEvent.Create([Core.Manager.InputEvent.MouseMoveDelta, Core.Manager.InputEvent.Wheel])
class TInput extends TManager {
    constructor(ctx: Core.Context, options: Core.Manager.IInput = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Manager.IInput;
    }

    public DIRECTION = {
        UP: new THREE.Vector3(0, 1, 0),
        DOWN: new THREE.Vector3(0, -1, 0),
        FORWARD: new THREE.Vector3(0, 0, -1),
        BEHIND: new THREE.Vector3(0, 0, 1),
        LEFT: new THREE.Vector3(-1, 0, 0),
        RIGHT: new THREE.Vector3(1, 0, 0),
        ORIGIN: new THREE.Vector3(0, 0, 0)
    };

    public keyStatus = {
        q: false,
        e: false,
        w: false,
        s: false,
        a: false,
        d: false,
        upArrow: false,
        downArrow: false,
        leftArrow: false,
        rightArrow: false,
        ctrl: false,
        shift: false,
        alt: false,
        space: false
    };

    public mouseStatus = {
        left: false,
        right: false,
        mid: false
    };

    public direction = new THREE.Vector3();

    public mouseMoveDelta = new THREE.Vector2();

    public lastPostion = new THREE.Vector2();

    public focus = false;

    public Run() {}

    @TEvent.Listen<TInput>((instance) => instance.ctx.dom, 'mouseenter')
    private OnEnter() {
        this.focus = true;
    }

    @TEvent.Listen<TInput>((instance) => instance.ctx.dom, 'mouseleave')
    private OnLeave() {
        this.direction.multiplyScalar(0);
        this.mouseMoveDelta.multiplyScalar(0);
        this.lastPostion.multiplyScalar(0);
        for (let k in this.keyStatus) {
            //@ts-ignore
            this.keyStatus[k] = false;
        }
        for (let m in this.mouseStatus) {
            //@ts-ignore
            this.mouseStatus[m] = false;
        }
        this.focus = false;
    }

    @TEvent.Listen(window, 'keydown')
    private OnKeyDown(e: KeyboardEvent) {
        if (!this.focus) return;
        if (e.key !== 'F12') {
            e.preventDefault();
        }

        if (e.key === 'w' || e.key === 'W') {
            this.keyStatus.w = true;
        } else if (e.key === 's' || e.key === 'S') {
            this.keyStatus.s = true;
        } else if (e.key === 'a' || e.key === 'A') {
            this.keyStatus.a = true;
        } else if (e.key === 'd' || e.key === 'D') {
            this.keyStatus.d = true;
        } else if (e.key === 'q' || e.key === 'Q') {
            this.keyStatus.q = true;
        } else if (e.key === 'e' || e.key === 'E') {
            this.keyStatus.e = true;
        } else if (e.key === 'ArrowUp') {
            this.keyStatus.upArrow = true;
        } else if (e.key === 'ArrowDown') {
            this.keyStatus.downArrow = true;
        } else if (e.key === 'ArrowLeft') {
            this.keyStatus.leftArrow = true;
        } else if (e.key === 'ArrowRight') {
            this.keyStatus.rightArrow = true;
        } else if (e.key === 'Control') {
            this.keyStatus.ctrl = true;
        } else if (e.key === 'Shift') {
            this.keyStatus.shift = true;
        } else if (e.key === 'Alt') {
            this.keyStatus.alt = true;
        }
    }

    @TEvent.Listen(window, 'keyup')
    private OnKeyUp(e: KeyboardEvent) {
        if (!this.focus) return;
        e.preventDefault();
        if (e.key === 'w' || e.key === 'W') {
            this.keyStatus.w = false;
        } else if (e.key === 's' || e.key === 'S') {
            this.keyStatus.s = false;
        } else if (e.key === 'a' || e.key === 'A') {
            this.keyStatus.a = false;
        } else if (e.key === 'd' || e.key === 'D') {
            this.keyStatus.d = false;
        } else if (e.key === 'q' || e.key === 'Q') {
            this.keyStatus.q = false;
        } else if (e.key === 'e' || e.key === 'E') {
            this.keyStatus.e = false;
        } else if (e.key === 'ArrowUp') {
            this.keyStatus.upArrow = false;
        } else if (e.key === 'ArrowDown') {
            this.keyStatus.downArrow = false;
        } else if (e.key === 'ArrowLeft') {
            this.keyStatus.leftArrow = false;
        } else if (e.key === 'ArrowRight') {
            this.keyStatus.rightArrow = false;
        } else if (e.key === 'Control') {
            this.keyStatus.ctrl = false;
        } else if (e.key === 'Shift') {
            this.keyStatus.shift = false;
        } else if (e.key === 'Alt') {
            this.keyStatus.alt = false;
        }
    }

    @TEvent.Listen<TInput>((instance) => instance.ctx.dom, 'mousedown')
    private OnMouseDwon(e: MouseEvent) {
        if (e.button === 0) {
            this.mouseStatus.left = true;
        } else if (e.button === 1) {
            this.mouseStatus.mid = true;
        } else if (e.button === 2) {
            this.mouseStatus.right = true;
        }
    }

    @TEvent.Listen<TInput>((instance) => instance.ctx.dom, 'mouseup')
    private OnMouseUp(e: MouseEvent) {
        if (e.button === 0) {
            this.mouseStatus.left = false;
        } else if (e.button === 1) {
            this.mouseStatus.mid = false;
        } else if (e.button === 2) {
            this.mouseStatus.right = false;
        }
    }

    @TEvent.Listen<TInput>((instance) => instance.ctx.dom, 'mousemove')
    private OnMouseMove(e: MouseEvent) {
        if (!this.focus) {
            this.focus = true;
        }
        if (this.lastPostion.length() === 0) {
            this.lastPostion.x = e.clientX;
            this.lastPostion.y = e.clientY;
        } else {
            this.mouseMoveDelta.x = e.clientX - this.lastPostion.x;
            this.mouseMoveDelta.y = e.clientY - this.lastPostion.y;
            this.lastPostion.x = e.clientX;
            this.lastPostion.y = e.clientY;
            this.CalculateRotateDelta();
        }
    }

    @TEvent.Listen<TInput>((instance) => instance.ctx.dom, 'wheel')
    private OnWheel(e: WheelEvent) {
        this.CalculateWheel(e);
    }

    @TEvent.Listen<TInput>((instance) => instance.ctx.dom, 'contextmenu')
    private OnContextMenu(e: Event) {
        e.preventDefault();
    }

    @TEvent.Listen<TInput>((instance) => instance.ctx.Game, Core.Manager.GameEvent.Update)
    private Update() {
        this.CalculateDirection();
    }

    private CalculateDirection() {
        const hor = new THREE.Vector2((this.keyStatus.a ? -1 : 0) + (this.keyStatus.d ? 1 : 0), (this.keyStatus.s ? -1 : 0) + (this.keyStatus.w ? 1 : 0));
        hor.normalize();
        this.direction.x = hor.x;
        this.direction.y = hor.y;
        this.direction.z = (this.keyStatus.q ? -1 : 0) + (this.keyStatus.e ? 1 : 0);
    }

    @TTool.Throttle<TInput>((instance) => instance.ctx.Game.deltaTime)
    private CalculateRotateDelta() {
        this.Emit(Core.Manager.InputEvent.MouseMoveDelta, { x: this.mouseMoveDelta.x, y: this.mouseMoveDelta.y });
        this.mouseMoveDelta.x = 0;
        this.mouseMoveDelta.y = 0;
    }

    @TTool.Throttle<TInput>((instance) => instance.ctx.Game.deltaTime)
    private CalculateWheel(e: WheelEvent) {
        this.Emit(Core.Manager.InputEvent.Wheel, { flag: e.deltaY < 0 });
    }

    public override Destroy(): void {
        super.Destroy();
    }
}

export { TInput };
