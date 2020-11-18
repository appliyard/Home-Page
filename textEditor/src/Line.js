class Line {
    constructor(input, countL) {
        this.input = input;
        this.posCurr = input.selectionStart;
        this.posSelection = input.selectionStart;
        this.inputValue = input.value;
        this.lengthInput = (input.value.length - countL.length);
        this.linesInput = input.value.split("\n");
        this.numberLines = input.value.split("\n").length;
        this.numberTabs = 4;
        this.TempLeftNumber = 1;
        this.isDuringElimination = false;
        this.oldText = [""];
        this.posCurrText = 0;
    } 
    refreshOldText() {
        this.oldText.push(this.input.value);
        if(this.posCurrText == 100) {
            this.oldText.shift();
        } else {
            this.posCurrText++;
        }
    }
    moveText(input, direction) {
        if(direction == "redo") {
            if(this.oldText.length > this.posCurrText + 1) {
                this.input.value = this.oldText[++this.posCurrText];
            }
        } else if(direction == "undo") {
            if(0 <= this.posCurrText - 1) {
                this.input.value = this.oldText[--this.posCurrText];
            }
        }
    }
    refreshDuringElimination(bool) {
        this.isDuringElimination = bool;
    }
    refresh(input, countL) {
        this.input = input;
        this.inputValue = input.value;
        this.lengthInput = (input.value.length - countL.length);
        this.linesInput = input.value.split("\n");
        this.numberLines = input.value.split("\n").length;
    }
    refreshPos(input, countL) {
        var inputVCurr = input.value.substr(0, input.selectionStart);
        var i;
        var numberN = 0;
        for(i = 0; countL.length != i; i++) {
            if(countL[i] <= inputVCurr.length) {
                numberN++;
            }
        }
        this.posCurr = (input.selectionStart - numberN);
        this.posSelection = input.selectionStart;
    }
    getLeftNumbers() {
        var lN = "";
        var i;
        for(i = 1; i <= this.numberLines; i++) {
            if(i != this.numberLines) {
                lN += i;
                lN += "\n";
            } else {
                lN += i;
            }  
        }
        return lN;
    }
    getPosLeftNumber(countL) {
        var i;
        var numberN = 1;
        for(i = 0; countL.length != i; i++) {
           if(countL[i] <= this.input.selectionStart) {
               numberN++;
           }
           
        }
        return numberN;
    }
    refreshTempLeftNumber(lineNow) {
        this.TempLeftNumber = lineNow;
    }
    refreshNumberTabs(tabSizes) {
        this.numberTabs = tabSizes;
    }
}