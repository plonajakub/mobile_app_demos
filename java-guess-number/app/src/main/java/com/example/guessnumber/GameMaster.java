package com.example.guessnumber;

import java.security.InvalidParameterException;

public class GameMaster {

    private final int _guessRightLimit;
    private final int _guessTarget;
    private final int _maxGuesses;
    private GameState _gameState;
    private int _guessesToFail;

    public GameMaster(int guessRightLimit, int guessesToFail) {
        if (guessRightLimit < 1 || guessesToFail < 1) {
            throw new InvalidParameterException("Disallowed game settings. Game cannot be started.");
        }
        _guessRightLimit = guessRightLimit;
        _maxGuesses = guessesToFail;
        _guessesToFail = guessesToFail;
        _guessTarget = (int) Math.ceil(Math.random() * _guessRightLimit);
        _gameState = GameState.Running;
    }

    public int getGuessRightLimit() {
        return _guessRightLimit;
    }

    public int getMaxGuesses() {
        return _maxGuesses;
    }

    public GuessAnswer makeGuess(int guess) {
        if (_gameState.equals(GameState.Finished)) {
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

    public int getGuessesToFail() {
        return _guessesToFail;
    }

    public GameState getGameState() {
        return _gameState;
    }

    public enum GameState {
        NotStarted,
        Running,
        Finished;

        @Override
        public String toString() {
            switch (this) {
                case NotStarted:
                    return "Game not started yet";
                case Running:
                    return "Game in progress...";
                case Finished:
                    return "Game has finished!";
            }
            return "It is impossible";
        }
    }

    public enum GuessAnswer {
        Lower,
        Higher,
        Equal,
        BadInput,
        GameLost,
        GameEnd;
        @Override
        public String toString() {
            switch (this) {
                case Lower:
                    return "Your guess is lower than the target.";
                case Higher:
                    return "Your guess is higher than the target.";
                case Equal:
                    return "You won!";
                case BadInput:
                    return "Your input is incorrect. Try again.";
                case GameLost:
                    return "You lost!";
                case GameEnd:
                    return "The game has ended. ";
            }
            return "You have broken the program ;)";
        }
    }
}
