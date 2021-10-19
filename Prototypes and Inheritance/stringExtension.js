(function solve() {
    String.prototype.ensureStart = function (str) {
        if (this.startsWith(str)) {
            return `${this}`;
        }
        return `${str}${this}`;
    }

    String.prototype.ensureEnd = function (str) {
        if (this.endsWith(str)) {
            return `${this}`;
        }
        return `${this}${str}`;
    }

    String.prototype.isEmpty = function () {
        if (this.length == 0) {
            return true;
        }

        return false;
    }

    String.prototype.truncate = function (n) {
        const end = '...';
        let string = this


        if (string.length < n) {
            return string.toString();
        }

        if (string.substr(-3) == end) {
            string = string.substring(0, string.length - 3)
        }

        if (string.lastIndexOf(' ') == -1) {
            if (n < 4) {
                return '.'.repeat(n);
            }

            return string.substring(0, n - 3) + end;
        }

        let substring = string.substring(0, string.lastIndexOf(' '));
        let diff = n - substring.length;

        if (diff > 3) {
            diff = 3;
        }

        return substring + '.'.repeat(diff);

    }
    String.format = function (string, ...params) {
        let pattern = /{[0-9]+}/g;
        let matches = string.match(pattern);
        for (const match of matches) {
            let index = Number(match.slice(1, -1));
            if (params[index] !== undefined) {
                string = string.replace(match, params[index]);
            }
        }
        return string;
    }
})()

let str = 'my string';
str = str.ensureStart('my');
console.log(str)
str = str.ensureStart('hello ');
console.log(str)
str = str.truncate(16);
console.log(str)
str = str.truncate(14);
console.log(str)
str = str.truncate(8);
console.log(str)
str = str.truncate(4);
console.log(str)
str = str.truncate(2);
console.log(str)