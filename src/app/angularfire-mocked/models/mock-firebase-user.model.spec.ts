import { MockFirebaseUser } from './mock-firebase-user.model';

describe('MockFirebaseUser', () => {
  describe('no user given in constructor', () => {
    it('should create with correct default values', () => {
      // Act
      const result = new MockFirebaseUser();

      // Assert
      expect(result.displayName).toBeNull();
      expect(result.email).toEqual('mock-user@email.com');
      expect(result.photoURL).toBeNull();
      expect(result.providerId).toEqual('provider-id');
      expect(result.uid).toEqual('user-id');
      expect(result.emailVerified).toBe(false);
      expect(result.isAnonymous).toBe(false);
      expect(result.providerData).toEqual([]);
      expect(result.refreshToken).toEqual('mock-refresh-token');
    });
  });

  describe('user object given in constructor', () => {
    it('should overwrite default values correctly', () => {
      // Arrange
      const user = {
        displayName: 'Billy',
        email: 'billysbad@gmail.com',
        photoURL: 'something',
        providerId: 'different-provider-id',
        uid: 'different-user-id',
        emailVerified: true,
        isAnonymous: true,
        refreshToken: 'different-mock-refresh-token'
      }

      // Act
      const result = new MockFirebaseUser(user);

      // Assert
      expect(result.displayName).toEqual(user.displayName);
      expect(result.email).toEqual(user.email);
      expect(result.photoURL).toEqual(user.photoURL);
      expect(result.providerId).toEqual(user.providerId);
      expect(result.uid).toEqual(user.uid);
      expect(result.emailVerified).toEqual(user.emailVerified);
      expect(result.isAnonymous).toEqual(user.isAnonymous);
      expect(result.refreshToken).toEqual(user.refreshToken);
    });

    it('should only overwrite values when given', () => {
      // Arrange
      const user = {
        displayName: 'Bazza',
        email: 'bazbaz@email.com',
        emailVerified: true
      }

      // Act
      const result = new MockFirebaseUser(user);

      // Assert
      expect(result.displayName).toEqual(user.displayName);
      expect(result.email).toEqual(user.email);
      expect(result.photoURL).toBeNull();
      expect(result.providerId).toEqual('provider-id');
      expect(result.uid).toEqual('user-id');
      expect(result.emailVerified).toEqual(user.emailVerified);
      expect(result.isAnonymous).toBe(false);
      expect(result.providerData).toEqual([]);
      expect(result.refreshToken).toEqual('mock-refresh-token');
    });
  });
});
