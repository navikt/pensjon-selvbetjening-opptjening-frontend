import {HomePage} from "../components/pages/HomePage/HomePage";
import {NotFoundPage} from "../components/pages/NotFoundPage/NotFoundPage";


export const basePath = process.env.PUBLIC_URL;
export const routesConfig = [
    {
        path: `/:lng(en|nn|nb)/`,
        component: HomePage,
        titleKey: 'opptjening-tittel',
        exact: true
    },
    {
        path: `/:lng(en|nn|nb)/404`,
        component: NotFoundPage,
        titleKey: '404-title',
        exact: true
    },
];
