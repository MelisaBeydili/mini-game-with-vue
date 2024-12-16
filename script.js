function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      winner: null,
      computerHealth: 100,
      playerHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    computerBarStyles() {
      if (this.computerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.computerHealth + "%" };
      }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    possibleSpecialAttack () {
       return this.currentRound % 4 !==0
    }, 
  },
  watch: {
    playerHealth(value) {
        if (value <= 0 && this.computerHealth <= 0) {
            this.winner='draw'
        } else if (value <= 0) {
            this.winner = 'computer'
        }
    },
    computerHealth(value) {
        if (value <= 0 && this.playerHealth <= 0) {
            this.winner='draw'
        } else if (value <= 0) {
            this.winner = 'player'
        }
    }
  },
  methods: {
    attacktoComputer() {
        this.currentRound++
      const attackValue = getRandomValue(7, 15);
      this.computerHealth = this.computerHealth - attackValue;
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(10, 20);
      this.playerHealth = this.playerHealth - attackValue;
    },

    specialAttack() {
        this.currentRound++
      const attackValue = getRandomValue(15, 30);
      this.computerHealth = this.computerHealth - attackValue;
      this.attackPlayer();
    },

    addHealth() {
        this.currentRound++
      const healValue = getRandomValue(15, 30);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.attackPlayer();
    },
    newGame() {
        this.playerHealth = 100
        this.computerHealth = 100
        this.winner = null 
        this.currentRound = 0
    },
  },
});

app.mount("#frontend");
