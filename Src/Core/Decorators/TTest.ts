import { Entity } from '@/Core/Base';
import { Time } from '@/Core/Utils';

namespace TTest {
    /**
     * 测试生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Entity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TTest_Generate_BindFunction();
                    this.TTest_Generate_BindProperty();
                    this.TTest_Generate_Hooks();
                }

                private TTest_Generate_BindFunction() {
                    Time.Resolve.then(() => {
                        //@ts-ignore
                        const bind = (this['tTest_Bind_Function'] || []) as Array<{
                            funcName: string;
                        }>;
                        this.ctx.Editor.AddBindFunc(
                            bind.map((b) => {
                                return { ...b, target: this };
                            })
                        );
                    });
                }

                private TTest_Generate_BindProperty() {
                    Time.Resolve.then(() => {
                        //@ts-ignore
                        const bind = (this['tTest_Bind_Property'] || []) as Array<{
                            propKey: string;
                            min: number | ((instance: T) => number);
                            max: number | ((instance: T) => number);
                            step: number | ((instance: T) => number);
                        }>;
                        this.ctx.Editor.AddBindProperty(
                            bind.map((b) => {
                                return {
                                    target: this,
                                    propKey: b.propKey,
                                    //@ts-ignore
                                    min: typeof b.min === 'function' ? b.min(this) : b.min,
                                    //@ts-ignore
                                    max: typeof b.max === 'function' ? b.max(this) : b.max,
                                    //@ts-ignore
                                    step: typeof b.step === 'function' ? b.step(this) : b.step
                                };
                            })
                        );
                    });
                }

                private TTest_Generate_Hooks() {
                    this.TTest_Generate_UnBindFunction();
                    this.TTest_Generate_UnBindProperty();
                }

                private TTest_Generate_UnBindFunction() {
                    //@ts-ignore
                    const original = this[`Destroy`].bind(this);
                    //@ts-ignore
                    this[`Destroy`] = function (...args: Array<unknown>) {
                        //@ts-ignore
                        const bind = (this['tTest_Bind_Function'] || []) as Array<{
                            funcName: string;
                        }>;
                        this.ctx.Editor.RemoveBindFunc(
                            bind.map((b) => {
                                return { ...b, target: this };
                            })
                        );
                        //@ts-ignore
                        original(...args);
                    };
                }

                private TTest_Generate_UnBindProperty() {
                    //@ts-ignore
                    const original = this[`Destroy`].bind(this);
                    //@ts-ignore
                    this[`Destroy`] = function (...args: Array<unknown>) {
                        //@ts-ignore
                        const bind = (this['tTest_Bind_Property'] || []) as Array<{
                            propKey: string;
                            min: number | ((instance: T) => number);
                            max: number | ((instance: T) => number);
                            step: number | ((instance: T) => number);
                        }>;
                        this.ctx.Editor.RemoveBindProperty(
                            bind.map((b) => {
                                return { target: this, propKey: b.propKey };
                            })
                        );
                        //@ts-ignore
                        original(...args);
                    };
                }
            };
        };
    }

    /**
     * 绑定测试函数
     */
    export function BindFunction<T extends Entity>() {
        return function (target: T, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTest_Bind_Function']) {
                //@ts-ignore
                target['tTest_Bind_Function'].push({
                    funcName: propertyKey
                });
            } else {
                //@ts-ignore
                target['tTest_Bind_Function'] = [
                    {
                        funcName: propertyKey
                    }
                ];
            }
        };
    }

    /**
     * 绑定测试属性
     */
    export function BindProperty<T extends Entity>(min: number | ((instance: T) => number), max: number | ((instance: T) => number), step: number | ((instance: T) => number)) {
        return function (target: T, propertyKey: string | symbol) {
            //@ts-ignore
            if (target['tTest_Bind_Property']) {
                //@ts-ignore
                target['tTest_Bind_Property'].push({
                    propKey: propertyKey,
                    min,
                    max,
                    step
                });
            } else {
                //@ts-ignore
                target['tTest_Bind_Property'] = [
                    {
                        propKey: propertyKey,
                        min,
                        max,
                        step
                    }
                ];
            }
        };
    }
}
export { TTest };
