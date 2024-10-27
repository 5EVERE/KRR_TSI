const crypto = require('crypto');

class Host {
    constructor(secretKey) {
        this.secretKey = secretKey; 
    }

    // Генерація випадкового виклику
    generateChallenge() {
        return crypto.randomBytes(16).toString('hex');
    }

    // Надсилає виклик до іншого хоста
    sendChallenge() {
        const challenge = this.generateChallenge(); 
        console.log(`Host A sent challenge: ${challenge}`);
        return challenge;
    }

    // Генерація відповіді на виклик
    generateResponse(challenge) {
        const hash = crypto.createHmac('sha256', this.secretKey) 
            .update(challenge)
            .digest('hex'); // Обчислюємо хеш
        console.log(`Generated response: ${hash}`);
        return hash;
    }

    // Перевірка отриманої відповіді
    validateResponse(response, expectedChallenge) {
        const expectedResponse = crypto.createHmac('sha256', this.secretKey)
            .update(expectedChallenge)
            .digest('hex');

        console.log(`Expected response: ${expectedResponse}`);
        console.log(`Received response: ${response}`);
        
        const isValid = response === expectedResponse;
        console.log(`Validation result: ${isValid}`);
        return isValid;
    }
}

const hostA = new Host('secretKey');
const hostB = new Host('secretKey');

// Хост A надсилає виклик до Хоста B
const challenge = hostA.sendChallenge();
const response = hostB.generateResponse(challenge); 

// Хост A перевіряє відповідь Хоста B
const isValid = hostA.validateResponse(response, challenge);

console.log(`Authentication ${isValid ? 'successful' : 'failed'}`);