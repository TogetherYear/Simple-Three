import { TEvent } from '../Decorators/TEvent';
import { TTest } from '../Decorators/TTest';
import { TTool } from '../Decorators/TTool';
import { TGame } from '../Manager/TGame';
import { TComponent } from './TComponent';
import { TEntity } from './TEntity';
import * as THREE from 'three';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate(TEvent.Lifecycle.Actor)
class TActor extends TEntity {
    constructor() {
        super();
    }

    public body!: THREE.Object3D;

    public components: Array<TComponent> = [];

    /**
     * 继承时 销毁物体必须调用 super.Destroy() 我要取消事件
     */
    public Destroy() {
        if (this.body) {
            TGame.Remove(this.body);
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
