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

    return { b, l, r };
};

const Input = (label: string, type = Blueprint.Template.Input.Step) => {
    const d = document.createElement('span');
    if (type === Blueprint.Template.Input.Step) {
        d.className = 'Input';
    } else if (type === Blueprint.Template.Input.Value) {
        d.className = 'Input InputValue';
    }

    const l = document.createElement('span');
    l.className = 'Label';
    l.innerText = label;
    d.appendChild(l);

    const p = document.createElement('span');
    p.className = 'Port';
    d.appendChild(p);

    return d;
};

const Output = (label: string, type = Blueprint.Template.Output.Step) => {
    const d = document.createElement('span');
    if (type === Blueprint.Template.Output.Step) {
        d.className = 'Output';
    } else if (type === Blueprint.Template.Output.Value) {
        d.className = 'Output OutputValue';
    }

    const l = document.createElement('span');
    l.className = 'Label';
    l.innerText = label;
    d.appendChild(l);

    const p = document.createElement('span');
    p.className = 'Port';
    d.appendChild(p);

    return d;
};

export { Header, Body, Input, Output };
