const STATES = Object({'CREATED': 0, 'EXECUTING': 1, 'PAUSED': 2, 'STOPPED':3});

export default class Scene extends EventTarget{
    constructor(nameID){
        super();

        if(nameID == undefined || nameID == ''){
            nameID = Date.now().toString();
        }
        this._screen = document.createElement('div');
        this._screen.style.position = 'absolute';
        this._screen.style.opacity = 0;

        this._state = STATES.CREATED;
        this._id = nameID;
    }

    stop(){
        this._screen.style.opacity = 0;
        this.state = STATES.STOPPED;
        this.dispatchEvent(new CustomEvent('OnStop'));
    }
    
    start(){
        this._screen.style.opacity = 1;
        this.state = STATES.EXECUTING;
        this.dispatchEvent(new CustomEvent('OnStart'));
    }

    pause(){
        this._screen.style.opacity = 0;
        this.state = STATES.PAUSED;
        this.dispatchEvent(new CustomEvent('OnPause'));
    }
    
    reset(){
        this._screen.style.opacity = 0;
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
        this.dispatchEvent(new CustomEvent('StateChanging', {detail: {oldState: this._state, newState: newValue,}}));

        this._state = newValue;
    }
}