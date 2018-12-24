import { HVOLSVOLLUR_wEATHER } from '../constants/weatherHvolsvollurConstants';
//import fetch from 'isomorphic-fetch';

export const weatherHvolsvollur = (status) => {

    return {
        type: HVOLSVOLLUR_wEATHER,
        payload: status
    };
};
