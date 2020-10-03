import getRandomIntInclusive from './Math';

export default class GameField extends EventTarget{
    constructor(columnsCount, rowsCount, visibleSegmentsOnWidthCount, visibleSegmentsOnHeightCount){
        super();

        this.segmentWidth = 20;
        this.segmentHeight = 20;
        this.minSegmentCountToEdge = 4;
        this._visibleArea = {
            x : 0,
            y : 0,
            minX : 0,
            maxX : 0,
            minY : 0,
            maxY : 0
        }

        this.visibleSegmentsOnHeightCount = visibleSegmentsOnHeightCount;
        this.visibleSegmentsOnWidthCount = visibleSegmentsOnWidthCount;

        this.viewPortDiv = document.getElementById('game-field');
        this.viewPortDiv.style.width = this.segmentWidth*visibleSegmentsOnWidthCount;
        this.viewPortDiv.style.height = this.segmentHeight*visibleSegmentsOnHeightCount;
        this.viewPortDiv.style.overflow = 'hidden';

        this.arrows = {
            up:     document.getElementById('arrow-up'),
            down:   document.getElementById('arrow-down'),
            left:   document.getElementById('arrow-left'),
            right:  document.getElementById('arrow-right'),
        }

        let fieldDiv = document.createElement('div');
        fieldDiv.style.position = 'relative';
        fieldDiv.style.border = '1px solid rgb(0, 224, 0)';
        fieldDiv.style.boxShadow = '0 0 10px rgb(0, 224, 0)';
        fieldDiv.style.webkitBoxShadow = '0 0 10px rgb(0, 224, 0)';
        fieldDiv.style['-webkit-transition'] = 'all 0.2s ease-out';
        this.viewPortDiv.append(fieldDiv);

        this.fieldDiv = fieldDiv;

        this.fieldDiv.style.width = columnsCount*this.segmentWidth;
        this.fieldDiv.style.height = rowsCount*this.segmentHeight;

        this.field = new Array(rowsCount);
        for(let y = 0; y < rowsCount; y++){
            this.field[y] = new Array(columnsCount);

            for(let x = 0; x < columnsCount; x++){
                this.field[y][x] = {busy : false};
            }
        }

        this.setupViewPortPosition();
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

    showArrows(){
        if(this.fieldDiv.clientWidth + Number(this.fieldDiv.style.left.replace('px', '')) > this.viewPortDiv.clientWidth){
            this.arrows.right.style.opacity = 0.5;
        } else {
            this.arrows.right.style.opacity = 0.0;
        }

        if(Number(this.fieldDiv.style.left.replace('px', '')) < 0){
            this.arrows.left.style.opacity = 0.5;
        } else {
            this.arrows.left.style.opacity = 0.0;
        }
        
        if(this.fieldDiv.clientHeight + Number(this.fieldDiv.style.top.replace('px', '')) > this.viewPortDiv.clientHeight){
            this.arrows.down.style.opacity = 0.5;
        } else {
            this.arrows.down.style.opacity = 0.0;
        }

        if(Number(this.fieldDiv.style.top.replace('px', '')) < 0){
            this.arrows.up.style.opacity = 0.5;
        } else {
            this.arrows.up.style.opacity = 0.0;
        }
    }

    setupViewPortPosition(){
        this.moveViewPort(0, 0);
    }

    moveViewPort(x, y){
        this.resetVisibleArea(x, y);

        this.fieldDiv.style.left = -x * this.segmentWidth;
        this.fieldDiv.style.top = -y * this.segmentHeight;

        this.showArrows();
    }

    resetVisibleArea(x, y){
        this._visibleArea.x = x;
        this._visibleArea.y = y;
        this._visibleArea.minX = this._visibleArea.x + 4;
        this._visibleArea.maxX = this._visibleArea.x + (this.visibleSegmentsOnWidthCount - 1) - 4;
        this._visibleArea.minY = this._visibleArea.y + 4;
        this._visibleArea.maxY = this._visibleArea.y + (this.visibleSegmentsOnHeightCount - 1) - 4;

        this.dispatchEvent(new Event('ChangeVisibleArea'));
    }

    needViewPortRemoving(Coord){
        let minX = this._visibleArea.minX;
        let maxX = this._visibleArea.maxX;
        let minY = this._visibleArea.minY;
        let maxY = this._visibleArea.maxY;

        return Coord.x < minX || Coord.x > maxX || Coord.y < minY || Coord.y > maxY;
    }

    moveViewPortOnStep(event){
        let head = event.detail[0]; 

        if(this.needViewPortRemoving(head)){
            let hx = head.x;
            let hy = head.y;
            let minX = this._visibleArea.minX;
            let minY = this._visibleArea.minY;
            let maxX = this._visibleArea.maxX;
            let maxY = this._visibleArea.maxY;
            let minSCRE = this.minSegmentCountToEdge;
            let vSOWC = this.visibleSegmentsOnWidthCount;
            let vSOHC = this.visibleSegmentsOnHeightCount;

            let x = this._visibleArea.x;
            let y = this._visibleArea.y;
            
            x = hx > maxX ? hx + minSCRE - (vSOWC - 1) : x;            
            x = hx < minX ? hx - minSCRE : x;            
            y = hy > maxY ? hy + minSCRE - (vSOHC - 1) : y;
            y = hy < minY ? hy - minSCRE : y;

            this.moveViewPort(x, y);
        }
    }

    getFreeCell(){
        let freeCell = {x: getRandomIntInclusive(0, this.columnsCount - 1), y: getRandomIntInclusive(0, this.rowsCount - 1)};

        while(true){
            if(this.isFreeCell(freeCell)){
                break;
            } else {
                freeCell = {x: getRandomIntInclusive(0, this.columnsCount - 1), y: getRandomIntInclusive(0, this.rowsCount - 1)};
            }
        }

        return freeCell;
    }

    gitVisibleSegments(){

    }
}