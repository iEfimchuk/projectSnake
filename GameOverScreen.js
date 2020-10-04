import Scene from './Scene';

export default class GameOverScreen extends Scene{
    constructor(display){
        super('game-over-screen');

        this._score = 0;

        let w = display.clientWidth;
        let h = display.clientHeight;

        this._screen.style.position = 'absolute';
        this._screen.style.width = w;
        this._screen.style.height = h;

        this._screen.innerText = 'GAME OVER';

        display.appendChild(this._screen);
    }

    set score(newValue){
        this._score = newValue;
    }

    start(){
        super.start();
    }
}