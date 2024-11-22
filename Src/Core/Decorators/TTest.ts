import { TEntity } from '../Base/TEntity';
import { TEvent } from './TEvent';

namespace TTest {
    /**
     * 函数列表
     */
    export const functionMap: Map<string, { label: string; scope: Object; funcName: string; args: Array<unknown>; dom: HTMLElement }> = new Map();

    /**
     * 测试生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => TEntity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TTest_Generate_BindFunction();
                    //@ts-ignore
                    if (this['tEvent_Generate_Type'] !== TEvent.Lifecycle.Manager) {
                        this.TTest_Generate_Hooks();
                    }
                }

                private TTest_Generate_BindFunction() {
                    //@ts-ignore
                    const bind = (this['tTest_Bind_Function'] || []) as Array<{
                        label: string | ((instance: Object) => string);
                        funcName: string;
                        args: Array<unknown>;
                    }>;
                    for (let b of bind) {
                        const l = typeof b.label === 'function' ? b.label(this) : b.label;
                        const element = document.createElement('span');
                        element.className = 'FunctionItem';
                        element.innerText = l;
                        element.onclick = () => {
                            const args = b.args.map((a) => {
                                if (typeof a === 'function') {
                                    return a(this);
                                } else {
                                    return a;
                                }
                            });
                            //@ts-ignore
                            this[`${b.funcName}`](...args);
                        };
                        document.querySelector('#Test')?.appendChild(element);
                        functionMap.set(`${this.unique_Id}:${b.funcName}`, {
                            label: l,
                            funcName: b.funcName,
                            args: b.args,
                            scope: this,
                            dom: element
                        });
                    }
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
                        for (let b of bind) {
                            const target = functionMap.get(`${this.unique_Id}:${b.funcName}`)!;
                            target.dom.remove();
                            functionMap.delete(`${this.unique_Id}:${b.funcName}`);
                        }
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
