import Scene from './Scene';
import Snake from './Snake';
import Apple from './Apple';
import Renderer from './Renderer';
import GameField from './GameField';
import Portal from './Portal';

export default class SinglePlayer extends Scene{
    constructor(columnsCount, rowsCount, display){
        super('single-player', display);

        this._screen.style.border = '3px solid rgb(0, 224, 0)';
        this._screen.style.boxShadow = '0 0 3px rgb(0, 224, 0)';

        this._mainCycleIntervalIDID = -1;
        this._gameField = new GameField(columnsCount, rowsCount);
        this._renderer = new Renderer(columnsCount, rowsCount, display.clientWidth, display.clientHeight, this._screen);
        
        let freeCell = this._gameField.getFreeCell();
        this._gameField.takeСell(freeCell);
        this._player = new Snake([freeCell]);

        this.maxY = rowsCount - 1;
        this.maxX = columnsCount - 1;
        
        this._score = {
            value: 0,
            div : document.createElement('div')
        };
        this._score.div = document.createElement('div');
        // this._score.div.innerText = `${this._score.value}`;
        this._score.div.style.zIndex = 2;
        this._score.div.style.position = 'absolute';
        this._score.div.style.left = 0;
        this._score.div.style.top = 0;
        this._score.div.style.color = 'rgba(224, 192, 128, 0.8)';
        this._score.div.style.padding = '10px';
        this._screen.appendChild(this._score.div);
        this.score = 0;

        this._actors = new Array();

        this._actors.push(this._player);

        this._player.addEventListener('GrowUp', this.PlayerOnGrowUp.bind(this));
        this._player.addEventListener('Step', this.goThroughWalls.bind(this));
        this._player.addEventListener('Step', this._renderer.moveViewPortOnStep.bind(this._renderer));
        this._player.addEventListener('Death', this.stop.bind(this));

        freeCell = this._gameField.getFreeCell();
        this._gameField.takeСell(freeCell);
        this._actors.push(new Apple([freeCell]));

        let freeCells = [this._gameField.getFreeCell(), this._gameField.getFreeCell()];
        freeCells.forEach(function(element){this.takeСell(element)}, this._gameField);        
        this._actors.push(new Portal(freeCells));
    }

    PlayerOnGrowUp(event){
        let body = event.detail;

        this._gameField.refresh(body);
    }

    reset(){
        this._gameField.refresh([], true);
        this._renderer.refresh([], true);
        
        let freeCell = this._gameField.getFreeCell();
        this._gameField.takeСell(freeCell);
        this._player = new Snake([freeCell]);
        
        this.score = 0;
        
        this._actors = new Array();
        this._actors.push(this._player);
        this._player.addEventListener('GrowUp', this.PlayerOnGrowUp.bind(this));
        this._player.addEventListener('Step', this.goThroughWalls.bind(this));
        this._player.addEventListener('Step', this._renderer.moveViewPortOnStep.bind(this._renderer));
        this._player.addEventListener('Death', this.stop.bind(this));

        freeCell = this._gameField.getFreeCell();
        this._gameField.takeСell(freeCell);
        this._actors.push(new Apple([freeCell]));        
        
        let freeCells = [this._gameField.getFreeCell(), this._gameField.getFreeCell()];
        freeCells.forEach(function(element){this.takeСell(element)}, this._gameField);        
        this._actors.push(new Portal(freeCells));

        super.reset();
    }

    stop(){
        this.stopMainCycle();

        super.stop();
    }

    start(){
        if(this._mainCycleIntervalIDID == -1){
            this.startMainCycle();
        }

        super.start();
    }

    startMainCycle(){
        this._mainCycleIntervalIDID = setInterval(this.mainCycleIteration.bind(this), 100);
    }

    mainCycleIteration(){
        if(this._state == 1){
            this._player.makeStep();
            this.collisionControl();

            this._actors.forEach((element) => {element.draw();});

            let allSegments = this._actors.map(element => element.body).flat();
            
            this._gameField.refresh(allSegments, true);
            this._renderer.refresh(allSegments, true);
        }
    }

    stopMainCycle(){
        clearInterval(this._mainCycleIntervalID);
    }

    pause(){
        super.pause();
    }

    onKeyboardEvent(event){
        super.onKeyboardEvent(event);

        let key = event.detail.key;

        switch(key){
            case 'Left' : this._actors[0].changeDirection({x: -1, y: 0}); break;
            case 'Right': this._actors[0].changeDirection({x: 1, y: 0}); break;
            case 'Up'   : this._actors[0].changeDirection({x: 0, y: -1}); break;
            case 'Down' : this._actors[0].changeDirection({x: 0, y: 1}); break;
            case 'Num1' : this._actors[0].addSegment(); break;
            case 'Escape' : this.pause(); break;
        }
    }

    set score(value){
        this._score.value = value;
        this._score.div.innerText = `Score: ${this._score.value}`;
    }

    get score(){
        return this._score.value;
    }

    goThroughWalls(event){
        let segments = event.detail;

        for(let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++){
            let segment = segments[segmentIndex];

            if(segment.x < 0){
                segment.x = this._gameField.columnsCount - 1;
            }

            if(segment.x >= this._gameField.columnsCount){
                segment.x = 0;
            }
            
            if(segment.y < 0){
                segment.y = this._gameField.rowsCount - 1;
            }

            if(segment.y >= this._gameField.rowsCount){
                segment.y = 0;
            }
        }
    }

    collisionControl(){
        for(let i = 0; i < this._actors.length; i++){
            for(let e = i; e < this._actors.length; e++){
                let fActor = this._actors[i];
                let sActor = this._actors[e];

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
                    fActor.onCollision(this, sActor, this._gameField);
                    sActor.onCollision(this, fActor, this._gameField);
                }
            }
        }
    }
};