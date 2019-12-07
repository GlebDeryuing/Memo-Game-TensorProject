(function(){
    document.addEventListener("DOMContentLoaded", function(){
        let playingCards = [];

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
        for (let i = 0; i < 4; i++){
            playingCards[i] = [];
        }
        for (let i = 0; i < 2; i++){
            for (let j = 0; j < 4; j++){
                playingCards[i][j] = randomiser(0, 49);
            }
        }

        for (let i = 2; i < 4; i++){
            for (let j = 0; j < 4; j++){
                playingCards[i][j] = playingCards[i - 2][j];
            }
        }

        playingCards = shuffleForMatrix(playingCards);
        console.log(playingCards)
    })
})()