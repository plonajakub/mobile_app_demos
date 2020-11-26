import 'package:flutter/material.dart';
import 'package:flutter_guess_number/logic/game-master.dart';
import 'package:flutter_guess_number/shared/strings.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsPage extends StatelessWidget {
  static const String pageTitle = 'Settings';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: EdgeInsets.fromLTRB(8, 8, 0, 0),
          child: Row(
            children: [
              Icon(Icons.keyboard_arrow_left),
              Icon(Icons.videogame_asset)
            ],
          ),
        ),
        Container(
          margin: EdgeInsets.fromLTRB(0, 60, 0, 60),
          child: Text(
            pageTitle,
            style: TextStyle(fontSize: 30),
          ),
        ),
        Container(
          padding: EdgeInsets.all(40),
          child: Column(
            children: [
              SliderWithInfo(
                title: 'Maximum roll value',
                rightLimit: 100,
                sharedPrefsName: ConstStrings.MAX_ROLL,
                defaultValue: GameMaster.DEFAULT_GUESS_RIGHT_LIMIT,
              ),
              SizedBox(
                height: 25,
              ),
              SliderWithInfo(
                title: 'Maximum guesses',
                rightLimit: 15,
                defaultValue: GameMaster.DEFAULT_MAX_GUESSES,
                sharedPrefsName: ConstStrings.MAX_GUESSES,
              ),
            ],
          ),
        )
      ],
    );
  }
}

class SliderWithInfo extends StatefulWidget {
  static const String valueInfoText = 'Current value:';
  static const int leftLimit = 1;

  final String title;
  final int rightLimit;
  final String sharedPrefsName;
  final int defaultValue;

  SliderWithInfo(
      {@required this.title,
      @required this.rightLimit,
      @required this.sharedPrefsName,
      @required this.defaultValue});

  @override
  _SliderWithInfoState createState() => _SliderWithInfoState();
}

class _SliderWithInfoState extends State<SliderWithInfo> {
  double _currentSliderValue = 1;

  void initState() {
    super.initState();
    initPrefs();
  }

  void initPrefs() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    int prefsValue = prefs.getInt(widget.sharedPrefsName);
    setState(() {
      _currentSliderValue = prefsValue != null
          ? prefsValue.toDouble()
          : widget.defaultValue.toDouble();
    });
    print(
        '${widget.sharedPrefsName} loaded, value: ${_currentSliderValue
            .toInt()}');
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.title,
            style: TextStyle(
              fontSize: 20,
            ),
          ),
          Slider(
            value: _currentSliderValue,
            min: SliderWithInfo.leftLimit.toDouble(),
            max: widget.rightLimit.toDouble(),
            divisions: null,
            label: null,
            onChanged: (double value) {
              setState(() {
                _currentSliderValue = value.roundToDouble();
              });
            },
            onChangeEnd: (double value) async {
              SharedPreferences prefs = await SharedPreferences.getInstance();
              prefs.setInt(widget.sharedPrefsName, value.round());
              print(
                  '${widget.sharedPrefsName} saved, value: ${prefs.getInt(
                      widget.sharedPrefsName)}');
            },
          ),
          Row(
            children: [
              Text(
                SliderWithInfo.valueInfoText,
                style: TextStyle(
                  fontSize: 17,
                ),
              ),
              Container(
                margin: EdgeInsets.fromLTRB(5, 0, 0, 0),
                child: Text(
                  _currentSliderValue.toInt().toString(),
                  style: TextStyle(
                    fontSize: 18,
                  ),
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
