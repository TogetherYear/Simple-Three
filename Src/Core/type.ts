import * as THREE from 'three';

namespace ST {
    export namespace Actor {
        export interface IGltfModelOptions {
            path: string;
            position?: THREE.Vector3;
        }
    }

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
