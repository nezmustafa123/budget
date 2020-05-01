//TODO LIST

//1. Input income or expense description or value and hit the add button budget will update event handler
//2. Get data out of input field.
//3. Data will be printed out on screen, add data to data structure then print on screen
//4. Update the internal budget and update the user interface.

//5. structure code with modules.

//modules for ui and internal data and controller module

//module pattern keep pieces of code related together in modules
//data encapsulation


//BUDGET CONTROLLER
//module that handles budget data
var budgetController = (function() {
	//some code
	//module pattern returns object
	//return a function outside scope as access to
	//has to be a public function that other modules can see
    
    //data structure for desc val and id constructor function
    
	    var Expense = function(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
            this.percentage = -1;
        };
    
     Expense.prototype.calcPercentage = function(totalIncome) {
         if (totalIncome > 0) {
         this.percentage = Math.round((this.value / totalIncome) * 100)
         } else {
             this.percentage = -1;
         }
     };
    
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
	
        var Income = function(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        };
        
        
    var calculateTotal = function(type) {
        var sum = 0;
        //use type argument expense array or income array
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
        
        /*
        0
        [200, 400, 100]
        */
    };
    
//    var allExpenses = [];
//    var allIncomes = [];
//    var totalExpenses = 0;
    
    //put all items and expenditure into one GLOBAL data structure
    
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
        percentage: -1
//        -1 is non existant
            
        
    };
    //use user input to create new item in data structure
    return {
        //public method that takes type description and value
        addItem: function(type, des, val) {
            var newItem, ID;
            
//            ID = 0;
            //[1,2,3,4,5] next ID =6
            //[1,2,4,6,8] next ID =9
            //ID = last ID + 1
            
            //last id would be length of array -1
            
            
            //create new ID
            if (data.allItems[type].length > 0) {
             ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            }
            
            
            //create new item based on 'inc' or 'exp'
                //if expense create expense item
            if(type == 'exp') {
             newItem = new Expense(ID, des ,val);
                //if income create income item
            } else if (type === 'inc') {
               newItem = new Income(ID, des ,val);
   
            }
            
            
            //push it into data structure
            data.allItems[type].push(newItem);
            //match items with type push 
            return newItem;
            //return newitem
        },
        
        deleteItem: function(type, id) {
            // id = 6
            //ids = [1 2 4 6 8]
            // index = 3
            
            var ids, index;
            var ids =  data.allItems[type].map(function(current){
               return current.id; 
             
            });
            
            index = ids.indexOf(id);
            
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        
        },
        
        calculateBudget: function() {
            
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            //calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //calculate the percentage of income that we spent
            if(data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp/ data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }
            //Expense = 100 and income 300, 
        },
        
        
        calculatePercentages: function(){
            /*
            a = 20
            b = 10
            c = 40
            income = 100
            */
            
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });
        },
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;
        },
        
        //create method for returning 4 values
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
                
            };
        },
        
        
        testing: function() {
            console.log(data);
        }
    };
        
})();





//immediately called variable and function declared and object is returned
//the variavle is the object with method called public test
//test method uses add and test variable after it has executed thanks to closures
//iffe returns immediately

