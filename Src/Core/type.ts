import * as THREE from 'three';
import { Camera, Editor, Game, Input, Physics, Renderer } from './Manager';
import { Plugin, Actor, Entity } from './Base';

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
            actor: Actor;
        }

        export interface IManager extends IEntity {}

        export interface ISubManager extends IEntity {}

        export interface IPlugin extends IEntity {}
    }

    export namespace Manager {
        export const enum GameEvent {
            Update = 'Update'
        }

        export interface IGame extends Base.IManager {}

        export interface IEditor extends Base.IManager {}

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
            Update = 'Update'
        }

        export interface IInput extends Base.IManager {}

        export interface ICamera extends Base.IManager {}

        export interface IPhysics extends Base.IManager {
            webWorker?: boolean;
            sharedArraybuffer?: boolean;
        }

        export interface IWebWorkerSharedArraybufferPhysics extends Base.ISubManager {}

        export interface IWebWorkerPhysics extends Base.ISubManager {}

        export interface IDefaultPhysics extends Base.ISubManager {}

        export interface IRenderer extends Base.IManager {}

        export interface IEditorFunc {
            target: Entity;
            funcName: string;
        }

        export interface IEditorPro<T extends Entity> {
            target: Entity;
            type: 'number';
            propKey: string;
            min: number;
            max: number;
            step: number;
            Callback: (instance: T, value: number) => void;
        }
    }

    export namespace Plugin {
        export interface IFreeCameraControl extends Base.IEntity {}

        export interface IRoundCameraControl extends Base.IEntity {}
    }

    export namespace Worker {
        export namespace Physics {
            export type InitOptionsHasSharedArrayBuffer = {
                type: 'Init';
                postionsSharedBuffer: SharedArrayBuffer;
                quaternionsSharedBuffer: SharedArrayBuffer;
            };

            export type InitOptions = Omit<InitOptionsHasSharedArrayBuffer, 'postionsSharedBuffer' | 'quaternionsSharedBuffer'>;

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
        Renderer: Renderer;
        Camera: Camera;
        Physics: Physics;
        Input: Input;
        Game: Game;
        Editor: Editor;
        Plugins: Array<Plugin>;
        /**
         * 页面销毁时调用
         */
        Destroy: () => void;
    };
}

export { Core };
