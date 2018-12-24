import { ICELAND_wEATHER } from '../constants/weatherIcelandConstants';
//import fetch from 'isomorphic-fetch';

export const weatherIceland = (status) => {
    console.log('weather action');
    console.log(status);
    return {
        type: ICELAND_wEATHER,
        payload: status
    };
};
