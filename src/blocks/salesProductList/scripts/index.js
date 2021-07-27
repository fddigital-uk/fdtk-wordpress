window.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.prodlist__button');

    products.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.classList.toggle('prodlist__included--hidden');
        });
    })
});
