var text = new PointText({
    point : new Point(view.center.x,15),
    justification : 'center',
    fontSize : 15,
    fillColor : "black",
    content : "PRESS F5 TO RESTART"
});
var maxPoint = new Point(view.size.width, view.size.height);

//The Ball 
var ball = new Raster('ball');
var ballspeed = 10;
var deg = (Math.PI)/180 ;
var xMove = 0;
var yMove = 0;
var direction = 1;
ball.position = view.center;
ball.scale(0.5);


//The Player
var player = new Raster('player');
var playerScore = new Raster('playerScore');
playerScore.position = view.center;
var playerMovingUp = false;
var playerMovingDown = false;
var playerScore = 0;
player.position.x = maxPoint.x -10;
player.position.y = view.center.y;
player.rotate(90)


//The IA
var ia = new Raster('ia');
var dist = 0;
var iaScore = 0;
ia.position.x = 10;
ia.position.y = view.center.y;
ia.rotate(90);


var playerSpeed = 8;
var distance = 0;
var norm = 0;

function onKeyDown(event) {
    
    if(event.key === "up"){
        
        playerMovingUp = true;
    }
    else if(event.key === "down"){
        playerMovingDown = true;
    }
}

function onKeyUp(event) {
    
    if(event.key === "up"){
        
        playerMovingUp = false;
    }
    else if(event.key === "down"){
        playerMovingDown = false
    }
}



function onFrame(event) {  
    // Player Moving 
    if(playerMovingUp){
        player.position.y -= playerSpeed;
        if(player.position.y <=89){
            player.position.y += playerSpeed;
        }
    }
    else if (playerMovingDown){
        player.position.y += playerSpeed;
         if(player.position.y >= maxPoint.y - 89){
             player.position.y -= playerSpeed;
         }
    }

    //IA Moving
    dist = - (ia.position.y - ball.position.y);
    ia.position.y += dist * 0.09;
    
        if(ia.position.y +89  >= maxPoint.y){
            ia.position.y = maxPoint.y - 89;
        }
        if(ia.position.y <= 89){
            ia.position.y = 89;
        }

    //Ball Moving
    ball.position.x += xMove;
    ball.position.y += yMove;
    ball.rotate(5*direction);
    xMove = ballspeed * Math.cos(deg);
    yMove = ballspeed * Math.sin(deg);
    
    //Wall Collision
    if(ball.position.y >= maxPoint.y - 20 || ball.position.y <= 20 ){
        ball.position.y -= yMove*2;
        deg = Math.PI/180 - deg ;
    }

    //Player Collision
    if(ball.position.x>=player.position.x -40 && ball.position.x<= player.position.x +40){
        if(ball.position.y>=player.position.y-100 && ball.position.y <= player.position.y+100){
            
            distance = (ball.position.y) - (player.position.y);
            //console.log(distance)
			norm = distance/(player.position.y+45);
            deg =(180-(180*norm))*(Math.PI)/180;
            direction = -1;
        }
    }

    //IA Collision
    if(ball.position.x<=ia.position.x +40 && ball.position.x>= ia.position.x -40){
        if(ball.position.y>=ia.position.y-100 && ball.position.y <= ia.position.y+100){
            
            distance = (ball.position.y) - (ia.position.y);
            console.log(distance)
			norm = distance/(ia.position.y+45);
            deg =(180*norm)*(Math.PI)/180;
            direction = 1;
        }
    }

    //Goal for IA
    if(ball.position.x > maxPoint.x){
        reset();
    }

    //Goal for Player
    if(ball.position.x < 0){
        reset();
    }

}

function reset(){
    deg = (Math.PI)/180 ;
    var direction = 1;
    ball.position = view.center;
    player.position.y = view.center.y;
    dist = 0;
    ia.position.y = view.center.y;
}