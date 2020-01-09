// Normalize take away Uppercase and symblos
const normalizedName = name => {
    name = name.toLowerCase().trim();
    let normalizedName = "";
    let symbol = `.,;:!?"`;
    for (let i = 0; i < name.length; i++) {
        if (!symbol.includes(name[i])) {
            normalizedName += name.slice(i, i + 1);
        }
    }
    return normalizedName;
};

//regex

tmp = Regex.Replace(n, "[^0-9a-zA-Z]+", "");