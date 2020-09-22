import React from 'react'
import Lenke from 'nav-frontend-lenker'
import 'nav-frontend-lenker-style'
import { HoyreChevron } from 'nav-frontend-chevron';
import { Route, useRouteMatch } from 'react-router-dom'
import { routesConfig } from '../../../common/routesConfig'
import './Breadcrumbs.less'
import {useTranslation} from "react-i18next";

const Crumb = () => {
    const match = useRouteMatch();
    const { t } = useTranslation();

    const route = routesConfig.find((route) => route.path === match.url);
    return route ? (
        <>
            {!match.isExact ? (
                <>
                    <p className="typo-normal item">
                        <Lenke href={match.url || ''}>
                            {t(route.titleKey)}
                        </Lenke>
                    </p>
                    <div aria-hidden='true'>
                        <HoyreChevron/>
                    </div>
                </>
            ) : (
                <p aria-current="page" className="typo-normal item current">
                    {t(route.titleKey)}
                </p>
            )}
        </>
    ) : null
};

const Breadcrumbs = () => {
    const { t } = useTranslation();
    return (
        <nav aria-label={t('breadcrumbs-you-are-here')} className="breadcrumbs">
            <p className="typo-normal item">
                <Lenke href={process.env.REACT_APP_DINPENSJON_URL}>
                    {t("dinpensjon-title")}
                </Lenke>
            </p>
            <div aria-hidden='true'>
                <HoyreChevron/>
            </div>
            {routesConfig.map((route) => {
                return (
                    <Route key={route.path} path={route.path} component={Crumb} />
                )
            })}
        </nav>
    )
};

export default Breadcrumbs