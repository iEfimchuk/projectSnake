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
            
            console.log(AI.searchPathToTheGoal(curVisibleArea, this.begin, this.end));
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

    static searchPathToTheGoal(field, begin, end){
        let gDP = AI.getDirectPaths(field);
    
        let hPaths = AI.getHorizontalPaths(gDP);
        let vPaths = AI.getVerticalPaths(gDP);

        let variantsOfPaths = gDP.filter(function(element, index, array){
            return AI.contains(element, this);
        }, begin)

        let curPaths = new Array();

        for(let i = 0; i < variantsOfPaths.length; i++){
            curPaths.push(new Array());
            curPaths[curPaths.length - 1].push(variantsOfPaths[i]);
        }

        while(true){
            for(let i = 0; i < curPaths.length; i++){
                if(AI.contains(curPaths[i][curPaths[i].length - 1], end)){
                    return curPaths[i];
                }
            }

            if(curPaths[0].length > 2){
                return undefined;
            }

            let newCurPathsArray = new Array;

            for(let i = 0; i < curPaths.length; i++){
                let curPathsSource;

                if(AI.verticalPath(curPaths[i][curPaths[i].length - 1])){
                    curPathsSource = hPaths;
                } else if(AI.horizontalPath(curPaths[i][curPaths[i].length - 1])){
                    curPathsSource = vPaths;
                }

                let contactPaths = curPathsSource.filter(function(element, index, array){
                    return AI.contact(element, this[this.length - 1]) && this.some(function(element, index, array){
                        return !(AI.equals(element, this));
                    }, element); 
                }, curPaths[i]);

                for(let e = 0; e < contactPaths.length; e++){
                    newCurPathsArray.push(Array.from(curPaths[i]));
                    newCurPathsArray[newCurPathsArray.length - 1].push(contactPaths[e]);
                }
            }
            curPaths = newCurPathsArray;
            console.log(curPaths);
        }
    }

    static getVerticalPaths(paths){
        return paths.filter(function (element, index, array){return AI.verticalPath(element);}, this);
    }

    static getHorizontalPaths(paths){
        return paths.filter(function (element, index, array){return AI.horizontalPath(element);}, this);
    }

    static horizontalPath(path){
        return path[0].y == path[1].y;
    }
    
    static verticalPath(path){
        return path[0].x == path[1].x;
    }

    static contains(path, point){
        if(this.verticalPath(path)){
            return (path[0].x == point.x && point.y >= path[0].y && point.y <= path[1].y);
        }
        
        if(this.horizontalPath(path)){
            return (path[0].y == point.y && point.x >= path[0].x && point.x <= path[1].x);
        }
    }

    static equals(fpath, spath){
        for(let i = 0; i < 2; i++){
            if(fpath[i].x != spath[i].x || fpath[i].y != spath[i].y){
                return false;
            }
        }

        return true;
    }

    static contact(fpath, spath){
        let a, b;
        
        if(AI.horizontalPath(fpath)){
            a = fpath;
            b = spath
        } else {
            a = spath;
            b = fpath;
        }

        return b[0].x >= a[0].x && b[0].x <= a[1].x && b[0].y <= a[0].y && b[1].y >= a[0].y;
    }

    static getDirectPaths(area){
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
                
                if(x == this.bot.body[0].x && y == this.bot.body[0].y){
                    this.begin = {x: curRow.length, y: result.length};
                    curRow.push(false);
                } else if(x == this.goal.body[0].x && y == this.goal.body[0].y){
                    this.end = {x: curRow.length, y: result.length};
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