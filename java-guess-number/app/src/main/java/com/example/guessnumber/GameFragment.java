package com.example.guessnumber;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class GameFragment extends Fragment {
    private GameMaster gameMaster;
    private SharedPreferences srdPref;

    private TextView gameStateTv;
    private TextView gameFeedbackTv;
    private EditText inputEt;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.game_fragment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        srdPref = view.getContext().getSharedPreferences("settings", Context.MODE_PRIVATE);
        gameStateTv = view.findViewById(R.id.gameStateTv);
        gameFeedbackTv = view.findViewById(R.id.gameFeedbackTv);
        inputEt = view.findViewById(R.id.inputGuessEt);
        Button submitInputBtn = view.findViewById(R.id.makeGuessBtn);
        submitInputBtn.setOnClickListener(v -> {
            int userInput;
            try {
                userInput = Integer.parseInt(inputEt.getText().toString());
            } catch (NumberFormatException e) {
                Toast.makeText(view.getContext(), "You can input non-negative integers only!", Toast.LENGTH_SHORT).show();
                return;
            }
            GameMaster.GuessAnswer guessAnswer = gameMaster.makeGuess(userInput);
            gameFeedbackTv.setText(guessAnswer.toString());
            gameStateTv.setText(gameMaster.getGameState().toString());
        });

        Button startNewGameBtn = view.findViewById(R.id.newGameButton);
        startNewGameBtn.setOnClickListener(v -> startNewGame(srdPref.getInt("maxRoll", GameMaster.DEFAULT_GUESS_RIGHT_LIMIT),
                srdPref.getInt("maxGuesses", GameMaster.DEFAULT_GUESSES_TO_FAIL)));
    }

    @Override
    public void onResume() {
        super.onResume();
        int guessRightLimit = srdPref.getInt("maxRoll", GameMaster.DEFAULT_GUESS_RIGHT_LIMIT);
        int maxGuesses = srdPref.getInt("maxGuesses", GameMaster.DEFAULT_GUESSES_TO_FAIL);
        if (gameMaster == null ||
                gameMaster.getMaxGuesses() != maxGuesses ||
                gameMaster.getGuessRightLimit() != guessRightLimit) {
            startNewGame(guessRightLimit, maxGuesses);
        }
    }

    private void startNewGame(int guessRightLimit, int maxGuesses) {
        gameMaster = new GameMaster(guessRightLimit, maxGuesses);
        gameFeedbackTv.setText(R.string.tv_game_feedback_text_default);
        gameStateTv.setText(R.string.tv_game_state_text_default);
    }
}
