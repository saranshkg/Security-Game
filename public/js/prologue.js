var finish = false;
var hacked = false;
var start = false;
var Typer={
    text: null,
    accessCountimer:null,
    index:0, // current cursor position
    speed:1, // speed of the Typer
    file:null, //file, must be setted
    
    init: function(){
        accessCountimer=setInterval(function(){
            Typer.updLstChr();
        },1000); // inizialize timer for blinking cursor
        $.get(Typer.file,function(data){// get the text file
            Typer.text=data;// save the textfile in Typer.text
            Typer.text = Typer.text.slice(0, Typer.text.length-1);
        });
    },

    content:function(){
        return $("#console_prologue").html();// get console content
    },

    write:function(str){// append to console content
        $("#console_prologue").append(str);
        return false;
    },

    addText:function(key){
            var cont=Typer.content(); // get the console content
            if(cont.substring(cont.length-1,cont.length)=="|") // if the last char is the blinking cursor
                $("#console_prologue").html($("#console_prologue").html().substring(0,cont.length-1)); // remove it before adding the text
                Typer.index+=Typer.speed;	// add to the index the speed
            
            var text=Typer.text.substring(0,Typer.index)// parse the text for stripping html enities
            var rtn= new RegExp("\n", "g"); // newline regex

            $("#console_prologue").html(text.replace(rtn,"<br/>"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
            $('.viewport_prologue')[0].scrollTop = $('.viewport_prologue')[0].scrollHeight;        
    },

    updLstChr:function(){ // blinking cursor
        if(!finish){
            var cont=this.content(); // get console 
            if(cont.substring(cont.length-1,cont.length)=="|") // if last char is the cursor
                $("#console_prologue").html($("#console_prologue").html().substring(0,cont.length-1)); // remove it
            else
                this.write("|"); // else write it
        }
    }
}

var type = setInterval(function(){
    if(start){
        start = false;
        var timer = setInterval("t();", 10);
        clearInterval(type);
    }
}, 1000);

function t() {
    Typer.addText();
    if (Typer.index > Typer.text.length) {
        finish = true;
        clearInterval(timer);
        $('.viewport_prologue').append("<span class=\"cursor_last_prologue blink_prologue\" id=\"console_prologue\">|</span>");
        $('.viewport_prologue')[0].scrollTop = $('.viewport_prologue')[0].scrollHeight;
        $(document).keypress(function(event) {
            var keycode = event.keyCode || event.which;
            if(keycode == '13' && hacked == false) {
                $('.cursor_last_prologue').hide();
                $('.viewport_prologue').append("<hr><div id=\"console_prologue\"><div><p id=\"c_prologue\">You\'ve accessed the mainframe. You need to brute-force the passcode...</p.</p></div><div id=\"b_prologue\" class=\"button_prologue\">Transaction Passcode</div><div class=\"password_prologue\"></div><div id=\"a_prologue\" class=\"blink_prologue granted_prologue hidden_prologue\">ACCESS GRANTED!</div></div>");
                $('.viewport_prologue')[0].scrollTop = $('.viewport_prologue')[0].scrollHeight;
                hacked = true;
            }
        });
    }
}

var passwords = ['password123', 'qwertyuiop', 'admin2015', 'trustno1', 'letmein6969'];
var indexOld;
var index = Math.floor((Math.random() * passwords.length));
var password = passwords[index];
var characters = [];
var counter = 0;

var interval = setInterval(function(){
        for(i = 0; i < counter; i++) {
            characters[i] = password.charAt(i);
        }
        for(i = counter; i < password.length; i++) {
            characters[i] = Math.random().toString(36).charAt(2);
        }
        $('.password_prologue').text(characters.join(''));
    }, 25);

function hack() {
    counter++;
    if(counter == password.length){
        $('.granted_prologue').removeClass('hidden_prologue');
        $('.viewport_prologue').append("<br><div id=\"console_prologue\">Press any key to proceed.</div>");
        $('.viewport_prologue').append("<span class=\"cursor_last_prologue blink_prologue\" id=\"console_prologue\">|</span>");
        $('.viewport_prologue')[0].scrollTop = $('.viewport_prologue')[0].scrollHeight;
        $(document).on('keydown', function(){
            var shake = setInterval(
            function() {
                $('.viewport_prologue').effect('pulsate');
            }, 1000);
            setTimeout(function(){
                $('.viewport_prologue').fadeOut(5000);
                clearInterval(shake);
            }, 5000);
            $('#load_prologue').delay(15000).fadeIn(5000);
            $('#load_prologue').delay(8000).fadeOut(5000);
            $('#bank_prologue').delay(35000).fadeIn(5000);
        });
    }
}

$(document).on('keydown', hack);