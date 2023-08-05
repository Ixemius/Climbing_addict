// Attendre que le contenu de la page soit chargé avant d'exécuter le code JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialiser une variable "dyslexie" à false pour suivre l'état de la dyslexie (activée ou désactivée)
    let dyslexie = false;
    // Récupérer le bouton avec l'ID "dys" dans le document HTML
    let dysButton = document.getElementById('dys');

    // Ajouter un événement "click" sur le bouton "dys"
    dysButton.addEventListener('click', function () {
        // Inverser l'état de la variable "dyslexie" (true devient false, et vice versa)
        dyslexie = !dyslexie;
        // Ajouter ou supprimer la classe "active" sur le bouton pour indiquer visuellement si la dyslexie est activée ou désactivée
        dysButton.classList.toggle('active');
        // Si la dyslexie est activée, ajouter la classe "dyslexia" au corps du document (body)
        if (dyslexie)
            document.body.classList.add('dyslexia');
        // Sinon, supprimer la classe "dyslexia" du corps du document (body) pour désactiver la dyslexie
        else {
            document.body.classList.remove('dyslexia');
        }
    });
}); 
