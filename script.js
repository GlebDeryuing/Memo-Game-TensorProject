var memo,
    selectedId = -1,
    playingDivs = [];

document.addEventListener('DOMContentLoaded', function() {
    memo = document.body.querySelector('.memo');
    generator(36);
    memo.addEventListener('click', function(e) {
        var targ = e.target.nodeName === "DIV" ? e.target : e.target.parentNode;
        if (targ.id != "" && targ.className != "selected" && targ.className != "defeated" && targ.className != "memo") {
            targ.className = "selected";
            var img = document.createElement("img");
            img.src = "image/cards/" + targ.id + ".svg"; //id заменить на номер картинки
            targ.appendChild(img);
            if (selectedId === -1) {
                selectedId = playingDivs.indexOf(targ);
            } else {
                same = check(selectedId, playingDivs.indexOf(targ));
                lastTarg = playingDivs[selectedId];
                selectedId = -1;
                setTimeout(() => {
                    if (same) {
                        targ.className = "defeated";
                        lastTarg.className = "defeated";
                    } else {
                        targ.className = "";
                        targ.innerHTML = "";
                        lastTarg.className = "";
                        lastTarg.innerHTML = "";
                    }
                }, 300);

            }
        } else if (targ.className === "selected") {
            targ.className = "";
            targ.innerHTML = "";
            selectedId = -1;
        }
    });
});

var playingCards = [],
    freeCounter = 0;

function objectCreation(value) {
    var newobj = {
        value: value,
        passed: false
    }
    return newobj;

}

function generator(count) {
    playingCards = [];
    playingDivs = [];
    freeCounter = count;
    for (let index = 0; index < count / 2; index++) {
        playingCards.push(objectCreation(index));
        playingCards.push(objectCreation(index));
    }
    for (let index = 0; index < playingCards.length; index++) {
        var tempObj = playingCards[index],
            newRandom = Math.floor(Math.random() * (count - 1));
        playingCards[index] = playingCards[newRandom];
        playingCards[newRandom] = tempObj;
    }
    memo.innerHTML = '';
    for (let index = 0; index < playingCards.length; index++) {
        var field = document.createElement('div');
        field.className = "";
        field.id = playingCards[index].value;
        playingDivs.push(field);
        memo.appendChild(field);
    }
    resize();

}

function check(a, b) { // index, потом див
    var first = playingCards[a],
        second = playingCards[b];
    if (!first.passed && !second.passed && first.value === second.value) {
        freeCounter -= 2;
        first.passed = true;
        second.passed = true;
        if (freeCounter === 0) {
            console.log('win')
        }
        return true;
    } else return false;
}

function resize() {
    var blocks = memo.children,
        size = 100 / Math.ceil(Math.sqrt(blocks.length));
    for (let index = 0; index < blocks.length; index++) {
        blocks[index].style.height = "calc(" + size + "% - 8px)";
        blocks[index].style.width = "calc(" + size + "% - 8px)";
    };
}