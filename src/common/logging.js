import {
    createFrontendLogger,
    DEFAULT_FRONTENDLOGGER_API_URL,
    setUpErrorReporting
} from '@navikt/frontendlogger/lib';

export const logger = createFrontendLogger('pensjon-selvbetjening-opptjening-frontend', DEFAULT_FRONTENDLOGGER_API_URL);

setUpErrorReporting(logger);
