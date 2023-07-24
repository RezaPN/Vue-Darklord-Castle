const getRandomValue = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound >= 3;
        },
    },
    watch: {
        playerHealth(value) {
            if (value < 0) {
                this.playerHealth = 0;
            }

            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = `It's a Draw`;
            } else if (value <= 0) {
                this.winner = 'Dark Lord Win..., You Lost!';
            }

            if (value > 100) {
                this.playerHealth = 100;
            }
        },
        monsterHealth(value) {
            if (value < 0) {
                this.monsterHealth = 0;
            }

            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = `It's a Draw`;
            } else if (value <= 0) {
                this.winner = 'You Win! Dark Lord is defeated!';
            }
        },
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = []
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(12, 5); //calculate random number between 12 and 5
            this.monsterHealth -= attackValue;
            this.addLogMessage('Hero', 'Attack', attackValue)
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(15, 8);
            this.addLogMessage('Dark Lord', 'Attack', attackValue)
            this.playerHealth -= attackValue;
        },
        specialAttackMonster() {
            this.currentRound = 0;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('Hero', 'Special Attack', attackValue)
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            this.playerHealth += healValue;
            this.addLogMessage('Hero', 'Heal', healValue)
            this.attackPlayer();
        },
        surrender(){
            this.addLogMessage('Hero', 'Surrender', 0)
            this.playerHealth = 0;
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
                
            })
        }
    },
});

app.mount('#game');
