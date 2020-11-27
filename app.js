// BUDGET CONTROLLER
var budgetController = (function () {
    //some code
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

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function () {

        // 1. get the input data
        var input = UICtrl.getinput();
        console.log(input);

        // 2. add the item to the budget controller

        // 3. add the item to the UI

        // 4. Calculate the budget

        // 5. display the budget on the UI

    };

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {

        if(event.key === 'Enter') {
            ctrlAddItem();
        }

    });

})(budgetController, UIController);