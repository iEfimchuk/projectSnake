import Snake from './Snake';
import Actor from './Actor';

export default class Apple extends Actor{
    constructor(gameField){
        super();

        let freeCell = gameField.getFreeCell();

        freeCell.div = null;

        this._body.push({x: freeCell.x, y: freeCell.y, div: document.createElement('div')});

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
        
        // this.gameField.updateSegments({detail: this._body});
    }

    draw(){
        super.draw();

        for(let i = 0; i < this._body.length; i++){

            let curSegment = this._body[i];

            let div = curSegment.div;

            div.style.backgroundImage = 'url(../images/apple.png)';
            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
        }
    }
}