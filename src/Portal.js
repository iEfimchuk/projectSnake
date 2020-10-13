import Snake from './Snake';
import Actor from './Actor';
import Mathematic from './Mathematic';

let curGameField = undefined;
let cssElement = undefined;

export default class Portal extends Actor{
    constructor(body){
        super();

        this._className0 = 'portal' + Date.now().toString();
        this._className1 = 'portal' + (Date.now() + 1).toString();

        if(cssElement == undefined){
            cssElement = document.createElement('style');
        }
        
        cssElement.innerText = `@keyframes ${this._className1}_ {from {background-color:rgb(224, 96, 0); transform: scale(1.1, 1.1);} to {background-color:rgb(64, 64, 192); transform: scale(0.9, 0.9);}}`+
        `@keyframes ${this._className0}_ {from {background-color:rgb(64, 64, 192); transform: scale(0.9, 0.9);} to {background-color:rgb(224, 96, 0); transform: scale(1.1, 1.1);}}`+
        `.${this._className1}{animation-name:${this._className1}_; animation-duration:1s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate-reverse; animation-play-state: running; animation-fill-mode: none; box-sizing: border-box;}`+
        `.${this._className0}{animation-name:${this._className0}_; animation-duration:1s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate-reverse; animation-play-state: running; animation-fill-mode: none; box-sizing: border-box;}`;
        document.head.appendChild(cssElement);

        for(let i = 0; i < body.length; i++){
            let newDiv = document.createElement('div');
            newDiv.classList.add(this[`_className${i}`]);

            this._body.push({x: body[i].x, y: body[i].y, div: newDiv});
        }

        this.buffer = {};
    }

    resetBody(){
        for(let i = 0; i < 2; i++){
            let freeCell = curGameField.getFreeCell();

            let newDiv = document.createElement('div');
            newDiv.classList.add(this[`_className${i}`]);

            this._body.push({x: freeCell.x, y: freeCell.y, div: newDiv});
        }

        this.draw();
    }

    clearBody(){
        for(let i = this._body.length - 1; i >= 0; i--){
            this._body[i].div.remove();
            this._body[i].div = null;
            this._body.splice(i, 1);
        }
    }

    onCollision(game, actor, gameField){
        if(curGameField == undefined){
            curGameField = gameField;
        }

        if(actor instanceof Snake){
            for(let i = 0; i < this._body.length; i++){
                if(this._body[i].x == actor._body[0].x && this._body[i].x == actor._body[0].x){
                    actor.addEventListener('PrevStep', 
                                            this.goThroughThePortalPrev.bind(
                                                this, 
                                                actor, 
                                                this._body[(i + 1)%2].x, 
                                                this._body[(i + 1)%2].y), 
                                            {once : true})
                    this.clearBody();
                    break;
                }
            }
        }
    }

    goThroughThePortalPrev(snake, x, y){
        this.buffer['oldDirection'] = snake.direction;
        
        snake.direction = {
            x: x - snake.head.x,
            y: y - snake.head.y
        };        

        snake.addEventListener('Step', this.goThroughThePortal.bind(this, snake), {once:true})
    }

    goThroughThePortal(snake, x, y){
        snake.direction = {
            x: this.buffer.oldDirection.x,
            y: this.buffer.oldDirection.y,
        }

        setTimeout(this.resetBody.bind(this), Mathematic.random(1000, 10000));
    }

    draw(){
        if(this._body.length == 0){
            return;
        }
        
        // this._body[0].div.style.borderColor = 'rgb(64, 64, 192)';
        // this._body[0].div.style.borderStyle = 'solid';
        // this._body[0].div.style.boxSizing = 'border-box';
        // this._body[0].div.style.borderWidth = '3px';
        
        // this._body[1].div.style.borderColor = 'rgb(224, 96, 0)';
        // this._body[1].div.style.borderStyle = 'solid';
        // this._body[1].div.style.boxSizing = 'border-box';
        // this._body[1].div.style.borderWidth = '3px';
    }

    destroy(){
        super.destroy();

        this.p
    }
}