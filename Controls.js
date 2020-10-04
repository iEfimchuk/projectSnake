export default class Controls extends EventTarget{
    constructor(){
        super();
        document.onkeydown = this.keyPress.bind(this);
    }

    keyPress(event){
        let eventName = 'Keyboard';
        let detail = {};

        switch(event.code){
            case 'ArrowUp':
            case 'KeyW'     : detail.key = 'Up'; break;
            case 'ArrowDown': 
            case 'KeyS'     : detail.key = 'Down'; break;
            case 'ArrowLeft':
            case 'KeyA'     : detail.key = 'Left'; break;
            case 'ArrowRight':
            case 'KeyD'     : detail.key = 'Right'; break;
            case 'Digit1'   : detail.key = 'Num1'; break;
            case 'Digit2'   : detail.key = 'Num2'; break;
            case 'Digit3'   : detail.key = 'Num3'; break;
            case 'Digit4'   : detail.key = 'Num4'; break;
            case 'Digit5'   : detail.key = 'Num5'; break;
            case 'Digit6'   : detail.key = 'Num6'; break;
            case 'Digit7'   : detail.key = 'Num7'; break;
            case 'Digit8'   : detail.key = 'Num8'; break;
            case 'Digit9'   : detail.key = 'Num9'; break;
            case 'Digit0'   : detail.key = 'Num0'; break;
            case 'Escape'   : detail.key = 'Escape'; break;
            case 'Enter'    : detail.key = 'Enter'; break;
        }

        if(detail.key != undefined){
            this.dispatchEvent(new CustomEvent(eventName, {detail: detail}));
        }
    }
}