import { TManager } from '@/Core/Base';
import { Core } from '@/Core/type';

class TEditor extends TManager {
    constructor(ctx: Core.Context, options: Core.Manager.TEditor = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Manager.TEditor;
    }

    public Run() {}

    public override Destroy(): void {
        super.Destroy();
    }
}

export { TEditor };
