import Vue from  'vue'
import axios from 'axios'

  const tokenType = "bearer"
  const baseURL = 'http://fullstack-role.busara.io/api/v1'
  const refreshEndPoint = 'http://fullstack-role.busara.io/api/v1/oauth/token/'

  let isAlreadyFetchingAccessToken = false
  let subscribers = []
// axios object setup starts here
  const http = axios.create({
    // add headers here
    baseURL: baseURL,
    headers:
      {
      'Accept': 'application/json'
    }
  })


//get refresh token from localStorage
  export const getRefreshToken = function () {
    return localStorage.getItem('RefreshToken')
  }

  const handleRefreshingToken = function () {
    return http.post(refreshEndPoint, {
      refresh_token: getRefreshToken()
    })
  }

// set refresh token to localStorage
  const setRefreshToken = function (value) {
    localStorage.setItem('RefreshToken', value)
  }

// set storage token to localStorage
  const setAccessToken = function (value) {
    localStorage.setItem('AccessToken', value)
  }

//get access token
  export const getAccessToken = function (value) {
    // should hold oath2 access token
    return localStorage.getItem('AccessToken')
  }

// it will be used to hold requests while refreshing tokens
  const onAccessTokenFetched = function (accessToken) {
    subscribers = subscribers.filter(callback => callback(accessToken))
  }

  const addSubscriber = function (callback) {
    subscribers.push(callback)
  }

export const getUserDataFromLocalStorage = function() {
  if (localStorage.getItem('UserData')) {
    const userData = JSON.parse(localStorage.getItem('UserData'))
    return userData
  }
  return null
}

export const storeUserDataToLocalStorage = function(userData) {
  // encrypt role before saving in localstorage
  localStorage.setItem('UserData', JSON.stringify(userData))
}
// add authorization token to request
  http.interceptors.request.use(request => {
      request.headers.Authorization = `${tokenType} ${getAccessToken()}`

      return request
    },
    error => Promise.reject(error)
  )

// add interceptors for 401 unauthorized request -- we assume the acces_token expired
  http.interceptors.response.use(
    response => response,
    error => {
      const {config, response} = error
      const originalRequest = config

      // if status 401 >> means token expired
      // let's try to refresh it
      if (response && response.status === 401) {
        // handle refresh token here
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true

          handleRefreshingToken().then(r => {
            isAlreadyFetchingAccessToken = false

            //update token in localStorage
            setAccessToken(r.data.access_token)
            setRefreshToken(r.data.refresh_token)
            onAccessTokenFetched(r.data.access_token)
          })
            .catch((err) => {
              localStorage.clear()
              location.reload()
            })
        }

        // retry request since we may not have the access token
        return new Promise(resolve => {
          addSubscriber(accessToken => {
            // change authorization header to the new one we just fetched
            originalRequest.headers.Authorization = `${tokenType} ${accessToken}`
          })
        })
      }
      // any other error status will be returned
      return Promise.reject(error)
    }
  )

export { http, baseURL, setRefreshToken, setAccessToken }
