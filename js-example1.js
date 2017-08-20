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

//implemantation using nested promise callback functions
// callbackhell as in deeply nested code block - there's no error checking in the function
function callbacks() {
  const api = new Api();
  let user, friends;
  api.getUser().then(function (returneduser) {
    user = returnedUser;
    api.getFriends(user.id).then(function (returnedFriends) {
      friends = returnedFriends;
      apy.getPhoto(user.id).then(function (photo) {
        console.log('callbackhell', { user, friends, photos });
      });
    });
  });
};

//Promise chain implementation - promises can be chained together by returning another promise inside each callback. This way we can keep all of the callback function declarations. (Better)
function promiseChain() {
  const api = new Api();
  let user, friends;
  api.getUser()
  .then(returnedUser) => {
    user = returnedUser;
    return api.getFriends(user.id);
  })
  .then(returnedFriends) => {
    friends = returnedFriends;
    return api.getPhoto(user.id)
  })
  .then((photo) => {
    console.log('promiseChain', { user, friends, photo });
  });
};

//Using Async/Await - calling await in front of promises pauses the flow of the function until the promise has resolved, and assigns the result to the variable to the left of the equal sign. Asynchronous operation flow implemented as though it were a normal synchronous series of commands.
// aync needs to be declared at the beginning of a function, it is required and turns the function into a promise.
// Promises offer a consistent syntax for chaining and composing asynchronous operations.
async function Example() {
  const api = new Api();
  const user = await api.getUser();
  const friends = await api.getFriends(user.id);
  const photo = await api.getPhoto(user.id);
  console.log('Aync example - ', {user, friends, photo });
}

// Functions to sequentially retrieve the friends lists for each of the users friends
// Example with promises - an inner-function that recursively chains promises for fetching friends-of-friends until the list is empty.
function promiseLoop() {
  const api = Api();
  api.getUser()
    .then((user) => {
      return api.getFriends(user.id);
    });
    .then((returnedFriends) => {
      const getFriendsOfFriends = (friends) => {
        if (friends.length > 0) {
          let friend = friends.pop();
          return api.getFriends(friend.id)
            .then((moreFriends) => {
              console.log('promiseloop', moreFriends);
              return getFriendsOfFriends(friends);
            });
        }
      }
      return getFriendsOfFriends(returnedFriends);
    })
};

// sequentially retrieve the friends lists for each of the users friends using Async/Await
async function Loop() {
  const api = new Api();
  const user = await api.getUser();
  const friends = await api.getFriends(user.id);

  for ( let friend in friends ) {
    let moreFriends = await.api.getFriends(friend.id);
    console.log('asyncAwait loops', moreFriends);
  };
};

//parallel operation with async/await - to run operations in parallel form an array of promises to be fun, and pass it as the parameter to Promise.all(). This returns single promises for us to await, which will resolve once all of the operations have completed.
async function ParallelLoop() {
  const api = new Api();
  const user = await api.getUser();
  const friends = await api.getFriends(user.id);
  const friendPromises = friends.map(friend => api.getFriends(friend.id));
  const moreFriends = await Promise.all(friendPromises);
  console.log('ParallelLoop ', moreFriends);
}

// Asynchronous error handling
// A single catch function at the end of a promise chain to provide a single error handler for all opertaions.
function PromiseChainErrorHandling() {
  const api = new Api();
  let user, friends;
  api.getUser()
    .then((returnedUser) => {
      user = returnedUser;
      return api.getFriends(user.id);
    })
    .then((returnedFriends) => {
      friends = returnedFriends;
      return api.throwError();
    })
    .then(() => {
      console.log('Error was not thrown')
      return api.getPhoto(user.id);
    })
    .then((photo) => {
      console.log('PromiseChainErrorHandling', { user, friends, photo });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Exmaple of Try/Catch block with Async await - we can throw and catch errors from synchronous and asynchronous code.

async function asyncTryCatch() {
  try {
    const api = new Api();
    const user = await api.getUser();
    const friends = await api.getFriends(user.id);

    await api.throwError();
    console.log('Error was not found');

    const photo = await api.getPhoto(user.id);
    console.log('async/await', { user, friends, photo });
  } catch (err) {
    console.log(err);
  };
};
