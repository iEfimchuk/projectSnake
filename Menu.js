import Scene from './Scene';

export default class Menu extends Scene{
    constructor(name, display, choices){
        super(`menu-${name}`, display);

        // this._title = title;
        // this._subtitle = subtitle;
        this._choices = choices;

        let w = display.clientWidth;
        let h = display.clientHeight;

        this._screen.style.position = 'absolute';
        this._screen.style.width = w;
        this._screen.style.height = h;

        this._screen.innerHTML = 
                                `<div class="content" style="text-align: center">
                                    <div class="title" style="margin:0 0 20 0; font-size: 20px">MENU</div>
                                    <div class="subtitle" style="margin:10 0 10 0; font-size: 17px">This is menu</div>
                                    ${choices.map(function(element){return `<div class="${element.name} choice" style="padding: 5 0 5 0; font-size: 14px">${element.title}</div>`;}).join('')}
                                </div>`;

        let contentDiv = this._screen.getElementsByClassName('content')[0];
        contentDiv.style.marginTop = (this._screen.clientHeight - contentDiv.clientHeight)*0.5;
        contentDiv.style.width = this._screen.clientWidth*0.5;
        contentDiv.style.marginLeft = (this._screen.clientWidth - contentDiv.clientWidth)/2;

        this.choice = this._choices[0].name;
    }

    onKeyboardEvent(event){
        super.onKeyboardEvent(event);

        let key = event.detail.key;

        switch(key){
            case 'Up'   : this.changeChoice('Up'); break;
            case 'Down' : this.changeChoice('Down'); break;
            case 'Enter' : this.stop(); break;
        }
    }

    set choice(newValue){
        Array.from(this._screen.getElementsByClassName('choice')).forEach(function(element){
            element.style.color = 'white';
            element.style.backgroundColor = 'black';
        });

        this._screen.getElementsByClassName(newValue)[0].style.color = 'black';
        this._screen.getElementsByClassName(newValue)[0].style.backgroundColor = 'white';

        this._selectedChoiceName = newValue;
    }

    set title(newTitle){
        this._screen.getElementsByClassName('title')[0].innerHTML = newTitle;
    }
    
    set subtitle(newSubtitle){
        this._screen.getElementsByClassName('subtitle')[0].innerHTML = newSubtitle;
    }

    get choice(){
        return this._selectedChoiceName;
    }

    changeChoice(course){

        let currentChoiceIndex = this._choices.findIndex(function(element){return element.name == this}, this._selectedChoiceName);

        if(course == 'Up'){
            if(currentChoiceIndex == 0){
                this.choice = this._choices[this._choices.length - 1].name;
            } else {
                this.choice = this._choices[currentChoiceIndex - 1].name;
            }
        } else {
            if(currentChoiceIndex == this._choices.length - 1){
                this.choice = this._choices[0].name;
            } else {
                this.choice = this._choices[currentChoiceIndex + 1].name;
            }
        }
    }
}