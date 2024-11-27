namespace Blueprint {
    export namespace Base {
        export interface IEntity {}

        export interface IManager extends IEntity {}
    }

    export namespace Manager {
        export interface IGraph extends Base.IManager {}
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
    };
}

export { Blueprint };
