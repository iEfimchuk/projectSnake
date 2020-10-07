const STATES = Object({'CREATED': 0, 'EXECUTING': 1, 'PAUSED': 2, 'STOPPED':3});

let nameList = new Array;

export default class Scene extends EventTarget{
    constructor(nameID, display){
        super();

        if(nameID == undefined || nameID == ''){
            nameID = Date.now().toString();
        }

        if(nameList.indexOf(nameID) != -1){
            nameID += Date.now().toString();
        }

        nameList.push(nameID);

        this._screen = document.createElement('div');
        this._screen.style.position = 'absolute';
        this._screen.style.opacity = 0;
        this._screen.style.boxSizing = 'border-box';

        this._state = STATES.CREATED;
        this._id = nameID;

        display.appendChild(this._screen);
    }

    stop(){
        this.state = STATES.STOPPED;
        this.dispatchEvent(new CustomEvent('OnStop'));
    }
    
    start(){
        this.state = STATES.EXECUTING;
        this.dispatchEvent(new CustomEvent('OnStart'));
    }

    pause(){
        this.state = STATES.PAUSED;
        this.dispatchEvent(new CustomEvent('OnPause'));
    }
    
    reset(){
        this.state = STATES.CREATED;
        this.dispatchEvent(new CustomEvent('OnReset'));
    }

    get state(){
        return this._state;
    }

    get id(){
        return this._id;
    }

    onKeyboardEvent(event){}

    set state(newValue){
        if(newValue != 1){
            this._screen.style.opacity = 0;
        } else {
            this._screen.style.opacity = 1;
        }

        this.dispatchEvent(new CustomEvent('StateChanging', {detail: {oldState: this._state, newState: newValue,}}));

        this._state = newValue;
    }
}