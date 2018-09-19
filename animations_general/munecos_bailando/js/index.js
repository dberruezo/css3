"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
	(function () {

		// ---- main loop ----

		var run = function run() {
			requestAnimationFrame(run);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//ctx.fillStyle = "#222";
			ctx.fillStyle = " #0D132B";
			ctx.fillRect(0, 0, canvas.width, canvas.height * 0.15);
			ctx.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.15);

			for (var _iterator9 = dancers, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
				var _ref9;

				if (_isArray9) {
					if (_i9 >= _iterator9.length) break;
					_ref9 = _iterator9[_i9++];
				} else {
					_i9 = _iterator9.next();
					if (_i9.done) break;
					_ref9 = _i9.value;
				}

				var dancer = _ref9;

				dancer.update();
				dancer.draw();
			}
		};

		// ---- robot structure ----

		var Robot = function () {
			function Robot(color, light, size, x, y, struct) {
				_classCallCheck(this, Robot);

				this.points = [];
				this.links = [];
				this.frame = 0;
				this.dir = 1;
				this.size = size;
				this.color = Math.round(color);
				this.light = light;

				// ---- points ----
				var id = 0;
				for (var _iterator = struct.points, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
					var _ref;

					if (_isArray) {
						if (_i >= _iterator.length) break;
						_ref = _iterator[_i++];
					} else {
						_i = _iterator.next();
						if (_i.done) break;
						_ref = _i.value;
					}

					var p = _ref;

					this.points.push(new Point(id++, size * p[0] + x, size * p[1] + y, p[2]));
				}

				// ---- links ----
				for (var _iterator2 = struct.links, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
					var _ref2;

					if (_isArray2) {
						if (_i2 >= _iterator2.length) break;
						_ref2 = _iterator2[_i2++];
					} else {
						_i2 = _iterator2.next();
						if (_i2.done) break;
						_ref2 = _i2.value;
					}

					var l = _ref2;

					var p0 = this.points[l[0]];
					var p1 = this.points[l[1]];
					var dx = p0.x - p1.x;
					var dy = p0.y - p1.y;
					this.links.push(new Link(this, p0, p1, Math.sqrt(dx * dx + dy * dy), l[2] * size / 3, l[3], l[4]));
				}
			}

			Robot.prototype.update = function update() {
				// ---- beat ----
				if (++this.frame % 20 === 0) this.dir = -this.dir;

				// ---- create giants ----
				if (dancerDrag && this === dancerDrag && this.size < 16 && this.frame > 600) {
					dancerDrag = null;
					dancers.push(new Robot(this.color, this.light * 1.25, this.size * 2, pointer.x, pointer.y - 100 * this.size * 2, struct));
					dancers.sort(function (d0, d1) {
						return d0.size - d1.size;
					});
				}

				// ---- update links ----
				for (var _iterator3 = this.links, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
					var _ref3;

					if (_isArray3) {
						if (_i3 >= _iterator3.length) break;
						_ref3 = _iterator3[_i3++];
					} else {
						_i3 = _iterator3.next();
						if (_i3.done) break;
						_ref3 = _i3.value;
					}

					var link = _ref3;

					var p0 = link.p0;
					var p1 = link.p1;
					var dx = p0.x - p1.x;
					var dy = p0.y - p1.y;
					var dist = Math.sqrt(dx * dx + dy * dy);

					if (dist) {
						var tw = p0.w + p1.w;
						var r1 = p1.w / tw;
						var r0 = p0.w / tw;
						var dz = (link.distance - dist) * link.force;
						dx = dx / dist * dz;
						dy = dy / dist * dz;
						p1.x -= dx * r0;
						p1.y -= dy * r0;
						p0.x += dx * r1;
						p0.y += dy * r1;
					}
				}

				// ---- update points ----
				for (var _iterator4 = this.points, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
					var _ref4;

					if (_isArray4) {
						if (_i4 >= _iterator4.length) break;
						_ref4 = _iterator4[_i4++];
					} else {
						_i4 = _iterator4.next();
						if (_i4.done) break;
						_ref4 = _i4.value;
					}

					var point = _ref4;

					// ---- drag ----
					if (this === dancerDrag && point === pointDrag) {
						point.x += (pointer.x - point.x) * 0.1;
						point.y += (pointer.y - point.y) * 0.1;
					}

					// ---- dance ----
					if (this !== dancerDrag) {
						point.fn && point.fn(16 * Math.sqrt(this.size), this.dir);
					}

					// ---- verlet integration ----
					point.vx = point.x - point.px;
					point.vy = point.y - point.py;
					point.px = point.x;
					point.py = point.y;
					point.vx *= 0.995;
					point.vy *= 0.995;
					point.x += point.vx;
					point.y += point.vy + 0.01;
				}

				for (var _iterator5 = this.links, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
					var _ref5;

					if (_isArray5) {
						if (_i5 >= _iterator5.length) break;
						_ref5 = _iterator5[_i5++];
					} else {
						_i5 = _iterator5.next();
						if (_i5.done) break;
						_ref5 = _i5.value;
					}

					var link = _ref5;

					var p1 = link.p1;

					// ---- ground ----
					if (p1.y > canvas.height * ground - link.size * 0.5) {
						p1.y = canvas.height * ground - link.size * 0.5;
						p1.x -= p1.vx;
						p1.vx = 0;
						p1.vy = 0;
					}

					// ---- borders ----
					if (p1.id === 1 || p1.id === 2) {
						if (p1.x > canvas.width - link.size) p1.x = canvas.width - link.size;else if (p1.x < link.size) p1.x = link.size;
					}
				}
			};

			Robot.prototype.draw = function draw() {
				for (var _iterator6 = this.links, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
					var _ref6;

					if (_isArray6) {
						if (_i6 >= _iterator6.length) break;
						_ref6 = _iterator6[_i6++];
					} else {
						_i6 = _iterator6.next();
						if (_i6.done) break;
						_ref6 = _i6.value;
					}

					var link = _ref6;

					if (link.size) {
						var dx = link.p1.x - link.p0.x;
						var dy = link.p1.y - link.p0.y;
						var a = Math.atan2(dy, dx);
						var d = Math.sqrt(dx * dx + dy * dy);

						// ---- shadow ----
						ctx.save();
						ctx.translate(link.p0.x + link.size * 0.25, link.p0.y + link.size * 0.25);
						ctx.rotate(a);
						ctx.drawImage(link.shadow, -link.size * 0.5, -link.size * 0.5, d + link.size, link.size);
						ctx.restore();

						// ---- stroke ----
						ctx.save();
						ctx.translate(link.p0.x, link.p0.y);
						ctx.rotate(a);
						ctx.drawImage(link.image, -link.size * 0.5, -link.size * 0.5, d + link.size, link.size);
						ctx.restore();
					}
				}
			};

			return Robot;
		}();

		var Link = function Link(parent, p0, p1, dist, size, light, force) {
			_classCallCheck(this, Link);

			// ---- cache strokes ----
			function stroke(color, axis) {
				var image = document.createElement("canvas");
				image.width = dist + size;
				image.height = size;
				var ict = image.getContext("2d");
				ict.beginPath();
				ict.lineCap = "round";
				ict.lineWidth = size;
				ict.strokeStyle = color;
				ict.moveTo(size * 0.5, size * 0.5);
				ict.lineTo(size * 0.5 + dist, size * 0.5);
				ict.stroke();
				if (axis) {
					var s = size / 10;
					ict.fillStyle = "#000";
					ict.fillRect(size * 0.5 - s, size * 0.5 - s, s * 2, s * 2);
					ict.fillRect(size * 0.5 - s + dist, size * 0.5 - s, s * 2, s * 2);
				}
				return image;
			}

			this.p0 = p0;
			this.p1 = p1;
			this.distance = dist;
			this.size = size;
			this.light = light || 1.0;
			this.force = force || 0.5;
			this.image = stroke("hsl(" + parent.color + " ,30%, " + parent.light * this.light + "%)", true);
			this.shadow = stroke("rgba(0,0,0,0.5)");
		};

		var Point = function Point(id, x, y, fn, w) {
			_classCallCheck(this, Point);

			this.id = id;
			this.x = x;
			this.y = y;
			this.w = w || 0.5;
			this.fn = fn || null;
			this.px = x;
			this.py = y;
			this.vx = 0;
			this.vy = 0;
		};

		var Canvas = function () {
			function Canvas() {
				var _this = this;

				_classCallCheck(this, Canvas);

				this.elem = document.createElement("canvas");
				this.ctx = this.elem.getContext("2d", { alpha: false });
				var elemento = document.getElementsByClassName("prueba");
                elemento[0].appendChild(this.elem);
				//document.elemento.appendChild(this.elem);
				//document.body.appendChild(this.elem);
				this.resize();
				window.addEventListener("resize", function () {
					return _this.resize();
				}, false);
			}

			Canvas.prototype.resize = function resize() {
				this.width = this.elem.width = this.elem.offsetWidth;
				this.height = this.elem.height = this.elem.offsetHeight;
				ground = this.height > 500 ? 0.85 : 1.0;
			};

			return Canvas;
		}();

		var Pointer = function () {
			function Pointer(canvas) {
				var _this2 = this;

				_classCallCheck(this, Pointer);

				this.x = 0;
				this.y = 0;
				this.canvas = canvas;

				window.addEventListener("mousemove", function (e) {
					return _this2.move(e);
				}, false);
				canvas.elem.addEventListener("touchmove", function (e) {
					return _this2.move(e);
				}, false);
				window.addEventListener("mousedown", function (e) {
					return _this2.down(e);
				}, false);
				window.addEventListener("touchstart", function (e) {
					return _this2.down(e);
				}, false);
				window.addEventListener("mouseup", function (e) {
					return _this2.up(e);
				}, false);
				window.addEventListener("touchend", function (e) {
					return _this2.up(e);
				}, false);
			}

			Pointer.prototype.down = function down(e) {
				this.move(e);

				for (var _iterator7 = dancers, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
					var _ref7;

					if (_isArray7) {
						if (_i7 >= _iterator7.length) break;
						_ref7 = _iterator7[_i7++];
					} else {
						_i7 = _iterator7.next();
						if (_i7.done) break;
						_ref7 = _i7.value;
					}

					var dancer = _ref7;

					for (var _iterator8 = dancer.points, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
						var _ref8;

						if (_isArray8) {
							if (_i8 >= _iterator8.length) break;
							_ref8 = _iterator8[_i8++];
						} else {
							_i8 = _iterator8.next();
							if (_i8.done) break;
							_ref8 = _i8.value;
						}

						var point = _ref8;

						var dx = pointer.x - point.x;
						var dy = pointer.y - point.y;
						var d = Math.sqrt(dx * dx + dy * dy);
						if (d < 60) {
							dancerDrag = dancer;
							pointDrag = point;
							dancer.frame = 0;
						}
					}
				}
			};

			Pointer.prototype.up = function up(e) {
				dancerDrag = null;
			};

			Pointer.prototype.move = function move(e) {
				var touchMode = e.targetTouches,
				    pointer = undefined;
				if (touchMode) {
					e.preventDefault();
					pointer = touchMode[0];
				} else pointer = e;
				this.x = pointer.clientX;
				this.y = pointer.clientY;
			};

			return Pointer;
		}();

		// ---- init ----

		var ground = 1.0;
		var canvas = new Canvas();
		var ctx = canvas.ctx;
		var pointer = new Pointer(canvas);
		var dancerDrag = null;
		var pointDrag = null;var struct = {
			points: [[0, -4, function (s, d) {
				this.y -= 0.01 * s;
			}], [0, -16, function (s, d) {
				this.y -= 0.02 * s * d;
			}], [0, 12, function (s, d) {
				this.y += 0.02 * s * d;
			}], [-12, 0], [12, 0], [-3, 34, function (s, d) {
				if (d > 0) {
					this.x += 0.01 * s;
					this.y -= 0.015 * s;
				} else {
					this.y += 0.02 * s;
				}
			}], [3, 34, function (s, d) {
				if (d > 0) {
					this.y += 0.02 * s;
				} else {
					this.x -= 0.01 * s;
					this.y -= 0.015 * s;
				}
			}], [-28, 0, function (s, d) {
				this.x += this.vx * 0.035;
				this.y -= 0.001 * s;
			}], [28, 0, function (s, d) {
				this.x += this.vx * 0.035;
				this.y -= 0.001 * s;
			}], [-3, 64, function (s, d) {
				this.y += 0.02 * s;
				if (d > 0) {
					this.y -= 0.01 * s;
				} else {
					this.y += 0.05 * s;
				}
			}], [3, 64, function (s, d) {
				this.y += 0.02 * s;
				if (d > 0) {
					this.y += 0.05 * s;
				} else {
					this.y -= 0.01 * s;
				}
			}], [0, -4.1]],

			links: [[3, 7, 12, 0.5], [1, 3, 24, 0.5], [1, 0, 18, 0.5], [0, 11, 60, 0.8], [5, 9, 16, 0.5], [2, 5, 32, 0.5], [1, 2, 50, 1], [6, 10, 16, 1.5], [2, 6, 32, 1.5], [4, 8, 12, 1.5], [1, 4, 24, 1.5]]
		};

		// ---- instanciate robots ----
		var dancers = [];

		for (var i = 0; i < 6; i++) {
			dancers.push(new Robot(i * 360 / 7, 80, 4, (i + 2) * canvas.width / 9, canvas.height * ground - 295, struct));
		}

		run();
	})();
}