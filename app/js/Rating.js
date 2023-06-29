export default class Rating {
    constructor(dom) {
        this.svg = this.createSvgElement();
        dom.innerHTML = '';
        dom.appendChild(this.svg);
        this.svg.onclick = (e) => this.change(e);
        this.render();
    }

    createSvgElement() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '76');
        svg.setAttribute('height', '12');
        for (let i = 0; i < 5; i++) {
            svg.appendChild(this.createPolygonElement(i + 1, i * 15));
        }
        return svg;
    }

    createPolygonElement(value, translateX) {
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.dataset.value = value;
        polygon.setAttribute('transform', `translate(${translateX}, 0)`);
        polygon.setAttribute('points', '6,0 7.79422863406,4.364402688 12,4.364402688 8.30555127546,7.30555127546 10.0997799095,12 6,9.6789308805 1.90022009048,12 3.69444872454,7.30555127546 0,4.364402688 4.20577136594,4.364402688');
        return polygon;
    }

    change(e) {
        const value = e.target.dataset.value;
        if (value) {
            this.svg.parentNode.dataset.value = value;
            this.render();
        }
    }

    render() {
        const currentValue = +this.svg.parentNode.dataset.value;
        this.svg.querySelectorAll('polygon').forEach((star) => {
            const starValue = +star.dataset.value;
            star.classList.toggle('active', currentValue >= starValue);
        });
    }
}
