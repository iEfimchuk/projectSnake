import Scene from './Scene';
import Snake from './Snake';
import Apple from './Apple';
import Portal from './Portal';
import GameField from './Gamefield';
import Controls from './Controls';

// export default class Game extends EventTarget{
//     constructor(){
//         super();
        
//         if(document.getElementById('game') == undefined){
//             let gameDiv = document.createElement('div');

//             gameDiv.id = 'game';
            
//             gameDivSize = this.getDisplaySize;
//             gameDiv.style.width = gameDivSize.width;
//             gameDiv.style.height = gameDivSize.height;
//         }
//     }

//     getDisplaySize(defaultWidth, defaultHeight){
//         documentWidth = document.documentElement.clientWidth;
//         documentHeight = document.documentElement.clientHeight;
//         K = documentWidth / documentHeight;
//         k = 1;

//         if(K > 1){
//             k = documentHeight > defaultHeight ? 1 : documentHeight / defaultHeight;
//         } else {
//             k = documentWidth > defaultWidth ? 1 : documentWidth / defaultWidth;    
//         }

//         return {
//             width : defaultWidth * k,
//             height : defaultHeight * k
//         }
//     }
// }

export default class Game extends Scene{
    constructor(columnsCount, rowsCount){
        super();
        this.gameField = new GameField(columnsCount, rowsCount, 20, 30);
        this._state = 'play'; // 'play', 'pause', 'stop'
        this.maxY = rowsCount - 1;
        this.maxX = columnsCount - 1;
        this.controls = new Controls();
        this._score = 0;

        this.actors = new Array();

        this.actors.push(new Snake(this.gameField)); // player

        this.actors[0].addEventListener('GrowUp', this.gameField.addSegment.bind(this.gameField));
        this.actors[0].addEventListener('PrevStep', this.gameField.freeSegments.bind(this.gameField));
        this.actors[0].addEventListener('Step', this.goThroughWalls.bind(this));
        // this.actors[0].addEventListener('Step', this.gameField.updateSegments.bind(this.gameField));
        this.actors[0].addEventListener('Step', this.gameField.moveViewPortOnStep.bind(this.gameField));
        this.actors[0].addEventListener('Step', this.collisionControl.bind(this));
        this.actors[0].addEventListener('Death', this.stop.bind(this));

        this.actors.push(new Apple(this.gameField));
        this.actors.push(new Portal(this.gameField));

        // let ai = new AI(this.actors[0], this.actors[1], this.gameField);

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

        this.actors[0].move();

        // setInterval(this.updateState.bind(this), this.tickDuration, this);
    }

    set score(value){
        this.dispatchEvent(new CustomEvent({prevValue: this._score, currentValue: value}));

        this._score = value;

        // document.getElementById('game-score').innerText = `Score: ${this._score}`;
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

    collisionControl(){
        for(let i = 0; i < this.actors.length; i++){
            for(let e = i; e < this.actors.length; e++){
                let fActor = this.actors[i];
                let sActor = this.actors[e];

                function isCollision(fBody, sBody){
                    for(let fi = 0; fi < fBody.length; fi++){
                        for(let si = 0; si < sBody.length; si++){
                            if(fActor.body[fi].x == sActor.body[si].x && fActor.body[fi].y == sActor.body[si].y){
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