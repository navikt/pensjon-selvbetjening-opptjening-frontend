import {HomePage} from "../components/pages/HomePage/HomePage";
import {FaqPage} from "../components/pages/FaqPage/FaqPage";

export const basePath = process.env.PUBLIC_URL;
export const routesConfig = [
    {
        path: `${basePath}/`,
        component: HomePage,
        titleKey: 'opptjening-title',
        exact: true
    },
    {
        path: `${basePath}/faq`,
        component: FaqPage,
        titleKey: 'faq-title',
        exact: true
    }
];
