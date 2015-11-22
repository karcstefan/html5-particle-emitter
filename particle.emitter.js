window.onload = function(){
 var IE = document.all?true:false
 if (!IE) document.captureEvents(Event.MOUSEMOVE)
 document.onmousemove = getMouseXY;

 var tempX = 0
 var tempY = 0

 function getMouseXY(e) {
   if (IE)
   {
     tempX = event.clientX + document.body.scrollLeft
     tempY = event.clientY + document.body.scrollTop
   }
   else
   {
     tempX = e.pageX
     tempY = e.pageY
   }

   document.getElementById("x-position").textContent = tempX;
   document.getElementById("y-position").textContent = tempY;

   return true
 }

  var canvas = document.getElementById("main"),
      ctx = canvas.getContext("2d"),
      ptcl = {},
      ptclIndex = 0,
      ptclNo = 10,
      ptclEmitted = 0,
      ptclDestroyed = 0;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      var Particle = function(argX, argY){
        this.id = ptclIndex;

        this.x = canvas.width * 0.1;
        this.y = canvas.height / 2;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
        this.blue = 255;
        this.red = 0;
        this.color = "rgba(" + this.red + ", 0, " + this.blue + ", 0.7)";
        this.size = 3;
        this.life = 0;
        this.maxLife = 100;
        this.bounced = false;
        ptcl[ptclIndex] = this;
        ptclIndex++;
        document.getElementById("emitted-number").textContent = ptclIndex + 1;
      };

      Particle.prototype.draw = function () {


        var a = parseInt(document.getElementById("x-position").textContent, 10) - this.x,
            b = parseInt(document.getElementById("y-position").textContent, 10) - this.y;

        if(Math.sqrt(a*a + b*b) <= 55 && !this.bounced)
        {
          this.color = "rgba(255, 0, 0, 0.3)";
          this.vx *= -1;
          //this.vy *= -1;
          this.bounced = true;
          ptclDestroyed++;

          document.getElementById("destroyed-number").textContent = ptclDestroyed + 1;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx += 0.3;
        this.life++;


        if(this.life > this.maxLife){
            delete ptcl[this.id];
        }
        this.blue--;
        this.red += 3;

        if(!this.bounced)
          this.color = "rgba(" + this.red + ", 0, " + this.blue + ", 0.7)";

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size,0, Math.PI*2, false);
        ctx.fill();
      };


      setInterval(function(){
        ctx.fillStyle = "#222"
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(parseInt(document.getElementById("x-position").textContent, 10), parseInt(document.getElementById("y-position").textContent, 10), 50, 0, Math.PI*2, false);
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();

        for(var i = 0; i < 7; i++)
          new Particle();

        for(var i in ptcl)
          ptcl[i].draw();

      }, 1000 / 30);
};
