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
        if (n < 4) {
            let result = []
            for (let i = 0; i < n; i++) {
                result.push('.');
            }
            return result.join('');
        }
        if (n >= this.length) {
            return `${this}`;
        }
        if (this.split(' ')[0].length === this.length) {
            return this.slice(0, n - 3) + '...';
        }
        let result = [];
        let counter = 3;
        let splitStr = this.split(' ');
        while (true) {
            let el = splitStr.shift()
            let elLength = el.length;
            if (counter + elLength > n) {
                break;
            }
            result.push(el);
            counter += elLength + 1;
        }
        return result.join(' ') + '...';
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

