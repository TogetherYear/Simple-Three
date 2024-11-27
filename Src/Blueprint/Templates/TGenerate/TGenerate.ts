import { Blueprint } from '@/Blueprint/type';
import { Body, Header, Input, Output } from '..';
import './TGenerate.scss';
import * as X6 from '@antv/x6';

X6.Shape.HTML.register({
    shape: 'TGenerate',
    effect: ['data'],
    html: (cell) => {
        const root = document.createElement('div');
        root.id = 'TGenerate';

        {
            const header = Header('初始化', Blueprint.Template.Header.Manager);
            root.appendChild(header);
        }

        {
            const body = Body();
            root.appendChild(body.b);

            {
                const t = Input('输入', Blueprint.Template.Input.Value);
                body.l.appendChild(t);

                const ok = Output('成功');
                body.r.appendChild(ok);

                const error = Output('失败');
                body.r.appendChild(error);
            }
        }

        return root;
    },
    width: 180,
    height: 90
});
