import { Blueprint } from '../type';

const Header = (title: string, type = Blueprint.Template.Header.Actor) => {
    const h = document.createElement('span');
    if (type === Blueprint.Template.Header.Actor) {
        h.className = 'Header';
    } else {
        h.className = 'Header Manager';
    }

    const t = document.createElement('span');
    t.className = 'Title';
    t.innerHTML = title;
    h.appendChild(t);
    return h;
};

const Body = () => {
    const b = document.createElement('span');
    b.className = 'Body';

    const l = document.createElement('span');
    l.className = 'Left';
    b.appendChild(l);

    const r = document.createElement('span');
    r.className = 'Right';
    b.appendChild(r);

    return b;
};

const Input = (label: string) => {
    const d = document.createElement('span');
    d.className = 'Input';

    const l = document.createElement('span');
    l.className = 'Label';
    l.innerText = label;
    d.appendChild(l);

    return d;
};

const Output = (label: string) => {
    const d = document.createElement('span');
    d.className = 'Output';

    const l = document.createElement('span');
    l.className = 'Label';
    l.innerText = label;
    d.appendChild(l);

    return d;
};

export { Header, Body, Input, Output };
