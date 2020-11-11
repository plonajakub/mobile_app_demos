export default class GameMaster {
    #guessRightLimit;
    #guessTarget;

    #maxGuesses;
    #guessesToFail;

    #gameState;

    static defaultGuessRighLimit = 50;
    static defaultGuessesToFail = 7;

    static GameState = {
        NotStarted: 0,
        Running: 1,
        Finished: 2,
    };

    static GuessAnswer = {
        Lower: 0,
        Higher: 1,
        Equal: 2,
        BadInput: 3,
        GameLost: 4,
        GameEnd: 5,
    };

    constructor(guessRightLimit, guessesToFail) {
        if (guessRightLimit < 1 || guessesToFail < 1) {
            throw new Error("Disallowed game settings. Game cannot be started.");
        }
        this.#guessRightLimit = guessRightLimit;
        this.#guessTarget = Math.round(Math.random() * guessRightLimit);

        this.#maxGuesses = guessesToFail;
        this.#guessesToFail = guessesToFail;
        
        this.#gameState = GameMaster.GameState.NotStarted;

        this.makeGuess = this.makeGuess.bind(this);
    }

    get guessRightLimit() {
        return this.#guessRightLimit;
    }

    get maxGuesses() {
        return this.#maxGuesses;
    }

    get guessesToFail() {
        return this.#guessesToFail;
    }

    get gameState() {
        return this.#gameState;
    }

    makeGuess(guess) {
        if (this.#gameState === GameMaster.GameState.NotStarted) {
            this.#gameState = GameMaster.GameState.Running;
        }

        if (this.#gameState === GameMaster.GameState.Finished) {
            return GameMaster.GuessAnswer.GameEnd;
        }

        if (guess < 0 || guess > this.#guessRightLimit) {
            return GameMaster.GuessAnswer.BadInput;
        }

        if (guess === this.#guessTarget) {
            this.#gameState = GameMaster.GameState.Finished;
            return GameMaster.GuessAnswer.Equal;
        }

        --this.#guessesToFail;
        if (this.#guessesToFail === 0) {
            this.#gameState = GameMaster.GameState.Finished;
            return GameMaster.GuessAnswer.GameLost;
        }

        if (guess > this.#guessTarget) {
            return GameMaster.GuessAnswer.Higher;
        }
        return GameMaster.GuessAnswer.Lower;
    }

    static decodeGameState(gameState) {
        switch (gameState) {
            case GameMaster.GameState.NotStarted:
                return "Game not started";
            case GameMaster.GameState.Running:
                return "Game in progress...";
            case GameMaster.GameState.Finished:
                return "Game has finished!";
        }
        throw new Error("Unknown game state");
    }

    static decodeGameAnswer(gameAnswer) {
        switch (gameAnswer) {
            case GameMaster.GuessAnswer.Lower:
                return "Your guess is lower than the target.";
            case GameMaster.GuessAnswer.Higher:
                return "Your guess is higher than the target.";
            case GameMaster.GuessAnswer.Equal:
                return "You won!";
            case GameMaster.GuessAnswer.BadInput:
                return "Your input is incorrect. Try again.";
            case GameMaster.GuessAnswer.GameLost:
                return "You lost!";
            case GameMaster.GuessAnswer.GameEnd:
                return "The game has ended.";
        }
        throw new Error("Unknown game answer");
    }
}