//STATE
//UPDATE <FUNCS>
//VIEW (UI)
//EVENTS

//STATE->VIEW (show view+state)np. renderIncomes
//EVENT -> STATE ->UPDATE ->NEW STATE -> VIEW (view+newState)
// https://staltz.com/img/mvu-unidir-ui-arch.jpg

// import { qs } from "./helperFunctions";
// import { sum } from "./helperFunctions";

const qs = (selector) => document.querySelector(selector);
const sum = (arr) => arr.reduce((acc, { amount }) => acc + amount, 0);

const message = (v1, v2, elementDOM) => {
  let difference = sum(v1) - sum(v2);
  console.log(difference);
  console.log(typeof difference);
  if (difference > 0) {
    elementDOM.innerHTML = `Mozesz jeszcze wydać ${difference} złotych.`;
  } else if (difference === 0) {
    elementDOM.innerHTML = `Bilans wynosi ${difference}.`;
  } else {
    elementDOM.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${difference} złotych.`;
  }
};

//DOM elements
const addIncomeDOM = qs("#add-income");
const incomesDOM = qs("#incomes");
const sumOfIncomesDOM = qs("#sum-of-incomes");
const stateValueDOM = qs("#state-value");
//DATA (STATE/MODEL)
let incomes = [
  // { id: uuid.v4(), name: "test1", amount: 300, isEdited: !false }
];

//UPDATE
// import {addNewIncome, ...} from "./update.js";
const addNewIncome = (oldIncomes, newIncome) => {
  return [...oldIncomes, newIncome];
};

const toggleIsEditedIncome = (oldIncomes, incomeId) => {
  return oldIncomes.map((income) => {
    return income.id === incomeId
      ? { ...income, isEdited: !income.isEdited }
      : income;
  });
};
const deleteIncome = (oldIncomes, deleteIdIncome) => {
  return oldIncomes.filter(({ id }) => id !== deleteIdIncome);
};

const setIncomeNameAndAmount = (oldIncomes, incomeId, newName, newAmount) => {
  return oldIncomes.map((income) => {
    return income.id === incomeId
      ? { ...income, name: newName, amount: newAmount }
      : income;
  });
};

//VIEW
const renderIncomes = () => {
  incomesDOM.innerHTML = "";
  incomes.forEach((income) => {
    const incomeDOM = document.createElement("li");
    if (income.isEdited) {
      const editFormDOM = document.createElement("form");
      const editFormNameInputDOM = document.createElement("input");
      editFormNameInputDOM.setAttribute("name", "name");
      editFormNameInputDOM.setAttribute("value", income.name);

      const editFormAmountInputDOM = document.createElement("input");
      editFormAmountInputDOM.setAttribute("name", "amount");
      editFormAmountInputDOM.setAttribute("value", income.amount);

      const confirmIncomeBtnDOM = document.createElement("button");
      confirmIncomeBtnDOM.textContent = "Zatwierdź";
      confirmIncomeBtnDOM.setAttribute("style", "width:70px");

      editFormDOM.append(editFormNameInputDOM);
      editFormDOM.append(editFormAmountInputDOM);
      editFormDOM.appendChild(confirmIncomeBtnDOM);
      incomeDOM.append(editFormDOM);

      editFormDOM.addEventListener("submit", (e) => {
        e.preventDefault();

        const { name } = e.currentTarget.elements;
        const newName = name.value;
        const { amount } = e.currentTarget.elements;
        const newAmount = Number(amount.value);

        incomes = setIncomeNameAndAmount(
          incomes,
          income.id,
          newName,
          newAmount
        );
        incomes = toggleIsEditedIncome(incomes, income.id);
        renderIncomes();
      });
    } else {
      incomeDOM.textContent = `${income.name}    ${income.amount}  `;

      const editIncomeBtnDOM = document.createElement("button");
      editIncomeBtnDOM.textContent = "Edytuj";
      editIncomeBtnDOM.setAttribute("style", "width:50px");
      editIncomeBtnDOM.addEventListener("click", () => {
        incomes = toggleIsEditedIncome(incomes, income.id);
        renderIncomes();
      });
      const deleteIncomeBtnDOM = document.createElement("button");
      deleteIncomeBtnDOM.textContent = "Usuń";
      deleteIncomeBtnDOM.setAttribute("style", "width:50px");
      deleteIncomeBtnDOM.addEventListener("click", (e) => {
        incomes = deleteIncome(incomes, income.id);
        renderIncomes();
      });
      incomeDOM.appendChild(editIncomeBtnDOM);
      incomeDOM.appendChild(deleteIncomeBtnDOM);
    }
    incomesDOM.appendChild(incomeDOM);

    // sumOfIncomesDOM.innerHTML = sum(incomes);

    // stateValueDOM.innerHTML = sum(incomes) - sum(expenses);

    addIncomeDOM.reset();
  });
  sumOfIncomesDOM.innerHTML = sum(incomes);

  // stateValueDOM.innerHTML = sum(incomes) - sum(expenses);
  message(incomes, expenses, stateValueDOM);
};

//EVENTS
addIncomeDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name } = e.currentTarget.elements;
  const { amount } = e.currentTarget.elements;

  const newIncome = {
    id: uuid.v4(),
    name: name.value,
    amount: Number(amount.value),
    isEdited: false,
  };

  incomes = addNewIncome(incomes, newIncome);
  renderIncomes();
});
console.log(message());
renderIncomes();
