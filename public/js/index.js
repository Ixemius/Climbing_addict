document.addEventListener('DOMContentLoaded', function () {
    const postRemoveButtonsList = document.querySelectorAll('.js-remove-post-button');
    const productRemoveButtonList = document.querySelectorAll('.js-remove-product-button');
    const bucketRemoveProductList = document.querySelectorAll('.js-remove-bucketProduct-button')

    if (postRemoveButtonsList.length > 0) {
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
                            // Récupérer la ligne à supprimer
                            const articleElement = document.querySelector(`.js-posts-table tr[data-id="${id}]`);
                            articleElement.remove();
                        } else {
                            response.json().then(console.log);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        });
    }
    if (productRemoveButtonList.length > 0) {
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
                            // Récupérer la ligne à supprimer
                            const articleElement = document.querySelector(`.js-products-table tr[data-id="${id}]`);
                            articleElement.remove();
                        } else {
                            response.json().then(console.log);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        });
    }
    if(bucketRemoveProductList.length < 0) {
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
                            // Récupérer la ligne à supprimer
                            const bucketElement = document.querySelector(`.product-bucket button[data-id="${id}]`);
                            console.log(bucketElement)
                            bucketElement.remove();
                        } else {
                            response.json().then(console.log);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        });
    }
});
