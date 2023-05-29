import { commonConfig } from '../configs/common';

interface MakeRequestType {
    url: string;
    params?: any;
    method?: 'GET' | 'PUT' | 'DELETE' | 'POST';
};

interface OptionsType {
    method: 'GET' | 'PUT' | 'DELETE' | 'POST';
    headers: {
        [key: string]: string
    },
    body?: string;
};

export const makeRequest = async ({
    url,
    params,
    method = 'GET'
}: MakeRequestType) => {
    const options: OptionsType = {
        method,
        headers: {
            "Content-Type": "application/json",
        }
    };
    if (params) {
        options['body'] = JSON.stringify(params);
    }
    const response = await fetch(`${commonConfig.apiEndpoint}/${url}`, options);
    const data = await response.json();
    return data;
};