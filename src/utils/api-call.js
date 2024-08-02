import axios from 'axios';
import { useDispatch } from 'react-redux';
import SearchAction from '../store/actions/search';
import { handleApiErrors } from './api-error';
const API_URL = 'https://buntoo.com/';

function processRequest(request) {
  return request
    .then(json => {
      if (json.ok == true) {
      } else {
        return json;
      }
    })
    .catch(error => {
      throw error;
    });
}

// export function get(path) {
//   const API_REQ_URL = API_URL + path;
//   const request = fetch(API_REQ_URL, {
//     method: "GET"
//   });
//   return processRequest(request);
// }

export function put(path, obj) {
  const API_REQ_URL = API_URL + path;
  const request = axios.put(API_REQ_URL, obj, {
    headers: {
      'Content-Type': 'application/json',
    },

  })
  // const request = fetch(API_REQ_URL, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body:JSON.stringify(obj),
  // });
  return processRequest(request);
}




export function post(path, obj, data) {
  const API_REQ_URL = API_URL + path;
  const request = axios.post(API_REQ_URL, obj, {
    headers: {
      'Content-Type': data ? 'application/x-www-form-urlencoded' : 'application/json',
    },
  });
  return processRequest(request);
}

export function AddPost(path, obj, data) {
  const API_REQ_URL = API_URL + path;
  const request = axios.post(API_REQ_URL, obj, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "otherHeader": "foo",

    },
  });
  return processRequest(request);
}


export function uploadProduct(path, obj, token) {
  const API_REQ_URL = API_URL + path;
  const request = fetch(API_REQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(obj),
  });
  return processRequest(request);
}

export function del(path, obj) {
  const API_REQ_URL = API_URL + path;
  const request = fetch(API_REQ_URL, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return processRequest(request);
}
export function Get(path, obj,secctionId) {
  console.log(path,obj,secctionId)
  const API_REQ_URL = API_URL + path;
  const request = axios.get(API_REQ_URL,{
    headers:{
    'Cookie':`sessionid=${secctionId?secctionId:null}`
    }
  });
  return processRequest(request);
}


export function Recall(url, search, number, username) {
  const dispatch = useDispatch();
  dispatch(SearchAction.SearchFirend(url, search, number, username))

}
