function calculator() {
    let selector1;
    let selector2;
    let resultSelector;

    const init = (s1, s2, r) => {
        selector1 = document.querySelector(s1);
        selector2 = document.querySelector(s2);
        resultSelector = document.querySelector(r);
    };

    const add = () => {
        resultSelector.value = Number(selector1.value) + Number(selector2.value)
    };

    const subtract = () => {
        resultSelector.value = Number(selector1.value) - Number(selector2.value)
    };

    const mapper = {
        init,
        add,
        subtract 
    }


    return mapper;
}
