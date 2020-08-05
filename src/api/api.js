export function isDev() {
    return process.env.NODE_ENV === 'development';
}

const RequestMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
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
    // If we are on localhost just return, no need to check for authentication
    if(isDev()){
        return;
    }
    if (response.status === 401) {
        window.location.href = "https://loginservice-q.nav.no/login?redirect=https://www-q0.nav.no/pensjon/opptjening/";
        throw new Error("unauthorized");
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
    return serverRequest(RequestMethod.GET, urlPath, "");
}

export function fetchPost(urlPath, body) {
    return serverRequest(RequestMethod.POST, urlPath, body);
}