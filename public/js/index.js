// Fonction pour attacher les écouteurs de suppression des publications
function attachPostRemoveListeners() {
    const postRemoveButtonsList = document.querySelectorAll('.js-remove-post-button');
  
    postRemoveButtonsList.forEach(function (postRemoveButton) {
      postRemoveButton.addEventListener('click', function (event) {
        const buttonElement = event.target;
        const id = buttonElement.getAttribute('data-id');
        const options = {
          method: 'delete',
          headers: {
            'content-type': 'application/json'
          }
        };
  
        const url = `/delete_post/${id}`;
        console.log(url);
  
        fetch(url, options)
          .then(function (response) {
            if (response.ok) {
              // Si la suppression de la publication est réussie (réponse avec code 200)
              // Récupérer l'élément de ligne à supprimer
              const articleElement = document.querySelector(`.js-posts-table tr[data-id="${id}"]`);
              // Supprimer l'élément de ligne du DOM
              articleElement.remove();
            } else {
              // Si la suppression échoue, afficher les erreurs dans la console
              response.json().then(console.log);
            }
          })
          .catch((err) => {
            // Gérer les erreurs lors de l'envoi de la requête
            console.log(err);
          });
      });
    });
  }
  
  // Fonction pour attacher les écouteurs de suppression des produits
  function attachProductRemoveListeners() {
    const productRemoveButtonList = document.querySelectorAll('.js-remove-product-button');
  
    productRemoveButtonList.forEach(function (productRemoveButton) {
      productRemoveButton.addEventListener('click', function (event) {
        const buttonElement = event.target;
        const id = buttonElement.getAttribute('data-id');
        const options = {
          method: 'delete',
          headers: {
            'content-type': 'application/json'
          }
        };
  
        const url = `/delete_product/${id}`;
        console.log(url);
  
        fetch(url, options)
          .then(function (response) {
            if (response.ok) {
              // Si la suppression du produit est réussie (réponse avec code 200)
              // Récupérer l'élément de ligne à supprimer
              const articleElement = document.querySelector(`.js-products-table tr[data-id="${id}"]`);
              // Supprimer l'élément de ligne du DOM
              articleElement.remove();
            } else {
              // Si la suppression échoue, afficher les erreurs dans la console
              response.json().then(console.log);
            }
          })
          .catch((err) => {
            // Gérer les erreurs lors de l'envoi de la requête
            console.log(err);
          });
      });
    });
  }
  
  function calculateAndUpdateTotalAmount() {
    // Sélectionner tous les éléments de produit dans le panier
    const productElements = document.querySelectorAll('.js-product-bucket .product');
    let totalAmount = 0;
  
    // Calculer le montant total en parcourant tous les produits dans le panier
    productElements.forEach(function (productElement) {
      // Récupérer le montant du produit et le convertir en nombre
      const amount = parseFloat(productElement.dataset.amount);

      // Ajouter le montant du produit au montant total
      totalAmount += amount;
    });
  
    // Mettre à jour l'affichage du montant total
    const totalAmountElement = document.querySelector('.js-total-amount');
    totalAmountElement.textContent = totalAmount.toFixed(0);
  }
  // Fonction pour attacher les écouteurs de suppression des produits dans le panier
  function attachBucketRemoveListeners() {
    const bucketRemoveProductList = document.querySelectorAll('.js-remove-bucketProduct-button');
  
    bucketRemoveProductList.forEach(function (bucketRemoveButton) {
      bucketRemoveButton.addEventListener('click', function (event) {
        const buttonElement = event.target;
        const id = buttonElement.getAttribute('data-id');
        const options = {
          method: 'delete',
          headers: {
            'content-type': 'application/json'
          }
        };
  
        const url = `/delete_bucket/${id}`;
        console.log(url);
  
        fetch(url, options)
          .then(function (response) {
            if (response.ok) {
              // Si la suppression du produit dans le panier est réussie (réponse avec code 200)
              // Récupérer l'élément de produit à supprimer dans le panier
              const bucketElement = document.querySelector(`.js-product-bucket div[data-id="${id}"]`);
              // Supprimer l'élément de produit du panier du DOM
              bucketElement.remove();
              calculateAndUpdateTotalAmount()
            } else {
              // Si la suppression échoue, afficher les erreurs dans la console
              response.json().then(console.log);
            }
          })
          .catch((err) => {
            // Gérer les erreurs lors de l'envoi de la requête
            console.log(err);
          });
      });
    });
  }
  
  // Événement DOMContentLoaded pour exécuter le code une fois le contenu chargé
  document.addEventListener('DOMContentLoaded', function () {
    attachPostRemoveListeners();
    attachProductRemoveListeners();
    attachBucketRemoveListeners();
    
  });
  