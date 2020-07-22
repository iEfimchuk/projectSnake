

class Game extends EventTarget{
    constructor(columnsCount, rowsCount){
        super();
        this.gameField = new GameField(columnsCount, rowsCount, 240, 390);
        this._state = 'play'; // 'play', 'pause', 'stop'
        this.maxY = rowsCount - 1;
        this.maxX = columnsCount - 1;
        this.controls = new EventTarget();
        this._score = 0;

        this.actors = new Array();

        this.actors.push(new Snake(this.gameField)); // player

        this.actors[0].addEventListener('GrowUp', this.gameField.addSegment.bind(this.gameField));
        this.actors[0].addEventListener('prevStep', this.gameField.freeSegments.bind(this.gameField));
        this.actors[0].addEventListener('Step', this.goThroughWalls.bind(this));
        this.actors[0].addEventListener('Step', this.gameField.updateSegments.bind(this.gameField));
        this.actors[0].addEventListener('Step', this.collisionControl.bind(this));
        this.actors[0].addEventListener('Death', this.stop.bind(this));

        this.actors.push(new Apple(this.gameField));

        this.controls.addEventListener('Keyboard', (function(event){
            let key = event.detail.key;

            if(key == "Escape"){
                this.state = this.state == 'pause' ? 'play' : 'pause';
                
                if(this.state == 'play'){
                    this.actors[0].move();
                } else {
                    this.actors[0].stop();
                }

                return;
            }

            switch(key){
                case 'Left' : this.actors[0].changeDirection({x: -1, y: 0}); break;
                case 'Right': this.actors[0].changeDirection({x: 1, y: 0}); break;
                case 'Up'   : this.actors[0].changeDirection({x: 0, y: -1}); break;
                case 'Down' : this.actors[0].changeDirection({x: 0, y: 1}); break;
                case 'Num1' : this.actors[0].addSegment(); break;
            }
        }).bind(this));

        this.addEventListener('StateChange', function(event){
            console.log(`From ${event.detail.prevState} state To ${event.detail.curState} state`);
        });

        document.onkeydown = this.keyPress.bind(this);
        this.actors[0].move();

        // setInterval(this.updateState.bind(this), this.tickDuration, this);
    }

    set score(value){
        this.dispatchEvent(new CustomEvent({prevValue: this._score, currentValue: value}));

        this._score = value;

        document.getElementById('game-score').innerText = this._score;
    }

    get score(){
        return this._score;
    }

    set state(value){
        let detail = {
            prevState : this._state,
            curState : value
        }

        this._state = value;

        this.dispatchEvent(new CustomEvent('StateChange', { detail: detail }));
    }

    get state(){
        return this._state;
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

    collisionControl(){
        for(let i = 0; i < this.actors.length; i++){
            for(let e = i; e < this.actors.length; e++){
                let fActor = this.actors[i];
                let sActor = this.actors[e];

                function isCollision(fBody, sBody){
                    for(let fi = 0; fi < fBody.length; fi++){
                        for(let si = 0; si < sBody.length; si++){
                            if(fActor.body[si].x == sActor.body[si].x && fActor.body[si].y == sActor.body[si].y){
                                return true;
                            }
                        }
                    }

                    return false;
                }

                if(isCollision(fActor.body, sActor.body)){
                    console.log();

                    fActor.onCollision(this, sActor);
                    sActor.onCollision(this, fActor);
                }
            }
        }
    }

    stop(){
        this.state = 'stop';

        alert('Game over!');
    }
};