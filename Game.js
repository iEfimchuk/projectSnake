import SinglePlayer from './SinglePlayer';
import Controls from './Controls';
// import Scene from './Scene';
// import GameOverScreen from './GameOverScreen';
import Menu from './Menu';

export default class Game extends EventTarget{
    constructor(columnsCount, rowsCount){
        super();
        
        if(document.getElementById('game') == undefined){
            let gameDiv = document.createElement('div');

            gameDiv.id = 'game';
            
            let gameDivSize = this.getDisplaySize(480, 640);
            gameDiv.style.width = gameDivSize.width;
            gameDiv.style.height = gameDivSize.height;
            gameDiv.style.backgroundColor = 'black';

            document.body.appendChild(gameDiv);
        }

        this._div = document.getElementById('game');
        this._div.style.marginTop = (document.body.clientHeight - this._div.clientHeight)/2;
        this._div.style.marginLeft = (document.body.clientWidth - this._div.clientWidth)/2;

        this._controls = new Controls();
        this._controls.addEventListener('Keyboard', this.onKeyboardEvent.bind(this));

        this._currentScene = undefined;
        
        let choices = [
            {name: 'retry', title: 'Retry'},
            {name: 'quit', title: 'Quit'},
        ];

        this._scenes = {
            SinglePlayer : new SinglePlayer(columnsCount, rowsCount, this._div),
            // GameOverScreen : new GameOverScreen(this._div)
            GameOverScreen : new Menu('game-over', this._div, Array.from(choices))
        }

        this._scenes.GameOverScreen.title = 'GAME OVER';

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
        if(this._currentScene != undefined){
            this._currentScene.removeEventListener('StateChanging', this.onSceneStateChanging.bind(this));
            this._currentScene.removeEventListener('OnStop', this.onSceneStop.bind(this));
            this._currentScene.removeEventListener('OnStart', this.onSceneStart.bind(this));
            this._currentScene.removeEventListener('OnPause', this.onScenePause.bind(this));
        }

        this._currentScene = newScene;
        this._currentScene.start();

        this._currentScene.addEventListener('StateChanging', this.onSceneStateChanging.bind(this));
        this._currentScene.addEventListener('OnStop', this.onSceneStop.bind(this));
        this._currentScene.addEventListener('OnStart', this.onSceneStart.bind(this));
        this._currentScene.addEventListener('OnPause', this.onScenePause.bind(this));
    }

    onSceneStateChanging(event){}
    onSceneStop(event){
        let scene = event.target;
        let sceneId = scene.id;

        if(sceneId == this._scenes.SinglePlayer.id){
            let score = scene.score;

            this._scenes.GameOverScreen.reset();
            this._scenes.GameOverScreen.subtitle = `Score: ${score}`;

            this.changeCurrentScene(this._scenes.GameOverScreen);
        }

        if(sceneId == this._scenes.GameOverScreen.id){
            if(scene.choice == 'retry'){
                this._scenes.SinglePlayer.reset();
                this.changeCurrentScene(this._scenes.SinglePlayer);
            }

            if(scene.choice == 'quit'){

            }
        }
    }
    onSceneStart(event){}
    onScenePause(event){}
}