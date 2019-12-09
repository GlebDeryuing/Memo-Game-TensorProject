(function(){
    document.addEventListener("DOMContentLoaded", function(){
        let playingCards = [];
        let valueToBeChecked;

        function randomiser(min, max){
            let random = min + Math.random() * (max - min);
            return Math.round(random);
        }   
        function shuffleForMatrix(matrix){
            for(let i = 0; i < 4; i++){
                for(let j = 0; j < 4; j++){
                    let key = Math.floor(Math.random() * (i + 1));
                    let temporary = matrix[[i],[j]];
                    matrix[[i],[j]] = matrix[[i],[key]];
                    matrix[[i],[key]] = temporary;
                }
            }
            return matrix;
        }
        function checkingForEquality(matrix, firstCard, secondCard){
            if (matrix[firstCard] === matrix[secondCard]) {
                return true
            } else {
                return false
            }
        }

        for (let i = 0; i < 4; i++){
            playingCards[i] = [];
        }
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++){
                valueToBeChecked = randomiser(0, 49);
                while (playingCards.indexOf(valueToBeChecked) != -1) {
                    valueToBeChecked = randomiser(0, 49);
                }
                playingCards[i][j] = valueToBeChecked;
            }
        }
        for (let i = 2; i < 4; i++){
            for (let j = 0; j < 4; j++){
                playingCards[i][j] = playingCards[i - 2][j];
            }
        }
        //максимально возможная перетасовка элементов
        for (let i = 0; i < 4; i++) {
            playingCards[i] = shuffleForMatrix(playingCards[i]);    
        }
        playingCards = shuffleForMatrix(playingCards);
        console.log(playingCards)
    })
})()
