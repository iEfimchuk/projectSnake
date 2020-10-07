export default class Snake extends EventTarget{
    constructor(gameField){
        super();
        this.body = new Array();
        this.lastPlace = {x:0, y:0};
        this.millisecondsPerStep = 200;
        this.alive = true;

        this.gameField = gameField;

        let newSegment = {x: 0, y: 0, div:null};

        for(let i = 0; i < 3; i++){
            if(gameField.isFreeCell(newSegment)){
                gameField.takeСell(newSegment);
                this.body.push(newSegment);
            } else if(gameField.isFreeCell({x:newSegment.x + 1, y: newSegment.y})){
                newSegment = {x:newSegment.x + 1, y: newSegment.y, div:null};
                gameField.takeСell(newSegment);
                this.body.push(newSegment);
            } else if(gameField.isFreeCell({x:newSegment.x, y: newSegment.y + 1})){
                newSegment = {x:newSegment.x, y: newSegment.y + 1, div:null};
                gameField.takeСell(newSegment);
                this.body.push(newSegment);
            } else {
                if(newSegment.x + 1 < gameField.maxX){
                    newSegment = {x: newSegment.x + 1, y: newSegment.y, div:null};
                } else if(newSegment.y + 1 < gameField.maxY){
                    newSegment = {x: newSegment.x, y: newSegment + y, div:null};
                } else {
                    if(this.body.length != 0){
                        break;
                    }
                }

                i = i - 1;
                continue;
            }
        }

        this.direction = {
            // x: this.body[0].x - this.body[1].x, 
            // y: this.body[0].y - this.body[1].y
            x: 0, 
            y: 1
        };

        this.gameField.updateSegments({detail: this.body});
    }

    get head(){
        return this.body[0];
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
        this.body.push({x:this.lastPlace.x, y: this.lastPlace.y, div:null});

        this.dispatchEvent(new CustomEvent('GrowUp', {detail: this.body}));
    }

    makeStep(){
        this.dispatchEvent(new CustomEvent('PrevStep', {detail: this.body}));

        this.lastPlace.x = this.body[this.body.length - 1].x;
        this.lastPlace.y = this.body[this.body.length - 1].y;

        for(let i = this.body.length - 1; i > 0; i--){
            let curSegment = this.body[i];
            let prevSergment = this.body[i - 1];
            curSegment.x = prevSergment.x;
            curSegment.y = prevSergment.y;
        }

        this.body[0].x += this.direction.x;
        this.body[0].y += this.direction.y;

        this.dispatchEvent(new CustomEvent('Step', {detail: this.body}));

        this.gameField.updateSegments({detail: this.body});

        this.draw();
    }
    
    changeDirection(newDirection){
        let firstSegment = this.body[0];
        let secondSegment = this.body[1];

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
        for(let i = this.body.length - 1; i >= 0; i--){

            let curSegment = this.body[i];

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
                for(let i = 1; i < this.body.length; i++){
                    if(this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y){
                        this.kill();
                    }
                }
            }
        }
    }
}