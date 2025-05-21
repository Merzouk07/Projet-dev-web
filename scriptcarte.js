// scripta.js

// Fonction pour ouvrir une page détaillée stylée, colorée et animée
function openCleanPage({ bookTitle, author, prix, desc, imgSrc, bookId }) {
  const newWin = window.open('', `bookWindow_${Date.now()}_${Math.random()}`);
  newWin.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Détail du livre - ${bookTitle}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

          /* Reset */
          * { box-sizing: border-box; margin: 0; padding: 0; }

          /* Animation du background dégradé */
          body {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            background: linear-gradient(45deg,rgb(80, 1, 1),rgb(63, 0, 63),rgb(61, 1, 43),rgb(121, 2, 27));
            background-size: 400% 400%;
            animation: gradientBG 20s ease infinite;
          }
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            25% { background-position: 50% 100%; }
            50% { background-position: 100% 50%; }
            75% { background-position: 50% 0%; }
            100% { background-position: 0% 50%; }
          }

          /* Carte principale */
          .card {
            background: #ffffffdd;
            backdrop-filter: blur(8px);
            border-radius: 16px;
            box-shadow: 0 12px 32px rgba(0,0,0,0.15);
            overflow: hidden;
            max-width: 1200px;
            width: 100%;
            display: flex;
            flex-direction: column;
            animation: cardFadeIn 0.8s ease-out both;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .card:hover {
            transform: scale(1.02);
            box-shadow: 0 16px 48px rgba(0,0,0,0.2);
          }
          @keyframes cardFadeIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Image du livre */
          .card img {
            width: 100%;
            max-height: 500px;
            object-fit: cover;
            animation: imgSlideIn 1s ease-out both;
          }
          @keyframes imgSlideIn {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          /* Contenu texte */
          .info {
            padding: 30px;
            display: flex;
            flex-direction: column;
          }
          /* Titre animé en cycle de couleurs */
          .info h1 {
            font-size: 3em;
            margin-bottom: 15px;
            animation: titleColorCycle 10s linear infinite;
          }
          @keyframes titleColorCycle {
            0%   { color:rgb(0, 0, 0); }
            25%  { color:rgb(65, 65, 65); }
            50%  { color:rgb(0, 0, 0); }
            75%  { color:rgb(65, 65, 65); }
            100% { color:rgb(0, 0, 0); }
          }

          /* Auteur */
          .info h2 {
            font-size: 1.5em;
            font-weight: 400;
            color: #444;
            margin-bottom: 15px;
            animation: slideInUp 0.6s ease-out both 0.2s;
          }

          /* Prix */
          .info .meta {
            font-size: 1.1em;
            font-weight: 600;
            margin-bottom: 10px;
            animation: slideInUp 0.6s ease-out both 0.4s;
          }

          /* Description */
          .info .desc {
            white-space: pre-line;
            font-size: 1em;
            line-height: 1.6;
            margin-top: 10px;
            animation: slideInUp 0.6s ease-out both 0.6s;
          }

          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Responsive pour grands écrans */
          @media (min-width: 768px) {
            .card { flex-direction: row; }
            .card img {
              width: 450px;
              height: auto;
            }
            .info { flex: 1; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <img src="${imgSrc}" alt="${bookTitle}">
          <div class="info">
            <h1>${bookTitle}</h1>
            <h2>${author}</h2>
            <div class="meta">Prix : ${prix}</div>
            <div class="desc">${desc}</div>
          </div>
        </div>
      </body>
    </html>
  `);
  newWin.document.close();
}

// Ajout dynamique des boutons "Voir" sur chaque carte existante
document.querySelectorAll('.carte').forEach(carte => {
  const fullTitle = carte.querySelector('.titre').innerText.trim();
  const [bookTitle, ...rest] = fullTitle.split(' - ');
  const author   = rest.join(' - ') || 'Auteur inconnu';
  const desc     = carte.querySelector('.desc').innerText.trim();
  const imgSrc   = carte.querySelector('img').src;
  const prix     = carte.querySelector('.prix').innerText.trim();
  const bookId   = carte.querySelector('.acheter').dataset.bookId;

  const btnVoir = document.createElement('button');
  btnVoir.innerText = 'Voir';
  btnVoir.classList.add('voir');
  Object.assign(btnVoir.style, {
    marginLeft: '10px',
    background: '#222',
    color: '#fff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s',
  });
  btnVoir.onmouseover = () => btnVoir.style.background = '#444';
  btnVoir.onmouseout  = () => btnVoir.style.background = '#222';

  btnVoir.addEventListener('click', () => openCleanPage({
    bookTitle, author, prix, desc, imgSrc, bookId
  }));

  carte.querySelector('.box').appendChild(btnVoir);
});
