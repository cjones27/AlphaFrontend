export const isUserLogged = () => {
  if (localStorage.getItem('userId') !== null) {
    return true;
  }
  return false;
};

export const isUserAdmin = () => {
  if (localStorage.getItem('admin') !== null) {
    return true;
  }
  return false;
};
