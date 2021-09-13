const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'auth.invalidEmail';
    case 'auth/user-disabled':
      return 'auth.userDisabled';
    case 'auth/user-not-found':
      return 'auth.userNotFound';
    case 'auth/wrong-password':
      return 'auth.wrongPassword';
    case 'auth/weak-password':
      return 'auth.weakPassword';
    case 'auth/email-already-in-use':
      return 'auth.emailAlreadyInUse';
    case 'auth/too-many-requests':
      return 'auth.tooManyRequests';
    case 'auth/requires-recent-login':
      return 'auth.requiresRecentLogin';
    default:
      return 'default';
  }
};

const getStorageErrorMessage = (error) => {
  switch (error.code) {
    case 'storage/object-not-found':
    case 'storage/project-not-found':
      return 'storage.fileNotFound';
    case 'storage/unauthenticated':
    case 'storage/unauthorized':
    case 'storage/invalid-checksum':
      return 'storage.notPermission';
    case 'storage/retry-limit-exceeded':
      return 'storage.retryLimitExceeded';
    case 'storage/server-file-wrong-size':
      return 'storage.fileWrongSize';
    case 'storage/file-format-not-supported':
      return 'storage.fileFormatNotSupported';
    default:
      return 'default';
  }
};

export { getAuthErrorMessage, getStorageErrorMessage };
