import 'package:flutter/material.dart';
import 'package:flutter_guess_number/pages/game-page.dart';
import 'package:flutter_guess_number/pages/settings-page.dart';
import 'package:flutter_guess_number/shared/colors.dart';
import 'package:flutter_statusbarcolor/flutter_statusbarcolor.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback(
        (_) => FlutterStatusbarcolor.setStatusBarWhiteForeground(true));
    return MaterialApp(
      title: 'Guess Number',
      theme: ThemeData(
          primaryColor: CustomColors.primaryColor,
          primaryColorDark: CustomColors.primaryColorDark,
          accentColor: CustomColors.accent,
          backgroundColor: Colors.white,
          sliderTheme: SliderThemeData(
            thumbColor: CustomColors.accentDark,
            activeTrackColor: CustomColors.accent,
            inactiveTrackColor: Colors.grey,
            trackHeight: 1.0,
          )),
      home: Scaffold(
        resizeToAvoidBottomInset: true,
        appBar: AppBar(
          title: Text('Guess Number'),
        ),
        body: PageView(
          controller: PageController(
            initialPage: 0,
          ),
          children: [
            GamePage(),
            SettingsPage(),
          ],
        ),
      ),
    );
  }
}
