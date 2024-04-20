import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:4000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, //for api delay
    headers:{
        "content-type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`
    }
})

axiosInstance.interceptors.request.use( //for request , takes two callback function
    function(config) //1st callback function for successful case
    {
        if(config.TYPE.params)
        {
            config.params = config.TYPE.params;
        }
        else if(config.TYPE.query)
        {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) //2nd callback for func of error
    {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(  
    //for response
    function(response)
    {
        return processResponse(response);
    },
    function(error)
    {
        return Promise.reject(processError(error));
    }
)

const processResponse = (response) => {
    console.log("response is : ",response);
    if(response?.status === 200)
    {
        return {isSuccess: true, data: response.data}
    }
    else
    {
        return{
            isFailure: true,
            status: response?.status,
            message: response?.message,  
            code:response?.code,
        }
    }
}

const processError = (error) => {
    if(error.response)
    {
        //request made and server responded with a status other that falls out of the range
        console.log("Error in response: ", error.toJSON());
        return{
            isError: true,
            message: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if(error.request)
    {
        //request made but no response was received
        console.log("Error in request: ", error.toJSON());
        return{
            isError: true,
            message: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else
    {
        //something happened in setting up request that triggers an error 
        console.log("Error in network: ", error.toJSON());
        return{
            isError: true,
            message: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
    
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body, // '' and null is not working so we used empty object {}
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) 
            {
                if(showUploadProgress) 
                {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) 
            {
                if(showDownloadProgress) 
                {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}

export {API};