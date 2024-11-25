import * as THREE from 'three';
import { TRenderer } from './Manager/TRenderer';
import { TCamera } from './Manager/TCamera';
import { TPhysics } from './Manager/TPhysics';
import { TInput } from './Manager/TInput';
import { TGame } from './Manager/TGame';
import { TActor } from './Base/TActor';

namespace ST {
    export namespace Actor {
        export interface IGltfModelOptions extends Base.IEntity {
            path: string;
            position?: THREE.Vector3;
        }

        export interface IPlane extends Base.IEntity {}

        export interface IAmbientLight extends Base.IEntity {}

        export interface IBox extends Base.IEntity {}

        export interface IDirectionalLight extends Base.IEntity {}

        export interface IFog extends Base.IEntity {}

        export interface IPointLight extends Base.IEntity {}

        export interface ISphere extends Base.IEntity {}

        export interface IWater extends Base.IEntity {}
    }

    export namespace Component {
        export interface IRigidBodyOptions extends Base.IComponent {
            fix: boolean;
            mass: number;
        }
    }

    export namespace Base {
        export interface IEntity {}

        export interface IActor extends IEntity {}

        export interface IComponent extends IEntity {
            actor: TActor;
        }

        export interface IManager extends IEntity {}
    }

    export namespace Manager {
        export const enum GameEvent {
            Update = 'Update'
        }

        export interface IGame extends Base.IManager {}

        export const enum InputEvent {
            Delta = 'Delta'
        }

        export interface IInput extends Base.IManager {}

        export interface ICamera extends Base.IManager {}

        export interface IPhysics extends Base.IManager {}

        export interface IRenderer extends Base.IManager {}
    }

    export namespace Test {
        export interface ICustomBox extends Base.IActor {
            position: THREE.Vector3;
            rotate: THREE.Vector3;
            scale: THREE.Vector3;
        }

        export interface ICustomSphere extends Base.IActor {
            position: THREE.Vector3;
            rotate: THREE.Vector3;
            scale: THREE.Vector3;
        }

        export interface ICustomPlane extends Base.IActor {}
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
