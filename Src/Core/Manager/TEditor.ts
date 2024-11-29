import { TManager } from '@/Core/Base';
import * as G from 'three/examples/jsm/libs/lil-gui.module.min';
import { Core } from '@/Core/type';

class TEditor extends TManager {
    constructor(ctx: Core.Context, options: Core.Manager.IEditor = {}) {
        super(ctx, options);
    }

    private bindFuncs = new Map<string, G.FunctionController>();

    private gui!: G.GUI;

    public get O() {
        return this.options as Core.Manager.IEditor;
    }

    public Run() {
        this.gui = new G.GUI({ title: 'TEditor' });
    }

    public AddBindFunc(target: Array<Core.Manager.IEditorFunc>) {
        for (let t of target) {
            //@ts-ignore
            this.bindFuncs.set(`${t.target.unique_Id}-${t.funcName}`, new G.FunctionController(this.gui, t.target, t.funcName));
        }
    }

    public RemoveBindFunc(target: Array<Core.Manager.IEditorFunc>) {
        for (let t of target) {
            const b = this.bindFuncs.get(`${t.target.unique_Id}-${t.funcName}`);
            b && b.destroy();
        }
    }

    public override Destroy(): void {
        super.Destroy();
        this.gui.destroy();
    }
}

export { TEditor };
