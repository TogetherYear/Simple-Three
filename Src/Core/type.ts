namespace ST {
    export namespace Actor {}

    export namespace Component {
        export interface IRigidBodyOptions {
            fix: boolean;
            mass: number;
        }
    }

    export namespace Base {}

    export namespace Manager {
        export namespace TGame {
            export const enum Event {
                Update = 'Update'
            }
        }

        export namespace TInput {
            export const enum Event {
                Delta = 'Delta'
            }
        }
    }
}

export { ST };
