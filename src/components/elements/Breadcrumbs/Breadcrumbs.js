import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';


const path =  [
    {
        url: process.env.REACT_APP_DINPENSJON_URL,
        title: 'Din pensjon',
        handleInApp: true
    },
    {
        url: '/',
        title: 'Din pensjonsopptjening',
        handleInApp: true
    },
];

const Breadcrumbs = () => {
    const history = useHistory();

    onBreadcrumbClick(breadcrumb => {
        history.push(breadcrumb.url);
    });

    setBreadcrumbs(path);

    return <></>;
};

export default Breadcrumbs;
