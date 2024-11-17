export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function htmlDecode(input) {
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

export const queryStringToData = query => {
    query = query.trim().replace(/^\?/, "");
    if (!query)
        return false;
    let result = {};
    let queryData = query.split("&");
    if (!Array.isArray(queryData))
        return;
    queryData.forEach(item => {
        item = item.split("=");
        if (item[0].trim() && item[1].trim())
            result[item[0].trim()] = item[1].trim()
    });
    return result;
};

export let strip = html => {
    let e = document.createElement('div');
    e.innerHTML = html;
    return e.innerText;
};// String(html).replace(/<[^>]+>/g, '');


//--legacy-peer-deps
export const cookie = {

    get(name) {
        const results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return results ? unescape(results[2]) : null;
    },

    set(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
        let cookie_string = name + "=" + escape(value);

        if (exp_y) {
            const expires = new Date(exp_y, exp_m, exp_d);
            cookie_string += "; expires=" + expires.toGMTString();
        }

        if (path)
            cookie_string += "; path=" + escape(path);

        if (domain)
            cookie_string += "; domain=" + escape(domain);

        if (secure)
            cookie_string += "; secure";

        document.cookie = cookie_string;
    },

    delete(name) {
        const cookie_date = new Date();
        cookie_date.setTime(cookie_date.getTime() - 1);
        document.cookie = name += "=; expires=" + cookie_date.toGMTString();
    }
};


export let timeConverter = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (minutes === 0)
        minutes = '00';
    else if (minutes < 10)
        minutes = '0' + parseInt(minutes);

    if (seconds === 0)
        seconds = '00';
    else if (seconds < 10)
        seconds = '0' + parseInt(seconds);

    return minutes + ':' + seconds;
};