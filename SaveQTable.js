console.log("Started Program");

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var filename = "qtable60min.json";

var blackbg = new Image();
var redplayer = new Image();
var blueplayer = new Image();
var whiteball = new Image();

blackbg.src = "Images/blackbg.png";
redplayer.src = "Images/redplayer.png";
blueplayer.src = "Images/blueplayer.png";
whiteball.src = "Images/whiteball.png";

var redplayer_y = 50;
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

qtable = {};

var qtable_helper = [];
var qtable_helper2 = [];

var time_lst = [];


for(var i = 0; i <= 1330; i+=50){
    for (var j = 0; j <= 500; j+=20){
        for (var k = -5; k <= 5; k++){
            for (var l = 0; l <= 410; l+=10){
                var s = i.toString()+"|"+j.toString()+"|";
                s += k.toString()+"|"+l.toString();
                qtable[s] = [10, 10, 10];
            }
        }
    }
}

function save_qtable() {
   let data = JSON.stringify(qtable);
   let bl = new Blob([data], {
      type: "text/html"
   });
   let a = document.createElement("a");
   a.href = URL.createObjectURL(bl);
   a.download = filename;
   a.hidden = true;
   document.body.appendChild(a);
   a.innerHTML =
      "someinnerhtml";
   a.click();
}

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

function random(lst){
    var new_lst = [];

    for (var i = -1; i < 2; i++){
        for (var j = 0; j < lst[i+1]; j++){
            new_lst.push(i);
        }
    }

    return new_lst[Math.floor(Math.random() * new_lst.length)];
}

function time(){
    var maximum = 0;
    
    for(var i = 0; i < time_lst.length; i++){
        console.log(time_lst[i]);
        if (i > 0 && time_lst[i] > maximum){
            maximum = time_lst[i];
        }
    }
    
    return "Maximum: " + maximum.toString();
}

