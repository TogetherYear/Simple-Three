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
                            funcName: string;
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
            };
        };
    }

    /**
     * 绑定测试函数
     */
    export function BindFunction() {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
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
}
export { TTest };
