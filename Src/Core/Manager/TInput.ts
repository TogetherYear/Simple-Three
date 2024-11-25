import { TManager } from '../Base/TManager';
import { ST } from '../type';
import { TEvent } from '../Decorators/TEvent';
import * as THREE from 'three';

@TEvent.Create([ST.Manager.TInput.Event.Delta])
class TInput extends TManager {
    constructor(ctx: ST.Context) {
        super(ctx);
    }

    private free = false;

    private DIRECTION = {
        UP: new THREE.Vector3(0, 1, 0),
        DOWN: new THREE.Vector3(0, -1, 0),
        FORWARD: new THREE.Vector3(0, 0, -1),
        BEHIND: new THREE.Vector3(0, 0, 1),
        LEFT: new THREE.Vector3(-1, 0, 0),
        RIGHT: new THREE.Vector3(1, 0, 0)
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

    public delta = new THREE.Vector2();

    public lastPostion = new THREE.Vector2();

    public Run(free = true) {
        this.free = free;
    }

    @TEvent.Listen(window, 'keydown')
    private OnKeyDown(e: KeyboardEvent) {
        if (e.key !== 'F12') {
            e.preventDefault();
            e.stopPropagation();
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
        e.preventDefault();
        e.stopPropagation();
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

    @TEvent.Listen(window, 'mousedown')
    private OnMouseDwon(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.button === 0) {
            this.mouseStatus.left = true;
        } else if (e.button === 1) {
            this.mouseStatus.mid = true;
        } else if (e.button === 2) {
            this.mouseStatus.right = true;
        }
    }

    @TEvent.Listen(window, 'mouseup')
    private OnMouseUp(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.button === 0) {
            this.mouseStatus.left = false;
        } else if (e.button === 1) {
            this.mouseStatus.mid = false;
        } else if (e.button === 2) {
            this.mouseStatus.right = false;
        }
    }

    @TEvent.Listen(window, 'mousemove')
    private OnMouseMove(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (this.lastPostion.length() === 0) {
            this.lastPostion.x = e.clientX;
            this.lastPostion.y = e.clientY;
        } else {
            this.delta.x = e.clientX - this.lastPostion.x;
            this.delta.y = e.clientY - this.lastPostion.y;
            this.lastPostion.x = e.clientX;
            this.lastPostion.y = e.clientY;
            this.CalculateDelta();
        }
    }

    @TEvent.Listen(window, 'contextmenu')
    private OnContextMenu(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    @TEvent.Listen<TInput>((instance) => instance.ctx.Game, ST.Manager.TGame.Event.Update)
    private Update() {
        this.CalculateDirection();
    }

    private CalculateDirection() {
        const hor = new THREE.Vector2((this.keyStatus.a ? -1 : 0) + (this.keyStatus.d ? 1 : 0), (this.keyStatus.s ? -1 : 0) + (this.keyStatus.w ? 1 : 0));
        hor.normalize();
        this.direction.x = hor.x;
        this.direction.y = hor.y;
        this.direction.z = (this.keyStatus.q ? -1 : 0) + (this.keyStatus.e ? 1 : 0);
        this.FreeMovementTranslate();
    }

    private FreeMovementTranslate() {
        if (this.free && this.mouseStatus.right) {
            if (this.direction.length() !== 0) {
                this.ctx.Camera.camera.translateZ(4.3 * -this.direction.y * this.ctx.Game.deltaTime);
                this.ctx.Camera.camera.translateX(4.3 * this.direction.x * this.ctx.Game.deltaTime);
                this.ctx.Camera.camera.translateY(4.3 * this.direction.z * this.ctx.Game.deltaTime);
            }
        }
    }

    private CalculateDelta() {
        this.Emit(ST.Manager.TInput.Event.Delta, { x: this.delta.x, y: this.delta.y });
        this.FreeMovementRotate();
        this.delta.x = 0;
        this.delta.y = 0;
    }

    private FreeMovementRotate() {
        if (this.free && this.mouseStatus.right) {
            if (this.delta.length() !== 0) {
                this.ctx.Camera.camera.rotateOnAxis(this.DIRECTION.LEFT, 0.24 * this.delta.y * this.ctx.Game.deltaTime);
                this.ctx.Camera.camera.rotateOnWorldAxis(this.DIRECTION.DOWN, 0.24 * this.delta.x * this.ctx.Game.deltaTime);
            }
        }
    }
}

export { TInput };
