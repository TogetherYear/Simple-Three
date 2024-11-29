import { TManager } from '@/Core/Base';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import { Core } from '@/Core/type';

class TEditor extends TManager {
    constructor(ctx: Core.Context, options: Core.Manager.IEditor = {}) {
        super(ctx, options);
    }

    private bindFuncs: Array<Core.Manager.IEditorFunc> = [];

    private gui!: GUI;

    public get O() {
        return this.options as Core.Manager.IEditor;
    }

    public Run() {
        this.gui = new GUI({ title: 'TEditor' });
    }

    public override Destroy(): void {
        super.Destroy();
    }

    public AddBindFunc(target: Array<Core.Manager.IEditorFunc>) {
        for (let t of target) {
        }
    }

    public RemoveBindFunc(target: Array<Core.Manager.IEditorFunc>) {
        for (let t of target) {
        }
    }
}

export { TEditor };
