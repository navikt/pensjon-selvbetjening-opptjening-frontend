import {HomePage} from "../components/pages/HomePage/HomePage";
import {NotFoundPage} from "../components/pages/NotFoundPage/NotFoundPage";
import {ByttBrukerPage} from "../components/pages/ByttBrukerPage/ByttBrukerPage";


export const basePath = process.env.PUBLIC_URL;
export const routesConfig = [
    {
        path: `/:lng(en|nn|nb)/`,
        component: HomePage,
        titleKey: 'opptjening-tittel',
        exact: true
    },
    {
        path: `/:lng(en|nn|nb)/404/`,
        component: NotFoundPage,
        titleKey: '404-title',
        exact: true
    },
    {
        path: `/:lng(en|nn|nb)/bytt-bruker/`,
        component: ByttBrukerPage,
        titleKey: 'sok-paa-vegne-av-title',
        exact: true,
    },
];
