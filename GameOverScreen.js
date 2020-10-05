import Scene from './Scene';

export default class GameOverScreen extends Scene{
    constructor(display){
        super('game-over-screen');

        let w = display.clientWidth;
        let h = display.clientHeight;

        display.appendChild(this._screen);

        this._screen.style.position = 'absolute';
        this._screen.style.width = w;
        this._screen.style.height = h;

        this._screen.innerHTML = 
                                `<div class="content" style="text-align: center">
                                    <div class="title" style="margin:20 0 20 0; font-size: 20px">GAME OVER</div>
                                    <div class="score" style="margin:10 0 10 0; font-size: 17px"></div>
                                    <div class="retry choice" style="padding: 5 0 5 0; font-size: 14px">Retry</div>
                                    <div class="quit choice" style="padding: 5 0 5 0; font-size: 14px">Quit</div>
                                </div>`;

        let contentDiv = this._screen.getElementsByClassName('content')[0];

        contentDiv.style.marginTop = (this._screen.clientHeight - contentDiv.clientHeight)/2;

        contentDiv.style.width = this._screen.clientWidth*0.5;

        contentDiv.style.marginLeft = (this._screen.clientWidth - contentDiv.clientWidth)/2;

        this.choice = 'retry';
    }

    onKeyboardEvent(event){
        super.onKeyboardEvent(event);

        let key = event.detail.key;

        switch(key){
            case 'Up'   : this.changeChoice(); break;
            case 'Down' : this.changeChoice(); break;
            case 'Enter' : this.stop(); break;
        }
    }

    changeChoice(){
        if(this._selectedChoice == 'retry'){
            this.choice = 'quit';
        } else {
            this.choice = 'retry';
        }
    }

    set choice(newValue){
        Array.from(this._screen.getElementsByClassName('choice')).forEach(function(element){
            element.style.color = 'white';
            element.style.backgroundColor = 'black';
        });

        this._screen.getElementsByClassName(newValue)[0].style.color = 'black';
        this._screen.getElementsByClassName(newValue)[0].style.backgroundColor = 'white';

        this._selectedChoice = newValue;
    }

    get choice(){
        return this._selectedChoice;
    }

    set score(newValue){
        this._screen.getElementsByClassName('score')[0].innerHTML = `<div>score: ${newValue}</div>`;
    }

    start(){
        super.start();
    }

    reset(){
        super.reset();
    }
}