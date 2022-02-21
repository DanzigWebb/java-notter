import { ModalContainer } from './ModalContainer';
import { AmPortal } from '../../utils';
import { ReactNode } from 'react';

type ContainerType = 'default';

export class Modal extends AmPortal {

    constructor(
        public node: ReactNode,
        public containerWidthClass = '',
        public type: 'default' = 'default'
    ) {
        super(node);
        this.container = this.setContainer(type);
    }

    setContainer(type: ContainerType) {
        switch (type) {
            default:
                return (
                    <ModalContainer
                        onClose={() => this.close()}
                        className={this.containerWidthClass}
                    >
                        {this.node}
                    </ModalContainer>
                );
        }
    }
}
