const cardsDiv = document.querySelector('.cards');
const token = localStorage.getItem('login_token');

async function makeCards() {
  await fetch('http://localhost:3000/accounts', {
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
      cards.data.forEach((card) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardsDiv.append(cardDiv);
        cardDiv.innerHTML = `
        <h2>ID: ${card.group_id}</h2>
        <p>${card.name}</p>
        `;
      });
    });
}

function allowShowArticles() {
  if (token === null) {
    cardsDiv.innerHTML = 'PLEASE LOGIN';
    throw new Error('Please login');
  }
  makeCards();
}

allowShowArticles();
