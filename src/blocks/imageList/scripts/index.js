function getNumToAdd(el) {
    const numColumns = parseInt(el.dataset.imageListColumns);
    const screenWidth = window.screen.availWidth;
    const currentlyDisplayed = el.querySelectorAll('.image-list__image:not(.hidden)').length;

    if (screenWidth >= 768 && screenWidth < 992) {
        return 4 + (currentlyDisplayed % 2);
    } else if (screenWidth < 768) {
        return 3;
    }

    return (numColumns * 2) + (currentlyDisplayed % numColumns);
}

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('[data-image-list]').forEach((el) => {
        const moreButton = el.querySelector('.image-list__more button');

        if (moreButton) {
            moreButton.addEventListener("click", () => {
                let numToAdd = getNumToAdd(el);
                const items = el.querySelectorAll(".hidden");

                for (let i = 0; i < numToAdd && i < items.length; i++) {
                    items[i].classList.remove('hidden');
                }

                const hiddenItems = el.querySelectorAll(".hidden");

                if (hiddenItems.length === 0) {
                    el.querySelector('.image-list__more').classList.add('hidden');
                }
            })
        }

    });
})
