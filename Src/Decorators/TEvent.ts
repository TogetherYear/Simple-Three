import { EventSystem } from '@/Utils/EventSystem';
import { Resolve } from './index';

/**
 * 事件相关
 */
namespace TEvent {
    /**
     * 事件循环生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.tEvent_Generate_IsFinish = true;
                    this.TEvent_Generate_ListenEvents();
                    this.TEvent_Generate_Hooks();
                    //@ts-ignore
                    if (this['tEvent_Create_IsFinish']) {
                        this.TEvent_Generate_CreatEvents();
                    }
                }

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
                            bindFunc: string;
                            unbindFunc: string;
                        }>;
                        for (let e of listen) {
                            const t = typeof e.listenTarget === 'function' ? e.listenTarget(this) : e.listenTarget;
                            if (t.hasOwnProperty('unique_Id')) {
                                //@ts-ignore
                                t.AddListen(e.eventName, this, e.funcName);
                            } else {
                                //@ts-ignore
                                const bindEvent = this[`${e.funcName}`].bind(this);
                                this.tEvent_Generate_OtherEvents.set(e.eventName, bindEvent);
                                //@ts-ignore
                                t[`${e.bindFunc}`](e.eventName, bindEvent);
                            }
                        }
                    });
                }

                private TEvent_Generate_Hooks() {
                    //@ts-ignore
                    const original = this[`Destroy`].bind(this);
                    //@ts-ignore
                    this[`Destroy`] = function (...args: Array<unknown>) {
                        //@ts-ignore
                        const listen = (this['tEvent_Listen_NeedListen'] || []) as Array<{
                            listenTarget: Object | ((instance: Object) => Object);
                            eventName: string;
                            funcName: string;
                            bindFunc: string;
                            unbindFunc: string;
                        }>;
                        for (let e of listen) {
                            const t = typeof e.listenTarget === 'function' ? e.listenTarget(this) : e.listenTarget;
                            if (t.hasOwnProperty('unique_Id')) {
                                //@ts-ignore
                                t.RemoveListen(e.eventName, this);
                            } else {
                                const bindEvent = this.tEvent_Generate_OtherEvents.get(e.eventName)!;
                                //@ts-ignore
                                t[`${e.unbindFunc}`](e.eventName, bindEvent);
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
        return function <T extends new (...args: Array<any>) => EventSystem>(C: T) {
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
    export function Listen<T>(es: Object | ((instance: T) => Object), eventName: string, bindFunc = 'addEventListener', unbindFunc = 'removeEventListener') {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tEvent_Listen_NeedListen']) {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'].push({
                    listenTarget: es,
                    eventName,
                    funcName: propertyKey,
                    bindFunc,
                    unbindFunc
                });
            } else {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'] = [{ listenTarget: es, eventName, funcName: propertyKey, bindFunc, unbindFunc }];
            }
        };
    }
}

export { TEvent };
