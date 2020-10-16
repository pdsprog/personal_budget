const personalBudget = {

  //Mobile Variables
  addItemBtn: document.querySelector('.add-item-btn'),
  closeItemBoxBtn: document.querySelector('.close-box-btn'),

  //General Variables
  budgetInput: document.querySelector('.budget-input'),
  expensesItemInput: document.querySelector('.item-input'),
  expensesPriceInput: document.querySelector('.price-input'),

  //Mobile Method
  displayItemBox() {
    const box = document.querySelector('.budgetExpBox');
    box.classList.toggle('displayBox');
  },


  // General Method
  clearInputs() {
    if (this.budgetInput.value !== '') {
      this.expensesItemInput.value = '';
      this.expensesPriceInput.value = '';
      this.expensesItemInput.focus();
    }

    if (this.budgetInput.value == '') {
      this.budgetInput.value = '';
      this.expensesItemInput.value = '';
      this.expensesPriceInput.value = '';
      this.budgetInput.focus();
    }
  },


  budgetSection() {
    let editBtn = document.querySelector('.budgetEditBtn');
    let addBtn = document.querySelector('.budgetAddBtn');

    addBtn.addEventListener('click', () => {
      this.budgetInput.disabled = true;
      editBtn.disabled = false;
      addBtn.disabled = true;
      this.balanceUpdate();
    })

    editBtn.addEventListener('click', () => {
      this.budgetInput.disabled = false;
      this.budgetInput.focus();
      editBtn.disabled = true;
      addBtn.disabled = false;
    })
  },

  expensesSection() {
    let clearBtn = document.querySelector('.expensesClearBtn');
    let addBtn = document.querySelector('.expensesAddBtn');
    let tableBody = document.querySelector('.table-body');

    addBtn.addEventListener('click', () => {
      let addLineToTable = this.createTableLine();
      tableBody.appendChild(addLineToTable);
      this.clearInputs();
      this.deleteTableLine();
      this.balanceUpdate();
    });

    clearBtn.addEventListener('click', this.clearInputs);
  },

  balanceUpdate() {
    const balance = document.querySelector('.balance-total');
    const tablePrices = document.querySelectorAll('.td-price');
    let budget = this.budgetInput.value;
    let total = 0;
    
    tablePrices.forEach(price => total += Number(price.textContent))
    balance.textContent = `$${budget - total}`
  },


  // Table Methods
  createTd(className) {
    let td = document.createElement('td');
    td.classList.add(className);

    return td;
  },

  createTableLine() {
    let tr = document.createElement('tr');
    tr.classList.add('table-body-tr');

    let item = this.createTd('td-item');
    item.textContent = this.expensesItemInput.value;

    let price = this.createTd('td-price');
    price.textContent = this.expensesPriceInput.value;

    let deleteItem = this.createTd('td-delete');
    let trashIcon = document.createElement('i');
    trashIcon.classList.add('fas');
    trashIcon.classList.add('fa-trash-alt');
    trashIcon.classList.add('td-trash-icon');
    deleteItem.appendChild(trashIcon);

    tr.appendChild(item);
    tr.appendChild(price);
    tr.appendChild(deleteItem);

    return tr;
  },

  deleteTableLine() {
    const trashIcon = document.querySelectorAll('.td-trash-icon');

    trashIcon.forEach(icon => {
      icon.addEventListener('click', function () {
        let line = this.parentNode.parentNode;
        line.classList.add('deleteLine');
        setTimeout(() => {
          line.remove();
          personalBudget.balanceUpdate();
        }, 200);
      })
    })
  },


  init() {
    //Mobile
    this.addItemBtn.addEventListener('click', this.displayItemBox);
    this.closeItemBoxBtn.addEventListener('click', this.displayItemBox);

    //General
    this.budgetSection();
    this.expensesSection();
    this.clearInputs();
  }

}

personalBudget.init();