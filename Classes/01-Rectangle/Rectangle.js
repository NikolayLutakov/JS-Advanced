class Rectangle {
    constructor(width, height, color) {
        this.color = color,
        this.width = width,
        this.height = height
    }


    calcArea(){
        return this.height * this.width
    }
}