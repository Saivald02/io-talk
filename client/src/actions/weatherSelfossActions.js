import { SELFOSS_WEATHER } from '../constants/weatherSelfossConstants';
//import fetch from 'isomorphic-fetch';

export const weatherSelfoss = (status) => {

    return {
        type: SELFOSS_WEATHER,
        payload: status
    };
};
