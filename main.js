//Task Controller
var taskController = (function(){
    var TaskBoard = function(id, name){
        this.id;
        this.name;
    }

    var Task = function(id, description){
        this.id = id;
        this.description = description;
    }
    //Add Item 
    //Delete Item
})();

//Sounds Controller
var soundsController = (function(){
    return {
        //Function plays sound when element has active class and stops if it doesn't
        toggleSound: function(sound){
            var element = document.getElementById(sound+"-btn");
            var audio = document.querySelector("#"+sound);

            if(element.classList.contains(sound+"active")){
                audio.play();
            }
            else{
                audio.pause();
            }       
        }
    }
    //Start sound
    //Set Volume
})();
   


//Pomodoro Controller
var pomodoroController = (function(){

})();

//UI Controller
var uiController = (function(){
    var DOMStrings = {
      buttons: '.buttons',
    };

    return{
        getDomStrings: function(){
            return DOMStrings;
        }
    }
})();

//Global App Controller
var globalController = (function(soundsCtrl, uiCtrl, globalCtrl, taskCtrl){
    var DOM = uiCtrl.getDomStrings();
   
    var setupEventListeners = function(){
        document.querySelector(DOM.buttons).addEventListener('click', playSoundController);
    };
    
    var playSoundController = function(event){
        var soundBtnID = event.target.id;

        if(soundBtnID){
            var splitID = soundBtnID.split("-");
            var soundName = splitID[0];

            document.getElementById(soundBtnID).classList.toggle(soundName+"active");
            document.getElementById(soundBtnID).classList.toggle("iconnotactive");

            soundsCtrl.toggleSound(soundName);
        }
    };

    return{
        init: function(){
            setupEventListeners();
        }
    }

})(soundsController, uiController, globalController, taskController);

globalController.init();