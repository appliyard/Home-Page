class Basis {
    getPositionsWords(str, word) {
        var i;
        var countPosition = [];
        for(i = 0; str.length != i; i++) {
            if(word[0] == str[i]) {
                var i_1;
                var f = true;
                for(i_1 = 0; i_1 != word.length; i_1++) {
                    if(word[i_1] != str[i + i_1]) {
                        f = false;
                    }
                }
                if(f) {
                    countPosition.push(i);
                }
            }
        }
        return countPosition;
    }
    getPositionsArray(array, element) {
        var i;
        var countPosition = [];
        for(i = 0; array.length != i; i++) {
            if(array[i] == element) {
                countPosition.push(i);
            }
        }
        return countPosition;
    }
    isTrueEach(target, array, isTrue) {
        var varBool = 0;
        function compare(x) {
            if(isTrue) {
                if(x == target) {
                } else {
                    varBool++;
                }
            } else {
                if(x != target) {
                } else {
                    varBool++;
                }
            }
        }
        array.forEach(compare);
        //*/
        isTrue = true;
        if(varBool == 0) {
            isTrue = true;
        } else {
            isTrue = false;
        }
        return isTrue;
    }
    getNumberedString(str, word) {
        var i; var i_1; var i_2; var numberedString = ""; var posI; var positionWord = this.getPositionsWords(str, word); //alert(positionWord.toString());
        for(i = 0; str.length > i; i++) {
            posI = positionWord.indexOf(i); alert(posI); ///*
            if(posI != -1) {
                for(i_1 = 0; word.length != i_1; i_1++) {
                    numberedString += (positionWord[posI] + i_1).toString();
                    i++;
                }
            } else {
                numberedString += str[i];
            }
        }
        return numberedString;
    }
}