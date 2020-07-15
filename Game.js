class Game extends EventTarget{
    constructor(div, columnsCount, rowsCount){
        super();
        this.gameField = div;
        this.tickDuration = 200;
        this.state = 'pause';
        this.maxY = rowsCount - 1;
        this.maxX = columnsCount - 1;
        this.controls = new EventTarget();

        this.playerDirection = {x: 0, y: -1};
        this.player = [
            {x:4, y:4},
            {x:4, y:5},
            {x:4, y:6},]

        this.controls.addEventListener('Keyboard', (function(event){
            let key = event.detail.key;

            if(key == "Escape"){
                let prevState = this.state;
                this.state = this.state == 'pause' ? 'play' : 'pause';
                
                let detail = {
                    prevState : prevState,
                    curState : this.state
                }

                this.dispatchEvent(new CustomEvent('StateChange', { detail: detail }));
                return;
            }

            switch(key){
                case 'Left' : this.playerDirection = {x: -1, y: 0}; break;
                case 'Right': this.playerDirection = {x: 1, y: 0}; break;
                case 'Up'   : this.playerDirection = {x: 0, y: -1}; break;
                case 'Down' : this.playerDirection = {x: 0, y: 1}; break;
            }
        }).bind(this));

        this.addEventListener('StateChange', function(event){
            console.log(`From ${event.detail.prevState} state To ${event.detail.curState} state`);
        });

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

        document.onkeydown = this.keyPress.bind(this);

        setInterval(this.UpdateState.bind(this), this.tickDuration, this);
    }

    UpdateState(){
        for(let i = this.player.length - 1; i > 0; i--){
            let curSegment = this.player[i];
            let prevSergment = this.player[i - 1];
            curSegment.x = prevSergment.x;
            curSegment.y = prevSergment.y;
        }

        this.player[0].x += this.playerDirection.x;
        this.player[0].y += this.playerDirection.y;

        if(this.player[0].y == -1 || this.player[0].y > this.maxY){
            this.player[0].y = this.player[0].y == -1 ? this.maxY : 0;
        }

        if(this.player[0].x == -1 || this.player[0].x > this.maxX){
            this.player[0].x = this.player[0].x == -1 ? this.maxX : 0;
        }

        for(let i = 0; i < this.player.length; i ++){
            let curSegment = this.player[i];

            curSegment.div.style.left = curSegment.x * 30;
            curSegment.div.style.top = curSegment.y * 30;
        }
    }

    keyPress(event){
        let eventName = 'Keyboard';
        let detail = {};

        switch(event.code){
            case 'ArrowUp':
            case 'KeyW'     : detail.key = 'Up'; break;
            case 'ArrowDown': 
            case 'KeyS'     : detail.key = 'Down'; break;
            case 'ArrowLeft':
            case 'KeyA'     : detail.key = 'Left'; break;
            case 'ArrowRight':
            case 'KeyD'     : detail.key = 'Right'; break;
            case 'Digit1'   : detail.key = 'Num1'; break;
            case 'Digit2'   : detail.key = 'Num2'; break;
            case 'Digit3'   : detail.key = 'Num3'; break;
            case 'Digit4'   : detail.key = 'Num4'; break;
            case 'Digit5'   : detail.key = 'Num5'; break;
            case 'Digit6'   : detail.key = 'Num6'; break;
            case 'Digit7'   : detail.key = 'Num7'; break;
            case 'Digit8'   : detail.key = 'Num8'; break;
            case 'Digit9'   : detail.key = 'Num9'; break;
            case 'Digit0'   : detail.key = 'Num0'; break;
            case 'Escape'   : detail.key = 'Escape'; break;
            case 'Enter'    : detail.key = 'Enter'; break;
        }

        if(detail.key != undefined){
            this.controls.dispatchEvent(new CustomEvent(eventName, {detail: detail}));
        }
    }
};