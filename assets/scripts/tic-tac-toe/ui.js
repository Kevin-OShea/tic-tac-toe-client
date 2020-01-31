const store = require('./../store')
const gameLogic = require('./gameLogic')

const onSignUpSuccess = function (response) {
  $('#message').html(response.user.email + ' has been signed up successfully')
  $('#sign-up').trigger('reset')
}

const onSignUpFailure = function (response) {
  $('#message').html('Sign up attempt failed, please try again')
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = function (response) {
  $('#message').html(response.user.email + ' has been signed in')
  store.user = response.user
  $('#sign-in').trigger('reset')

  $('#change-password').show()
  $('#sign-out').show()

  $('#sign-up').hide()
  $('#sign-in').hide()

  $('#game-start').show()
}

const onSignInFailure = function (response) {
  $('#message').html('Sign in failed, please try again')
  $('#sign-in').trigger('reset')
}

const startGameSuccess = function (response) {
  $('col-4').show()
  $('#message').html('game created')
  store.game = response.game
}

const updateBoardSuccess = function (response) {
  $('#message').html('game updated')
  store.game = response.game
  gameLogic.checkWinLoss()
}

const updateBoardFailure = function (response) {
  $('#message').html('update failed')
}

const onShowSuccess = function (response) {
  $('#message').html('Show sucess')
}

const onShowFailure = function (response) {
  $('#message').html('Show failed')
}

const startGameFailure = function (response) {
  $('#message').html('game creation failed, please try again')
}

const onSignOutSuccess = function (response) {
  $('#message').html('User has been signed out')
  store.user = null
  $('#sign-out').trigger('reset')

  $('#change-password').hide()
  $('#sign-out').hide()

  $('#sign-up').show()
  $('#sign-in').show()
}

const onSignOutFailure = function (response) {
  $('#message').html('Attempt to sign out failed, please try again')
  $('#sign-out').trigger('reset')
}

const onChangePasswordSuccess = function (response) {
  $('#message').html('Password has been changed successfully')
  $('#change-password').trigger('reset')
}

const onChangePasswordFailure = function (response) {
  $('#message').html('Attempt to change password failed, please try again')
  $('#change-password').trigger('reset')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  startGameSuccess,
  startGameFailure,
  updateBoardSuccess,
  updateBoardFailure,
  onShowSuccess,
  onShowFailure

}
