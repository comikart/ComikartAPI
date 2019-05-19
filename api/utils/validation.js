

const isEmail = (str) => str.match(/.{8,}@(hotmail|yahoo|gmail|protonmail)\.com/);

const isPassword = (str) => str.length > 8 
    && str.match(/[A-Z]{1,}/g) 
    && str.match(/[0-9]/g);