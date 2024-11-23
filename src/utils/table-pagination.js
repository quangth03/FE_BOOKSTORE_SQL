const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
}

const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}  
const formatMoney = (amountStr, type = "VNĐ") => {
    let amount = parseInt(amountStr);
    if (isNaN(amount)) {
        return amountStr;
    }
    let formattedAmount = amount.toLocaleString();
    return formattedAmount + " " + type;
}
export {
    calculateRange,
    sliceData,
    formatMoney
}