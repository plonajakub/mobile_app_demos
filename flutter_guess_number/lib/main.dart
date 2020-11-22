import 'package:flutter/material.dart';
import 'package:flutter_guess_number/pages/game-page.dart';
import 'package:flutter_guess_number/pages/settings-page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Guess Number',
      theme: ThemeData(
        primaryColor: const Color(0xFFFF8B80),
        primaryColorDark: const Color(0xFFC85B53),
        accentColor: const Color(0xFF80F4FF),
        backgroundColor: Colors.white,
        brightness: Brightness.light
      ),
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
