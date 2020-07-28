class AI {
    constructor(bot, goal){
        this.bot = bot;
        this.goal = goal;

        this.bot.addEventListener('Step', this.onStep.bind(this));
    }

    onStep(event){
        let headCoor = this.bot.body[0];
        let snake = this.bot;

        if(headCoor.x > this.goal.body[0].x){
            snake.changeDirection({x: -1, y: 0});
        } else if(headCoor.x < this.goal.body[0].x){
            snake.changeDirection({x: 1, y: 0});
        } else if(headCoor.y > this.goal.body[0].y){
            snake.changeDirection({x: 0, y: -1});
        } else if (headCoor.y < this.goal.body[0].y){
            snake.changeDirection({x: 0, y: 1});
        }
    }
}