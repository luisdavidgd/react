import random
import time

def show_sequence(sequence):
    print("\nSimon says:")
    for color in sequence:
        print(color)
        time.sleep(1)  # wait 1 second between colors
    print("\n" * 20)  # clear screen (basic trick)

def get_user_input(length):
    print("Repeat the sequence (type the colors separated by spaces):")
    entry = input("> ")
    return entry.strip().lower().split()

def play():
    colors = ["red", "blue", "green", "yellow"]
    sequence = []
    round_number = 1

    print("Welcome to Simon Says!")
    print("Remember the sequence and repeat it correctly.\n")

    while True:
        print(f"Round {round_number}")
        new_color = random.choice(colors)
        sequence.append(new_color)
        
        show_sequence(sequence)
        response = get_user_input(len(sequence))

        if response != sequence:
            print(f"Wrong! The correct sequence was: {' '.join(sequence)}")
            print(f"You reached round {round_number}. Good try!")
            break
        else:
            print("Correct!\n")
            round_number += 1
            time.sleep(1)

if __name__ == "__main__":
    play()
