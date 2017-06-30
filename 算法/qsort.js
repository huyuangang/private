
function quickSort(arr) {
    if(arr.length <= 0)
        return arr;
    let p = arr.splice(0, 1)[0];
    let left = [];
    let right = [];
    arr.forEach((item) => {
        if(item < p)
            left.push(item);
        else
            right.push(item);
    })
    return quickSort(left).concat(p, quickSort(right));
}

exports.qsort = quickSort;