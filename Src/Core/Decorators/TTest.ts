import { TEntity } from '@/Core/Base';
import { Time } from '@/Core/Utils';

namespace TTest {
    /**
     * 测试生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => TEntity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TTest_Generate_BindFunction();
                    this.TTest_Generate_Hooks();
                }

                private TTest_Generate_BindFunction() {
                    Time.Resolve.then(() => {
                        //@ts-ignore
                        const bind = (this['tTest_Bind_Function'] || []) as Array<{
                            label: string | ((instance: Object) => string);
                            funcName: string;
                            args: Array<unknown>;
                        }>;
                        this.ctx.Editor.AddBindFunc(
                            bind.map((b) => {
                                return { ...b, target: this };
                            })
                        );
                    });
                }

                private TTest_Generate_Hooks() {
                    this.TTest_Generate_UnBindFunction();
                }

                private TTest_Generate_UnBindFunction() {
                    //@ts-ignore
                    const original = this[`Destroy`].bind(this);
                    //@ts-ignore
                    this[`Destroy`] = function (...args: Array<unknown>) {
                        //@ts-ignore
                        const bind = (this['tTest_Bind_Function'] || []) as Array<{
                            label: string | ((instance: Object) => string);
                            funcName: string;
                            args: Array<unknown>;
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
            };
        };
    }

    /**
     * 绑定测试函数 ...args 为需要传递的参数列表 如果需要传递类中变量 需要使用 函数 此函数只有一个参数 为 当前类实例 我会自动给你
     */
    export function BindFunction<T>(label: string | ((instance: T) => string), ...args: Array<unknown>) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTest_Bind_Function']) {
                //@ts-ignore
                target['tTest_Bind_Function'].push({
                    label,
                    funcName: propertyKey,
                    args
                });
            } else {
                //@ts-ignore
                target['tTest_Bind_Function'] = [
                    {
                        label,
                        funcName: propertyKey,
                        args
                    }
                ];
            }
        };
    }
}
export { TTest };
