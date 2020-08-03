class AI {
    constructor(bot, goal, gameField){
        this.bot = bot;
        this.goal = goal;
        this.gameField = gameField;

        this.path = new Array;

        this.bot.addEventListener('Step', this.onStep.bind(this));
    }

    onStep(event){
        // this.bot.stop();
        let goal = this.goal.body[0];

        let minY = this.bot.body[0].y - Math.round(this.gameField.visibleSegmentsOnHeightCount/2);
        let maxY = this.bot.body[0].y + Math.round(this.gameField.visibleSegmentsOnHeightCount/2);
        let minX = this.bot.body[0].x - Math.round(this.gameField.visibleSegmentsOnWidthCount/2);
        let maxX = this.bot.body[0].x + Math.round(this.gameField.visibleSegmentsOnWidthCount/2);

        if(goal.x >= minX && goal.x < maxX && goal.y >= minY && goal.y < maxY){
            let curVisibleArea = this.getVisibleArea(minX, maxX, minY, maxY);
            let gDP = this.getDirectPaths(curVisibleArea);
    
            let hPaths = this.getHorizontalPaths(gDP);
            let vPaths = this.getVerticalPaths(gDP);



            // console.log(gDP);
        }

        let headCoord = this.bot.body[0];
        let snake = this.bot;

        if(headCoord.x > this.goal.body[0].x){
            snake.changeDirection({x: -1, y: 0});
        } else if(headCoord.x < this.goal.body[0].x){
            snake.changeDirection({x: 1, y: 0});
        } else if(headCoord.y > this.goal.body[0].y){
            snake.changeDirection({x: 0, y: -1});
        } else if (headCoord.y < this.goal.body[0].y){
            snake.changeDirection({x: 0, y: 1});
        }
    }

    searchPathToTheGoal(goal){
    }

    getVerticalPaths(paths){
        return paths.filter(function (element, index, array){return this.verticalPath(element);}, this);
    }

    getHorizontalPaths(paths){
        return paths.filter(function (element, index, array){return this.horizontalPath(element);}, this);
    }

    horizontalPath(path){
        return path[0].y == path[1].y;
    }
    
    verticalPath(path){
        return path[0].x == path[1].x;
    }

    getDirectPaths(area){
        let paths = new Array();

        for(let y = 0; y < area.length; y++){
            let curPath = new Array();
            for(let x = 0; x < area[y].length; x++){
                if(area[y][x]){
                    if(curPath.length > 1){
                        paths.push(curPath);
                    }
                    curPath = new Array();
                } else {
                    if(curPath.length){
                        curPath[1] = {x: x, y: y};
                    } else {
                        curPath[0] = {x: x, y: y};
                    }
                }
            }

            if(curPath.length > 1){
                paths.push(curPath);
            }
        }

        for(let x = 0; x < area[0].length; x++){
            let curPath = new Array();
            for(let y = 0; y < area.length; y++){
                if(area[y][x]){
                    if(curPath.length > 1){
                        paths.push(curPath);
                    }
                    curPath = new Array();
                } else {
                    if(curPath.length){
                        curPath[1] = {x: x, y: y};
                    } else {
                        curPath[0] = {x: x, y: y};
                    }
                }
            }

            if(curPath.length > 1){
                paths.push(curPath);
            }
        }

        return paths;
    }

    getVisibleArea(minX, maxX, minY, maxY){
        this.gameField.updateSegments({detail: this.bot.body});

        let result = new Array();

        for(let y = minY < 0 ? 0 : minY; (y < maxY) && (y < this.gameField.rowsCount); y++){
            let curRow = new Array;

            for(let x = minX < 0 ? 0 : minX; (x < maxX) && (x < this.gameField.columnsCount); x++){
                
                if(x == this.goal.body[0].x && y == this.goal.body[0].y){
                    curRow.push(false);
                } else {
                    curRow.push(this.gameField.field[y][x].busy);
                }
            }

            result.push(curRow);
        }

        return result;
    }
}