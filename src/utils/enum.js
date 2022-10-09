export default class Enum {
    constructor(props = []) {
        this._props = {};
        if (props.length > 0) {
            props.forEach(element => {
                if (element.key && element.value) {
                    this[element.key] = element.value;
                    this._props[element.value] = element;
                } else {
                    console.error('Enum 缺少必要的key或者value');
                }
            })
        }
    }

    get(value) {
        return this._props[value];
    }

    getName(value) {
        if (value) {
            return this._props[value].name;
        }
        return '-'
    }

    getList() {
        const arr = [];
        for(const key in this._props) {
            if (Object.prototype.hasOwnProperty.call(this._props, key)) {
                arr.push(this._props[key])
            }
        }
        return arr;
    }
}