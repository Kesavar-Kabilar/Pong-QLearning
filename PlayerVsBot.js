var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var blackbg = new Image();
var redplayer = new Image();
var blueplayer = new Image();
var whiteball = new Image();

blackbg.src = "Images/blackbg.png";
redplayer.src = "Images/redplayer.png";
blueplayer.src = "Images/blueplayer.png";
whiteball.src = "Images/whiteball.png";

redplayer_y = 50;
blueplayer_y = 50;

ball_x = 660;
ball_y = 250; 

speed_x = 10;
speed_y = 0;

red_points = 0;
blue_points = 0;

bluebot_called = false;

lst = [10, 50, 90];

blueup_counter = 0;
bluedown_counter = 0;

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 87) {
        redup();
    }
    else if(e.keyCode === 83){
        reddown();
    }
});

function redup(){
    if (redplayer_y >= 10){
        redplayer_y-=10;
    }
}
function reddown(){
    if (redplayer_y <= 400){
        redplayer_y+=10;
    }
}
function blueup(){
    if (blueplayer_y >= 10){
        blueplayer_y-=10;
    }
}
function bluedown(){
    if (blueplayer_y <= 400){
        blueplayer_y+=10;
    }
}

function bluebot(){
    
    var final_y = ball_y;
    var temp_speed_y = speed_y;
    
    for(var i = ball_x; i <= 1210; i+= speed_x){
        if (final_y >= 480 || final_y <= 0){
            temp_speed_y = -1 * temp_speed_y;
        }
        final_y += temp_speed_y;
    }
    
    var midpoint = blueplayer_y + lst[Math.floor(Math.random() * (3))];
    
    if (final_y <= midpoint){
        blueup_counter = Math.round((midpoint - final_y)/10);
    }
    else if (final_y >= midpoint){
        bluedown_counter = Math.round((final_y - midpoint)/10);
    }
    bluebot_called = true;
    return;
}

function draw(){
    
    ctx.drawImage(blackbg, 0, 0);
    
    ctx.drawImage(redplayer, 50, redplayer_y);
    ctx.drawImage(blueplayer, 1230, blueplayer_y);
    
    ctx.drawImage(whiteball, ball_x, ball_y);
    
    ball_x += speed_x;
    ball_y += speed_y;
    
    if (ball_x === 1210){
        if (blueplayer_y <= ball_y && ball_y <= blueplayer_y+100){
            speed_x = -1 * speed_x;
            
            midpoint = blueplayer_y+50;
            speed_y = Math.round((ball_y-midpoint) / 10);
            
        }
    }
    if (ball_x === 80){
        if (redplayer_y <= ball_y && ball_y <= redplayer_y+100){
            speed_x = -1 * speed_x;
            
            midpoint = redplayer_y+50;
            speed_y = Math.round((ball_y-midpoint) / 10);
        }
    }
    
    if (ball_y <= 0 || ball_y >= 480){
        speed_y = -1 * speed_y;
    }
    
    if (ball_x <= 0 || ball_x >= 1330){
        if (ball_x <= 0){
            blue_points += 1;
        }
        else{
            red_points += 1;
        }
        
        ball_x = 660;
        ball_y = 250;
        
        speed_y = 0;
        bluebot_called = false;
    }
    
    if (speed_x >= 0){
        if (bluebot_called === false){
            bluebot();
        }
        else if (blueup_counter > 0){
            blueup();
            blueup_counter -= 1;
        }
        else if (bluedown_counter > 0){
            bluedown();
            bluedown_counter -= 1;
        }
    }
    if (speed_x <= 0){
        bluebot_called = false;
    }
    
    ctx.fillStyle = "#FF0000";
    ctx.font = "20px Verdana";
    ctx.fillText("Red Points : "+red_points,10,cvs.height-20);
    
    ctx.fillStyle = "#00FFFF";
    ctx.font = "20px Verdana";
    ctx.fillText("Blue Points : "+blue_points,1170,cvs.height-20);
    
    requestAnimationFrame(draw);
}

draw();