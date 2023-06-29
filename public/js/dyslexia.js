document.addEventListener('DOMContentLoaded', function () {
    let dyslexie = false;
    let dysButton = document.getElementById('dys');
    let body = document.querySelector('body');
    dysButton.addEventListener('click', function () {
        dyslexie = !dyslexie;
        dysButton.classList.toggle('active');
        if (dyslexie)
            body.classList.add('dyslexia');
        else {
            body.classList.remove('dyslexia');
        }
    });
});