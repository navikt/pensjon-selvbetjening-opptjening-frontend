import {isDev} from "../common/utils";
import {logger} from "../common/logging";

export const RequestMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT"
};

export const serverRequestWithData = (method, urlPath, body) => {
    const OPTIONS = {
        method: method,
        credentials: getCredentialsParam(),
        headers: {'Content-Type': 'application/json'},
        body: body
    };

    return new Promise((resolve, reject) => {
        fetch(urlPath, OPTIONS)
            .then((response) => {
                verifyStatusSuccessOrRedirect(response, urlPath);
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("text/html")) {
                    resolve();
                }
                if(response.status === 204) {
                    resolve(response.status);
                } else {
                    resolve(response.json());
                }
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
                verifyStatusSuccessOrRedirect(response, urlPath);
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("text/html")) {
                    resolve();
                }
                return response;
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                resolve(response)
            })
            .catch((reason) => {
                const errorstring = `Failed to parse JSON on: " ${urlPath} " reason: " ${reason.message}`;
                const errorapi = new Error(errorstring);
                if(!urlPath.includes("/api/logg")) {
                    console.error(errorapi);
                }
                reject(reason)
            });
    });
};

function verifyStatusSuccessOrRedirect(response, urlPath) {
    // If we are on localhost just return, no need to check for authentication
    if (isDev()) {
        return;
    }
    if (response.status === 401) {
        throw new Error("error-status-401");
    }
    if (response.status === 403) {
        throw new Error("error-status-403");
    }
    if (response.status >= 200 && response.status < 300) {
        return response.status;
    }
    if(!urlPath.includes("/api/logg")) {
        logger.error(response.statusText);
    }
    throw new Error("error-status-common");
}

function getCredentialsParam() {
    return isDev() ? "include" : "same-origin";
}

export function fetchToJson(urlPath) {
    return serverRequest(RequestMethod.GET, urlPath);
}

export function fetchPost(urlPath, body) {
    if (isDev()) {
        return serverRequest(RequestMethod.GET, urlPath);
    }
    return serverRequestWithData(RequestMethod.POST, urlPath, body);
}
