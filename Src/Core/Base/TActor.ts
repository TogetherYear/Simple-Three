import { TEvent } from '../Decorator/TEvent';
import { TTest } from '../Decorator/TTest';
import { TTool } from '../Decorator/TTool';
import { ST } from '../type';
import { TComponent } from './TComponent';
import { TEntity } from './TEntity';
import * as THREE from 'three';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate(TEvent.Lifecycle.Actor)
class TActor extends TEntity {
    constructor(ctx: ST.Context, options: ST.Base.IActor = {}) {
        super(ctx, options);
    }

    public body!: THREE.Object3D;

    public components: Array<TComponent> = [];

    /**
     * 继承时 销毁物体必须调用 super.Destroy() 我要取消事件
     */
    public Destroy() {
        if (this.body) {
            this.ctx.Game.Remove(this.body);
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
