const books = {
    1: {
        title: "Intérieur nuit",
        price: 2600,
        image: "img/Interieur-nuit.jpg"
    },
    2: {
        title: "The Hunger Games - Lever de soleil sur la moisson",
        price: 2900,
        image: "img/Hunger-Games-Lever-de-soleil-sur-la-moion.jpg"
    },
    3: {
        title: "La Très Catastrophique Visite du Zoo",
        price: 2750,
        image: "img/La-Tres-Catastrophique-Visite-du-Zoo.jpg"
    },
    4: {
        title: "Commandant Servaz - H",
        price: 3350,
        image: "img/H.jpg"
    },
    5: {
        title: "L'art de la guerre",
        price: 450,
        image: "img/L-art-de-la-guerre.jpg"
    },
    6: {
        title: "Les 48 lois du pouvoir",
        price: 4100,
        image: "img/Power.jpg"
    },
    7: {
        title: "Solo Leveling T17",
        price: 2650,
        image: "img/Solo-Leveling-T17.jpg"
    },
    8: {
        title: "One Piece - Tome 109",
        price: 1000,
        image: "img/One-Piece-Edition-originale-Tome-109.jpg"
    },
    9: {
        title: "Croc-Blanc - Classiques et Patrimoine",
        price: 1000,
        image: "img/Croc-Blanc-Claiques-et-Patrimoine.jpg"
    },
    10: {
        title: "Influence et manipulation",
        price: 1800,
        image: "img/Influence-et-manipulation.jpg"
    },
    11: {
        title: "Dragon Ball - Son Gokû et ses amis",
        price: 1100,
        image: "img/Dragon-Ball-Edition-originale-Tome-01.jpg"
    },
    12: {
        title: "Le Livre De La Jungle",
        price: 850,
        image: "img/Le-Livre-de-la-jungle.jpg"
    },
    13: {
        title: "Le Petit Prince",
        price: 5000,
        image: "img/Le-Petit-Prince.jpg"
    },
    14: {
        title: "Doraemon",
        price: 1400,
        image: "img/Doraemon-Tome-1.jpg"
    },
    15: {
        title: "Détective Conan Tome 105",
        price: 1300,
        image: "img/Detective-Conan-Tome-105.jpg"
    },
    16: {
        title: "Le Deep Work Planner",
        price: 1800,
        image: "img/Le-Deep-Work-Planner.jpg"
    },
    17: {
        title: "Antifragile",
        price: 5660,
        image: "img/Antifragile.jpg"
    },
    18: {
        title: "L'Île Mystérieuse",
        price: 2000,
        image: "img/L-Ile-mysterieuse.jpg"
    },
    19: {
        title: "Le Tour du monde en 80 jours",
        price: 700,
        image: "img/Le-Tour-du-monde-en-80-jours.jpg"
    },
    20: {
        title: "Vingt mille lieues sous les mers - Prépas scientifiques 2025-2026",
        price: 1400,
        image: "img/Vingt-mille-lieues-sous-les-mers-Prepas-scientifiques-2025-2026.jpg"
    },
    21: {
        title: "Captain Tsubasa",
        price: 1900,
        image: "img/Captain-Tsubasa-Saison-1-T01.jpg"
    },
    22: {
        title: "Le Fils du pauvre",
        price: 1750,
        image: "img/Le-Fils-du-pauvre.jpg"
    },
    23: {
        title: "Histoire de l'Algérie",
        price: 2900,
        image: "img/Histoire-de-l-Algerie.jpg"
    },
    24: {
        title: "L'Opium et le bâton",
        price: 2200,
        image: "img/L-Opium-et-le-baton.jpg"
    },
    25: {
        title: "Jours de Kabylie",
        price: 1350,
        image: "img/Jours-de-Kabylie.jpg"
    }
};


// ========== Gestion du panier ==========
const cart = {
    items: [],
    total: 0,

    addItem(bookId) {
        const book = books[bookId];
        if (!book) return;

        const existing = this.items.find(item => item.id === bookId);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({
                id: bookId,
                title: book.title,
                price: book.price,
                quantity: 1,
                image: book.image
            });
        }

        this.total += book.price;
        this.updateCartDisplay();
        this.saveToStorage();
        this.showCart();
    },

    removeItem(bookId) {
        const index = this.items.findIndex(item => item.id === bookId);
        if (index !== -1) {
            this.total -= this.items[index].price * this.items[index].quantity;
            this.items.splice(index, 1);
            this.updateCartDisplay();
            this.saveToStorage();
        }
    },

    updateCartDisplay() {
        const cartItemsElement = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total-price');

        cartItemsElement.innerHTML = '';

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div>
                    <strong>${item.title}</strong><br>
                    ${item.price} DA x ${item.quantity}
                </div>
                <div>
                    ${item.price * item.quantity} DA
                    <button class="remove-item" data-id="${item.id}">❌</button>
                </div>
            `;
            itemElement.querySelector('.remove-item').addEventListener('click', () => {
                this.removeItem(item.id);
            });

            cartItemsElement.appendChild(itemElement);
        });

        cartTotalElement.textContent = `${this.total} DA`;
    },

    showCart() {
        document.getElementById('cart-popup').style.display = 'block';
    },

    hideCart() {
        document.getElementById('cart-popup').style.display = 'none';
    },

    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify({ items: this.items, total: this.total }));
    },

    loadFromStorage() {
        const saved = localStorage.getItem('cart');
        if (saved) {
            const parsed = JSON.parse(saved);
            this.items = parsed.items || [];
            this.total = parsed.total || 0;
            this.updateCartDisplay();
        }
    }
};

// ========== Validation mot de passe ==========
function validatePassword() {
    const password = document.getElementById("mdp").value;
    const confirmPassword = document.getElementById("cmdp").value;
    const errorMessage = document.getElementById("error-message");

    if (password !== confirmPassword) {
        errorMessage.textContent = "Les mots de passe ne correspondent pas !";
        return false;
    } else {
        errorMessage.textContent = "";
        return true;
    }
}

// ========== Écouteurs d'événements DOM ==========
document.addEventListener('DOMContentLoaded', () => {
    // Boutons Acheter
    document.querySelectorAll('.acheter').forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.getAttribute('data-book-id');
            cart.addItem(bookId);
        });
    });

    // Fermeture du panier
    document.getElementById('close-cart').addEventListener('click', () => cart.hideCart());

    // Paiement (placeholder)
    document.getElementById('checkout').addEventListener('click', () => {
        alert("Fonctionnalité de paiement à venir !");
    });

    // Chargement depuis localStorage
    cart.loadFromStorage();
});
