(function logic() {
    var memo,
        chat,
        selectedId = -1,
        playingDivs = [],
        canClick = true;

    document.addEventListener('DOMContentLoaded', function() {
        memo = document.body.querySelector('.memo');
        generator(4);
        memo.addEventListener('click', function(e) {
            var targ = e.target.nodeName === "DIV" ? e.target : e.target.parentNode;
            if (canClick && targ.className != "selected" && targ.className != "defeated" && targ.className != "memo" && targ.className != "setting") {
                targ.className = "selected";
                var img = document.createElement("img");
                img.src = "image/cards/" + playingCards[playingDivs.indexOf(targ)].value + ".svg";
                targ.appendChild(img);
                if (selectedId === -1) {
                    selectedId = playingDivs.indexOf(targ);
                } else {
                    same = check(selectedId, playingDivs.indexOf(targ));
                    lastTarg = playingDivs[selectedId];
                    selectedId = -1;
                    canClick = false;
                    setTimeout(() => {
                        if (same) {
                            targ.className = "defeated";
                            targ.firstChild.style.opacity = 0.7;
                            lastTarg.className = "defeated";
                            lastTarg.firstChild.style.opacity = 0.7;
                        } else {
                            targ.className = "";
                            targ.innerHTML = "";
                            lastTarg.className = "";
                            lastTarg.innerHTML = "";
                        }
                        canClick = true;
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
            playingDivs.push(field);
            memo.appendChild(field);
        }
        resize();

        // Создание окна меню без вложенных элементов
        // var menu = document.createElement('div');
        // menu.className = "setting";
        // memo.appendChild(menu);


    }

    function check(a, b) {
        var first = playingCards[a],
            second = playingCards[b];
        if (!first.passed && !second.passed && first.value === second.value) {
            freeCounter -= 2;
            first.passed = true;
            second.passed = true;
            if (freeCounter === 0) {
                // вывести победное окно
                setTimeout(() => {
                    generator(prompt("Победа! Новое поле:"));

                }, 600);
            }
            return true;
        } else return false;
    }

    function resize() {
        var blocks = memo.children,
            size = 100 / Math.ceil(Math.sqrt(blocks.length)),
            padd = window.innerWidth / 230;
        memo.style.padding = padd / 2 + "px";
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].style.margin = padd / 2 + "px";
            blocks[index].style.height = "calc(" + size + "% - " + padd + "px)";
            blocks[index].style.width = "calc(" + size + "% - " + padd + "px)";
        };
    }
}());