package com.example.guessnumber;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.SeekBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class SettingsFragment extends Fragment {

    private SharedPreferences srdPref;
    private SeekBar maxRollSb;
    private TextView maxRollValueTv;
    private SeekBar maxGuessesSb;
    private TextView maxGuessesValueTv;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.settings_fragment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        srdPref = view.getContext().getSharedPreferences("settings", Context.MODE_PRIVATE);
        maxRollSb = (SeekBar) view.findViewById(R.id.maxRollSb);
        maxRollValueTv = (TextView) view.findViewById(R.id.maxRollValueTv);
        maxGuessesSb = (SeekBar) view.findViewById(R.id.maxGuessesSb);
        maxGuessesValueTv = (TextView) view.findViewById(R.id.maxGuessesValueTv);

        maxGuessesSb.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {

            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                maxGuessesValueTv.setText(Integer.valueOf(sb2Usr(progress)).toString());
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        maxRollSb.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {

            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                maxRollValueTv.setText(Integer.valueOf(sb2Usr(progress)).toString());
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
    }

    @Override
    public void onPause() {
        super.onPause();

        int maxGuesses = Integer.parseInt(maxGuessesValueTv.getText().toString());
        int maxRoll = Integer.parseInt(maxRollValueTv.getText().toString());

        SharedPreferences.Editor editor = srdPref.edit();
        editor.putInt("maxGuesses", maxGuesses); // Starts from 1
        editor.putInt("maxRoll", maxRoll); // Starts from 1
        editor.apply();

        Log.d("Settings", "Preferences written: maxGuesses = " + maxGuesses + " maxRoll = " + maxRoll);
    }

    @Override
    public void onResume() {
        super.onResume();

        maxGuessesSb.setProgress(usr2Sb(srdPref.getInt("maxGuesses", usr2Sb(7))));
        maxRollSb.setProgress(usr2Sb(srdPref.getInt("maxRoll", usr2Sb(100))));

        Log.d("Settings",
                "Preferences restored:" +
                        " maxGuesses = " + sb2Usr(maxGuessesSb.getProgress()) +
                        " maxRoll = " + sb2Usr(maxRollSb.getProgress()));
    }

    private int usr2Sb(int progress) {
        return progress - 1;
    }

    private int sb2Usr(int progress) {
        return progress + 1;
    }
}
