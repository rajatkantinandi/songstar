export const getParamsFromUrl = () => {
    const queryString = window.location.search;
    const queryParams = {};

    const keyValues = queryString.slice(1).split(/[&=]/);
    for (let i = 0; i < keyValues.length; i += 2) {
        queryParams[keyValues[i]] = decodeURIComponent(keyValues[i + 1]).replace(/\+/g, ' ').trim();
    }

    return queryParams;
};