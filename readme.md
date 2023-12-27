let inputString = 'os = " os " and os ~ "os" and os != "os"';
let replacedString = inputString.replace(/\bos\b(?![^\"]*\"[^\"\']*\"[^\"\']*\")/g, 'gg');

console.log(replacedString);
