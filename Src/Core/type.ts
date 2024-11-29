import * as THREE from 'three';
import { TCamera, TEditor, TGame, TInput, TPhysics, TRenderer } from '@/Core/Manager';
import { TPlugin, TActor } from '@/Core/Base';

namespace Core {
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

        export interface IPlugin extends IEntity {}
    }

    export namespace Manager {
        export const enum GameEvent {
            Update = 'Update'
        }

        export interface IGame extends Base.IManager {}

        export interface TEditor extends Base.IManager {}

        export const enum InputEvent {
            /**
             * 鼠标滑动屏幕差值
             */
            MouseMoveDelta = 'MouseMoveDelta',
            /**
             * 滚轮
             */
            Wheel = 'Wheel'
        }

        export const enum PhysicsEvent {
            FixedUpdate = 'FixedUpdate'
        }

        export interface IInput extends Base.IManager {}

        export interface ICamera extends Base.IManager {}

        export interface IPhysics extends Base.IManager {}

        export interface IRenderer extends Base.IManager {}
    }

    export namespace Plugin {
        export interface IFreeCameraControl extends Base.IEntity {}

        export interface IRoundCameraControl extends Base.IEntity {}
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

        export interface ICustomPlane extends Base.IActor {
            position: THREE.Vector3;
            rotate: THREE.Vector3;
            scale: THREE.Vector3;
        }

        export interface ICustomPlugin extends Base.IPlugin {}
    }

    export namespace Worker {
        export namespace Physics {
            export type InitOptions = {
                type: 'Init';
                postionsSharedBuffer: SharedArrayBuffer;
                quaternionsSharedBuffer: SharedArrayBuffer;
            };

            export type AddBody = {
                type: 'Add';
                id: string;
                options: AddOptions;
            };

            export type AddOptions = {
                mass: number;
                type: 'Box' | 'Sphere';
                position: Array<number>;
                quaternion: Array<number>;
                scale: Array<number>;
                material: {
                    friction: number;
                    restitution: number;
                };
                allowSleep: boolean;
            };

            export type RemoveBody = {
                type: 'Remove';
                id: string;
            };
        }
    }

    export type Context = {
        dom: HTMLElement;
        Renderer: TRenderer;
        Camera: TCamera;
        Physics: TPhysics;
        Input: TInput;
        Game: TGame;
        Editor: TEditor;
        Plugins: Array<TPlugin>;
        /**
         * 页面销毁时调用
         */
        Destroy: () => void;
    };
}

export { Core };
