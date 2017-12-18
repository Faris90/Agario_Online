function Blob(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);

    this.update = function () {
        var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
        // newvel.sub(this.pos);
        newvel.setMag(3);
        this.vel.lerp(newvel, 0.2);
        this.pos.add(this.vel);
    };

    this.eats = function (other) {
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            var sum = this.r * this.r + other.r * other.r;
            // console.log(sqrt(sum));
            this.r = Math.sqrt(sum);
            // this.r += other.r;
            return true;
        } else {
            return false;
        }
    };

    this.show = function () {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}