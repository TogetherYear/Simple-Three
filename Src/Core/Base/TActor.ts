import { TEvent, TTest, TTool } from '@/Core/Decorators';
import { Core } from '@/Core/type';
import { TComponent } from './TComponent';
import { TEntity } from './TEntity';
import * as THREE from 'three';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class TActor extends TEntity {
    constructor(ctx: Core.Context, options: Core.Base.IActor = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Base.IActor;
    }

    public body!: THREE.Object3D;

    public components: Array<TComponent> = [];

    /**
     * 继承时 销毁物体必须调用 super.Destroy() 我要取消事件
     */
    public Destroy() {
        if (this.body) {
            this.ctx.Game.Remove(this);
        }
        for (let c of this.components) {
            c.Destroy();
        }
    }

    public AddComponent(component: TComponent) {
        this.components.push(component);
    }

    public RemoveComponent(component: TComponent) {
        this.components = this.components.filter((c) => c !== component);
        component.Destroy();
    }
}

export { TActor };
