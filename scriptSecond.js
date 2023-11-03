var places=[0,1,2,3,4,5,6,7,8];
var wins= [[0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]]
var divs = document.querySelectorAll(".place-game")
var id,box, taped=false;
var windowNewGame = document.getElementById('new-game-window');
var win=document.getElementById('win')
var lose=document.getElementById('lose')
var nobody=document.getElementById('nobody')
var emptyPlace=false;

function refreshPage() {
    // Перезагружаем страницу
    location.reload();
}

divs.forEach(function(div) {
    div.addEventListener('click',function addX(event){
        taped=false;
        id = event.target.id;
        console.log(id);
        box=document.getElementById(id)
        for(var o=0;o<places.length;o++){
            if(places[o]==id){
                places.splice(o,1)
                break;
            }
        }
        box.innerHTML='<p>X</p>'
        

        for(var i=0;i<8;i++){
            var countX=0;
            for(var p=0;p<3;p++){

                if(id==wins[i][p]){
                    wins[i][p]='x';
                }
                if(wins[i][p]=='x'){
                    countX++;
                }
            }
            if(countX==3){
                windowNewGame.style.display='flex'
                win.style.display='flex'
                if(places.length==0){
                    taped=true;
                }
            }
        }
        //ищем победного хода
        for(var i=0;i<8;i++){
            var p;
            var countO=0;//
            for(p=0;p<3;p++){
                if(wins[i][p]=='o'){
                    countO++;
                }
            }
            if(countO==2){
                for(var findEmtpy=0; findEmtpy<3;findEmtpy++){
                    if(wins[i][findEmtpy]!='o'){
                        id=wins[i][findEmtpy]
                        document.getElementById(id).innerHTML='<p>O</p>';
                        windowNewGame.style.display='flex'
                        lose.style.display='flex'
                        taped=true;
                        break;
                    }
                }
            }
        }
//      В случае нет победного хода ищем опасного момента от пользователя
        for(var i=0;i<8;i++){
            var countX=0,p;
            var countO=0;
            for(p=0;p<3;p++){
                if(wins[i][p]=='x'){
                    countX++;
                }
            }
            if(countX==2){
                var thisPlace=false;
                for(p=0;p<3;p++){
                    if(wins[i][p]!='x'& wins[i][p]!='o'){
                        id=wins[i][p];
                        thisPlace=true;
                    }
                }
                if(thisPlace==true){
                    box=document.getElementById(id)
                    box.innerHTML='<p>O</p>';
                    taped=true;
                    for(var o=0;o<places.length;o++){
                        if(places[o]==id){
                            places.splice(o,1)
                        }
                    }
                    for(var i=0;i<8;i++){
                        var countO=0;
                        for(var p=0;p<3;p++){
                            if(id==wins[i][p]){
                                wins[i][p]='o';
                            }
                            if(wins[i][p]=='o'){
                                countO++;
                            }
                        }
                        if(countO==3){
                            windowNewGame.style.display='flex'
                            lose.style.display='flex'
                            break;
                        }
                    }
                    
                }
            }
        }
        if(taped==false){
            if(places.length==0){
                nobody.style.display='flex'
                windowNewGame.style.display='flex'
            }else {
                
                index=Math.floor(Math.random() * places.length);
                id=places[index];
                places.splice(index,1);
                document.getElementById(id).innerHTML='<p>O</p>';

                taped=true;
                for(var i=0;i<8;i++){
                    var countO=0;
                    for(var p=0;p<3;p++){
                        if(id==wins[i][p]){
                            wins[i][p]='o';
                        }
                        if(wins[i][p]=='o'){
                            countO++;
                        }
                    }
                    if(countO==3){
                        windowNewGame.style.display='flex'
                        lose.style.display='flex'
                        break;
                    }
                }
        }
        }
        console.log(places);
        console.log(wins)
    })
    
})