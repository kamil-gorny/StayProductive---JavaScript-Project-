//Task Controller
var taskController = (function(){
    var TaskBoard = function(id, name){
        this.id = id;
        this.name = name;
        this.arr =[];
    };

    var Task = function(id, description){
        this.id = id;
        this.description = description;
    };
    var data = {
        allTaskBoards: []
    }

    return {
        addItem: function(val){
            var ID, newBoard;
            if (data.allTaskBoards.length >0){
                ID = data.allTaskBoards[data.allTaskBoards.length - 1].id + 1; 
            }
            else{
                ID = 0;
            }
            newBoard = new TaskBoard(ID, val);
            data.allTaskBoards.push(newBoard);
            console.log(newBoard.id);
        },
        getData: function(){
            console.log(data);
        },
       


    }
    //Add Item 
    //Delete Item
})();

//Sounds Controller
var soundsController = (function(){
    return {
        //Function plays sound when element has active class and stops if it hasn't
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
      createbutton: '.createbutton',
      createTaskBoard: '.list',
      taskBoardContainer: '.taskBoardContainer'
      
    };

    return{
        getDomStrings: function(){
            return DOMStrings;
        },
        getInput: function(){
           return document.querySelector(DOMStrings.createTaskBoard).value;
        },
        addTaskBoardUi: function(obj){
            var html, newhtml, element;
            element = DOMStrings.taskBoardContainer;
            html = '<div class="container"><p class="taskBoardName">%NAME%</p><form action=""><input type="text" class="container-input" placeholder="+Dodaj zadanie"/><input type="submit" class="container-button" value="Dodaj"></form></div>'
            newhtml = html.replace('%NAME%', obj.toUpperCase());
            document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
        }
    }
})();

//Global App Controller
var globalController = (function(soundsCtrl, uiCtrl, globalCtrl, taskCtrl){
    var DOM = uiCtrl.getDomStrings();
   
    var setupEventListeners = function(){
        document.querySelector(DOM.buttons).addEventListener('click', playSoundController);
        document.querySelector(DOM.createbutton).addEventListener('click', addTaskBoardController);
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

    var addTaskBoardController = function(event){
        event.preventDefault();
        var taskBoardName;
        taskBoardName = uiCtrl.getInput();
        taskCtrl.addItem(taskBoardName);
        uiCtrl.addTaskBoardUi(taskBoardName);
    };

    return{
        init: function(){
            setupEventListeners();
        }
    }

})(soundsController, uiController, globalController, taskController );

globalController.init();



