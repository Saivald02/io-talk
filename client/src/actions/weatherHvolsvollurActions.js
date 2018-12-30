import { HVOLSVOLLUR_WEATHER } from '../constants/weatherHvolsvollurConstants';
//import fetch from 'isomorphic-fetch';

export const weatherHvolsvollur = (status) => {

    return {
        type: HVOLSVOLLUR_WEATHER,
        payload: status
    };
};
