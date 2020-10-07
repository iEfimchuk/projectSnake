class Parameter{
    constructor(name, type, defaultValue, variants){
        this.name = name;
        this.type = type;
        this._value = defaultValue;
        this.variants = variants;
    }

    set value(newValue){
        if(this.variants.length){
            let values = this.variants.map(element => element.value);

            if(values.indexOf() != -1){
                this._value = newValue;
            }
        } else {
            this._value = newValue;
        }
    }

    get value(){
        return this._value;
    }
}

class Settings extends EventTarget{
    constructor(){
        super();

        this.div = document.getElementById('settings');

        this.parameters = new Array();

        this.divs = new Array();

        this.currentParameterIndex = 0;
    }

    addParameter(name, type, defaultValue, variants){
        this.parameters.push(new Parameter(name, type, defaultValue, variants));
    }

    showSettings(){}
}