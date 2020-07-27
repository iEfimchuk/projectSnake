function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

class Portal extends EventTarget{
    constructor(gameField){
        super();

        this.body = new Array();
        this.gameField = gameField;
        this.buffer = {};

        this.resetBody();

    }

    resetBody(){
        for(let i = 0; i < 2; i++){
            let freeCell = this.gameField.getFreeCell();

            this.body.push({x: freeCell.x, y: freeCell.y, div: null});
        }

        this.gameField.updateSegments({detail: this.body});

        this.draw();
    }

    clearBody(){
        this.gameField.freeSegments({detail: this.body});

        for(let i = this.body.length - 1; i >= 0; i--){
            this.body[i].div.remove();
            this.body[i].div = null;
            this.body.splice(i, 1);
        }
    }

    onCollision(game, actor){
        if(actor instanceof Snake){
            for(let i = 0; i < this.body.length; i++){
                if(this.body[i].x == actor.body[0].x && this.body[i].x == actor.body[0].x){
                    actor.addEventListener('PrevStep', 
                                            this.goThroughThePortalPrev.bind(
                                                this, 
                                                actor, 
                                                this.body[(i + 1)%2].x, 
                                                this.body[(i + 1)%2].y), 
                                            {once : true})
                    this.clearBody();
                    break;
                    
                    // actor.body[0].x = this.body[(i + 1)%2].x;
                    // actor.body[0].y = this.body[(i + 1)%2].y;
                    // this.clearBody();
                    // setTimeout(this.resetBody.bind(this), getRandomIntInclusive(1000, 10000));
                    // break;
                }
            }
            // this.clearBody();
            // setTimeout(this.resetBody.bind(this), getRandomIntInclusive(1000, 10000));
        }
    }

    goThroughThePortalPrev(snake, x, y){
        this.buffer['oldDirection'] = snake.direction;
        
        snake.direction = {
            x: x - snake.head.x,
            y: y - snake.head.y
        };        

        snake.addEventListener('Step', this.goThroughThePortal.bind(this, snake), {once:true})

        // this.clearBody();
        // setTimeout(this.resetBody.bind(this), getRandomIntInclusive(1000, 10000));
    }

    goThroughThePortal(snake, x, y){
        snake.direction = {
            x: this.buffer.oldDirection.x,
            y: this.buffer.oldDirection.y,
        }

        setTimeout(this.resetBody.bind(this), getRandomIntInclusive(1000, 10000));
    }

    draw(){
        
        this.body[0].div.style.borderColor = 'rgb(64, 64, 192)';
        this.body[0].div.style.borderStyle = 'solid';
        this.body[0].div.style.boxSizing = 'border-box';
        this.body[0].div.style.borderWidth = '2px';
        
        this.body[1].div.style.borderColor = 'rgb(224, 96, 0)';
        this.body[1].div.style.borderStyle = 'solid';
        this.body[1].div.style.boxSizing = 'border-box';
        this.body[1].div.style.borderWidth = '2px';
    }
}