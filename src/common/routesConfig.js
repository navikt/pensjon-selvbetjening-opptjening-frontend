import {HomePage} from "../components/pages/HomePage/HomePage";
import {NotFoundPage} from "../components/pages/NotFoundPage/NotFoundPage";


export const basePath = process.env.PUBLIC_URL;
export const routesConfig = [
    {
        path: `/:lng/*`,
        component: HomePage,
        titleKey: 'opptjening-tittel',
        exact: true
    },
    {
        path: `/:lng/404`,
        component: NotFoundPage,
        titleKey: '404-title',
        exact: true
    },
    {
        path: `/:lng/test`,
        component: NotFoundPage,
        titleKey: 'test',
        exact: true
    },
    {
        path: `/:lng/test/test1`,
        component: NotFoundPage,
        titleKey: 'test1',
        exact: true
    }
];
