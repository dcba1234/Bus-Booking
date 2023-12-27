let inputString = 'os = " os " and os ~ "os" and os != "os "';

let replacedString = inputString.replace(/(\bos\b)(?=(?:(?:[^"]*"){2})*[^"]*$)/g, 'gg');

console.log(replacedString);
