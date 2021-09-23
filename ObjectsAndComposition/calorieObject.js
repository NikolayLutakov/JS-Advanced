function composeObject(input) {
    const obj = {};

    while (input.length > 0) {
        let key = input.shift();
        let value = Number(input.shift());

        obj[key] = value;
    }
    console.log(obj);
}

composeObject(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);