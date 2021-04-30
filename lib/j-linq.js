/**
 * @name jLinq
 * @description A minor implementation of Linq like functionalities in JavaScript.
 * @version 1.0.2
 * @author Ahmed Ashham
 */

//Add Linq like range to javascript arrays
if (!Array.prototype.range) {
  //*
  //* @name range
  //* @typedef Array
  //* @description Returns the elements which in an array which fall into the given range. eg: let arr2 = arr.range(5,10);
  //* @param {number} start Start Index.
  //* @param {number} end End Index.

  Array.prototype.range = function(start, end) {
    let result = [];
    let i = 0;
    for (i = start - 1; i < end; i++) {
      result.push(this[i]);
    }
    return result;
  };
}

//Add Linq like skip to javascript arrays
if (!Array.prototype.skip) {
  //*
  //* @name skip
  //* @typedef Array
  //* @description Returns the elements which after skipping a given amount of elements. eg: let arr2 = arr.skip(5);
  //* @param {number} noOfElementsToSkip The number of elements to skip.

  Array.prototype.skip = function(noOfElementsToSkip) {
    let result = [];
    let i = 0;
    for (i = noOfElementsToSkip; i < this.length; i++) {
      result.push(this[i]);
    }
    return result;
  };
}

//Add Linq like first to javascript arrays
if (!Array.prototype.first) {
  //*
  //* @name first
  //* @typedef Array
  //* @description Returns the first element which match a given predicate. eg: let val = arr.first(x => x > 1);
  //* @param {Function} predicate The predicate function to compare elements against.

  Array.prototype.first = function(predicate) {
    if (predicate) {
      let i = 0;
      for (i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
          return this[i];
        }
      }
    } else {
      if (this[0]) return this[0];
    }

    return null;
  };
}

//Add Linq like where to javascript arrays
if (!Array.prototype.where) {
  //*
  //* @name where
  //* @typedef Array
  //* @description Returns elements which match a given predicate. eg: let arr2 = arr.where(x => x > 1);
  //* @param {Function} predicate The predicate function to compare elements against.

  Array.prototype.where = function(predicate) {
    let result = [];
    let i = 0;
    for (i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        result.push(this[i]);
      }
    }

    return result;
  };
}

//Add Linq like all to javascript arrays
if (!Array.prototype.all) {
  //*
  //* @name all
  //* @typedef Boolean
  //* @description Returns whether all elements match a given predicate. eg: let arr2 = arr.where(x => x > 1);
  //* @param {Function} predicate The predicate function to compare elements against.

  Array.prototype.all = function(predicate) {
    let result = 0;
    let i = 0;
    for (i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        result++;
      }
    }

    return result === this.length;
  };
}

//Add Linq like all to javascript arrays
if (!Array.prototype.any) {
  //*
  //* @name any
  //* @typedef boolean
  //* @description Returns whether any elements match a given predicate. eg: let arr2 = arr.where(x => x > 1);
  //* @param {Function} predicate The predicate function to compare elements against.

  Array.prototype.any = function(predicate) {
    if (!predicate) return this.length > 0;
    else {
      let result = 0;
      let i = 0;
      for (i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
          result++;
          break;
        }
      }

      return result > 0;
    }
  };
}

//Add linq like select to javascript arrays
if (!Array.prototype.select) {
  //*
  //* @name select
  //* @typedef Array
  //* @description Selects a different set from an Array. eg: let arr2 = arr.select((x, index) => i + ': ' + x.otherProperty);
  //* @param {Function} selector The logic by which to select the elements.

  Array.prototype.select = function(selector) {
    let result = [];
    let i = 0;
    for (i = 0; i < this.length; i++) {
      result.push(selector(this[i], i));
    }

    return result;
  };
}

//Add linq like selectMany to javascript arrays
if (!Array.prototype.selectMany) {
  //*
  //* @name selectMany
  //* @typedef Array
  //* @description Selects a different set from an Array. eg: let arr2 = arr.select((x, index) => i + ': ' + x.otherProperty);
  //* @param {Function} selector The logic by which to select the elements.

  Array.prototype.selectMany = function(selector) {
    let result = [];
    let i = 0;
    for (i = 0; i < this.length; i++) {
      let elems = selector(this[i], i);
      let j = 0;
      for (j = 0; j < elems.length; j++) result.push(elems[j]);
    }

    return result;
  };
}

//Add linq like distinct to javascript arrays
if (!Array.prototype.distinct) {
  //*
  //* @name distinct
  //* @typedef Array
  //* @description Selects a different set from an Array. eg: let arr2 = arr.select((x, index) => i + ': ' + x.otherProperty);
  //* @param {Function} comparer The logic by which to compare the elements.

  Array.prototype.distinct = function(comparer) {
    let result = [];
    let resultComps = [];
    // eslint-disable-next-line no-unused-vars
    let comparers =
      typeof comparer === 'function' ? this.select((x) => comparer(x)) : this;

    let i = 0;
    for (i = 0; i < this.length; i++) {
      let elem = this[i];
      let elemForComparison =
        typeof comparer === 'function' ? comparer(elem) : elem;

      if (!resultComps.includes(elemForComparison)) {
        resultComps.push(elemForComparison);
        result.push(elem);
      }
    }

    return result;
  };
}

