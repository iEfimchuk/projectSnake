window.onload = function(event){
    let divGameField = this.document.getElementById('game-field');

    let game = new Game(divGameField, 15, 15);

    game.player.addSegment();
}