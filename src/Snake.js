import Actor from './Actor';

export default class Snake extends Actor{
    constructor(gameField){
        super();
        this.lastPlace = {x:0, y:0};
        this.millisecondsPerStep = 200;
        this.alive = true;

        this.gameField = gameField;

        let newSegment = {x: 0, y: 0, div: document.createElement('div')};

        for(let i = 0; i < 3; i++){
            if(gameField.isFreeCell(newSegment)){
                gameField.takeСell(newSegment);
                this._body.push(newSegment);
            } else if(gameField.isFreeCell({x:newSegment.x + 1, y: newSegment.y})){
                newSegment = {x:newSegment.x + 1, y: newSegment.y, div: document.createElement('div')};
                gameField.takeСell(newSegment);
                this._body.push(newSegment);
            } else if(gameField.isFreeCell({x:newSegment.x, y: newSegment.y + 1})){
                newSegment = {x:newSegment.x, y: newSegment.y + 1, div: document.createElement('div')};
                gameField.takeСell(newSegment);
                this._body.push(newSegment);
            } else {
                if(newSegment.x + 1 < gameField.maxX){
                    newSegment = {x: newSegment.x + 1, y: newSegment.y, div: document.createElement('div')};
                } else if(newSegment.y + 1 < gameField.maxY){
                    newSegment = {x: newSegment.x, y: newSegment + y, div: document.createElement('div')};
                } else {
                    if(this._body.length != 0){
                        break;
                    }
                }

                i = i - 1;
                continue;
            }
        }

        this.direction = {
            // x: this._body[0].x - this._body[1].x, 
            // y: this._body[0].y - this._body[1].y
            x: 0, 
            y: 1
        };

        // this.gameField.updateSegments({detail: this._body});
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

        // this.gameField.updateSegments({detail: this._body});

        this.draw();
    }
    
    changeDirection(newDirection){
        let firstSegment = this._body[0];
        let secondSegment = this._body[1];

        if(firstSegment.x + newDirection.x == secondSegment.x ||
            firstSegment.y + newDirection.y == secondSegment.y){
            return;
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

    onCollision(game, actor){
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