// Gestion de l'animation des cartes au clic
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    let that = card;
    card.addEventListener('click', () => {
        console.log(that);
        that.childNodes[0].classList.toggle('active');
    });
});