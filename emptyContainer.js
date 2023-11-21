const emptyContainer = (container) => {
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    };
}

export default emptyContainer;