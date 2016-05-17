export function authService($http, $location, $window, CONSTANTS) {
  'ngInject';

  let token = null;

  const Auth = {
    getToken,
    setToken,
    deleteToken,
    login,
    logout,
  };

  return Auth;

  function getToken() {
    if (!token) {
      token = $window.localStorage.getItem('token');
    }

    return token;
  }

  function setToken(settedToken) {
    token = settedToken;
    $window.localStorage.setItem('token', settedToken);
  }

  function deleteToken() {
    token = null;
    $window.localStorage.removeItem('token');
  }

  function login(userData) {
    return $http.post(`${CONSTANTS.API_PATH}/login`, {
      username: userData.username,
      password: userData.password,
    }).then((response) => {
      if (response.data.token) {
        Auth.setToken(response.data.token);

        // redirect to same /login page and actual redirection would be in .run function
        $window.location = `${CONSTANTS.BASE_PATH}/`;
      }

      return response;
    });
  }

  function logout() {
    Auth.deleteToken();
    $window.location = `${CONSTANTS.BASE_PATH}/`;
  }
}
