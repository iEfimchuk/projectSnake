class Cell extends EventTarget{
    constructor(){
        super();
        this.busy = false;
    }
}

class GameField extends EventTarget{
    constructor(columnsCount, rowsCount, div){
        super();
        this.div = div;
        this.field = new Array(rowsCount);
        this.segmentWidth = 30;
        this.segmentHeight = 30;

        this.div.style.width = columnsCount*this.segmentWidth;
        this.div.style.height = rowsCount*this.segmentHeight;

        for(let y = 0; y < rowsCount; y++){
            this.field[y] = new Array(columnsCount);

            for(let x = 0; x < columnsCount; x++){
                this.field[y][x] = new Cell();
            }
        }
    }

    get columnsCount(){
        return this.field[0].length;
    }

    get rowsCount(){
        return this.field.length;
    }

    isFreeCell(cellCoordinates){
        return !this.field[cellCoordinates.y][cellCoordinates.x].busy;
    }

    takeСell(cellCoordinates){
        this.field[cellCoordinates.y][cellCoordinates.x].busy = true;
    }

    addSegment(event){
        let body = event.detail;

        for(let segmentIndex = 0; segmentIndex < body.length; segmentIndex++){
            let segment = body[segmentIndex]; 

            if(segment.div == null){
                let div = document.createElement('div');

                div.style.position = 'absolute';
                div.style.width = this.segmentWidth;
                div.style.height = this.segmentHeight;
                div.style.left = segment.x*this.segmentWidth;
                div.style.top = segment.y*this.segmentHeight;
                div.style.transformOrigin = 'center center';

                this.div.append(div);

                segment.div = div;
            }
        }
    }

    updateSegments(event){
        let body = event.detail;

        for(let segmentIndex = 0; segmentIndex < body.length; segmentIndex++){
            let segment = body[segmentIndex]; 

            if(segment.div == null){
                this.addSegment(event);
            }

            segment.div.style.left = segment.x*this.segmentWidth;
            segment.div.style.top = segment.y*this.segmentHeight;
        }

        this.updateField();
    }

    updateField(){
        for(let y = 0; y < this.rowsCount; y++){
            for(let x = 0; x < this.columnsCount; x++){
                this.field[y][x].busy = false;
            }
        }

        let currentSegments = this.div.getElementsByTagName('div');

        for(let i = 0; i < currentSegments.length; i++){
            let curDiv = currentSegments[i];

            let curY = curDiv.clientHeight / this.segmentHeight;
            let curX = curDiv.clientWidth / this.segmentWidth;

            this.field[curY][curX].busy = true;
        }
    }
}