import Mathematic from './Mathematic'

function matrix(columnCount, rowsCount, defaultValue) {
    let r = new Array(rowsCount);

    for(let y = 0; y < rowsCount; y++){
        let rr = new Array(columnCount);

        for(let x = 0; x < columnCount; x++){
            rr[x] = defaultValue;
        }

        r[y] = rr;
    }

    return r;
}

export default class GameField{
    constructor(columnsCount, rowsCount){
        this._field = matrix(columnsCount, rowsCount, true);

        this._freeCells = new Array();
    }

    get columnsCount(){
        return this._field[0].length;
    }

    get rowsCount(){
        return this._field.length;
    }

    takeСell(cell){
        this._field[cell.y][cell.x] = false;

        this._searchFreeCell();
    }

    isFreeCell(segment){
        return this._field[segment.y][segment.x];
    }

    getFreeCell(){
        return this._freeCells[Mathematic.random(0, this._freeCells.length - 1)];
    }

    refresh(segments, cleanBefore = false){
        if(cleanBefore){
            this._clean();
        }

        for(let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++){
            let segment = segments[segmentIndex];

            this._field[segment.y][segment.x] = false;
        }

        this._searchFreeCell();
    }

    _clean(){
        for(let y = 0; y < this._field.length; y++){
            for(let x = 0; x < this._field[y].length; x++){
                this._field[y][x] = true;
            }
        }

        this._freeCells = new Array();
    }

    _searchFreeCell(){
        this._freeCells = new Array();

        for(let y = 0; y < this.rowsCount; y++){
            for(let x = 0; x < this.columnsCount; x++){
                if(this._field[y][x]){
                    this._freeCells.push({x : x, y : y});
                }
            }
        }
    }
}