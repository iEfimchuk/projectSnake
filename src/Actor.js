export default class Actor extends EventTarget{
    constructor(){
        super();
        this._body = new Array(); 
    }

    get body(){
        return Array.from(this._body);
    }

    destroy(){
        for(let i = 0; i < this._body.length; i++){
            this._body[i].div.remove();
            this._body[i].div = null;
        }
    }

    draw(){}
}