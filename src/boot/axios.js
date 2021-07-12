import Vue from  'vue'
import axios from 'axios'
import serviceConfigs from '../helpers/serviceConfigs.js'

let isAlreadyFetchingAccessToken = false
let subscribers = []
// axios object setup starts here
const http =axios.create({
  // add headers here
  baseURL: serviceConfigs.baseURL,
  headers: {
    Accept: 'application/json',
    // Authorization: `${serviceConfigs.tokenType} ${getAcessToken()}`
  }
})

//get refresh token from localStorage
export const getRefreshToken = function (){
  return localStorage.getItem(serviceConfigs.storageRefreshTokenKeyName)
}

const handleRefreshingToken = function (){
  return http.post(serviceConfigs.refreshEndPoint,  {
    refresh_token: getRefreshToken()
  })
}

// set refresh token to localStorage
const setRefreshToken = function (value){
  localStorage.setItem(serviceConfigs.storageRefreshTokenKeyName, value)
}

// set storage token to localStorage
const setAccessToken = function (value){
  localStorage.setItem(serviceConfigs.storageTokenKeyName, value)
}

//get access token
export const getAccessToken = function (){
  // should hold oath2 access token
  return localStorage.getItem(serviceConfigs.storageTokenKeyName)
}

// it will be used to hold requests while refreshing tokens
const onAccessTokenFetched = function (callback){
  subscribers = subscribers.filter(callback => callback(accessToken))
}

const addSubscriber = function (callback) {
  subscribers.push(callback)
}

// add authorization token to request
http.interceptors.request.use(request => {
    request.headers.Authorization = `${serviceConfigs.tokenType} ${getAccessToken()}`

  return request
  },
  error => Promise.reject(error)
)

// add interceptors for 401 unauthorized request -- we assume the acces_token expired
http.interceptors.request.use(
  response => response,
  error => {
    const { config, response } = error
    const originalRequest = config

    // if status 401 >> means token expired
    // let's try to refresh it
    if (response && response.status === 401) {
      // handle refresh token here
      if (!isAlreadyFetchingAccessToken){
        isAlreadyFetchingAccessToken = true

        handleRefreshingToken().then(r => {
          isAlreadyFetchingAccessToken = false

          //update token in localStorage
          setAccessToken(r.data.access_token)
          setRefreshToken(r.data.refresh_token)
          onAccessTokenFetched(r.data.access_token)
        })
          .catch(() => {
            localStorage.clear()
          })
      }
    }
  }
)

export {
    http
}


// export default async ({ router, store }) => {
//   console.log('inside export async')
//   axios.interceptors.request.use((request) => {
//     // console.log('inside export async 2')
//     // NProgress.configure({ showSpinner: false });
//     // NProgress.start();
//     // if (store.getters['user/isAuthenticated']) {
//       request.headers.Authorization = `Bearer ${store.getters['user/token']}`;
//     // }
//     // config.baseURL = process.env.API_BASE_URL
//     console.log('Starting Request', request);
//     return request;
//   });
//
//   axios.interceptors.response.use((response) => {
//     NProgress.done();
//     console.log('response', response);
//     return response;
//   });
//
//   axios.interceptors.response.use(null, (error) => {
//     if (error.response) {
//       /*
//       * The request was made and the server responded with a
//       * status code that falls out of the range of 2xx
//       */
//       if (error.response.status === 401) {
//         store.dispatch('user/logOut').then(() => {
//           router.push({ name: 'Login' });
//         });
//       }
//       if (error.response.status === 500 || error.response.status === 502) {
//         router.push({ name: 'server-error' });
//       }
//       if (error.response.status === 404) {
//         router.push({ name: 'not-found' });
//       }
//       // console.log(error.response);
//     } else if (error.request) {
//       /*
//       * The request was made but no response was received, `error.request`
//       * is an instance of XMLHttpRequest in the browser and an instance
//       * of http.ClientRequest in Node.js
//       */
//       // console.log(error.request);
//       router.push({ name: 'no-internet' });
//     } else {
//       // * Something happened in setting up the request and triggered an Error
//       // console.log('Error', error.message);
//       router.push({ name: 'no-internet' });
//     }
//     // console.log(error);
//     return Promise.reject(error);
//   });
//
// }


// export { axios }