function total_time(){
    var total = 0;
    
    for(var i = 0; i <time_lst.length; i++){
        total += time_lst[i];
    }
    
    return total;
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
            
            var arrayLength = qtable_helper.length;
            for (var i = 0; i < arrayLength; i++) {
                if (qtable_helper2[i] === -1){

                    if (qtable[qtable_helper[i]][1] >= 1){
                       qtable[qtable_helper[i]][0] += 1;
                       qtable[qtable_helper[i]][1] -= 1;
                    }
                    if (qtable[qtable_helper[i]][2] >= 1){
                        qtable[qtable_helper[i]][0] += 1;
                        qtable[qtable_helper[i]][2] -= 1;
                    }
                    if (qtable[qtable_helper[i]][1] >= 1){
                       qtable[qtable_helper[i]][0] += 1;
                       qtable[qtable_helper[i]][1] -= 1;
                    }
                    if (qtable[qtable_helper[i]][2] >= 1){
                        qtable[qtable_helper[i]][0] += 1;
                        qtable[qtable_helper[i]][2] -= 1;
                    }

                }
                else if (qtable_helper2[i] === 0){

                    if (qtable[qtable_helper[i]][0] >= 1){
                        qtable[qtable_helper[i]][0] -= 1;
                        qtable[qtable_helper[i]][1] += 1;
                    }

                    if (qtable[qtable_helper[i]][2] >= 1){
                        qtable[qtable_helper[i]][1] += 1;
                        qtable[qtable_helper[i]][2] -= 1;
                    }
                    if (qtable[qtable_helper[i]][0] >= 1){
                        qtable[qtable_helper[i]][0] -= 1;
                        qtable[qtable_helper[i]][1] += 1;
                    }

                    if (qtable[qtable_helper[i]][2] >= 1){
                        qtable[qtable_helper[i]][1] += 1;
                        qtable[qtable_helper[i]][2] -= 1;
                    }
                }
                else{

                    if (qtable[qtable_helper[i]][0] >= 1){
                        qtable[qtable_helper[i]][0] -= 1;
                        qtable[qtable_helper[i]][2] += 1;
                    }

                    if (qtable[qtable_helper[i]][1] >= 1){
                        qtable[qtable_helper[i]][1] -= 1;
                        qtable[qtable_helper[i]][2] += 1;
                    }
                    if (qtable[qtable_helper[i]][0] >= 1){
                        qtable[qtable_helper[i]][0] -= 1;
                        qtable[qtable_helper[i]][2] += 1;
                    }

                    if (qtable[qtable_helper[i]][1] >= 1){
                        qtable[qtable_helper[i]][1] -= 1;
                        qtable[qtable_helper[i]][2] += 1;
                    }
                }

            }
            qtable_helper = [];
            qtable_helper2 = [];
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
            red_points += 0;
        }

        ball_x = 660;
        ball_y = 250;

        speed_y = 0;
        bluebot_called = false;

        time_lst.push(Date.now()-start);
        console.log(time_lst[time_lst.length - 1]);
        start = Date.now();
        
        var arrayLength = qtable_helper.length;
        for (var i = 0; i < arrayLength; i++) {
            if (qtable_helper2[i] === -1){
                if(qtable[qtable_helper[i]][0] >= 1){
                    qtable[qtable_helper[i]][0] -= 1;
                    qtable[qtable_helper[i]][1] += 1;
                }
                if(qtable[qtable_helper[i]][0] >= 1){
                    qtable[qtable_helper[i]][0] -= 1;
                    qtable[qtable_helper[i]][2] += 1;
                }
            }
            else if (qtable_helper2[i] === 0){
                if(qtable[qtable_helper[i]][1] >= 1){
                    qtable[qtable_helper[i]][1] -= 1;
                    qtable[qtable_helper[i]][0] += 1;
                }
                if(qtable[qtable_helper[i]][1] >= 1){
                    qtable[qtable_helper[i]][1] -= 1;
                    qtable[qtable_helper[i]][2] += 1;
                }
            }
            else{
                if(qtable[qtable_helper[i]][2] >= 1){
                    qtable[qtable_helper[i]][2] -= 1;
                    qtable[qtable_helper[i]][0] += 1;
                }
                if(qtable[qtable_helper[i]][2] >= 1){
                    qtable[qtable_helper[i]][2] -= 1;
                    qtable[qtable_helper[i]][1] += 1;
                }
            }

        }
        
        qtable_helper = [];
        qtable_helper2 = [];
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
    if (speed_x < 0){
        bluebot_called = false;
        if (ball_y <= 500 && ball_y >= 0){
            var ball_x_temp = (Math.round(ball_x/50))*50;
            var ball_y_temp = (Math.round(ball_y/20))*20;

            var s = ball_x_temp.toString()+"|"+ball_y_temp.toString()+"|";
            s += speed_y.toString()+"|"+redplayer_y.toString();
            //console.log(s);
            //console.log(qtable[s]);
            var item = random(qtable[s]);
            qtable_helper.push(s);
            qtable_helper2.push(item);

            if (item === -1){
                reddown();
            }
            else if(item === 1){
                redup();
            }
        }
    }

    ctx.fillStyle = "#FF0000";
    ctx.font = "20px Verdana";
    ctx.fillText("Red Points : "+red_points,10,cvs.height-20);

    ctx.fillStyle = "#00FFFF";
    ctx.font = "20px Verdana";
    ctx.fillText("Blue Points : "+blue_points,170,cvs.height-20);

    requestAnimationFrame(draw);
}


