export default class ReadMore {
    constructor(readMoreButtonSelector, aboutTextSelector, visibleChars) {
        this.readMoreButton = document.querySelector(readMoreButtonSelector);
        this.aboutText = document.querySelector(aboutTextSelector);
        this.visibleChars = visibleChars;
        this.originalText = this.aboutText.textContent;
        this.init();
    }

    init() {
        this.setInitialText();
        this.readMoreButton.addEventListener('click', () => this.toggleText());
    }

    setInitialText() {
        this.aboutText.textContent = this.originalText.substring(0, this.visibleChars) + '...';
    }

    toggleText() {
        const isExpanded = this.readMoreButton.dataset.state === 'expanded';

        if (isExpanded) {
            this.collapseText();
        } else {
            this.expandText();
        }
    }

    collapseText() {
        this.aboutText.textContent = this.originalText.substring(0, this.visibleChars) + '...';
        this.readMoreButton.innerHTML = 'Читать дальше<span class="decor-line"></span>';
        delete this.readMoreButton.dataset.state;
    }

    expandText() {
        this.aboutText.textContent = this.originalText;
        this.readMoreButton.innerHTML = 'Скрыть<span class="decor-line"></span>';
        this.readMoreButton.dataset.state = 'expanded';
    }
}