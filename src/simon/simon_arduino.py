const int ledPins[4] = {2, 3, 4, 5};    // Red, Blue, Green, Yellow LEDs
const int buttonPins[4] = {6, 7, 8, 9}; // Buttons for each color
const int maxSequence = 100;

int sequence[maxSequence];
int userIndex = 0;
int level = 0;
bool playing = true;

void setup() {
  for (int i = 0; i < 4; i++) {
    pinMode(ledPins[i], OUTPUT);
    pinMode(buttonPins[i], INPUT_PULLUP);
  }
  randomSeed(analogRead(0));  // Random seed
  Serial.begin(9600);
  delay(1000);
  Serial.println("Simon Says Game - Ready!");
  nextRound();
}

void loop() {
  if (!playing) return;

  for (int i = 0; i < 4; i++) {
    if (digitalRead(buttonPins[i]) == LOW) {
      lightUp(i);
      if (i != sequence[userIndex]) {
        gameOver();
        return;
      }
      userIndex++;
      if (userIndex > level) {
        delay(500);
        nextRound();
      }
      while (digitalRead(buttonPins[i]) == LOW); // wait until button released
      delay(200);
    }
  }
}

void nextRound() {
  level++;
  userIndex = 0;
  sequence[level - 1] = random(0, 4);
  Serial.print("Round ");
  Serial.println(level);
  showSequence();
}

void showSequence() {
  for (int i = 0; i < level; i++) {
    lightUp(sequence[i]);
    delay(250);
  }
}

void lightUp(int index) {
  digitalWrite(ledPins[index], HIGH);
  delay(500);
  digitalWrite(ledPins[index], LOW);
}

void gameOver() {
  Serial.println("Wrong button! Game Over.");
  playing = false;
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
      digitalWrite(ledPins[j], HIGH);
    }
    delay(300);
    for (int j = 0; j < 4; j++) {
      digitalWrite(ledPins[j], LOW);
    }
    delay(300);
  }
}
