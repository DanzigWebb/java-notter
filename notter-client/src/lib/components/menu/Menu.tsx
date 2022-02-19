import { AmPortal } from '../../utils';
import { MenuContainer } from './MenuContainer';
import { ReactNode } from 'react';


export class Menu extends AmPortal {

    constructor(
        public node: ReactNode,
        public reference: Element
    ) {
        super(node);
    }

    container = (
        <MenuContainer
            onClose={() => this.close()}
            reference={this.reference}
            context={this}>
            {this.node}
        </MenuContainer>
    );
}