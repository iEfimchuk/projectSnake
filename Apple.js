function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

class Apple extends EventTarget{
    constructor(gameField){
        super();
        this.body = [];
        this.gameField = gameField;

        let freeCell = {x: getRandomIntInclusive(0, gameField.columnsCount - 1), y: getRandomIntInclusive(0, gameField.rowsCount - 1)};

        while(true){
            if(gameField.isFreeCell(freeCell)){
                break;
            } else {
                freeCell = {x: getRandomIntInclusive(0, gameField.columnsCount - 1), y: getRandomIntInclusive(0, gameField.rowsCount - 1)};
            }
        }

        freeCell.div = null;

        this.body.push({x: freeCell.x, y: freeCell.y, div: null});
        this.gameField.updateSegments({detail: this.body});

        this.draw();
    }

    onCollision(game, actor){
        if(actor instanceof Snake){
            game.score = game.score + 1;

            let freeCell = {x: getRandomIntInclusive(0, this.gameField.columnsCount - 1), y: getRandomIntInclusive(0, this.gameField.rowsCount - 1)};

            while(true){
                if(this.gameField.isFreeCell(freeCell)){
                    break;
                } else {
                    freeCell = {x: getRandomIntInclusive(0, this.gameField.columnsCount - 1), y: getRandomIntInclusive(0, this.gameField.rowsCount - 1)};
                }
            }

            this.body[0].x = freeCell.x;
            this.body[0].y = freeCell.y;
        }
        
        this.gameField.updateSegments({detail: this.body});
    }

    draw(){

        for(let i = 0; i < this.body.length; i++){

            let curSegment = this.body[i];

            let div = curSegment.div;

            div.style.backgroundImage = 'url(images/apple.png)';
            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
        }
    }
}

