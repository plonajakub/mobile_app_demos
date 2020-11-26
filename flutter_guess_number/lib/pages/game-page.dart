import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_guess_number/logic/game-master.dart';
import 'package:flutter_guess_number/shared/strings.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GamePage extends StatefulWidget {
  @override
  _GamePageState createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  static const String DEFAULT_ANSWER = 'Make a guess!';
  final RegExp _inputRegexp;
  TextEditingController _textEditingController;
  GameMaster _gameMaster;
  String _gameState;
  String _gameAnswer;
  int _maxRoll;

  _GamePageState() : _inputRegexp = new RegExp(r"^\d+$");

  void initState() {
    super.initState();
    _textEditingController = TextEditingController();
    createGameMaster();
    setState(() {
      _gameState = GameMaster.decodeGameState(GameState.Started);
      _gameAnswer = DEFAULT_ANSWER;
    });
  }

  void dispose() {
    _textEditingController.dispose();
    super.dispose();
  }

  void checkGuess() {
    if (!_inputRegexp.hasMatch(_textEditingController.text)) {
      Fluttertoast.showToast(
        msg: 'You can input non-negative integers only!',
        toastLength: Toast.LENGTH_SHORT,
      );
      return;
    }
    int inputAsInt = int.parse(_textEditingController.text);
    GuessAnswer answer = _gameMaster.makeGuess(inputAsInt);
    setState(() {
      _gameState = GameMaster.decodeGameState(_gameMaster.gameState);
      _gameAnswer = GameMaster.decodeGuessAnswer(answer);
    });
  }

  void createGameMaster() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    int guessesRightLimit = prefs.getInt(ConstStrings.MAX_ROLL) ??
        GameMaster.DEFAULT_GUESS_RIGHT_LIMIT;
    int maxGuesses = prefs.getInt(ConstStrings.MAX_GUESSES) ??
        GameMaster.DEFAULT_MAX_GUESSES;
    _gameMaster = GameMaster(
      guessesRightLimit: guessesRightLimit,
      maxGuesses: maxGuesses,
    );
    setState(() {
      _gameState = GameMaster.decodeGameState(_gameMaster.gameState);
      _gameAnswer = DEFAULT_ANSWER;
      _maxRoll = guessesRightLimit;
    });
    print('New game created: maxRoll: ${_gameMaster.guessRightLimit},'
        ' maxGuesses: ${_gameMaster.maxGuesses}');
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Column(
          children: [
            Container(
                margin: EdgeInsets.fromLTRB(0, 8, 8, 0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Icon(
                      Icons.settings,
                    ),
                    Icon(Icons.keyboard_arrow_right)
                  ],
                )),
            Expanded(
              child: Container(
                margin: EdgeInsets.fromLTRB(0, 60, 0, 0),
                child: Text(
                  _gameState,
                  style: TextStyle(fontSize: 34, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            Expanded(
              child: Container(
                margin: EdgeInsets.fromLTRB(0, 40, 0, 0),
                child: Text(
                  _gameAnswer,
                  style: TextStyle(fontSize: 21),
                ),
              ),
            ),
            Expanded(
              child: Container(
                margin: EdgeInsets.symmetric(vertical: 0, horizontal: 100),
                child: TextField(
                  controller: _textEditingController,
                  decoration: InputDecoration(
                    isDense: true,
                    contentPadding: EdgeInsets.all(1),
                    labelText: 'Range: 0 - ${_maxRoll ?? '...'}',
                  ),
                  style: TextStyle(fontSize: 24),
                  keyboardType: TextInputType.number,
                ),
              ),
            ),
            Expanded(
              child: Container(
                child: Column(children: [
                  TextButton(
                    child: Text('Check'),
                    style: TextButton.styleFrom(
                      primary: Colors.black,
                      backgroundColor: Theme.of(context).primaryColor,
                      onSurface: Colors.grey,
                    ),
                    onPressed: () {
                      checkGuess();
                    },
                  ),
                  TextButton(
                    child: Text('Restart'),
                    style: TextButton.styleFrom(
                      primary: Colors.black,
                      backgroundColor: Theme
                          .of(context)
                          .primaryColor,
                      onSurface: Colors.grey,
                    ),
                    onPressed: () {
                      createGameMaster();
                    },
                  )
                ]),
              ),
            )
          ],
        ),
      ),
    );
  }
}
