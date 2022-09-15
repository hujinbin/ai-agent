export function fileLengthFormat(size, unit) {
    function pow1024(num) {
        return Math.pow(1024, num);
    }

    if (!size) return '';
    if (size < pow1024(1)) return `${size} KB`;
    if (size < pow1024(2)) return `${(size / pow1024(1)).toFixed(2)} MB`;
    if (size < pow1024(3)) return `${(size / pow1024(2)).toFixed(2)} GB`;
    if (size < pow1024(4)) return `${(size / pow1024(3)).toFixed(2)} TB`;
    return `${size} B`
}


export function timeConsumingFormatter(time) {
    const minutes = (time / (1000 * 60)).toFixed(0);
    const seconds = (time % (60 * 1000) / 1000).toFixed(0);
    return `${minutes} 分 ${seconds} 秒`
}

export function calPercent(value, total) {
    return (Math.round(value / total * 10000) / 100.00 + '%')
}