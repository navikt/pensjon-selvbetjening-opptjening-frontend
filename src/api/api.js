import {isDev} from "../common/utils";

const RequestMethod = {
    GET: "GET",
    POST: "POST"
};

const serverRequestPost = (method, urlPath, body) => {
    const OPTIONS = {
        method: method,
        credentials: getCredentialsParam(),
        headers: { 'Content-Type': 'application/json' },
        body: body
    };

    return new Promise((resolve, reject) => {
        fetch(urlPath, OPTIONS)
            .then((response) => {
                verifyStatusSuccessOrRedirect(response);
                resolve(response.json());
            })
            .catch((reason) => reject(reason));
    });
};

const serverRequest = (method, urlPath) => {
    const OPTIONS = {
        method: method,
        credentials: getCredentialsParam()
    };

    return new Promise((resolve, reject) => {
        fetch(urlPath, OPTIONS)
            .then((response) => {
                verifyStatusSuccessOrRedirect(response);
                resolve(response.json());
            })
            .catch((reason) => reject(reason));
    });
};

function verifyStatusSuccessOrRedirect(response) {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const fnr = searchParams.get("_brukerId");

    const loginQueryParam = fnr ? "%3Ffnr%3D" + fnr : "";

    // If we are on localhost just return, no need to check for authentication
    if(isDev()){
        return;
    }
    if (response.status === 401) {
        window.location.href = process.env.REACT_APP_LOGINSERVICE_URL + loginQueryParam;
        throw new Error("error-status-401");
    }
    if (response.status === 403) {
        window.location.href = process.env.REACT_APP_DINEPENSJONSPOENG_URL;
        throw new Error("error-status-403");
    }
    if (response.status >= 200 && response.status < 300) {
        return response.status;
    }
    throw new Error(response.statusText);
}

function getCredentialsParam() {
    return isDev() ? "include" : "same-origin";
}

export function fetchToJson(urlPath) {
    return serverRequest(RequestMethod.GET, urlPath);
}

export function fetchPost(urlPath, body) {
    if(isDev()){
        return serverRequest(RequestMethod.GET, urlPath);
    }
    return serverRequestPost(RequestMethod.POST, urlPath, body);
}
