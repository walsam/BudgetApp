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


    var calculateTotal= function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage:-1
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

        calculateBudget: function () {

            // calculate Total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expensive
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of income that we spent
            if(data.totals.inc>0){
                data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
            } else {
                data.percentage =-1;
            }
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }
    }

})();


// UI CONTROLLER
var UIController = (function (){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }
    return {
        getinput: function () {
            return {
                type : document.querySelector(DOMstrings.inputType).value, // inc or exp
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // create html string with placeholder text

            if(type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn">' +
                    '<i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="expense-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__percentage">21%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn">' +
                    '<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //replace the placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert the html to the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function () {
            var fields, fieldsArray;
            fields= document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function (current, index, array){
                current.value = "";
            });

            fieldsArray[0].focus();
        },

        displayBudget: function (obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget + ' DH';
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc+ ' DH';
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp+ ' DH';

            if (obj.percentage>=0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage+ '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';

            }

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

    var updateBudget = function () {

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. return the budget
        var budget = budgetCtrl.getBudget();

        // 3. display the budget on the UI
        UICtrl.displayBudget(budget);


    };

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. get the input data
        input = UICtrl.getinput();

        if (input.description !== "" && !isNaN(input.value) && input.value>0) {

            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. calculate and update the budget
            updateBudget();

        }
    };

    return {
        init: function () {
            console.log('the application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetController, UIController);

//the most important line of code LOL
controller.init();