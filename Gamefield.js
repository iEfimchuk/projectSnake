class Cell extends EventTarget{
    constructor(){
        super();
        this.busy = false;
    }
}

class GameField extends EventTarget{
    constructor(columnsCount, rowsCount, viewPortWidth, viewPortHeight){
        super();

        this.viewPortDiv = document.getElementById('game-field');
        this.viewPortDiv.style.width = viewPortWidth;
        this.viewPortDiv.style.height = viewPortHeight;
        this.viewPortDiv.style.overflow = 'hidden';

        let fieldDiv = document.createElement('div');
        fieldDiv.style.position = 'relative';
        this.viewPortDiv.append(fieldDiv);

        this.fieldDiv = fieldDiv;
        this.segmentWidth = 30;
        this.segmentHeight = 30;

        this.fieldDiv.style.width = columnsCount*this.segmentWidth;
        this.fieldDiv.style.height = rowsCount*this.segmentHeight;

        this.field = new Array(rowsCount);
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

                this.fieldDiv.append(div);

                segment.div = div;
            }
        }
    }

    freeSegments(event){
        let body = event.detail;

        for(let i = 0; i < body.length; i++){
            this.field[body[i].y][body[i].x].busy = false;
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

            this.field[segment.y][segment.x].busy = true;
        }
    }
}