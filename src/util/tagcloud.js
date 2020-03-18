const TagCloud = function (box, aA) {
  var timer = null
  var i = 0;

  for (i = 0; i < aA.length; i++) {
    aA[i].pause = 1;
    aA[i].time = null;
    initialize(aA[i]);
    aA[i].onmouseover = function () {
      this.pause = 0;
    };
    aA[i].onmouseout = function () {
      this.pause = 1;
    };
  }
  timer = setInterval(starmove, 50);

  function starmove () {
    for (i = 0; i < aA.length; i++) {
      if (aA[i].pause) {
        domove(aA[i]);
      }
    }
    // console.log(timer)
  }

  function domove (obj) {
    // console.log(obj)
    if (obj.offsetTop <= -obj.offsetHeight) {
      obj.style.display = 'none';
      obj.style.top = box.offsetHeight + 10 + "px";
      initialize(obj);
    } else {
      obj.style.top = obj.offsetTop - obj.ispeed + "px";
    }
  }

  function initialize (obj) {
    obj.style.display = 'block';
    var iLeft = parseInt(Math.random() * box.offsetWidth);
    // console.log(iLeft)
    var scale = Math.random() * 1.4;
    var iTimer = parseInt(Math.random() * 1500);
    obj.pause = 0;

    obj.style.fontSize = 12 * scale + 'px';

    if ((iLeft - obj.offsetWidth) > 0 && (iLeft + obj.offsetWidth) < box.offsetWidth) {
      obj.style.left = iLeft + "px";
    } else if ((iLeft - obj.offsetWidth) < 0) {
      obj.style.left = iLeft + obj.offsetWidth + Math.floor(Math.random() * 200) + "px";
    } else {
      obj.style.left = iLeft - obj.offsetWidth - Math.floor(Math.random() * 200) + "px";
    }

    clearTimeout(obj.time);
    obj.time = setTimeout(function () {
      obj.pause = 1;
    }, iTimer);
    obj.ispeed = Math.ceil(Math.random() * 30) + 1;
  }

  return timer
}

export {
  TagCloud
}

