// Récupérer toutes les balises h2 présentes dans la page
const h2Elements = document.querySelectorAll('h2');

// Fonction pour gérer l'animation d'affichage de .hover
function showHoverAnimation(e) {
    // Vérifier si la largeur de l'écran est au moins de 1023 pixels
    if (window.matchMedia('(min-width: 1023px)').matches) {
        // Récupérer l'élément .hover associé à cette balise h2
        const hoverElement = e.currentTarget.nextElementSibling;

        // Afficher le contenu de .hover en ajoutant une classe "show"
        hoverElement.style.display = 'flex';
        hoverElement.style.alignItems = 'center';
        hoverElement.style.width = 'auto';
        hoverElement.style.opacity = '1';
        hoverElement.style.animationIterationCount = 'infinite';
        hoverElement.style.transform = 'translateY(0)';
    }
}

// Fonction pour gérer la fin du survol
function handleMouseOut(e) {
    // Vérifier si la largeur de l'écran est au moins de 1023 pixels
    if (window.matchMedia('(min-width: 1023px)').matches) {
        // Récupérer l'élément .hover associé à cette balise h2
        const hoverElement = e.currentTarget.nextElementSibling;

        // Masquer le contenu de .hover lorsque la souris quitte la balise h2
        hoverElement.style.display = 'none';
        hoverElement.style.opacity = '0';
        hoverElement.style.transform = 'translateY(-20px)';
    }
}

// Parcourir toutes les balises h2 et ajouter les événements de survol
h2Elements.forEach((h2Element) => {
    h2Element.addEventListener('mouseenter', (e) => {
        showHoverAnimation(e);
    });
    h2Element.addEventListener('mouseleave', (e) => {
        handleMouseOut(e);
    });
});
