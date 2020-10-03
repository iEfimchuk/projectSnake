const STATES = Object({'CREATED': 0, 'EXECUTING': 1, 'PAUSED': 2, 'STOPPED':3});

export default class Scene extends EventTarget{
    constructor(){
        super();
        this._state = STATES.CREATED;
    }

    stop(){
        this.dispatchEvent(new CustomEvent('OnStop', {detail: {oldState: this._state, newState: newValue,}}));
        this.state = STATES.STOPPED;
    }
    
    execute(){
        this.dispatchEvent(new CustomEvent('OnStart', {detail: {oldState: this._state, newState: newValue,}}));
        this.state = STATES.EXECUTING;
    }

    pause(){
        this.dispatchEvent(new CustomEvent('OnStart', {detail: {oldState: this._state, newState: newValue,}}));
        this.state = STATES.PAUSED;
    }

    get state(){
        return this._state;
    }

    set state(newValue){
        this.dispatchEvent(new CustomEvent('StateChanging', {detail: {oldState: this._state, newState: newValue,}}));

        this._state = newValue;
    }
}