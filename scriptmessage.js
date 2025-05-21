    document.querySelector('.message-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche le rechargement de la page

        const nameInput = this.querySelector('input');
        const messageInput = this.querySelector('textarea');
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            const messageContainer = document.createElement('div');
            messageContainer.className = 'message';
            messageContainer.innerHTML = `<strong>${name} :</strong> ${message}`;

            const discussion = document.querySelector('.discussion-container');
            discussion.insertBefore(messageContainer, this); // Ajoute le message avant le formulaire

            // Vide les champs après envoi
            nameInput.value = '';
            messageInput.value = '';
        }
    });