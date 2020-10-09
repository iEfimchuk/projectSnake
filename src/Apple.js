import getRandomIntInclusive from './Mathematic';
import Snake from './Snake';

export default class Apple extends EventTarget{
    constructor(gameField){
        super();
        this.body = [];

        let freeCell = gameField.getFreeCell();

        freeCell.div = null;

        this.body.push({x: freeCell.x, y: freeCell.y, div: document.createElement('div')});

        this.draw();
    }

    onCollision(game, actor, gameField){
        if(actor instanceof Snake){
            game.score = game.score + 1;
            actor.addSegment();

            let freeCell = gameField.getFreeCell();

            this.body[0].x = freeCell.x;
            this.body[0].y = freeCell.y;
        }
        
        // this.gameField.updateSegments({detail: this.body});
    }

    draw(){

        for(let i = 0; i < this.body.length; i++){

            let curSegment = this.body[i];

            let div = curSegment.div;

            div.style.backgroundImage = 'url(../images/apple.png)';
            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
        }
    }
}