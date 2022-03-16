const cardsDiv = document.querySelector('.cards');
const tableDiv = document.querySelector('.table-div');
const token = localStorage.getItem('login_token');
const addGroupForm = document.forms.group;

const query = window.location.search;
const groupFromQuery = query.split('=')[1];

async function makeTable() {
  await fetch(`http://localhost:3000/bills/${groupFromQuery}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((cards) => {
      console.log('cards ===', cards);
      if (cards.success === false) {
        cardsDiv.innerHTML = 'SESSION TIMEOUT';
        return;
      }
      cardsDiv.innerHTML = '';

      const tbl = document.createElement('table');
      tableDiv.append(tbl);
      const tblBody = document.createElement('tbody');
      tbl.append(tblBody);
      const mainRow = document.createElement('tr');
      tblBody.append(mainRow);
      mainRow.innerHTML = `
      <th>ID</th>
      <th>Description</th>
      <th>Amount</th>`;

      cards.data.forEach((card) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <td>${card.bill_id}</td>
        <td>${card.description}</td>
        <td>${card.amount}</td>
        `;
        tblBody.append(tableRow);
      });
    });
}

function allowShowCards() {
  if (token === null) {
    cardsDiv.innerHTML = 'PLEASE LOGIN';
    throw new Error('Please login');
  }
  makeTable();
}

allowShowCards();

async function addGroup(groupData) {
  const resp = await fetch('http://localhost:3000/accounts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData),
  });

  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);
  if (respInJs.success === false) {
    alert('Something went wrong');
    return;
  }
  alert('Group added!');
  window.location.reload();
}

addGroupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const groupData = {
    group_id: event.target.elements.group.value,
  };
  console.log('groupData ===', groupData);
  addGroup(groupData);
});
