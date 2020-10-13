import Snake from './Snake';
import Actor from './Actor';
import Mathematic from './Mathematic';

let curGameField = undefined;

export default class Portal extends Actor{
    constructor(body){
        super();

        for(let i = 0; i < body.length; i++){
            this._body.push({x: body[i].x, y: body[i].y, div: document.createElement('div')});
        }

        this.buffer = {};
    }

    resetBody(){
        for(let i = 0; i < 2; i++){
            let freeCell = curGameField.getFreeCell();

            this._body.push({x: freeCell.x, y: freeCell.y, div: document.createElement('div')});
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
        
        this._body[0].div.style.borderColor = 'rgb(64, 64, 192)';
        this._body[0].div.style.borderStyle = 'solid';
        this._body[0].div.style.boxSizing = 'border-box';
        this._body[0].div.style.borderWidth = '2px';
        
        this._body[1].div.style.borderColor = 'rgb(224, 96, 0)';
        this._body[1].div.style.borderStyle = 'solid';
        this._body[1].div.style.boxSizing = 'border-box';
        this._body[1].div.style.borderWidth = '2px';
    }
}