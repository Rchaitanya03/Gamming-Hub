// Retrieve the selected category from localStorage
let selectedCategory = localStorage.getItem('selectedCategory');

// Define categories and words
const categories = {
    animals: ['elephant', 'tiger', 'kangaroo', 'giraffe', 'zebra'],
    fruits: ['apple', 'banana', 'cherry', 'mango', 'orange'],
    states: ['india', 'america', 'australia', 'ireland', 'united kingdom']
};

// Track current word index
let currentWordIndex = 0;

// Function to start the game
function startGame() {
    loadWord();
}

// Function to load the word based on the current index
function loadWord() {
    // Ensure the index is within bounds
    if (currentWordIndex >= categories[selectedCategory].length) {
        // All words have been guessed correctly
        document.getElementById('status').textContent = 'You Win! 🎉';
        setTimeout(() => {
            window.location.href = 'wordgame.html'; // Go back to the game selection page after winning
        }, 2000);
        return;
    }

    // Get the current word
    const selectedWord = categories[selectedCategory][currentWordIndex];

    // Initialize game variables
    let guessedWord = Array(selectedWord.length).fill('_');
    let attemptsLeft = 6;
    let guessedLetters = [];

    // Display the category title
    document.getElementById('category-title').textContent = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

    // Display the word with underscores
    document.getElementById('word').textContent = guessedWord.join(' ');

    // Handle letter guesses
    window.guessLetter = function (letter) {
        // Prevent the user from guessing the same letter multiple times
        if (guessedLetters.includes(letter)) return;

        guessedLetters.push(letter);
        let correctGuess = false;

        // Check if the letter exists in the selected word
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
                correctGuess = true;
            }
        }

        // Update the word display with the new guessed letters
        document.getElementById('word').textContent = guessedWord.join(' ');

        // If the guess is correct, check if the word is fully guessed
        if (correctGuess) {
            if (!guessedWord.includes('_')) {
                // Move to the next word
                currentWordIndex++;
                loadWord(); // Load the next word
            }
        } else {
            // Reduce attempts for incorrect guesses
            attemptsLeft--;
            document.getElementById('attempts').textContent = `Attempts Left: ${attemptsLeft}`;

            // If attempts run out, redirect to the lost page
            if (attemptsLeft === 0) {
                document.getElementById('status').textContent = `Game Over! The word was "${selectedWord}".`;
                setTimeout(() => {
                    window.location.href = 'lost.html'; // Redirect to lost page
                }, 2000);
            }
        }
    };
}

// Start the game when the page loads
startGame();
