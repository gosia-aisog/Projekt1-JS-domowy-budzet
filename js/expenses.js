//STATE
//UPDATE <FUNCS>
//VIEW (UI)
//EVENTS

//STATE->VIEW (show view+state)np. renderExpenses
//EVENT -> STATE ->UPDATE ->NEW STATE -> VIEW (view+newState)
// https://staltz.com/img/mvu-unidir-ui-arch.jpg

// import { qs } from "./helperFunctions";
// import { sum } from "./helperFunctions";

// const qs = (selector) => document.querySelector(selector);
// const sum = (arr) => arr.reduce((acc, { amount }) => acc + amount, 0);
//DOM elements
const addExpenseDOM = qs("#add-expense");
const expensesDOM = qs("#expenses");
const sumOfExpensesDOM = qs("#sum-of-expenses");
//DATA (STATE/MODEL)
let expenses = [
  // { id: uuid.v4(), name: "test2", amount: 20, isEdited: !false }
];

//UPDATE
// import {addNewExpense, ...} from "./update.js";
const addNewExpense = (oldExpenses, newExpense) => {
  return [...oldExpenses, newExpense];
};

const toggleIsEditedExpense = (oldExpenses, expenseId) => {
  return oldExpenses.map((expense) => {
    return expense.id === expenseId
      ? { ...expense, isEdited: !expense.isEdited }
      : expense;
  });
};
const deleteExpense = (oldExpenses, deleteIdExpense) => {
  return oldExpenses.filter(({ id }) => id !== deleteIdExpense);
};

const setExpenseNameAndAmount = (
  oldExpenses,
  expenseId,
  newName,
  newAmount
) => {
  return oldExpenses.map((expense) => {
    return expense.id === expenseId
      ? { ...expense, name: newName, amount: newAmount }
      : expense;
  });
};

//VIEW
const renderExpenses = () => {
  expensesDOM.innerHTML = "";
  expenses.forEach((expense) => {
    const expenseDOM = document.createElement("li");
    if (expense.isEdited) {
      const editFormDOM = document.createElement("form");
      const editFormNameInputDOM = document.createElement("input");
      editFormNameInputDOM.setAttribute("name", "name");
      editFormNameInputDOM.setAttribute("value", expense.name);

      const editFormAmountInputDOM = document.createElement("input");
      editFormAmountInputDOM.setAttribute("name", "amount");
      editFormAmountInputDOM.setAttribute("value", expense.amount);

      const confirmExpenseBtnDOM = document.createElement("button");
      confirmExpenseBtnDOM.textContent = "Zatwierdź";
      confirmExpenseBtnDOM.setAttribute("style", "width:70px");

      editFormDOM.append(editFormNameInputDOM);
      editFormDOM.append(editFormAmountInputDOM);
      editFormDOM.appendChild(confirmExpenseBtnDOM);
      expenseDOM.append(editFormDOM);

      editFormDOM.addEventListener("submit", (e) => {
        e.preventDefault();

        const { name } = e.currentTarget.elements;
        const newName = name.value;
        const { amount } = e.currentTarget.elements;
        const newAmount = Number(amount.value);

        expenses = setExpenseNameAndAmount(
          expenses,
          expense.id,
          newName,
          newAmount
        );
        expenses = toggleIsEditedIncome(expenses, expense.id);
        renderExpenses();
      });
    } else {
      expenseDOM.textContent = `${expense.name}    ${expense.amount}  `;

      const editExpenseBtnDOM = document.createElement("button");
      editExpenseBtnDOM.textContent = "Edytuj";
      editExpenseBtnDOM.setAttribute("class", "btn2");
      editExpenseBtnDOM.addEventListener("click", () => {
        expenses = toggleIsEditedIncome(expenses, expense.id);
        renderExpenses();
      });
      const deleteExpenseBtnDOM = document.createElement("button");
      deleteExpenseBtnDOM.textContent = "Usuń";
      deleteExpenseBtnDOM.setAttribute("class", "btn2");
      deleteExpenseBtnDOM.addEventListener("click", (e) => {
        expenses = deleteExpense(expenses, expense.id);
        renderExpenses();
      });
      expenseDOM.appendChild(editExpenseBtnDOM);
      expenseDOM.appendChild(deleteExpenseBtnDOM);
    }
    expensesDOM.appendChild(expenseDOM);

    addExpenseDOM.reset();
  });
  sumOfExpensesDOM.innerHTML = sum(expenses);

  // stateValueDOM.innerHTML = sum(incomes) - sum(expenses);
  message(incomes, expenses, stateValueDOM);
};

//EVENTS
addExpenseDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name } = e.currentTarget.elements;
  const { amount } = e.currentTarget.elements;

  const newExpense = {
    id: uuid.v4(),
    name: name.value,
    amount: Number(amount.value),
    isEdited: false,
  };

  expenses = addNewExpense(expenses, newExpense);
  renderExpenses();
});
console.log(message());
renderExpenses();
