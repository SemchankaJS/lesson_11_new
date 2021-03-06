'use strict'

const button = document.getElementById('start');
button.disabled = true;
// Кнопка "Рассчитать"
const buttonTagOne = document.querySelector('.income_add');
// Первый "Плюсик"
const buttonTagTwo = document.querySelector('.expenses_add');
// Второй "Плюсик"
const checkBox = document.querySelector('#deposit-check');
// Чекбокс
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
// Поля для ввода возможных доходов
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
// Дневной бюджет
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
// Расход за месяц
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
// Возможные доходы
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
// Возможные расходы
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
// Накопления за период
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
// Срок достижения цели в месяцах
const salaryAmount = document.querySelector('.salary-amount');
// Месячный доход
const incomeTitle = document.querySelector('.income-title1');
// Дополнительный доход/Наименование
// Дополнительный доход/Сумма
const expensesTitle = document.querySelector('.expenses-title1');
// Обязательные расходы/Наименование
const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
// Обязательные расходы/Сумма
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
// Возможные расходы
const depositCheck = document.querySelector('#deposit-check');
// Чекбокс депозит
const periodSelect = document.querySelector('.period-select');
// Range 
const budgetMonthValue = document.querySelector('.budget_month-value');
const targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmout = document.querySelector('.period-amount');


let isNumber = function(n) {
    return isNaN(parseFloat(n)) && isFinite(n)
};

salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '' )
        button.disabled = false;
    else  
    button.disabled = true;   
    
});


let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    periodSelects: 0,
    start: function () { 
        // if (salaryAmount.value === '') {
        //     button.disabled = false;
        // }
        appData.budget = +salaryAmount.value;

        appData.getExpenses();

        appData.getIncome();

        appData.getInfoDeposit();

        appData.expMonth();

        appData.whyBudgetDay();

        // appData.getStatusIncome();

        appData.getAddExpenses();

        appData.getAddIncome();
        
        appData.addPeriodSelect();

        appData.getTargetMonth();

        appData.getBudget();

        appData.showResult();

    },
    showResult: function () {
        budgetMonthValue.value = +appData.budgetMonth;
        budgetDayValue.value = appData.whyBudgetDay();
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
        targetMonthValue.value = appData.getTargetMonth(); //Math.round(targetAmount.value / appData.budgetMonth); 
        incomePeriodValue.value = appData.calcSavedMoney();

    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonTagTwo);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonTagTwo.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneItem, buttonTagOne);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonTagOne.style.display = 'none';
        }
    }, 
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function (item) {
            item = item.trim();
           if (item !== '') {
               appData.addExpenses.push(item)
           } 
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
           let itemValue = item.value.trim();
           if (itemValue !== '') {
               appData.addIncome.push(itemValue);
           } 
        });
    },
    getExpenses: function () {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title1').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title1').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }

            let result = 0;
            for (let key in appData.income) {
                result += +appData.income[key];
            };
            appData.incomeMonth = +result;
        });    
    },
    addPeriodSelect: function () {
        periodAmout.textContent = periodSelect.value;
        appData.periodSelects = +periodSelect.value;
    },
    whyBudgetDay: function() {
        return Math.floor(appData.budgetMonth / 30);
    },
    expMonth: function () {
        let res = 0;
        for (let key in appData.expenses) {
            res += appData.expenses[key];
        }
        return appData.expensesMonth = res;
    },

    getBudget: function() {
        appData.budgetMonth = +(appData.budget + appData.incomeMonth) - appData.expensesMonth;
    },

    getTargetMonth: function() {
        return Math.round(+targetAmount.value / +appData.budgetMonth);    
    },


    getBudgetDay: function() {
        return Math.floor(appData.getBudget() / 30);
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?');
            } while (isNaN(appData.percentDeposit) || appData.percentDeposit.trim() === '' || appData.percentDeposit === null);
            do {
                appData.moneyDeposit = prompt('Какая сумма?');
            } while (isNaN(appData.moneyDeposit) || appData.moneyDeposit.trim() === '' || appData.moneyDeposit === null);
        }
    }, 

    calcSavedMoney: function () {
        return appData.budgetMonth * appData.periodSelects;
    }

};


let listener = button.addEventListener('click', appData.start);
buttonTagTwo.addEventListener('click', appData.addExpensesBlock);
buttonTagOne.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.addPeriodSelect);