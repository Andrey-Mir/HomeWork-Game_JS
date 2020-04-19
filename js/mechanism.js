var canvas1 = document.getElementById('canvas1');
var ctx = canvas1.getContext('2d');

var backgroundImg = new Image();
backgroundImg.src = "images/background.jpg";


// Paused 
function pause(){
    addEventListener()
}

window.onload = function(){
    document.getElementById('play-game').onclick = function(){
        playGame();
    };
     // Music game
    var musicGame = document.getElementById('play-game');
    musicGame.addEventListener('click',function(){
      document.getElementById('sound').play()
    });



    function playGame(){
        updateCanvas1();

        setInterval(    // Таймер который работает циклически за указанный промежуток времени
            function(){
                cheese.newProduct();
                cheese.createCheese();
            }, 2500);      
        
        setInterval( function(){
            var random = tom.displayRandomTom();
            tom.createTom(random[0], random[1]);
        }, 6000);
    }
};

var keysPressed = {
    top: false,
    bottom: false,
    right: false, 
    left: false   //left
};

var TOP_KEY = 38;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var BOTTOM_KEY = 40;
var  SPACE = 32;

document.onkeydown = function(event){
    event.preventDefault();
    switch (event.keyCode){
        case TOP_KEY:
        keysPressed.top = true;
        break;
        case BOTTOM_KEY:
        keysPressed.bottom = true;  //Поменять забыл при копировании свойства
        break;
        case RIGHT_KEY:
        keysPressed.right = true;
        break;
        case LEFT_KEY:
        keysPressed.left = true;
        break;
        case SPACE:
            alert('Игра приостановлена. Нажмите на пробел что бы продолжить');
            break;
    }
};

document.onkeyup = function(event){
    switch (event.keyCode){
        case TOP_KEY:
        keysPressed.top = false;
        break;
        case BOTTOM_KEY:
        keysPressed.bottom = false;//Поменять забыл при копировании свойства
        break;
        case RIGHT_KEY:
        keysPressed.right = false;
        break;
        case LEFT_KEY:
        keysPressed.left = false;
        break;
    }
};


function updateCanvas1(){
    Object.keys(keysPressed).forEach(function(edit){
        if(keysPressed[edit]){
            jerry.move(edit);
        }
    });


ctx.drawImage(backgroundImg, 0, 0);

ctx.fillText("Текущие баллы : " + jerry.pointCounter + 'очков', 700 , 20);


jerry.draw();
tom.draw();
tom.move(tom.tomArray);

cheese.draw();

if(jerry.isDead(tom.tomArray)){
    gameOver();
}

for(var i = 0; i < cheese.cheeseArr.length; i++){
    if(cheese.cheeseArr.length !== 0){
        if(jerry.eatCheese(cheese.cheeseArr) === true){
            if(cheese.cheeseArr[i].name === 'normal'){   //Тут тоже неправильно было написано cheese и Arr
                jerry.pointCounter += 50;
            } else if (cheese.cheeseArr[i].name === 'bad'){   //Тут тоже неправильно было написано cheese
                jerry.pointCounter += 100;
                jerry.speedX = 5;
                jerry.speedY = 5;
                setTimeout(function(){
                    jerry.speedX = 15;  //jerry был неправильно написан
                    jerry.speedY = 15;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   //Тут тоже неправильно было написано cheese
            );
        }
    }
}

requestAnimationFrame(updateCanvas1);


};


// Создание экзмепляров класса
var cheese = new ProductCheese();
var jerry = new Jerry();
var tom = new Tom();

//Record
function gameOver(){
    let record = localStorage.getItem('record');
    if(Number(record) <= jerry.pointCounter){
    localStorage.setItem('record', jerry.pointCounter);
    };
    
    cancelAnimationFrame(cheese);
    cancelAnimationFrame(jerry);
    cancelAnimationFrame(tom);

    ctx.clearRect(0, 0, canvas1.width, canvas1.width)
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas1.width, canvas1.width)
    ctx.fillStyle = 'black';

    ctx.fillText('Конец игры', canvas1.width / 2 - 200, canvas1.height / 2);
    ctx.fillText('Игрок Jerry набрал' + jerry.pointCounter, canvas1.width / 2 - 200, canvas1.height / 2 + 100);
    ctx.fillText('Record' + localStorage.getItem('record'), canvas1.width / 2 - 200, canvas1.height / 2 + 120);

    setInterval(function(){
        location.reload();
    }, 10000)

    jerry.pointCounter();
 
}



