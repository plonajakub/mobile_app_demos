import 'package:flutter/material.dart';
import 'package:flutter_guess_number/pages/game-page.dart';
import 'package:flutter_guess_number/pages/settings-page.dart';

void main() {
  runApp(MyApp());
}

class CustomColors {
  static const Color primaryColor = Color(0xFFFF8B80);
  static const Color primaryColorDark = Color(0xFFC85B53);
  static const Color accent = Color(0xFF80F4FF);
  static const Color accentDark = Color(0xFF46C1CC);
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Guess Number',
      theme: ThemeData(
          primaryColor: CustomColors.primaryColor,
          primaryColorDark: CustomColors.primaryColorDark,
          accentColor: CustomColors.accent,
          backgroundColor: Colors.white,
          brightness: Brightness.light,
          sliderTheme: SliderThemeData(
            thumbColor: CustomColors.accentDark,
            activeTrackColor: CustomColors.accent,
            inactiveTrackColor: CustomColors.accent,
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
