import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import {useTranslation} from "react-i18next";


const Breadcrumbs = ({brodsmuler}) => {
    const history = useHistory();
    const { t } = useTranslation();

    const defaultBreadcrumb = [
        { url: process.env.REACT_APP_DINPENSJON_URL, title: t("dinpensjon-tittel"), handleInApp: true }
    ];

    const breadcrumbs = defaultBreadcrumb.concat(brodsmuler);

    onBreadcrumbClick(breadcrumb => {
        history.push(breadcrumb.url);
    });

    setBreadcrumbs(breadcrumbs);

    return <></>;
};

export default Breadcrumbs;