//UI CONTROLLER
//user interfae seperated from data seperation of concerns
var UIController = (function(){
	//Some code
	//public method
	
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage'
	};
    
	return {
		getinput: function() {
			return {
			//read data from UI
			//from select element you get value that's specified
			type: document.querySelector(DOMstrings.inputType).value,// will be either 
			//inc or exp
			description: document.querySelector(DOMstrings.inputDescription).value,
			value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
			
        	//read data from UI
        	//from select element you get value that's specified
//			var type = document.querySelector('.add__type').value;// will be either 
        	//inc or exp
//			var description = document.querySelector('.add__description').value; 
//			var value = document.querySelector('.add__value').value;
			},
        
        addListItem: function(obj, type) {
            //the item will be the object it's self and the type if it's an income object or an expense object
            var html, newHtml, element;
             //create HTML string with placeholder text
   
                     if(type === 'inc') {
                     element = DOMstrings.incomeContainer;
                         
                     html =  '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                      } else if (type === 'exp') {
                    
                     element = DOMstrings.expensesContainer;
                          
                     html =  '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                    
            }
             //replace the placeholder text with some actual data
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //insert the HTML into the DOM
            //as a child of either incomme or expenses
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
            
            },
        
        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
           el.parentNode.removeChild(el)
        },
        
        
        
        clearFields: function() {
        var fields, fieldsArr;
            //convert html list into array
           fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            //call method set this variable as field tricking slice method to think it is returning array
           fieldsArr = Array.prototype.slice.call(fields);
            
           fieldsArr.forEach(function(current, index, array) {
                current.value = "";
          });
            
            //set focus on first element
            
            fieldsArr[0].focus();
        },
        
         displayBudget: function(obj) {
             document.querySelector(DOMstrings.budgetLabel).textContent =  obj.budget;
             document.querySelector(DOMstrings.incomeLabel).textContent =  obj.totalInc;
             document.querySelector(DOMstrings.expensesLabel).textContent =  obj.totalExp;
             document.querySelector(DOMstrings.percentageLabel).textContent =  obj.percentage;
             
             
             if (obj.percentage > 0) {
                    document.querySelector(DOMstrings.percentageLabel).textContent =  obj.percentage + '%';
             } else {
                 document.querySelector(DOMstrings.percentageLabel).textContent = '---'
             }
         },
        
        //recieve percentage array in app controller
          displayPercentages: function(percentages) {
              var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
              
              
              var nodeListForEach = function(list, callback) {
                  for (var i = 0; i < list.length; i ++) {
                      callback(list[i], i);
                  }
              };
              
              nodeListForEach(fields, function(current, index){
                  
                  //do stuff
                  
                 if(percentages[index] > 0){
                current.textContent = percentages[index] + '%';
              } else {
                  current.textContent = '---';
              }
             });
          },
         
        
        
        
		  getDOMstrings: function() {
			return DOMstrings;
		}
		//inside the return statement a new method
	};
	
})();

//GLOBAL APP CONTROLLER
//app controller for the data
//modules can recieve arguments 
//can pass arguments into them
var controller = (function(budgetCtrl, UICtrl) {
	//init function
    var setupEventListeners = function() { 
    var DOM = UICtrl.getDOMstrings();
        //in this controller it's called dom
    //call the additem function
	document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
	
	//global document event
	document.addEventListener('keypress', function(e){
		//function recieves event object
//		console.log(e);
		
		if(event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
          }
		//call methods from UI and budget controller here
		});
        
        //atach event handler to parent element to catch the event as it bubbles up
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        //will be called when someone clicks on container
    };
    
    
    var updateBudget = function() {
        //calculate the budget
        budgetCtrl.calculateBudget();
        // method to return the budget
        var budget = budgetCtrl.getBudget();
        //display the budget on the ui
        UICtrl.displayBudget(budget);
        };
	
    var updatePercentages = function() {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        //2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        //3. Update the UI with the new percentages
//        console.log(percentages);
        
        UICtrl.displayPercentages(percentages);
    };
    
	var ctrlAddItem = function() {
        var input, newItem;
        //get the field input data
		//parameter we have access to is UICtrl
		input = UICtrl.getinput();
        //read input out of fields store it into input
//		console.log(input);
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        //add item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		//add the item to the ui
        UICtrl.addListItem(newItem, input.type);
        //clear the fields
        UICtrl.clearFields();
        
	   // calculate and update budget
        updateBudget();
        
        //update percentages 
        
        updatePercentages();
        
      }
    };
    
    var ctrlDeleteItem = function(e) {
        
        var itemID, splitID, type, ID; 
        //returns html node
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            //inc-1
            //string split method converts from primitive to object
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // 1. delete item from data structure
            budgetCtrl.deleteItem(type, ID);
            // 2.Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            // 3.Update annd shot the new budget
            updateBudget();
            //4. update percentages 
            updatePercentages();
        }
    };
    
    return {
        init: function() {
            console.log('Application has started. ');
            //reset everything
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
            //set up as soon as init function is called
        }
    }

})(budgetController,UIController);

//place outside constollers

controller.init();
