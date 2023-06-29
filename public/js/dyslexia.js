document.addEventListener('DOMContentLoaded', function () {
    let dyslexie = false;
    let dysButton = document.getElementById('dys');

    dysButton.addEventListener('click', function () {
        dyslexie = !dyslexie;
        dysButton.classList.toggle('active');
        if (dyslexie)
            document.body.classList.add('dyslexia');
        else {
            document.body.classList.remove('dyslexia');
        }
    });
});