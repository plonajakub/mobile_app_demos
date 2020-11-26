import 'dart:math';

enum GameState {
  Started,
  Running,
  Finished,
}

enum GuessAnswer {
  Lower,
  Higher,
  Equal,
  BadInput,
  GameLost,
  GameEnd,
}

class GameMaster {
  final int _guessRightLimit;
  final int _guessTarget;

  final int _maxGuesses;
  int _guessesToFail;

  GameState _gameState;

  static const int DEFAULT_GUESS_RIGHT_LIMIT = 50;
  static const int DEFAULT_MAX_GUESSES = 7;

  GameMaster(
      {int guessesRightLimit = DEFAULT_GUESS_RIGHT_LIMIT,
      int maxGuesses = DEFAULT_MAX_GUESSES})
      : _guessRightLimit = guessesRightLimit,
        _guessTarget = Random().nextInt(guessesRightLimit + 1),
        _maxGuesses = maxGuesses,
        _guessesToFail = maxGuesses,
        _gameState = GameState.Started {
    if (_guessRightLimit < 1 || _guessesToFail < 1) {
      throw ("Disallowed game settings. Game cannot be started.");
    }
  }

  int get guessRightLimit => _guessRightLimit;

  int get maxGuesses => _maxGuesses;

  GameState get gameState => _gameState;

  GuessAnswer makeGuess(int guess) {
    if (_gameState == GameState.Started) {
      _gameState = GameState.Running;
    }

    if (_gameState == GameState.Finished) {
      return GuessAnswer.GameEnd;
    }

    if (guess < 0 || guess > _guessRightLimit) {
      return GuessAnswer.BadInput;
    }

    if (guess == _guessTarget) {
      _gameState = GameState.Finished;
      return GuessAnswer.Equal;
    }

    --_guessesToFail;
    if (_guessesToFail == 0) {
      _gameState = GameState.Finished;
      return GuessAnswer.GameLost;
    }

    if (guess > _guessTarget) {
      return GuessAnswer.Higher;
    }
    return GuessAnswer.Lower;
  }

  static String decodeGameState(GameState gameState) {
    switch (gameState) {
      case GameState.Started:
        return "Game started";
      case GameState.Running:
        return "Game in progress...";
      case GameState.Finished:
        return "Game has finished!";
    }
    throw ("Unknown game state");
  }

  static String decodeGuessAnswer(GuessAnswer guessAnswer) {
    switch (guessAnswer) {
      case GuessAnswer.Lower:
        return "Your guess is lower than the target.";
      case GuessAnswer.Higher:
        return "Your guess is higher than the target.";
      case GuessAnswer.Equal:
        return "You won!";
      case GuessAnswer.BadInput:
        return "Your input is incorrect. Try again.";
      case GuessAnswer.GameLost:
        return "You lost!";
      case GuessAnswer.GameEnd:
        return "The game has ended.";
    }
    throw ("Unknown guess answer");
  }
}
