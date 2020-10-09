export default class Actor extends EventTarget{
    constructor(){
        super();
        this._body = new Array(); 
    }

    get body(){
        return Array.from(this._body);
    }

    draw(){}
}