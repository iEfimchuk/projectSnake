import Snake from './Snake';
import Actor from './Actor';

export default class Apple extends Actor{
    constructor(body){
        super();

        this._body.push({x: body[0].x, y: body[0].y, div: document.createElement('div')});

        this.draw();
    }

    onCollision(game, actor, gameField){
        if(actor instanceof Snake){
            game.score = game.score + 1;
            actor.addSegment();

            let freeCell = gameField.getFreeCell();

            this._body[0].x = freeCell.x;
            this._body[0].y = freeCell.y;
        }
    }

    draw(){
        super.draw();

        for(let i = 0; i < this._body.length; i++){

            let curSegment = this._body[i];

            let div = curSegment.div;
            div.style.backgroundColor = 'rgb(224, 32, 0)';
            div.style.transform = 'scale(0.70) rotate(45deg)';
        }
    }
}