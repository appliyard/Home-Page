document.getElementById(loc[0]).focus();
Basis = new Basis();
function loadLine() {
    var input = document.getElementById(loc[0]);
    var countL = Basis.getPositionsWords(input.value, "\n");
    Line = new Line(input, countL);
}
function moveText(direction) {
    var input = document.getElementById(loc[0]);
    var countL = Basis.getPositionsWords(input.value, "\n");
    Line.moveText(input, direction);
    refreshPosition();
}
document.getElementById(loc[0]).onkeydown = function(event) {
    if(event.keyCode == 9) {
        var input = document.getElementById(loc[0]);
        var i; var tabs = "";
        for(i = 1; Line.numberTabs >= i; i++) {
            tabs += " ";
        }
        var retroInput = input.value.substr(0, input.selectionStart);
        var posCurr = input.selectionStart;
        var modernInput = input.value.substr(input.selectionStart, input.value.length - 1);
        var tabbedInput = retroInput + tabs + modernInput;
        input.value = tabbedInput;
        input.setSelectionRange(posCurr + Line.numberTabs, posCurr + Line.numberTabs)
        return false;
    } else if(event.keyCode == 8) {
        var input = document.getElementById(loc[0]);
        var countL = Basis.getPositionsWords(input.value, "\n");
        countL.unshift(-1);
        var i; var lineStart = 0;
        for(i = 1; countL.length > i; i++) {
            if(countL[i] < input.selectionStart) {
                lineStart = countL[i] + 1;
            }
        }
        var isAllSpace = true; var numberSpaces = 0; var posCurr = input.selectionStart;
        if(input.value.substring(lineStart, input.selectionStart).length != 0) {
            for(i = 0; input.value.substring(lineStart, input.selectionStart).length > i; i++) {
                
                if(input.value.substring(lineStart, input.selectionStart)[i] != " ") {
                    isAllSpace = false;
                } else {
                    numberSpaces++;
                }
            }
        } else {
            isAllSpace = false;
        } 
        var spaces = " ".repeat(Line.numberTabs);  var numbertabs = 0;
        for(i = 1; Line.numberTabs * i <= numberSpaces; i++) {
            numbertabs++;
        }
        if(numbertabs - 1 >= 0) {
            spaces = spaces.repeat(numbertabs - 1);
        }
        if(isAllSpace) {
            var modernStr = input.value.substring(input.selectionStart, input.value.length);
            input.value = input.value.substr(0, lineStart) + spaces + modernStr;
            input.setSelectionRange(lineStart + spaces.length, lineStart + spaces.length);
            
            var bool = true;
            Line.refreshDuringElimination(bool);
            Line.refreshOldText();
            return false;
        } else {
            var bool = true;
            Line.refreshDuringElimination(bool);
            return true;
        }
    } else if(event.keyCode == 46) {
        var bool = true;
        Line.refreshDuringElimination(bool);
    } else {
        var bool = false;
        Line.refreshDuringElimination(bool);
    }
}
function manualMove_1() {
    var en_string = "input position on the right side of 'count:' in left textarea and press 'move'";
    var jp_string = "移動先の文字数をcount:の右に記入してください";
    alert(en_string);
}
function manualMove_2() {
    var en_string = "input a line on the right side of 'lines:' in left textarea and add number on the right of 'count:' then, press 'move'";
    var en_string = "input a line on the right side of 'lines:' in left textarea and add number on the right of 'count:' then, press 'move'";
    alert(en_string);
}
function refreshPosition() {
    var input = document.getElementById(loc[0]);
    var countL = Basis.getPositionsWords(input.value.substr(0, input.selectionStart), "\n");
    Line.refreshPos(input, countL);
    var strShowing = "count:" + Line.posCurr + ";" + " " + "lines:" + Line.getPosLeftNumber(countL) + ";";
    document.getElementById(loc[3]).value = strShowing;
    countL = Basis.getPositionsWords(input.value, "\n");
    Line.refresh(input, countL);
    strShowing = ("count:" + Line.lengthInput + ";"  + " " + "lines:" + (countL.length + 1) + ";"); 
    document.getElementById(loc[1]).value = Line.getLeftNumbers(); 
    document.getElementById(loc[2]).value = strShowing;
}

