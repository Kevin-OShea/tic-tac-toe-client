const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')
const gameLogic = require('./gameLogic')

store.playerX = true
store.gameStart = false
store.showMenu = false
const placeGamePieces = function (event) {
  if (store.gameOver === false && store.gameStart === true) {
    event.preventDefault()
    $('#turn-message').text('It is Xs turn')
    const spot = event.target
    if ((store.playerX && $(spot).text() !== 'X') && (store.playerX && $(spot).text() !== 'O')) { // same thing
      $(spot).text('X') // if buttons do html
      store.game.cells[spot.id] = 'x'
      gameLogic.checkWinLoss()
      const data = {

        'game': {
          'cell': {
            'index': spot.id,
            'value': 'x'
          },
          'over': store.gameOver
        }
      }
      api.updateBoard(data)
        .then(ui.updateBoardSuccess)
        .catch(ui.updateBoardFailure)
      if (store.playerX) {
        $('#turn-message').text('It is Os turn')
      } else {
        $('#turn-message').text('It is Xs turn')
      }
      store.playerX = !store.playerX
    } else if ((store.playerX === false && $(spot).text() !== 'X') && (store.playerX === false && $(spot).text() !== 'O')) { // same thing
      $(spot).text('O') // if buttons do html
      store.game.cells[spot.id] = 'o'
      gameLogic.checkWinLoss()
      const data = {

        'game': {
          'cell': {
            'index': spot.id,
            'value': 'o'
          },
          'over': store.gameOver
        }
      }
      api.updateBoard(data)
        .then(ui.updateBoardSuccess)
        .catch(ui.updateBoardFailure)
        if (store.playerX) {
          $('#turn-message').text('It is Os turn')
        } else {
          $('#turn-message').text('It is Xs turn')
        }
      store.playerX = !store.playerX
    }
  } else if (store.gameStart !== true && store.user === null) {
    $('#message').html('Please sign in before playing')
  } else if (store.gameStart !== true && store.gameOver !== true) {
    $('#message').html('Please start a game')
  }
  resetAllToWhite()
}

const gameStart = function () {
  resetAllToWhite()
  $('#turn-message').text('It is Xs turn')
  store.gameStart = true
  store.gameOver = false
  store.playerX = true
  $('#reset-game').show()

  const game = store.game

  api.startGame(game)
    .then(ui.startGameSuccess)
    .catch(ui.startGameFailure)
  $('#total-games').show()
  onGetIndexGames()

  $('#game-start').hide()
}

const onSignUp = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (event) { // taking in sign in form
  event.preventDefault() // prevents refresh of page
  const form = event.target // set to where submit is being called
  const data = getFormFields(form) // gets data from form sign in
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signOut(data)
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)

  $('#menu-options').hide()
  $('#show-hide-menu').hide()

  $('#game-start').hide()
  store.gameStart = false

  $('#reset-game').hide()
  $('#total-games').hide()

  resetAllToWhite()

  $('#change-password').trigger('reset')
}

const onChangePassword = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)

  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const showBoardStatus = function () {
  event.preventDefault()
  api.showGame(store.game.id)
    .then(ui.onShowSuccess)
    .catch(ui.onShowFailure)
}

const onGetIndexGames = function () {
  event.preventDefault()
  api.getIndex()
    .then(ui.onIndexSuccess)
    .catch(ui.onIndexFailure)
}

const onResetGame = function () {
  event.preventDefault()
  store.game = null
  gameStart()
  $('#0').html('&nbsp;')
  $('#1').html('&nbsp;')
  $('#2').html('&nbsp;')
  $('#3').html('&nbsp;')
  $('#4').html('&nbsp;')
  $('#5').html('&nbsp;')
  $('#6').html('&nbsp;')
  $('#7').html('&nbsp;')
  $('#8').html('&nbsp;')
}

const checkValid = function (event) {
  if (store.gameStart) {
    const spot = event.target
    if ($(spot).text() !== 'X' && $(spot).text() !== 'O') {
      $(spot).css('background-color', 'rgb(204, 255, 204)')
    } else if ($(spot).text() === 'X' || $(spot).text() === 'O') {
      $(spot).css('background-color', 'rgb(255, 230, 230)')
    }
  }
}

const resetToWhite = function (event) {
  if (store.gameStart) {
    const spot = event.target
    $(spot).css('background-color', 'white')
  }
}

const resetAllToWhite = function (event) {
  $('#0').css('background-color', 'white')
  $('#1').css('background-color', 'white')
  $('#2').css('background-color', 'white')
  $('#3').css('background-color', 'white')
  $('#4').css('background-color', 'white')
  $('#5').css('background-color', 'white')
  $('#6').css('background-color', 'white')
  $('#7').css('background-color', 'white')
  $('#8').css('background-color', 'white')
}

const showMenu = function (event) {
  if (!store.showMenu) {
    $('#show-hide-menu').fadeIn(300)
  } else if (store.showMenu) {
    $('#show-hide-menu').fadeOut(300)
  }
  store.showMenu = !store.showMenu
}

const testClick = function (event) {
  event.preventDefault()
  const spot = event.target
  $(spot).text('X')
}
module.exports = {
  placeGamePieces,
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  gameStart,
  showBoardStatus,
  onResetGame,
  testClick,
  onGetIndexGames,
  checkValid,
  resetToWhite,
  showMenu,
  resetAllToWhite
}
