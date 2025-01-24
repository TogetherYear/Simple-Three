import { TEvent, TTest, TTool } from '../Decorators';
import { Core } from '../type';
import { Entity } from './Entity';

@TTest.Generate()
@TTool.Generate()
@TEvent.Generate()
class Component extends Entity {
    constructor(ctx: Core.Context, options: Core.Base.IComponent) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Base.IComponent;
    }

    public Destroy() {}
}

export { Component };
