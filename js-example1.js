// dummy class that simulates network calls by returning promises which will resolve with simple data 200ms after being called.
class Api {
  constructor() {
    this.user = { id: 1, name: 'simpletest' },
    this.friends = { this.user, this.user, this.user },
    this.photo = 'place holder',
  };

  //return a user
  getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.user), 200),
    });
  };
  //return a users's friends by ID
  getFriends(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.friends.slice()), 200);
    });
  };

  //return a users photo
  getPhoto(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.photo, 200));
    });
  };

  throwError() {
    return new Promise((reolve, reject) => {
      setTimeout(() => reject(new Error('Internal Error')), 200);
    });
  };
}
