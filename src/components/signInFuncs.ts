
var YOUR_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
var YOUR_REDIRECT_URI = process.env.REACT_APP_REDIRECT;
// eslint-disable-next-line no-restricted-globals


// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function signIn(dispatch: Function, pathName: string) {
  const savedLocally = localStorage.getItem('oauth2');
  if (savedLocally) var params = JSON.parse(savedLocally);
  if (params && params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://www.googleapis.com/drive/v3/about?fields=user&' +
      'access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {


        dispatch && dispatch({ type: 'SET_PROFILE', payload: JSON.parse(xhr.response) });
        localStorage.setItem('profile', xhr.response);
        dispatch && dispatch({ type: 'SET_IS_LOGGED_IN', payload: true });
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        // Token invalid, so prompt for user permission.
        oauth2SignIn();
      }
    };
    xhr.send(null);
  } else {
    if (pathName !== '/') oauth2SignIn();
  }
  return Promise
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params: any = {
    'client_id': YOUR_CLIENT_ID,
    'redirect_uri': YOUR_REDIRECT_URI,
    'scope': `https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile ${process.env.REACT_APP_API_SCOPES}`,
    'state': 'signIn',
    'include_granted_scopes': 'true',
    'response_type': 'token'
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
export function loadAuth(dispatch: Function, pathName: string) {
  // eslint-disable-next-line no-restricted-globals
  var fragmentString = location.hash.substring(1);
  var params: any = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem("oauth2", JSON.stringify(params));
    if (params["state"] && params["state"] === "try_sample_request") {
      signIn(dispatch, pathName);
    }
  }
}

function signOut(dispatch: Function) {
  dispatch({ type: 'SET_PROFILE', payload: {} })
  dispatch({ type: 'SET_IS_LOGGED_IN', payload: false });
  dispatch({ type: 'SET_COURSES', payload: false });
  localStorage.removeItem('oauth2')
  localStorage.removeItem('profile')
}
function getHeaders() {
  const auth = JSON.parse(localStorage.getItem('oauth2') || "")
  return { 'Authorization': `Bearer ${auth.access_token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' }
}
export { signIn, signOut, getHeaders }