/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el jugador
     */
    constructor (game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;
            mylives = NUMBER_OF_LIVES;

        super(game, width, height, x, y, speed, myImage, myImageDead, mylives);
    }

    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update () {
        if (!this.dead) {
            switch (this.game.keyPressed) {
            case KEY_LEFT:
                if (this.x > this.speed) {
                    this.x -= this.speed;
                }
                break;
            case KEY_RIGHT:
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                }
                break;
            case KEY_SHOOT:
                this.game.shoot(this);
                break;
            }
        }
    }

    /**
     * Modificar el código del método collide de la clase Player para que reste una vida cada vez que al jugador le alcance un disparo mientras esté vivo.
     */
    collide() {
        if (!this.dead) {
            this.lives--; // Restar una vida al jugador
            if (this.lives <= 0) {
                setTimeout(() => {
                    this.game.endGame();
                }, 2000);
                this.dead = true;
            }
        }
        super.collide();
    }
}