module.exports = { 
    randomCode: function (length = 12, format = '####-####-####') {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    const arrayOfChars = String(format).split('')
    let code = "";

    for (let i = 0; i <= length; i++) {
        const r = Math.floor(Math.random() * chars.length);

        const letter = chars.charAt(r);
        const index = arrayOfChars.indexOf('#')

        if (index == -1) {
            code = arrayOfChars.join('');
            break;
        };

        arrayOfChars.splice(index, 1, letter)
    }
    return code;
}
}