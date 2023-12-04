/**
 *  Cada uno de los personajes del juego, es decir, aquellos elementos que tienen “vida”.
 *  @extends Entity
 */
class Character extends Entity {
    /**
     * Inicializa un personaje
     * @param game {Game} La instancia del juego al que pertenece el personaje
     * @param width {Number} Ancho del personaje
     * @param height {Number} Alto del personaje
     * @param x {Number} Posición horizontal del personaje
     * @param y {Number} Posición vertical del personaje
     * @param speed {Number} Velocidad del personaje
     * @param myImage {String} Ruta de la imagen del personaje
     * @param myImageDead {String} Ruta de la imagen del personaje cuando muere
     */
    constructor (game, width, height, x, y, speed, myImage, myImageDead) {
        super(game, width, height, x, y, speed, myImage);
        this.dead = false; // Indice si el personaje está vivo o muerto
        this.myImageDead = myImageDead;
    }

    /**
     * Si al jugador le quedan vidas, debe morirse durante dos segundos (llamando al método collide de su superclase Character) y renacer al cabo de ese tiempo.
     */
    collide() {
        if (this.game.lives > 0) {
            this.image.src = this.myImageDead;
            this.dead = true;

            setTimeout(() => {
                this.image.src = this.myImage;
                this.dead = false;
            }, 2000);
        }
    }
}

