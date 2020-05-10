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
            return newBoard;
        },
        getData: function(){
            console.log(data);
        },
        deleteItem: function(id){
            var ids, index;
            ids = data.allTaskBoards.map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);
            if(index!=-1){
                data.allTaskBoards.splice(index, 1);
            }
        }


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
      taskBoardContainer: '.taskBoardContainer',
      createField: '.createTaskBoard',
      addTaskButton: '.addTaskButton',
      addTaskInput: '.addTaskInput',
      addTaskContainer: '.addTaskContainer',
      deleteTaskContainer: '.delete'  
    };
    var hideFromUi = function(element){
        document.querySelector(element).classList.toggle('hide');
    }
    var showCreateField = function(){
        // var html;
        // var taskBoard = DOMStrings.taskBoardContainer;
        // html = '<div class="addTaskContainer"><input type="text" class="addTaskInput" placeholder="+Dodaj tablie"/><button class="addTaskButton">Dodaj</button></div>';
        // document.querySelector(taskBoard).insertAdjacentHTML('beforeend', html); 
        document.querySelector(DOMStrings.addTaskContainer).classList.toggle('hide');
    }

    return{
        getDomStrings: function(){
            return DOMStrings;
        },
        getInput: function(x){
           return document.querySelector(x).value;
        },
        addTaskBoardUi: function(obj){
            var html, newhtml, element;
            element = DOMStrings.taskBoardContainer;
            html = '<div class="container" id="%id%"><p class="taskBoardName">%NAME%<span class="delete"><i class="fas fa-times times-icon"></i></i></span></p><form action=""><input type="text" class="container-input" placeholder="+Dodaj zadanie"/><input type="submit" class="container-button" value="Dodaj"></form></div>'
            newhtml = html.replace('%NAME%', obj.name);
            newhtml = newhtml.replace('%id%', obj.id)
            document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
            if(!document.querySelector(DOMStrings.createField).classList.contains('hide')){
                hideFromUi(DOMStrings.createField);
                showCreateField();
            }
            
        },
        deleteTaskBoardUI: function(el){
            console.log(el);
            document.getElementById(el).parentElement.removeChild(document.getElementById(el));

        }
       
       //ellipsis-h 
    }
})();

//Global App Controller
var globalController = (function(soundsCtrl, uiCtrl, globalCtrl, taskCtrl){
    var DOM = uiCtrl.getDomStrings();
   
    var setupEventListeners = function(){
        document.querySelector(DOM.buttons).addEventListener('click', playSoundController);
        document.querySelector(DOM.createbutton).addEventListener('click', function(){
            addTaskBoardController(event, DOM.createTaskBoard);
        });
        document.querySelector(DOM.addTaskButton).addEventListener('click', function(){
            addTaskBoardController(event, DOM.addTaskInput);
        });
   
    }
    var setupTaskContainerEventListeners = function(x){
        document.getElementById(x).addEventListener('click', deleteTaskContainerController);
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

    var addTaskBoardController = function(event,x){
        event.preventDefault();
        var taskBoardName, newItem;
        taskBoardName = uiCtrl.getInput(x);
        newItem = taskCtrl.addItem(taskBoardName);
        uiCtrl.addTaskBoardUi(newItem);
        setupTaskContainerEventListeners(newItem.id);
    };
    var deleteTaskContainerController = function(e){
        console.log(e.target.parentNode.parentNode.id);
        taskCtrl.deleteItem(e.target.parentNode.parentNode.id);
        uiCtrl.deleteTaskBoardUI(e.target.parentNode.parentNode.id);
    }

    return{
        init: function(){
            setupEventListeners();
        }
    }

})(soundsController, uiController, globalController, taskController );

globalController.init();



