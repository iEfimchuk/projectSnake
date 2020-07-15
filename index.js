window.onload = function(event){
    let divGameField = this.document.getElementById('game-field');

    game = new Game(divGameField, 10, 15);
}