//Add linq like groupBy to javascript arrays
if (!Array.prototype.groupBy) {
  //*
  //* @name groupBy
  //* @typedef Array
  //* @description Groups the elements of a sequence according to a specified key selector function. eg: var grp = arr.groupBy(x => x.key);
  //* @param {function(object)} selector The selector erxpression or key name

  Array.prototype.groupBy = function(selector) {
    let keySelector =
      typeof selector === 'function'
        ? selector
        : typeof selector === 'string'
        ? (x) => x[selector]
        : undefined;
    if (!keySelector) {
      console.error('Please pass a valid selector.');
      return;
    }

    return this.reduce(function(rv, x) {
      (rv[keySelector(x)] = rv[keySelector(x)] || []).push(x);
      return rv;
    }, {});
  };
}

//Add linq like with to javascript arrays
if (!Array.prototype.with) {
  //*
  //* @name with
  //* @typedef Array
  //* @description Selects the combination of multiple arrays. eg: let all = arr.select([arr2,arr3,arr4,arr5]);
  //* @param {Array} arrays The arrays to merge together.

  Array.prototype.with = function(arrays) {
    let i = 0;

    for (i = 0; i < arrays.length; i++) {
      let j = 0;
      for (j = 0; j < arrays[i].length; j++) this.push(arrays[i][j]);
    }

    return this;
  };
}

//Add linq like intersect to javascript arrays
if (!Array.prototype.intersect) {
  //*
  //* @name intersect
  //* @typedef Array
  //* @description Selects the matching set from two arrays. eg: let arr3 = arr.intersect(arr2);
  //* @param {Array} secondArray The second array to compare against.

  Array.prototype.intersect = function(secondArray) {
    let result = [];

    let iAmSmaller = this.length <= secondArray ? true : false;
    let i = 0;
    if (iAmSmaller) {
      for (i = 0; i < this.length; i++) {
        if (secondArray.includes(this[i])) {
          result.push(this[i]);
        }
      }
    } else {
      for (i = 0; i < secondArray.length; i++) {
        if (this.includes(secondArray[i])) {
          result.push(secondArray[i]);
        }
      }
    }

    return result;
  };
}

//Add linq like sum to javascript arrays
if (!Array.prototype.sum) {
  //*
  //* @name sum
  //* @typedef number
  //* @description Gets the sum of all elements in the array. eg: var sm = arr.sum();

  Array.prototype.sum = function() {
    let result = 0;
    let i = 0;
    for (i = 0; i < this.length; i++) result += this[i];

    return result;
  };
}

//Add linq like intersect to javascript arrays
if (!Array.prototype.average) {
  //*
  //* @name sum
  //* @typedef number
  //* @description Gets the average of all elements in the array. eg: var avg = arr.average();

  Array.prototype.average = function() {
    let result = 0;
    let i = 0;
    for (i = 0; i < this.length; i++) result += this[i];

    return result / this.length;
  };
}

//Add linq like forEach to javascript arrays
if (!Array.prototype.forEach) {
  //*
  //* @name forEach
  //* @typedef void
  //* @description Run a function on every element. eg: arr.forEach((x,index) => console.log(x + ' at index:' + i));
  //* @param {Function} func

  Array.prototype.forEach = function(func) {
    let i = 0;
    for (i = 0; i < this.length; i++) {
      func(this[i], i);
    }
  };
}

//Add linq like sum to javascript arrays
if (!Array.prototype.sum) {
  //*
  //* @name forEach
  //* @typedef void
  //* @description Gets the sum of all elements in an array. eg: var l = arr.sum();
  //* @param {function(number)} number

  Array.prototype.sum = function() {
    let i = 0;
    this.forEach((x) => (i = i + x));
    return i;
  };
}

//Add string join to join an array of strings seperated by a joiner
if (!String.join) {
  //*
  //* @name join
  //* @typedef string
  //* @description Join an array of strings seperated by a joiner
  //* @param {string} joiner The string to put in between each element.
  //* @param {Array} stringArray The array of strings to join.

  String.join = function(joiner, stringArray) {
    let result = '';
    stringArray.forEach((x) => (result += x + joiner));

    let removeUpto = result.length - joiner.length;
    return result.substring(0, removeUpto);
  };
}

//Add string format to format a string in accordance with some parameters
if (!String.format) {
  //*
  //* @name format
  //* @typedef string
  //* @description Format a string in accordance with some parameters. eg: var str = String.format('"{0} World". {0} World is Hello World in {1}', ['Hola','Spanish']); This outputs the following text: '"Hola World". Hola World is Hello World in Spanish'
  //* @param {string} str The string to format.
  //* @param {Array} fillers The format fillers.

  String.format = function(str, fillers) {
    // eslint-disable-next-line no-unused-vars
    let result = '';
    fillers.forEach(
      (x, index) => (str = str.replaceAll('{' + index.toString() + '}', x))
    );
    return str;
  };
}

//Add replace all occurences functionality to strings
if (!String.prototype.replaceAll) {
  //*
  //* @name replaceAll
  //* @typedef String
  //* @description Replace all occurences of a specified text in a string with a given replacement. eg: var str = "Hello, Hello World in English".replaceAll('Hello', 'Bonjour').replaceAll('English', 'French'); This outputs the following text: 'Bonjour, Bonjour World in French'.
  //* @param {string} oldText The old text to be replaced.
  //* @param {string} newText The new text to replace with.

  String.prototype.replaceAll = function(oldText, newText) {
    let str = this;
    while (str.includes(oldText)) str = str.replace(oldText, newText);
    return str;
  };
}
