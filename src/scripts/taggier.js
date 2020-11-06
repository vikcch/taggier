const taggier = class Taggier {

    /**
     * 
     * @param {string} divId 
     * @param {{gap: number, forbiddenPattern: false | RegExp, hashtag: boolean, border: boolean }} options default values:  
     * * gap: `16`;  
     * * forbiddenPattern: `/[^\w]+/g`; (set to `false` to have none)  
     * * hashtag: `false`;
     * * border: `true`  
     */
    constructor(divId, options = {}) {

        const gap = options.gap || 16;
        const pattern = options.forbiddenPattern === false
            ? null
            : options.pattern || /[^\w]+/g;
        const hashtag = options.hashtag;
        const border = options.border ?? true;

        this.container = document.querySelector(`#${divId}`);

        if (this.container === null) {
            throw Error('The first paremeter (DivId) of the object Taggier was not found');
        }

        if (border) {

            const borders = ['top', 'right', 'bottom', 'left'];
            const hasBorder = borders.some(side => {

                const style = getComputedStyle(this.container, null);
                const width = style.getPropertyValue(`border-${side}-width`);
                return width !== '0px';
            });

            if (!hasBorder) {
                this.container.style.border = '1px solid gray';
            }
        }

        this.container.style.cursor = 'text';
        this.container.style.padding = `${gap / 2}px`;
        this.container.addEventListener('click', (e) => {

            if (e.target.tagName.toLowerCase() === 'span') {

                this.container.removeChild(e.target);
            }
            this.input.focus();
        });

        this.input = document.createElement('input');
        this.input.style.border = 'none';
        this.input.style.flex = 1;
        this.input.style.padding = '8px';
        this.container.appendChild(this.input);

        this.input.addEventListener('input', (e) => {

            const value = this.input.value.replace(',', '');

            this.input.value = value.replace(pattern, '');

            const createTag = e.data === ',' && value.trim();

            if (createTag) {

                const prefix = hashtag ? '#' : '';
                const tagText = `${prefix}${this.input.value.trim()}`;
                this.input.value = '';

                const duplicate = this.getTags().find(x => {

                    return x.toLowerCase() === tagText.toLowerCase();
                });

                if (duplicate) return;

                const span = document.createElement('span');
                span.innerHTML = tagText;
                span.classList.add('tag');
                span.style.margin = `${gap / 2}px`;
                this.container.insertBefore(span, this.input);
            }
        });

        this.input.addEventListener('keydown', (e) => {

            const remove = e.key === "Backspace" && this.input.value === '';
            if (remove) {
                const spans = this.container.querySelectorAll('span');
                if (!spans.length) return;
                const lastSpan = spans[spans.length - 1];
                this.container.removeChild(lastSpan);
            }
        });

        this.container.style.display = 'flex';
        this.container.style.flexWrap = 'wrap';
    }

    /**
     * @returns {Array} Array of strings
     */
    get tags() {

        const spans = this.container.querySelectorAll('span');

        return Array.from(spans).map(x => x.textContent);
    }

    /**
     * @returns {Array} Array of strings
     */
    getTags() {

        return this.tags;
    }
}


export default taggier;