function createSortedList(){
    return obj = {
        list: [],
        add: (element) => {
            obj.list.push(element);
            obj.size = obj.list.length;
            obj.list.sort((a, b) => (a-b))
        },
        remove: (index) => {
            if(index < 0 || index >= obj.size ){
                return;
            }
            obj.list.splice(index, 1);
            obj.size = obj.list.length;
            obj.list.sort((a, b) => (a-b))
        },
        get: (index) =>  obj.list[index],
        size: 0
    }
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(-1);
console.log(list.get(1));
console.log(list.size);
console.log(list);
