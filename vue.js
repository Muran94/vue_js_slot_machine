var vm = new Vue({
  el: "#app",
  data: {
    panels_num: 3,
    img_files: ["images/seven.png", "images/bell.png", "images/cherry.png"],
    panels: [
      { label: "STOP", img: "images/seven.png", pushed: true, matched: true },
      { label: "STOP", img: "images/seven.png", pushed: true, matched: true },
      { label: "STOP", img: "images/seven.png", pushed: true, matched: true }
    ],
    timers: [],
    running: false,
  },
  computed: {
    all_pushed: function() {
      var all_pushed = true;
      for (var i = 0; i < this.panels.length; i++) {
        if (!this.panels[i].pushed) {
          all_pushed = false;
        }
      }
      return all_pushed;
    }
  },
  methods: {
    spin: function() {
      if (this.running) {return}
      this.running = true;
      for (var i = 0; i < this.panels.length; i++) {
        this.runSlot(i);
        this.panels[i].pushed = false;
        this.panels[i].matched = true;
      }
    },
    stop: function(i) {
      if (this.panels[i].pushed) {return}
      this.panels[i].pushed = true;
      clearTimeout(this.timers[i]);
      if (this.all_pushed) {
        this.running = false;
        this.checkResult();
      }
    },
    runSlot: function(i) {
      this.timers[i] = setTimeout(function() {
        panels = this.panels;
        panels[i].img = this.img_files[Math.floor(Math.random() * panels.length)];
        this.runSlot(i);
      }.bind(this), 50);
    },
    checkResult: function() {
      var img0 = this.panels[0]
      var img1 = this.panels[1]
      var img2 = this.panels[2]

      if (img0.img !== img1.img && img0.img !== img2.img) {
        img0.matched = false;
      }
      if (img1.img !== img0.img && img1.img !== img2.img) {
        img1.matched = false;
      }
      if (img2.img !== img0.img && img2.img !== img1.img) {
        img2.matched = false;
      }
    }
  }
})
