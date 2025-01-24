import { TEvent, TTest, TTool } from '../Decorators';
import { Core } from '../type';
import { Component } from './Component';
import { Entity } from './Entity';
import * as THREE from 'three';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class Actor extends Entity {
    constructor(ctx: Core.Context, options: Core.Base.IActor = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Base.IActor;
    }

    public body!: THREE.Object3D;

    public components: Array<Component> = [];

    public Destroy() {
        this.ctx.Game.Remove(this);
        for (let c of this.components) {
            c.Destroy();
        }
    }

    public AddComponent(component: Component) {
        this.components.push(component);
    }

    public RemoveComponent(component: Component) {
        this.components = this.components.filter((c) => c !== component);
        component.Destroy();
    }
}

export { Actor };
