var svg, size, grow, x, y, dx, dy, dvdLogo, animationId, running, whichAnimation;

function main() {
    svg = document.getElementById('vimage');

    size = 40;
    grow = 0.5;
    x = 290;
    y = 300;
    dx = Math.random()*2 + 1;
    dy = Math.random()*2 + 1;
    running = false;
    whichAnimation = 0;

    dvdLogo = 'dvd_logo.png';

    drawCircle();
}

function startAnim1() {
    if (running && whichAnimation == 1) {
        stopAnim();
    }
    if (!running) {
        whichAnimation = 0;
        anim1();
        running = true;
    }
}

function anim1() {
    size += grow;
    if (size < 20) {
        grow = 0.5;
    } else if (size > 60) {
        grow = -0.5;
    }

    svg.innerHTML = '';
    drawCircle();

    animationId = window.requestAnimationFrame(anim1);
    //console.log(animationId)
}

function startAnim2() {
    if (running && whichAnimation == 0) {
        stopAnim();
    }
    if (!running) {
        whichAnimation = 1;
        anim2();
        running = true;
    }
}

function anim2() {
    x += dx;
    y += dy;

    if (x - 50 < 0 || x + 50 > 600) {
        dx *= -1;
        if (x - 50 < 0) {
            x = 50;
        } else {
            x = 600 - 50;
        }
        console.log(corners());
    }
    if (y - 25 < 0 || y + 25 > 600) {
        dy *= -1;
        if (y - 25 < 0) {
            y = 25;
        } else {
            y = 600 - 25;
        }
        console.log(corners());
    }

    svg.innerHTML = '';
    drawDVD();

    animationId = window.requestAnimationFrame(anim2);
}

function corners() {
    var d0 = dist(x - 50, y - 25, 0, 0);
    var d1 = dist(x + 50, y - 25, 500, 0);
    var d2 = dist(x - 50, y + 25, 0, 500);
    var d3 = dist(x + 50, y + 25, 500, 500);
    console.log(`${d0} ${d1} ${d2} ${d3}`);
    return d0 < d1 < d2 < d3 ? d0 : d1 < d2 < d3 ? d1 : d2 < d2 ? d3 : d3;
}

function dist(x0, y0, x1, y1) {
    var deltaX = x1 - x0;
    var deltaY = y1 - y0;
    return Math.sqrt( deltaX**2 + deltaY**2 );
}

function anim2_circle() {
    x += dx;
    y += dy;

    if (x - size < 0 || x + size > 600) {
        dx *= -1;
        if (x - size < 0) {
            x = size;
        } else {
            x = 600 - size;
        }
    }
    if (y - size < 0 || y + size > 600) {
        dy *= -1;
        if (y - size < 0) {
            y = size;
        } else {
            y = 600 - size;
        }
    }

    ctx.clearRect(0, 0, 600, 600);
    drawCircle();

    animationId = window.requestAnimationFrame(anim2);
}

function drawCircle() {
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', x);
    c.setAttribute('cy', y);
    c.setAttribute('r', size);
    c.setAttribute('fill', 'yellow');
    svg.appendChild(c);
}

function drawDVD() {
    var img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttribute('x', x - 50);
    img.setAttribute('y', y - 25);
    img.setAttribute('width', 100);
    img.setAttribute('height', 50);
    img.setAttribute('href', dvdLogo);
    svg.appendChild(img);
}

function stopAnim() {
    window.cancelAnimationFrame(animationId);
    running = false;
}
