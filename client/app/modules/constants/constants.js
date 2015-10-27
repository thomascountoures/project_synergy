angular
	.module('CONSTANTS', [])

	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		logoutFailed: 'auth-logout-failed',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	})

	.constant('USER_ROLES', {
		all: '*',
		registered: 'registered',
		admin: 'admin',
		guest: 'guest'
	})