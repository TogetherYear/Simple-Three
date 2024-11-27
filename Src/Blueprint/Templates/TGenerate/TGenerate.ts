import { Blueprint } from '@/Blueprint/type';
import { Body, Header, Input, Output } from '..';
import './TGenerate.scss';
import * as X6 from '@antv/x6';

X6.Shape.HTML.register({
    shape: 'TGenerate',
    html: (cell) => {
        const root = document.createElement('div');
        root.id = 'TGenerate';

        {
            const header = Header('初始化', Blueprint.Template.Header.Manager);
            root.appendChild(header);
        }

        {
            const body = Body();
            root.appendChild(body);

            {
                const ok = Output('成功');
                body.appendChild(ok);

                const error = Output('失败');
                body.appendChild(error);
            }
        }

        return root;
    },
    width: 180,
    height: 90
});
