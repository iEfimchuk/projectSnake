class Game{
    constructor(div, columnsCount, rowsCount){
        this.gameField = div;
        this.tickDuration =1000;
        this.state = 'pause';
        this.maxY = rowsCount - 1;
        this.maxX = columnsCount - 1;

        this.player = [
            {x:4, y:4},
            {x:4, y:5},
            {x:4, y:6},]

        this.gameField.style.width = columnsCount * 30;
        this.gameField.style.height = rowsCount * 30;

        for(let i = 0; i < this.player.length; i++){
            let curSegment = this.player[i];

            let newDiv = document.createElement('div');

            newDiv.style.position = 'absolute';

            newDiv.style.width = 30;
            newDiv.style.height = 30;

            newDiv.style.left = curSegment.x*30;
            newDiv.style.top = curSegment.y*30;
            newDiv.style.backgroundRepeat = 'none';
            newDiv.style.backgroundSize = 'cover';

            if(i == 0){
                newDiv.style.backgroundImage = 'url(images/snakeHead.png)';
            } else if(i == this.player.length - 1){
                newDiv.style.backgroundImage = 'url(images/snakeTail.png)';
            } else {
                newDiv.style.backgroundImage = 'url(images/snakeBody1.png)';
            }

            curSegment.div = newDiv;

            this.gameField.append(newDiv);
        }

        setInterval(this.UpdateState.bind(this), this.tickDuration, this);
    }

    UpdateState(){
        for(let i = this.player.length - 1; i > 0; i--){
            let curSegment = this.player[i];
            let prevSergment = this.player[i - 1];
            curSegment.x = prevSergment.x;
            curSegment.y = prevSergment.y;
        }

        this.player[0].y -= 1;

        if(this.player[0].y == -1){
            this.player[0].y = this.maxY;
        }

        for(let i = 0; i < this.player.length; i ++){
            let curSegment = this.player[i];

            curSegment.div.style.left = curSegment.x * 30;
            curSegment.div.style.top = curSegment.y * 30;
        }
    }
};