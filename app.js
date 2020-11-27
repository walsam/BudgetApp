// BUDGET CONTROLLER
var budgetController = (function () {
    //some code
})();


// UI CONTROLLER
var UIController = (function (){
    //some code
})();



// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {

        // 1. get the input data

        // 2. add the item to the budget controller

        // 3. add the item to the UI

        // 4. Calculate the budget

        // 5. display the budget on the UI

    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {

        if(event.key === 'Enter') {
            ctrlAddItem();
        }

    });

})(budgetController, UIController);