import * as THREE from 'three';
import { TRenderer } from './Manager/TRenderer';
import { TCamera } from './Manager/TCamera';
import { TPhysics } from './Manager/TPhysics';
import { TInput } from './Manager/TInput';
import { TGame } from './Manager/TGame';

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

    export type Context = {
        Renderer: TRenderer;
        Camera: TCamera;
        Physics: TPhysics;
        Input: TInput;
        Game: TGame;
    };
}

export { ST };
