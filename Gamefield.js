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

        this.arrows = {
            up:     document.getElementById('arrow-up'),
            down:   document.getElementById('arrow-down'),
            left:   document.getElementById('arrow-left'),
            right:  document.getElementById('arrow-right'),
        }

        let fieldDiv = document.createElement('div');
        fieldDiv.style.position = 'relative';
        fieldDiv.style.border = '1px solid rgb(0, 160, 192)';
        fieldDiv.style['-webkit-transition'] = 'all 0.2s ease-out';
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
        if(this.viewPortDiv.style.width == this.fieldDiv.style.width && this.viewPortDiv.style.height == this.fieldDiv.style.height){
            return;
        }

        this.fieldDiv.style.left = (this.viewPortDiv.clientWidth - this.fieldDiv.clientWidth)/2;
        this.fieldDiv.style.top = (this.viewPortDiv.clientHeight - this.fieldDiv.clientHeight)/2;

        this.showArrows();
    }

    moveViewPort(x, y){
        if(this.viewPortDiv.style.width == this.fieldDiv.style.width && this.viewPortDiv.style.height == this.fieldDiv.style.height){
            return;
        }
        
        if(this.viewPortDiv.clientWidth >= this.fieldDiv.clientWidth){
            this.fieldDiv.style.left = (this.viewPortDiv.clientWidth - this.fieldDiv.clientWidth)/2;
        }
        
        if(this.viewPortDiv.clientHeight >= this.fieldDiv.clientHeight){
            this.fieldDiv.style.top = (this.viewPortDiv.clientHeight - this.fieldDiv.clientHeight)/2;
        }

        
    }

    moveViewPortOnStep(event){
        let body = event.detail; 
        let headDiv = body[0].div;

        let fieldCoord = {
            left : Number(this.fieldDiv.style.left.replace('px', '')),
            top : Number(this.fieldDiv.style.top.replace('px', '')),
            width : this.fieldDiv.clientWidth,
            height : this.fieldDiv.clientHeight,
        }
        
        let headCoord = {
            left : Number(headDiv.style.left.replace('px', '')),
            top : Number(headDiv.style.top.replace('px', '')),
            width : headDiv.clientWidth,
            height : headDiv.clientHeight,
        }        
        
        let vpCoord = {
            left : Number(this.viewPortDiv.style.left.replace('px', '')),
            top : Number(this.viewPortDiv.style.top.replace('px', '')),
            width : this.viewPortDiv.clientWidth,
            height : this.viewPortDiv.clientHeight,
        }

        if(headCoord.left + fieldCoord.left < this.segmentWidth*2){
            this.fieldDiv.style.left = fieldCoord.left + this.segmentWidth*2 - (headCoord.left + fieldCoord.left);
        }

        if(vpCoord.width - ((headCoord.left + fieldCoord.left) + headCoord.width) < this.segmentWidth*2){
            this.fieldDiv.style.left = vpCoord.width - this.segmentWidth*2 - headCoord.left - headCoord.width;
        }

        if(headCoord.top + fieldCoord.top < this.segmentHeight*2){
            this.fieldDiv.style.top = fieldCoord.top + this.segmentHeight*2 - (headCoord.top + fieldCoord.top);
        }

        if(vpCoord.height - ((headCoord.top + fieldCoord.top) + headCoord.height) < this.segmentHeight*2){
            this.fieldDiv.style.top = vpCoord.height - this.segmentHeight*2 - headCoord.top - headCoord.height;
        }

        this.showArrows();
    }
    
}