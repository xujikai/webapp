/**
 * Created by xxx on 2017/4/20.
 */
export const baseUrl = process.env.NODE_ENV !== 'production' ? '' :
    'http://dev.fe.ptdev.cn';

export const ORDER_FAILED = 'failed';
export const ORDER_WAITED = 'waited';
export const ORDER_PASSED = 'passed';