

class Game extends EventTarget{
    constructor(div, columnsCount, rowsCount){
        super();
        this.gameField = new GameField(columnsCount, rowsCount, div);
        this.state = 'play';
        this.maxY = rowsCount - 1;
        this.maxX = columnsCount - 1;
        this.controls = new EventTarget();

        this.player = new Snake(this.gameField);

        this.player.addEventListener('GrowUp', this.gameField.addSegment.bind(this.gameField));
        this.player.addEventListener('Step', this.goThroughWalls.bind(this));
        this.player.addEventListener('Step', this.gameField.updateSegments.bind(this.gameField));

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

                if(this.state == 'play'){
                    this.player.move();
                } else {
                    this.player.stop();
                }

                return;
            }

            switch(key){
                case 'Left' : this.player.changeDirection({x: -1, y: 0}); break;
                case 'Right': this.player.changeDirection({x: 1, y: 0}); break;
                case 'Up'   : this.player.changeDirection({x: 0, y: -1}); break;
                case 'Down' : this.player.changeDirection({x: 0, y: 1}); break;
                case 'Num1' : this.player.addSegment(); break;
            }
        }).bind(this));

        this.addEventListener('StateChange', function(event){
            console.log(`From ${event.detail.prevState} state To ${event.detail.curState} state`);
        });

        document.onkeydown = this.keyPress.bind(this);
        this.player.move();

        // setInterval(this.updateState.bind(this), this.tickDuration, this);
    }

    updateState(){
        // this.player.draw();
        // this.player.makeStep();
    }

    goThroughWalls(event){
        let segments = event.detail;

        for(let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++){
            let segment = segments[segmentIndex];

            if(segment.x < 0){
                segment.x = this.gameField.columnsCount - 1;
            }

            if(segment.x >= this.gameField.columnsCount){
                segment.x = 0;
            }
            
            if(segment.y < 0){
                segment.y = this.gameField.rowsCount - 1;
            }

            if(segment.y >= this.gameField.rowsCount){
                segment.y = 0;
            }
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