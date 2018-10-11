// setting the enemy bug (will be my dog chester)
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-chesterin.png';
    this.x = x;
    this.y = y + 60;
// manipulation of speed enemy will be moving
    this.speed = speed; 
    this.step = 105;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};
//function will update..if enemy stays on boundry line//enemy moves forward and increments sped//else reset to start postion
Enemy.prototype.update = function(dt) {
    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    } else { 
        this.x = this.resetPos;
    }
};

// enemy bug image (chester) rendered/drawn 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//setting player, my pic and distances 
var Player = function(x, y, speed) {
    this.sprite = 'images/lupi.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
 // size of steps right and left   
    this.step = 105;
 //size of steps up and down   
    this.jump = 86; 
    this.startX = this.step * 2; 
    this.startY = (this.jump * 4) + 60; 
    this.y = this.startY;
    this.victory = false;

};
// player/my pic as player// image rendered/drawn 

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyEnter) {
    switch (keyEnter) {
        case 'left':
            if (this.x > 0) {
                this.x -= this.step;
            }
            break;
        case 'up':
            if (this.y > this.jump) {
                this.y -= this.jump;
            }
            break;
        case 'right':
            if (this.x < this.step * 4) {
                this.x += this.step;
            }
            break;
        case 'down':
            if (this.y < this.jump * 4) {
                this.y += this.jump;
                break;
            }
    }

}

Player.prototype.update = function() {//function checks for contact between player and enemy
    for (let enemy of allEnemies) {
        if (this.y === enemy.y &&
            (enemy.x + enemy.step / 2 > this.x &&
                enemy.x < this.x + this.step / 2)) { 
            this.reset();
        }
    }
    if (this.y === 60) { // checks for victory if player made it to blue water title
        this.victory = true;
    }
}
Player.prototype.reset = function() {
    this.y = this.startY;
    this.x = this.startX;
}

const player = new Player(200, 400);
const bug1 = new Enemy(-105, 0, 175);
const bug2 = new Enemy(-105, 86, 115);
const bug3 = new Enemy((-105 * 2.5), 86, 200);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);
console.log(allEnemies);
//Event listner for key presses for player manipulation
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
player.handleInput(allowedKeys[e.keyCode]);
});
