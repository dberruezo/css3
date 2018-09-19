TweenMax.fromTo('.fire', .03, {x: -.5, y: -.4}, {x: .5, y: .4, repeat: -1, yoyo: true});
var tl     = new TimelineMax({repeat: -1});
var tl_sky = new TimelineMax({repeat: -1});

tl_sky.fromTo('.sky', 12, {transform: 'translateY(-100vh)'}, {transform: 'translateY(0)', ease: Power0.easeNone});
    tl.to('.rocket', 3, {transform: 'translateY(-5vh)', ease: Expo.easeOut}) //INSERT ROCKET
    .fromTo('.fire', .4, {scaleY: .7}, {scaleY: 1.5}, '+=1.5') //SCALE THE FLAMES
    .add(() => tl_sky.timeScale(25), '-=.4') //SPEED UP THE SKY
    .to('.rocket', 2, {transform: 'translateY(-130vh)', ease: Power3.easeOut}, '+=2.5') //HIDE THE ROCK
    .add(() => TweenMax.to(tl_sky, 1.5, {timeScale: 2}), '-=.5') //RETURN SKY TO THE ORIGINAL SPEED

tl_sky.timeScale(1);
