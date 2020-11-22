import 'package:flutter/material.dart';

class GamePage extends StatefulWidget {
  @override
  _GamePageState createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  TextEditingController _textEditingController;

  void initState() {
    super.initState();
    _textEditingController = TextEditingController();
  }

  void dispose() {
    _textEditingController.dispose();
    super.dispose();
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
                  'GameState',
                  style: TextStyle(fontSize: 34, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            Expanded(
              child: Container(
                margin: EdgeInsets.fromLTRB(0, 40, 0, 0),
                child: Text(
                  'GameFeedback',
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
                  ),
                  style: TextStyle(
                    fontSize: 24
                  ),
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
                      primary: Colors.white,
                      backgroundColor: Theme.of(context).primaryColorDark,
                      onSurface: Colors.grey,
                    ),
                    onPressed: () {
                      print('Pressed B1');
                    },
                  ),
                  TextButton(
                    child: Text('Restart'),
                    style: TextButton.styleFrom(
                      primary: Colors.white,
                      backgroundColor: Theme.of(context).primaryColorDark,
                      onSurface: Colors.grey,
                    ),
                    onPressed: () {
                      print('Pressed B2');
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
