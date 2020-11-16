import {
    createFrontendLogger,
    DEFAULT_FRONTENDLOGGER_API_URL,
    setUpErrorReporting
} from '@navikt/frontendlogger/lib';

export const logger = createFrontendLogger('pensjon-selvbetjening-opptjening-frontend', DEFAULT_FRONTENDLOGGER_API_URL);

// Logging
logger.info('Info');
//logger.warn('Warn');
//logger.error('Error');

// Metrics
//logger.event('navn-pa-metrikk', { field1: 'value1' }, { tag1: 'value2' });

setUpErrorReporting(logger);
