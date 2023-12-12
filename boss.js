import Opponent from './Opponent.js';

class Boss extends Opponent {
    constructor(game) {
        const height = OPPONENT_HEIGHT * game.width / 100;
        const width = OPPONENT_WIDTH * game.width / 100;
        const x = getRandomNumber(game.width - width / 2);
        const y = 0;
        const speed = BOSS_SPEED;
        const myImage = BOSS_PICTURE;
        const myImageDead = BOSS_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);

        this.direction = "R"; // Dirección hacia la que se mueve el oponente
        setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
    }

    shoot() {
        if (!this.dead && !this.game.ended && !this.game.paused) {
            this.game.shoot(this);
        }
        setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
    }

    update() {
        if (!this.dead && !this.game.ended) {
            this.y += this.speed;
            if (this.y > this.game.height) {
                this.y = 0;
            }
            if (this.direction === "R") { // Hacia la derecha
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                } else {
                    this.horizontalMov = 0;
                }
            } else if (this.x > this.speed) {
                this.x -= this.speed;
            } else {
                this.horizontalMov = 0;
            }
            this.horizontalMov -= this.speed;
            if (this.horizontalMov < this.speed) {
                this.horizontalMov = getRandomNumber(this.game.width / 2);
                this.direction = this.direction === "R" ? "L" : "R"; // Cambia de sentido
            }
        }
    }

    collide() {
        if (!this.dead) {
            game.score++;
            setTimeout(() => {
                this.game.removeBoss();
            }, 2000);
            super.collide();
        }
    }
}

export default Boss;
