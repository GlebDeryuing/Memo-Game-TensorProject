(function(){
    var memo = document.querySelector('.memo');

    //Динамическое создание полей
    function createMemo(x,y){
        for (var i = 0; i < x; i++){
            for (var j = 0; j < y; j++)
            {
                var field = document.createElement('div');
                // field.className = "";
                field.id = `${i,j}`;
                memo.appendChild(field);
            }
        }
        //Расчёт размеров для полей
        var blocks = memo.children,
            size = 100 / Math.ceil(Math.sqrt(blocks.length));
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].style.height = "calc(" + size + "% - 8px)";
            blocks[index].style.width = "calc(" + size + "% - 8px)";
        };
    }

    function cleanerMemo(){
        while(memo.firstChild) memo.removeChild(memo.firstChild);
    }

    document.addEventListener("DOMContentLoaded", function(){
        //По умолчанию поле сделано 4*4
        createMemo(4,4);
        
        let 
        windowModal = document.querySelector('.modal'),
        level = document.querySelectorAll('.dif-level'),
        refresh = document.querySelector('.refresh'),
        settings = document.querySelector('.settings');

        //Обработка события клика по настройкам
        settings.addEventListener('click', ()=>
            {
                //Открытие модального окна с выборами уровня сложности
                windowModal.style.display = 'flex';
                document.querySelector('.modal-block').style.display = 'flex';
            }
        )
        
        //При клики на модальное окно, само окно и блоки внутри него становятся none
        windowModal.addEventListener('click', ()=>{
            windowModal.style.display = 'none';
            document.querySelector('.modal-block').style.display = 'none';
            document.querySelector('.modal-refresh').style.display = 'none'
        }, true)

        //Событие клика по кнопке с уровнем сложности
        level.forEach((e)=>
            e.addEventListener('click', ()=>
                {
                    if (e.id === 'plain'){
                        cleanerMemo();
                        createMemo(4,4);
                    }
                    else if (e.id === 'middle'){
                        cleanerMemo();
                        createMemo(5,5);
                    }
                    else if (e.id === 'complicated'){
                        cleanerMemo();
                        createMemo(6,6);
                    }
                    
                }
            )
        )

        //Кнопка перезапуска игры
        refresh.addEventListener('click', ()=>
            {
                //Появление модального окна с всплывающим блоком
                windowModal.style.display = 'flex';
                document.querySelector('.modal-refresh').style.display = 'flex';
            }
        )

        //Если при предложении перезапуска игры нажали "да",
        // то вызываем событие клика по настройкам с выбором уровня сложности
        var refreshButtons = document.querySelectorAll('.modal-refresh-content__btn');
        refreshButtons.forEach((e)=>{
            e.addEventListener('click', ()=>{
                    if(e.id === 'yes') settings.click()
                }
            )
        })
        // var linecount = 0;
        // var message = document.querySelector('.chat-send textarea');
        // message.addEventListener('keyup',()=>{
        //     var text = message.value;
        //     var cols = message.cols;
        //     linecount = Math.ceil( text.split(/\r|\r\n|\n/).length / cols );
        //     message.style.height = 30*linecount + 'px';
            
        // })
    
        // function scrollChatOnBottom() {
            var element = document.body.querySelector(".chat-body");
            element.scrollTop = element.scrollHeight;
        // }
    
        // база события клика
        document.querySelector('.memo').addEventListener('click', function(e) {
            var targ = e.target;
            if (targ.id != "" && targ.className != "selected" && targ.className != "defeated" && targ.className != "memo") {
                targ.className = "selected";
                var img = document.createElement("img");
                img.src = "image/cards/" + targ.id + ".svg"; //id заменить на номер картинки
                targ.appendChild(img);
            }
        });

        
        let 
        playingCards = [];
        //
        
        // function randomiser(min, max){
        //     let random = min + Math.random() * (max - min);
        //     return Math.round(random);
        // }
        
        // function shuffleForMatrix(matrix){
        //     for(let i = 0; i < 4; i++){
        //         for(let j = 0; j < 4; j++){
        //             let key = Math.floor(Math.random() * (i + 1));
        //             let temporary = matrix[[i],[j]];
        //             matrix[[i],[j]] = matrix[[i],[key]];
        //             matrix[[i],[key]] = temporary;
        //         }
        //     }
        //     return matrix;
        // }
        // for (let i = 0; i < 4; i++){
        //     playingCards[i] = [];
        // }
        // for (let i = 0; i < 2; i++){
        //     for (let j = 0; j < 4; j++){
        //         playingCards[i][j] = randomiser(0, 49);
        //     }
        // }

        // for (let i = 2; i < 4; i++){
        //     for (let j = 0; j < 4; j++){
        //         playingCards[i][j] = playingCards[i - 2][j];
        //     }
        // }

        // playingCards = shuffleForMatrix(playingCards);
        // console.log(playingCards)
    })
})();