export const onMenuEnter = (el: Element) => {
    return el.animate([{
        opacity: 0,
        transform: 'scale(0.8) translateX(-5px) translateY(20px)',
    }, {
        opacity: 1,
        transform: 'scale(1) translateX(0) translateY(0)'
    }], {
        duration: 120,
        easing: 'cubic-bezier(0.55, 0, 0.55, 0.2)'
    });
};

export const onMenuExit = (el: Element) => {
    return el.animate([{opacity: 1}, {opacity: 0}], {
        duration: 120
    });
};