import { ReactNode } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

/**
 * Класс для динамического отображения контента
 */
export class AmPortal {
    portalEl: Element | null = null;
    container = <>{this.node}</>;

    constructor(
        public node: ReactNode
    ) {}

    /* Создаем обертку для рендера и помещаем контейнер внутрь */
    show() {
        this.portalEl = document.createElement('div');
        document.body.appendChild(this.portalEl);
        render(this.container, this.portalEl);
    }

    /* Уничтожение обертки и отвязка реакта */
    close() {
        if (this.portalEl) {
            if (unmountComponentAtNode(this.portalEl)) {
                document.body.removeChild(this.portalEl);
            }
        }
    }
}