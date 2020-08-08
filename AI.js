class AI extends EventTarget{
    constructor(bot, goal, gameField){
        super();
        this.bot = bot;
        this.goal = goal;
        this.gameField = gameField;

        this._path = new Array;

        this.bot.addEventListener('Step', this.onStep.bind(this));
    }

    set path(value){
        this._path = value;
    }

    get path(){
        return this._path;
    }

    static normalizeVector(vector){
        let x = vector.x;
        let y = vector.y;

        return {
            x: (x != 0) ? x/Math.abs(x) : 0,
            y: (y != 0) ? y/Math.abs(y) : 0,
        }
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

            this.path = AI.searchPathToTheGoal(curVisibleArea, this.bot.body[0], goal);
        } else {
            this._path = new Array();
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

    static getCollisionPoint(fPath, sPath){
        if(AI.horizontalPath(fPath)){
            return {x: sPath[0].x, y: fPath[0].y};
        } else {
            return {x: fPath[0].x, y: sPath[0].y};
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

        let curPath;

        while(true){
            for(let i = 0; i < curPaths.length; i++){
                if(AI.contains(curPaths[i][curPaths[i].length - 1], end)){
                    curPath = curPaths[i];
                    break;
                }
            }

            if(curPaths[0].length > 2){
                break;
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
        }

        if(curPath == undefined){
            return undefined;
        }

        curPath.push([end, end]);

        let pathBySections = new Array();
        pathBySections.push(begin);

        for(let i = 0; i < curPath.length - 1; i++){
            let localGoal = AI.getCollisionPoint(curPath[i], curPath[i + 1]);

            let localDirection = AI.normalizeVector({
                x: localGoal.x - pathBySections[pathBySections.length - 1].x,
                y: localGoal.y - pathBySections[pathBySections.length - 1].y
            });

            do{
                let curSectionOnPath = {
                    x: pathBySections[pathBySections.length - 1].x + localDirection.x,
                    y: pathBySections[pathBySections.length - 1].y + localDirection.y
                }

                pathBySections.push(curSectionOnPath);
            } while (!(pathBySections[pathBySections.length - 1].x == localGoal.x && pathBySections[pathBySections.length - 1].y == localGoal.y))
        }

        pathBySections.shift();

        return pathBySections;
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

    static equals(fPath, sPath){
        for(let i = 0; i < 2; i++){
            if(fPath[i].x != sPath[i].x || fPath[i].y != sPath[i].y){
                return false;
            }
        }

        return true;
    }

    static contact(fPath, sPath){
        let a, b;
        
        if(AI.horizontalPath(fPath)){
            a = fPath;
            b = sPath
        } else {
            a = sPath;
            b = fPath;
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

    getVisibleArea(){
        this.gameField.updateSegments({detail: this.bot.body});

        let result = this.gameField.field.map(function(element, index, array){
            return element.map(function(element, index, array){
                return element.busy;
            })
        });

        result[this.bot.body[0].y][this.bot.body[0].x] = false;
        result[this.goal.body[0].y][this.goal.body[0].x] = false;

        return result;
    }
}