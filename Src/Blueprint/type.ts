import { TGraph } from './Manager/TGraph';

namespace Blueprint {
    export namespace Base {
        export interface IEntity {}

        export interface IActor extends IEntity {}

        export interface IManager extends IEntity {}
    }

    export namespace Manager {
        export interface IGraph extends Base.IManager {}
    }

    export namespace Actor {
        export interface IGenerate extends Base.IEntity {}
    }

    export namespace Template {
        export const enum Header {
            Manager,
            Actor
        }

        export const enum Input {
            Step,
            Value
        }

        export const enum Output {
            Step,
            Value
        }
    }

    export type Context = {
        dom: HTMLElement;
        Graph: TGraph;
        /**
         * 页面销毁时调用
         */
        Destroy: () => void;
    };
}

export { Blueprint };
