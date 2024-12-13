import { TEvent, TTest, TTool } from '@/Core/Decorators';
import { Core } from '@/Core/type';
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
