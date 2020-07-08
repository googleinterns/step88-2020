export async function getLoginStatus() {
  const response = await fetch('/api/v1/auth');
  const login = await response.json();
  return login.loggedIn;
}

export async function getUrl() {
  const response = await fetch('/api/v1/auth');
  const login = await response.json();
  if (!login.loggedIn) {
    return login.loginUrl;
  } else {
    return login.logoutUrl;
  }
}
