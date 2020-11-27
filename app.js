// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //create new id
            if (data.allItems[type].length>0) {
                ID=data.allItems[type][data.allItems[type].length-1].id+1;
            } else {ID=0;}

            //create new item (inc or exp)
            if (type === 'exp') {
                newItem = new Expense(ID, des, val) ;
            } else if (type==='inc') {
                newItem = new Income(ID, des, val)
            }

            // push it into our data structure
            data.allItems[type].push(newItem);
            //return it
            return newItem;

        },

        testing: function () {
            console.log(data);
        }
    }

})();


// UI CONTROLLER
var UIController = (function (){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }
    return {
        getinput: function () {
            return {
                type : document.querySelector(DOMstrings.inputType).value, // inc or exp
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();



// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if(event.key === 'Enter') {
                ctrlAddItem();
            }
        });

    };

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. get the input data
        input = UICtrl.getinput();

        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. add the item to the UI

        // 4. Calculate the budget

        // 5. display the budget on the UI

    };

    return {
        init: function () {
            console.log('the application has started.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

//the most important line of code LOL
controller.init();