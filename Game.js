import SinglePlayer from './SinglePlayer';
import Controls from './Controls';
import Scene from './Scene';
import GameOverScreen from './GameOverScreen';

export default class Game extends EventTarget{
    constructor(columnsCount, rowsCount){
        super();
        
        if(document.getElementById('game') == undefined){
            let gameDiv = document.createElement('div');

            gameDiv.id = 'game';
            
            let gameDivSize = this.getDisplaySize(480, 640);
            gameDiv.style.width = gameDivSize.width;
            gameDiv.style.height = gameDivSize.height;

            document.body.appendChild(gameDiv);
        }

        this._div = document.getElementById('game');

        this._controls = new Controls();
        this._controls.addEventListener('Keyboard', this.onKeyboardEvent.bind(this));

        this._currentScene = new Scene();
        
        this._scenes = {
            SinglePlayer : new SinglePlayer(columnsCount, rowsCount, this._div),
            GameOverScreen : new GameOverScreen(this._div)
        }

        this.changeCurrentScene(this._scenes.SinglePlayer);
    };

    getDisplaySize(defaultWidth, defaultHeight){
        let documentWidth = document.documentElement.clientWidth;
        let documentHeight = document.documentElement.clientHeight;
        let K = documentWidth / documentHeight;
        let k = 1;

        if(K > 1){
            k = documentHeight > defaultHeight ? 1 : documentHeight / defaultHeight;
        } else {
            k = documentWidth > defaultWidth ? 1 : documentWidth / defaultWidth;    
        }

        return {
            width : defaultWidth * k,
            height : defaultHeight * k
        }
    }

    onKeyboardEvent(event){
        this._currentScene.onKeyboardEvent(event);
    }

    changeCurrentScene(newScene){
        this._currentScene.removeEventListener('StateChanging', this.onSceneStateChanging.bind(this));
        this._currentScene.removeEventListener('OnStop', this.onSceneStop.bind(this));
        this._currentScene.removeEventListener('OnStart', this.onSceneStart.bind(this));
        this._currentScene.removeEventListener('OnPause', this.onScenePause.bind(this));

        this._currentScene.reset();
        this._currentScene = newScene;
        this._currentScene.score = 50;
        this._currentScene.start();

        this._currentScene.addEventListener('StateChanging', this.onSceneStateChanging.bind(this));
        this._currentScene.addEventListener('OnStop', this.onSceneStop.bind(this));
        this._currentScene.addEventListener('OnStart', this.onSceneStart.bind(this));
        this._currentScene.addEventListener('OnPause', this.onScenePause.bind(this));
    }

    onSceneStateChanging(event){}
    onSceneStop(event){

        this.changeCurrentScene(this._scenes.GameOverScreen);
    }
    onSceneStart(event){}
    onScenePause(event){}
}

