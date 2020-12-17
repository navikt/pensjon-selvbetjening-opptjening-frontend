import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useTranslation } from "react-i18next";
import { routesConfig } from "../../../common/routesConfig";
import { useRouteMatch } from 'react-router-dom'

const Breadcrumbs = () => {
    const match = useRouteMatch();
    const history = useHistory();
    const { t } = useTranslation();

    const defaultBreadcrumb = [
        { url: process.env.REACT_APP_DINPENSJON_URL, title: t("dinpensjon-tittel"), handleInApp: false }
    ];

    const breadcrumbData = match.url.split("/");
    breadcrumbData.pop();
    breadcrumbData.forEach(function(data){
        const route = routesConfig.find((route) => route.path.replace("/:lng/","") === data);
        if(route)
            defaultBreadcrumb.push({url: "/" + match.params.lng + "/" + data, title: t(route.titleKey), handleInApp: route.exact});
    });

    if(match.path !== "/:lng/")
    {
        const route = routesConfig.find((route) => route.path === match.path);
        if(route)
            defaultBreadcrumb.push({url: match.url, title: t(route.titleKey), handleInApp: route.exact});
    }

    onBreadcrumbClick(breadcrumb => {
        history.push(breadcrumb.url);
    });

    setBreadcrumbs(defaultBreadcrumb);
    return <></>;
};

export default Breadcrumbs;
