let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
const generateTarget = () => {
    return Math.floor(Math.random() * 10);
}
/**
 * @param hum the user guess
 * @param cpu the cpu guess
 * @param num the secret number to be guessed
*/
const compareGuesses = (hum, cpu, num) => {
    if(!hum || !cpu || !hum) { 
        return 'Something went wrong here..' 
    }
    let humAcc = hum >= num ? hum - num : num - hum;
    let cpuAcc = cpu >= num ? cpu - num : num - cpu;
    humAcc <= cpuAcc ? true : false;
}
/**
 * @param winner the winner, user or cpu 
 */
const updateScore = (winner) => {
    winner === 'human' ? ++humanScore : ++computerScore;
}
const advanceRound = () => {
    ++currentRoundNumber;
}