const cardsDiv = document.querySelector('.cards');
const token = localStorage.getItem('login_token');
const addGroupForm = document.forms.group;

async function makeCards() {
  await fetch('http://localhost:3000/accounts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((cards) => {
      if (cards.success === false) {
        cardsDiv.innerHTML = 'SESSION TIMEOUT';
        return;
      }
      cardsDiv.innerHTML = '';
      cards.data.forEach((card) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardsDiv.append(cardDiv);
        cardDiv.innerHTML = `
        <h2>ID: ${card.group_id}</h2>
        <p>${card.name}</p>
        `;
        cardDiv.addEventListener('click', (event) => {
          event.preventDefault();
          window.location.replace(`bills.html?group=${card.group_id}`);
        });
      });
    });
}

function allowShowCards() {
  if (token === null) {
    cardsDiv.innerHTML = 'PLEASE LOGIN';
    throw new Error('Please login');
  }
  makeCards();
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
  if (respInJs.success === false) {
    alert('Something went wrong');
    return;
  }
  addGroupForm.reset();
  alert('Group added!');
  window.location.reload();
}

addGroupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const groupData = {
    group_id: event.target.elements.group.value,
  };
  addGroup(groupData);
});
