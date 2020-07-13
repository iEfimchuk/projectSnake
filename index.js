window.onload = function(event){
    let divGameField = this.document.getElementById('game-field');

    Game = new Game(divGameField, 10, 15);

    document.onkeydown = function (event) {console.log(event);};
}