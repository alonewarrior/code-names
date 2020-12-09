interface String {
    capitalizeFirstLetter():  string;
    lowercaseFirstLetter(): string;
    toCamelCase(): string;
    toPascalCase(): string;
    toSnakeCase(): string;
    toKebabCase(): string;
}
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.lowercaseFirstLetter = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
};

String.prototype.toCamelCase = function() {
    return this.replace(/^([A-Z0-9])|[-_](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
};

String.prototype.toPascalCase = function () {
    return this.toCamelCase().capitalizeFirstLetter();
};

String.prototype.toSnakeCase = function () {
    return this.replace(/([A-Z0-9])/g, function ($1, $2, index) {
        if (index === 0) {
            return $1.toLowerCase();
        }
        return '_' + $1.toLowerCase();
    });
};

String.prototype.toKebabCase = function () {
    return this.replace(/([A-Z0-9])/g, function ($1, $2, index) {
        if (index === 0) {
            return $1.toLowerCase();
        }
        return '-' + $1.toLowerCase();
    });
};

interface Array<T> {
    tap(func: (item: T, index: number, arr: Array<T>) => void): Array<T>;
    flat(): Array<any>;
    flat<Y>(): Array<Y>;
}

Array.prototype.tap = function(func) {
    this.forEach(func);
    return this;
}

if (!Array.prototype.flat) {
    Array.prototype.flat = function() {
        var depth = arguments[0];
        depth = depth === undefined ? 1 : Math.floor(depth);
        if (depth < 1) return Array.prototype.slice.call(this);
        return (function flat(arr, depth) {
            var len = arr.length >>> 0;
            var flattened = [];
            var i = 0;
            while (i < len) {
                if (i in arr) {
                    var el = arr[i];
                    if (Array.isArray(el) && depth > 0)
                        flattened = flattened.concat(flat(el, depth - 1));
                    else flattened.push(el);
                }
                i++;
            }
            return flattened;
        })(this, depth);
    };
}