function train_ai(training_time){
    
    while (total_time() < training_time){

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

                var arrayLength = qtable_helper.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (qtable_helper2[i] === -1){

                        if (qtable[qtable_helper[i]][1] >= 1){
                           qtable[qtable_helper[i]][0] += 1;
                           qtable[qtable_helper[i]][1] -= 1;
                        }
                        if (qtable[qtable_helper[i]][2] >= 1){
                            qtable[qtable_helper[i]][0] += 1;
                            qtable[qtable_helper[i]][2] -= 1;
                        }
                        if (qtable[qtable_helper[i]][1] >= 1){
                           qtable[qtable_helper[i]][0] += 1;
                           qtable[qtable_helper[i]][1] -= 1;
                        }
                        if (qtable[qtable_helper[i]][2] >= 1){
                            qtable[qtable_helper[i]][0] += 1;
                            qtable[qtable_helper[i]][2] -= 1;
                        }

                    }
                    else if (qtable_helper2[i] === 0){

                        if (qtable[qtable_helper[i]][0] >= 1){
                            qtable[qtable_helper[i]][0] -= 1;
                            qtable[qtable_helper[i]][1] += 1;
                        }

                        if (qtable[qtable_helper[i]][2] >= 1){
                            qtable[qtable_helper[i]][1] += 1;
                            qtable[qtable_helper[i]][2] -= 1;
                        }
                        if (qtable[qtable_helper[i]][0] >= 1){
                            qtable[qtable_helper[i]][0] -= 1;
                            qtable[qtable_helper[i]][1] += 1;
                        }

                        if (qtable[qtable_helper[i]][2] >= 1){
                            qtable[qtable_helper[i]][1] += 1;
                            qtable[qtable_helper[i]][2] -= 1;
                        }
                    }
                    else{

                        if (qtable[qtable_helper[i]][0] >= 1){
                            qtable[qtable_helper[i]][0] -= 1;
                            qtable[qtable_helper[i]][2] += 1;
                        }

                        if (qtable[qtable_helper[i]][1] >= 1){
                            qtable[qtable_helper[i]][1] -= 1;
                            qtable[qtable_helper[i]][2] += 1;
                        }
                        if (qtable[qtable_helper[i]][0] >= 1){
                            qtable[qtable_helper[i]][0] -= 1;
                            qtable[qtable_helper[i]][2] += 1;
                        }

                        if (qtable[qtable_helper[i]][1] >= 1){
                            qtable[qtable_helper[i]][1] -= 1;
                            qtable[qtable_helper[i]][2] += 1;
                        }
                    }

                }
                qtable_helper = [];
                qtable_helper2 = [];
            }
        }

        if (ball_y <= 0 || ball_y >= 480){
            speed_y = -1 * speed_y;
        }

        if (ball_x <= 0 || ball_x >= 1330){
            if (ball_x <= 0){
                blue_points += 1;
            }

            ball_x = 660;
            ball_y = 250;

            speed_y = 0;
            bluebot_called = false;

            time_lst.push(Date.now()-start);
            start = Date.now();

            var arrayLength = qtable_helper.length;
            for (var i = 0; i < arrayLength; i++) {
                if (qtable_helper2[i] === -1){
                    if(qtable[qtable_helper[i]][0] >= 1){
                        qtable[qtable_helper[i]][0] -= 1;
                        qtable[qtable_helper[i]][1] += 1;
                    }
                    if(qtable[qtable_helper[i]][0] >= 1){
                        qtable[qtable_helper[i]][0] -= 1;
                        qtable[qtable_helper[i]][2] += 1;
                    }
                }
                else if (qtable_helper2[i] === 0){
                    if(qtable[qtable_helper[i]][1] >= 1){
                        qtable[qtable_helper[i]][1] -= 1;
                        qtable[qtable_helper[i]][0] += 1;
                    }
                    if(qtable[qtable_helper[i]][1] >= 1){
                        qtable[qtable_helper[i]][1] -= 1;
                        qtable[qtable_helper[i]][2] += 1;
                    }
                }
                else{
                    if(qtable[qtable_helper[i]][2] >= 1){
                        qtable[qtable_helper[i]][2] -= 1;
                        qtable[qtable_helper[i]][0] += 1;
                    }
                    if(qtable[qtable_helper[i]][2] >= 1){
                        qtable[qtable_helper[i]][2] -= 1;
                        qtable[qtable_helper[i]][1] += 1;
                    }
                }

            }

            qtable_helper = [];
            qtable_helper2 = [];
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
            if (ball_y <= 500 && ball_y >= 0){
                var ball_x_temp = (Math.round(ball_x/50))*50;
                var ball_y_temp = (Math.round(ball_y/20))*20;

                var s = ball_x_temp.toString()+"|"+ball_y_temp.toString()+"|";
                s += speed_y.toString()+"|"+redplayer_y.toString();
                var item = random(qtable[s]);
                qtable_helper.push(s);
                qtable_helper2.push(item);

                if (item === -1){
                    reddown();
                }
                else if(item === 1){
                    redup();
                }
            }
        }
    }
}

var start = Date.now();
console.log("Started Training");
train_ai(60*60*1000);

save_qtable();

time_lst = [total_time()];
draw();