function rectangle(_width, _height, _color){
    return obj = {
        width: Number(_width),
        height: Number(_height),
        color: _color[0].toUpperCase() + _color.substring(1),
        calcArea: () => obj.width * obj.height
    }
}

let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());
