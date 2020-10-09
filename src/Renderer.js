import getRandomIntInclusive from './Mathematic';

export default class Renderer extends EventTarget{
    constructor(columnsCount, rowsCount, visibleAreaWidth, visibleAreaHeight, viewPortDiv){
        super();

        this._segmentWidth = 20;
        this._segmentHeight = 20;
        this._minSegmentCountToEdge = 4;
        this._visibleArea = { x : 0, y : 0, minX : 0, maxX : 0, minY : 0, maxY : 0 };

        this._visibleAreaWidth = visibleAreaWidth;
        this._visibleAreaHeight = visibleAreaHeight;

        this._viewPortDiv = viewPortDiv;

        let au = document.createElement('div');
        au.id = 'arrow-up';
        au.classList.add('arrow');
        let ad = document.createElement('div');
        ad.id = 'arrow-down';
        ad.classList.add('arrow');
        let al = document.createElement('div');
        al.id = 'arrow-left';
        al.classList.add('arrow');
        let ar = document.createElement('div');
        ar.id = 'arrow-right';
        ar.classList.add('arrow');
        
        this._viewPortDiv.appendChild(au);
        this._viewPortDiv.appendChild(ad);
        this._viewPortDiv.appendChild(al);
        this._viewPortDiv.appendChild(ar);

        this._viewPortDiv.style.width = this._visibleAreaWidth;
        this._viewPortDiv.style.height = this._visibleAreaHeight;
        this._viewPortDiv.style.overflow = 'hidden';

        this._arrows = {
            up:     document.getElementById('arrow-up'),
            down:   document.getElementById('arrow-down'),
            left:   document.getElementById('arrow-left'),
            right:  document.getElementById('arrow-right'),
        }

        this._fieldDiv = document.createElement('div');
        this._fieldDiv.style.position = 'relative';
        this._fieldDiv.style.border = '1px solid rgb(0, 224, 0)';
        this._fieldDiv.style.boxShadow = '0 0 10px rgb(0, 224, 0)';
        this._fieldDiv.style.webkitBoxShadow = '0 0 10px rgb(0, 224, 0)';
        this._fieldDiv.style['-webkit-transition'] = 'all 0.2s ease-out';
        this._viewPortDiv.append(this._fieldDiv);

        this._fieldDiv.style.width = columnsCount*this._segmentWidth;
        this._fieldDiv.style.height = rowsCount*this._segmentHeight;

        this.setupViewPortPosition();
    }

    addSegment(event){
        let body = event.detail;

        for(let segmentIndex = 0; segmentIndex < body.length; segmentIndex++){
            let segment = body[segmentIndex]; 

            if(segment.div == null){
                let div = document.createElement('div');

                div.style.position = 'absolute';
                div.style.width = this._segmentWidth;
                div.style.height = this._segmentHeight;
                div.style.left = segment.x*this._segmentWidth;
                div.style.top = segment.y*this._segmentHeight;
                div.style.transformOrigin = 'center center';

                this._fieldDiv.append(div);

                segment.div = div;
            }
        }
    }

    refresh(segments, cleanBefore = false){
        if(cleanBefore){
            this._clean();
        }

        for(let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++){
            let segment = segments[segmentIndex];
            let div = segment.div;

            div.style.position = 'absolute';
            div.style.width = this._segmentWidth;
            div.style.height = this._segmentHeight;
            div.style.left = segment.x*this._segmentWidth;
            div.style.top = segment.y*this._segmentHeight;
            div.style.transformOrigin = 'center center';

            this._fieldDiv.appendChild(segment.div);
        }
    }

    _clean(){
        let childList = this._fieldDiv.childNodes;

        for(let i = 0; i < childList.length; i++){
            this._fieldDiv.removeChild(childList[i]);
        }
    }

    showArrows(){
        if(this._fieldDiv.clientWidth + Number(this._fieldDiv.style.left.replace('px', '')) > this._viewPortDiv.clientWidth){
            this._arrows.right.style.opacity = 0.5;
        } else {
            this._arrows.right.style.opacity = 0.0;
        }

        if(Number(this._fieldDiv.style.left.replace('px', '')) < 0){
            this._arrows.left.style.opacity = 0.5;
        } else {
            this._arrows.left.style.opacity = 0.0;
        }
        
        if(this._fieldDiv.clientHeight + Number(this._fieldDiv.style.top.replace('px', '')) > this._viewPortDiv.clientHeight){
            this._arrows.down.style.opacity = 0.5;
        } else {
            this._arrows.down.style.opacity = 0.0;
        }

        if(Number(this._fieldDiv.style.top.replace('px', '')) < 0){
            this._arrows.up.style.opacity = 0.5;
        } else {
            this._arrows.up.style.opacity = 0.0;
        }
    }

    setupViewPortPosition(){
        this.moveViewPort(0, 0);
    }

    moveViewPort(x, y){
        this.resetVisibleArea(x, y);

        this._fieldDiv.style.left = -x * this._segmentWidth;
        this._fieldDiv.style.top = -y * this._segmentHeight;

        this.showArrows();
    }

    resetVisibleArea(x, y){
        this._visibleArea.x = x;
        this._visibleArea.y = y;
        this._visibleArea.minX = this._visibleArea.x + 4;
        this._visibleArea.maxX = this._visibleArea.x + (this._visibleAreaWidth/this._segmentWidth - 1) - 4;
        this._visibleArea.minY = this._visibleArea.y + 4;
        this._visibleArea.maxY = this._visibleArea.y + (this._visibleAreaHeight/this._segmentHeight - 1) - 4;

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
            let minSCRE = this._minSegmentCountToEdge;
            let vSOWC = this._visibleAreaWidth/this._segmentWidth;
            let vSOHC = this._visibleAreaHeight/this._segmentHeight;

            let x = this._visibleArea.x;
            let y = this._visibleArea.y;
            
            x = hx > maxX ? hx + minSCRE - (vSOWC - 1) : x;            
            x = hx < minX ? hx - minSCRE : x;            
            y = hy > maxY ? hy + minSCRE - (vSOHC - 1) : y;
            y = hy < minY ? hy - minSCRE : y;

            this.moveViewPort(x, y);
        }
    }
}