function ref(){autoComplete();refreshPosition();Line.refreshOldText();autoIndent();}
function movePosition() {
    var input = document.getElementById(loc[0]);
    var input_3 = document.getElementById(loc[3]);
    var cStart = input_3.value.search("count:") + 6;
    var cFinish = input_3.value.substr(cStart).search(";");
    var lStart = input_3.value.search("lines:") + 6;
    var lFinish = input_3.value.substr(lStart).search(";");
    var countStr = input_3.value.substr(cStart, cFinish);
    var lineStr = input_3.value.substr(lStart, lFinish);
    var countL = Basis.getPositionsWords(input.value, "\n");
    var countUserL = countL;    //??? reference??
    var i;
    for(i = 0; countUserL.length > i; i++) {
        if(i != 0) {
            countUserL[i] -= i;
        }
    }
    var sysLine = 1;
    countL = Basis.getPositionsWords(input.value, "\n");
    for(i = 0; countL.length > i; i++) {
        if(countL[i] < Line.posSelection) {
            sysLine++;
        }
    }
    var i; var kindofnumber = ["", " ", "\\"]; isCountValid = false;
    if(lineStr == sysLine) {
        for(i = 0; i != countStr.length; i++) { //
            if(false == isNaN(countStr[i]) && (Basis.isTrueEach(countStr[i], kindofnumber, false))) {
                isCountValid = true;
            } else {
                isCountValid = false;
            }
        }
        var sysCountStr = countStr;
        for(i = 0; countUserL.length > i; i++) {
            if(countUserL[i] < countStr) {
                sysCountStr++;
            }
        }
        countStr--;
    } else {
        for(i = 0; i != lineStr.length; i++) { 
            if(false == isNaN(lineStr[i]) && (Basis.isTrueEach(lineStr[i], kindofnumber, false))) {
                isCountValid = true;
            }
        }

        countL.unshift(-1); 
        var sysCountStr = (countL[lineStr - 1] + 1);
        var NoNCount = 0; 
        if(input.value.length >= parseInt(sysCountStr) + parseInt(countStr)) {
            for(i = 0; countStr > i; i++) {
                if(input.value[sysCountStr + i]  != "\n") {
                    NoNCount += 1;
                } else {
                    NoNCount += 2;
                }
                
            }
        }
        
        sysCountStr += NoNCount;
    }
    console.log(sysCountStr);
    if(isCountValid) {
        input.focus();
        input.setSelectionRange(sysCountStr, sysCountStr);
    }
}
var compPos = -1;
function autoComplete() {
    var input = document.getElementById(loc[0]);
    var countL = Basis.getPositionsWords(input.value, "\n");
    var strAdded = input.value.substr(input.selectionStart - 1, 1);
    var kindOfPunctuations = [
        "{", "(", "'", '"', "["
    ]; 
    var kindOfPunctuations_r = [
        "}", ")", "'", '"', "]"
    ];
    if((Basis.getPositionsArray(kindOfPunctuations, strAdded).length != 0) && (!Line.isDuringElimination) && ((compPos == -1 ) || (input.selectionStart != compPos)))  {
        compPos = input.selectionStart;
        var retroInput = input.value.substr(0, input.selectionStart);
        var posCurr = input.selectionStart;
        var modernInput = input.value.substr(input.selectionStart, input.value.length - 1);
        input.value = retroInput + kindOfPunctuations_r[Basis.getPositionsArray(kindOfPunctuations, strAdded)] + modernInput;
        input.focus();
        input.setSelectionRange(posCurr, posCurr);
    } else {
        if((input.value[input.selectionStart -1] == "\n") && (Basis.getPositionsArray(kindOfPunctuations, input.value[input.selectionStart -2]).length != 0)) {
            countL.unshift(-1);
            var i; var lineStart;
            for(i = 1; countL.length > i; i++) {
                if(countL[i] < input.selectionStart) {
                    lineStart = countL[i] + 1;
                }
            }
            var isAllSpace = true; var numberSpaces = 0;
            if(input.value.substr(lineStart, input.selectionStart).length != 0) {
                for(i = 0; input.value.substr(lineStart, input.selectionStart).length > i; i++) {
                    if(input.value.substr(lineStart, input.selectionStart)[i] != " ") {
                        isAllSpace = false;
                    } else {
                        numberSpaces++;
                    }
                }
            } else {
                isAllSpace = false;
            }
            var spaces = " ".repeat(Line.numberTabs); 
            spaces = spaces.repeat(Math.floor(numberSpaces / Line.numberTabs));
        } 
        compPos = -1;
    }//*/
}
function save() {
    if(document.getElementById(loc[5]).value.length != 0) {
        saveT(document.getElementById(loc[5]).value, document.getElementById(loc[0]).value);
    } else
    {
        saveT("filename.txt", document.getElementById(loc[0]).value);
    }
}
function saveT(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename); 
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); 
    document.body.removeChild(element); 
}
function autoIndent() {
    var input = document.getElementById(loc[0]);
    var countL = Basis.getPositionsWords(input.value, "\n");
    countL.unshift(-1);
    var i; var lineNow = 1;
    for(i = 1; countL.length > i; i++) {
        if(countL[i] < input.selectionStart) {
            lineNow++;
        }
    }
    if((lineNow >= 1) && (lineNow != Line.TempLeftNumber)) {
        var lengthLine = 0;
        lengthLine = countL[lineNow - 1] - countL[lineNow - 2] - 1;
        var lengthSpace = 0;
        for(i = 0; lengthLine > i; i++) {
            if(input.value[countL[lineNow - 2] + i + 1] == " ") {
                lengthSpace++;
            } else {
                i = lengthLine;
            }
        }
        var spaces = "";
        if((lengthSpace >= 0) && (!Line.isDuringElimination)) {
            if(input.selectionStart == 1 + countL[lineNow - 1]) {                            
                for(i = 0; lengthSpace != i; i++) {
                    spaces += " ";
                }
                if(input.value.substr(input.selectionStart, 1) != "\n") {
                    var posPanctuation = input.selectionStart + lengthSpace + Line.numberTabs;
                    var strretro = input.value.substr(0, input.selectionStart);
                    var strModern = input.value.substr(input.selectionStart, input.value.length);
                    var posCurr = input.selectionStart;
                    var kindOfPunctuations_r = [
                        "}", ")", "'", '"', "]"
                    ];
                    try {
                        var punctuation = Basis.getPositionsArray(kindOfPunctuations_r, strModern.substr(0, 1));
                        if(punctuation.length != 0) {
                            input.value = strretro + spaces + " ".repeat(Line.numberTabs) + "\n" + spaces + strModern;
                            countL = Basis.getPositionsWords(input.value, "\n");
                            countL.unshift(-1);
                            input.setSelectionRange((countL[lineNow]), (countL[lineNow]));
                        } else {
                            input.value = strretro + spaces + strModern;
                            
                        }
                        Line.refreshOldText();
                    }
                    catch(err) {
                        alert(err.message);
                    }
                    
                } else {
                    var strretro = input.value.substr(0, input.selectionStart);
                    var strModern = input.value.substr(input.selectionStart, input.value.length);
                    var posCurr = input.selectionStart;
                    input.value = strretro + spaces + strModern;
                    input.setSelectionRange(posCurr + spaces.length, posCurr + spaces.length);
                }
            }
        }
        
    }
    Line.refreshTempLeftNumber(lineNow);   
}
function getNumberTabs() {
    var input_4 = document.getElementById(loc[4]); var kindofnumber = ["", " ", "\\"];
    var isNumberTabsValid = false;
    var tabSizesStart = input_4.value.search("tab sizes:") + 10;
    var tabSizesFinish = input_4.value.substr(tabSizesStart).search(";");
    var tabSizes = input_4.value.substr(tabSizesStart, tabSizesFinish);
    for(i = 0; tabSizes.length > i; i++) {
        if((false == isNaN(tabSizes)) && (Basis.isTrueEach(tabSizes[i], kindofnumber, false))) {
            isNumberTabsValid = true;
        } else {
            isNumberTabsValid = false;
        }
    }
    Line.refreshNumberTabs(tabSizes);
}
document.getElementById(loc[6]).addEventListener("change", function () {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        // 8ビット符号なし整数値配列と見なす
        var array = new Uint8Array(e.target.result);
    
        // 文字コードを取得
        switch (Encoding.detect(array)) {
        case 'UTF16':
            // 16ビット符号なし整数値配列と見なす
            array = new Uint16Array(e.target.result);
            break;
        case 'UTF32':
            // 32ビット符号なし整数値配列と見なす
            array = new Uint32Array(e.target.result);
            break;
        }
    
        // Unicodeの数値配列に変換
        var unicodeArray = Encoding.convert(array, 'UNICODE');
        // Unicodeの数値配列を文字列に変換
        var text = Encoding.codeToString(unicodeArray);
    
        //console.log(text); // 結果
        document.getElementById(loc[0]).value = text;
    }
    reader.readAsArrayBuffer(file);
});
document.getElementById(loc[0]).addEventListener("change", function(){refreshPosition()});
document.getElementById(loc[0]).addEventListener("keydown", function(){refreshPosition()});
document.getElementById(loc[0]).addEventListener("keyup", function(){refreshPosition()});
document.getElementById(loc[0]).addEventListener("click", function(){refreshPosition()});