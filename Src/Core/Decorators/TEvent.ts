import { Resolve } from './index';
import { TEntity } from '../Base/TEntity';

/**
 * 事件相关
 */
namespace TEvent {
    /**
     * 如果类不会销毁用 Manager 其余用 Actor
     */
    export const enum Lifecycle {
        /**
         * 全局管理
         */
        Manager,
        /**
         * 动态生成物体
         */
        Actor,
        /**
         * 物体组件
         */
        Component
    }

    /**
     * 事件循环生成
     */
    export function Generate(type = Lifecycle.Actor) {
        return function <T extends new (...args: Array<any>) => TEntity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.tEvent_Generate_Type = type;
                    this.tEvent_Generate_IsFinish = true;
                    this.TEvent_Generate_ListenEvents();
                    if (this.tEvent_Generate_Type === Lifecycle.Manager) {
                        this.TEvent_Generate_Manager_Hooks();
                    } else {
                        this.TEvent_Generate_Actor_Hooks();
                    }
                    //@ts-ignore
                    if (this['tEvent_Create_IsFinish']) {
                        this.TEvent_Generate_CreatEvents();
                    }
                }

                public tEvent_Generate_Type!: Lifecycle;

                public tEvent_Generate_IsFinish = false;

                public tEvent_Generate_OtherEvents = new Map<string, Function>();

                public TEvent_Generate_CreatEvents() {
                    //@ts-ignore
                    const create = (this['tEvent_Create_NeedCreate'] || []) as Array<string>;
                    for (let e of create) {
                        this.AddKey(e);
                    }
                }

                private TEvent_Generate_ListenEvents() {
                    Resolve.then(() => {
                        //@ts-ignore
                        const listen = (this['tEvent_Listen_NeedListen'] || []) as Array<{
                            listenTarget: Object | ((instance: Object) => Object);
                            eventName: string;
                            funcName: string;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            const t = typeof e.listenTarget === 'function' ? e.listenTarget(this) : e.listenTarget;
                            if (t.hasOwnProperty('unique_Id')) {
                                //@ts-ignore
                                t.AddListen(e.eventName, this, this[`${e.funcName}`], e.once);
                            } else {
                                //@ts-ignore
                                const bindEvent = this[`${e.funcName}`].bind(this);
                                this.tEvent_Generate_OtherEvents.set(e.eventName, bindEvent);
                                //@ts-ignore
                                t.addEventListener(e.eventName, bindEvent);
                            }
                        }
                    });
                }

                private TEvent_Generate_Manager_Hooks() {}

                private TEvent_Generate_Actor_Hooks() {
                    //@ts-ignore
                    const original = this[`Destroy`].bind(this);
                    //@ts-ignore
                    this[`Destroy`] = function (...args: Array<unknown>) {
                        //@ts-ignore
                        const listen = (this['tEvent_Listen_NeedListen'] || []) as Array<{
                            listenTarget: Object | ((instance: Object) => Object);
                            eventName: string;
                            funcName: string;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            const t = typeof e.listenTarget === 'function' ? e.listenTarget(this) : e.listenTarget;
                            if (t.hasOwnProperty('unique_Id')) {
                                //@ts-ignore
                                t.RemoveListen(e.eventName, this, this[`${e.funcName}`], e.once);
                            } else {
                                const bindEvent = this.tEvent_Generate_OtherEvents.get(e.eventName)!;
                                //@ts-ignore
                                t.removeEventListener(e.eventName, bindEvent);
                            }
                        }
                        //@ts-ignore
                        original(...args);
                    };
                }
            };
        };
    }

    /**
     * @author Together
     * @param events 创建的事件名称
     * @description 生成事件列表 只给 Manager 用
     */
    export function Create(events: Array<string>) {
        return function <T extends new (...args: Array<any>) => TEntity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.tEvent_Create_NeedCreate = events;
                    this.tEvent_Create_IsFinish = true;
                    //@ts-ignore
                    if (this['tEvent_Generate_IsFinish']) {
                        //@ts-ignore
                        this['TEvent_Generate_CreatEvents']();
                    }
                }

                public tEvent_Create_IsFinish = false;

                public tEvent_Create_NeedCreate!: Array<string>;
            };
        };
    }

    /**
     * 监听事件 es 可以是 继承 Manager 的 也可以是 HTMLElement 或者 window ......
     */
    export function Listen<T>(es: Object | ((instance: T) => Object), eventName: string, once?: boolean) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tEvent_Listen_NeedListen']) {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'].push({
                    listenTarget: es,
                    eventName,
                    funcName: propertyKey,
                    once: once || false
                });
            } else {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'] = [{ listenTarget: es, eventName, funcName: propertyKey, once: once || false }];
            }
        };
    }
}

export { TEvent };
