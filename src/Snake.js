import Actor from './Actor';

export default class Snake extends Actor{
    constructor(_body){
        super();
        this.lastPlace = {x:0, y:0};
        this.millisecondsPerStep = 200;
        this.alive = true;

        for(let i = 0; i < _body.length; i++){
            this._body.push({x : _body[i].x, y : _body[i].y, div: document.createElement('div')})
        }

        this.direction = {
            x: 0, 
            y: 1
        };
    }

    get head(){
        return this._body[0];
    }

    kill(){
        if(this.alive){
            this.stop();
            this.dispatchEvent(new Event('Death'));
            this.alive = false;
        }
    }

    move(){
        this.intervalId = setInterval(this.makeStep.bind(this), this.millisecondsPerStep);
    }

    stop(){
        clearInterval(this.intervalId);
    }

    addSegment(){
        this._body.push({x:this.lastPlace.x, y: this.lastPlace.y, div:document.createElement('div')});

        this.dispatchEvent(new CustomEvent('GrowUp', {detail: this._body}));
    }

    makeStep(){
        this.dispatchEvent(new CustomEvent('PrevStep', {detail: this._body}));

        this.lastPlace.x = this._body[this._body.length - 1].x;
        this.lastPlace.y = this._body[this._body.length - 1].y;

        for(let i = this._body.length - 1; i > 0; i--){
            let curSegment = this._body[i];
            let prevSergment = this._body[i - 1];
            curSegment.x = prevSergment.x;
            curSegment.y = prevSergment.y;
        }

        this._body[0].x += this.direction.x;
        this._body[0].y += this.direction.y;

        this.dispatchEvent(new CustomEvent('Step', {detail: this._body}));

        this.draw();
    }
    
    changeDirection(newDirection){
        let firstSegment = this._body[0];
        let secondSegment = this._body[1];

        if(secondSegment != undefined){

            if(firstSegment.x + newDirection.x == secondSegment.x ||
                firstSegment.y + newDirection.y == secondSegment.y){
                return;
            }
        }

        let detail = {
            oldDirection: this.direction,
            newDirection: newDirection
        }

        this.direction = newDirection;

        this.dispatchEvent(new CustomEvent('ChangeDirection', {detail: detail}));
    }

    draw(){
        super.draw();

        for(let i = this._body.length - 1; i >= 0; i--){

            let curSegment = this._body[i];

            let div = curSegment.div;

            if(i == 0){
                div.style.backgroundImage = 'url(../images/snakeHead.png)';
                div.style.zIndex = 1;

            } else {
                div.style.backgroundImage = 'url(../images/snakeBody.png)';
                div.style.zIndex = 0;
            }

            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
        }
    }

    onCollision(game, actor, gameField){
        if(actor instanceof Snake){
            if(this === actor){
                for(let i = 1; i < this._body.length; i++){
                    if(this._body[0].x == this._body[i].x && this._body[0].y == this._body[i].y){
                        this.kill();
                    }
                }
            }
        }
    }
}