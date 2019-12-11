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