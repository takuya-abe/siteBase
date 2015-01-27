// v1.1
// 2014.11.28
(function(){
	"use strict";

	window.PluginSlide = (function(){

		/*****************************************************************************************************************
		 * コンストラクタ
		 *****************************************************************************************************************/

		var Slide = function(param){

			if(typeof param !== 'object') param = {};

			this.param = param;

			// スライド全体を囲むDOMオブジェクト
			this.wrapper = $(param.selector);

			// スライドの種類
			if('type' in param){
				switch(param.type){
					case 'move' : this.type =  this.SLIDE_TYPE_MOVE; break;
					case 'fade' : this.type =  this.SLIDE_TYPE_FADE; break;
					default     : this.type =  this.SLIDE_TYPE_MOVE;
				}
			}else{
				this.type = this.SLIDE_TYPE_MOVE;
			}

			// スライド本体
			this.slide = 'slide' in param ? $(param.slide) : this.wrapper.find('.slide');

			// スライド内要素
			this.items = 'items' in param ? $(param.items) : this.wrapper.find('.item');

			// 戻るボタン
			this.prev = 'prev' in param ? $(param.prev) : this.wrapper.find('.prev');

			// 次へボタン
			this.next = 'next' in param ? $(param.next) : this.wrapper.find('.next');

			// ボタンラッパー
			this.inds = 'inds' in param ? $(param.inds) : this.wrapper.find('.inds');

			// ページインデックス。内部的にはitem要素数を超える場合あり。補正値が必要な場合はgetCurrentを使用する。
			this.current = 0;

			// スライド幅
			this.slideW = 'itemWidth' in param ? parseInt(param.itemWidth) : this.items.eq(0).outerWidth(false);

			// 全体の幅
			this.totalW = 0;

			// 移動時間
			this.duration = 'duration' in param && (typeof param.duration === 'number' || typeof param.duration === 'function') ? param.duration : 800;

			// イージング関数
			this.easing = 'easing' in param ? (typeof param.easing === 'string' ? jQuery.easing[param.easing] : param.easing) : jQuery.easing.ioX2;

			// ループフラグ
			this.loop = 'loop' in param ? !!param.loop : false;

			this.cloneNum = 'clones' in param ? parseInt(param.clones) : 1;

			// フリック可能フラグ
			this.flickable = 'flickable' in param ? !!param.flickable : true;

			// キー移動可能フラグ
			this.keyboard = 'keyboard' in param ? param.keyboard : false;

			// CSS3使用フラグ
			this.useCSS3 = 'css3' in param ? !!param.css3 && Shared.css.hasTransition : Shared.css.hasTransition;

			// スライド現在座標
			this.slideX = 0;

			// アニメーション制御タイマー
			this.animationID = null;

			// 移動前コールバック
			this.beforeCallback = 'before' in param && typeof param.before === 'function' ? param.before : false;

			// 移動後コールバック
			this.afterCallback  = 'after' in param && typeof param.after === 'function' ? param.after : false;

			// リサイズ時のコールバック
			this.resizeCallback = 'resize' in param && typeof param.resize === 'function' ? param.resize : false;

			// アニメーションフレームごとのコールバック
			this.stepCallback = 'step' in param && typeof param.step === 'function' ? param.step : false;

			// 自動切り替えの間隔
			this.interval = 'interval' in param && typeof param.interval === 'number' ? param.interval : false;

			// 自動切り替えタイマー
			this.intervalID = null;

			// 操作時にタイマーを止めるかどうか
			this.stopIfManipulate = 'stopIfManipulate' in param ? !!param.stopIfManipulate : false;

			// 自動切り替えタイマーの状態
			this.intervalActive = !!this.interval;

			// 矢印の表示非表示関数のオーバーライド
			if('arrowPrev' in param && typeof param.arrowPrev === 'function'){
				this.arrowPrev = param.arrowPrev;
			}
			if('arrowNext' in param && typeof param.arrowNext === 'function'){
				this.arrowNext = param.arrowNext;
			}

			// スライドの隙間
			if('itemGap' in param){
				this.itemGap = parseInt(param.itemGap);
				this.items.css({marginRight:this.itemGap});
			}else{
				this.itemGap = parseFloat(this.items.eq(0).css('margin-right'));
			}

			// 画面サイズ
			this.winW;
			this.winH;

			// Cookieパラメータ
			if('cookie' in param){
				this.cookie = {name:'slide_saved_index', expires:'30minutes'}; // デフォルト値

				if(typeof param.cookie === 'object'){
					if('name' in param.cookie) this.cookie.name = param.cookie.name;
					if('expires' in param.cookie) this.cookie.expires = param.cookie.expires;
				}
			}else{
				this.cookie = false;
			}

			// 初期スライドの設定 cookieよりparam.iniを優先
			if('ini' in param){
				this.current = parseInt(param.ini) || 0;
			}else if(this.cookie){
				this.current = parseInt(Shared.util.cookie(this.cookie.name)) || 0;
			}

			// 不正値チェック
			this.current = Shared.util.clamp(this.current, 0, this.items.length-1);


			// ボタン作成
			if(this.inds.get(0)){
				if(this.inds.length === this.items.length){
					this.buttons = this.inds;
				}else{
					// ボタン内要素がスライド枚数と異なる場合は、自動作成する。
					if(this.inds.children('*').length !== this.items.length){
						this.inds.html('');

						for(var i=0,len=this.items.length; i<len; i++){
							this.inds.append($('<li></li>'));
						}
					}
					this.buttons = this.inds.children('*');
				}
			}else{
				this.buttons = null;
			}

			this.prev.find('img').img2vml();
			this.next.find('img').img2vml();


			// 移動スライドの場合
			if(this.type === this.SLIDE_TYPE_MOVE){
				// ループ用の要素組み替え
				if(this.loop){
					var clones = [];

					for(var i=0; i<this.cloneNum; i++){
						var before = this.items.eq(-1-i).clone(true);
						var after  = this.items.eq(i).clone(true);
						this.slide.prepend(before);
						this.slide.append(after);
						clones.push(before.get(0));
						clones.push(after.get(0));
					}
					clones = $(clones);
				}

				// サイズ調整
				Shared.util.addResizeListener(function(w, h){
					this.winW = w;
					this.winH = h;

					// リサイズコールバックが存在する場合
					if(this.resizeCallback){
						this.slideW = this.resizeCallback.call(this, w, h) || this.items.eq(0).width();
						this.items.css({width:this.slideW});

						if(this.loop){
							clones.css({width:this.slideW});
						}
					}

					this.totalW = (this.slideW + this.itemGap) * this.items.length;

					if(this.loop){
						this.slide.css({width:(this.slideW + this.itemGap) * (this.items.length+clones.length)});
					}else{
						this.slide.css({width:(this.slideW + this.itemGap) * this.items.length});
					}

					Shared.util.cancelAF(this.animationID);
					this.animationID = null;

					this.slideX = -(this.slideW + this.itemGap) * this.getCurrent();

					setPosition.call(this);

				}, this);
			}
			// フェードスライドの場合
			else if(this.type === this.SLIDE_TYPE_FADE){
				var self = this;

				this.items.css({position:'absolute', top:0, left:0});

				this.items.each(function(){
					self.slide.prepend(this);
				});

				// サイズ調整
				Shared.util.addResizeListener(function(w, h){
					this.winW = w;
					this.winH = h;

					// リサイズコールバックが存在する場合
					if(this.resizeCallback){
						this.slideW = this.resizeCallback.call(this, w, h) || this.items.eq(0).width();
						this.items.css({width:this.slideW});
					}
					this.slide.css({height:this.items.eq(0).height()});

					Shared.util.cancelAF(self.animationID);

				}, this);
			}


			// 初期化
			beforeChange.call(this, true);
			afterChange.call(this, true);

			// イベント登録
			setEvent.call(this);

			// フリック
			if(this.flickable && this.type === this.SLIDE_TYPE_MOVE){
				setFlick.call(this);
			}
		};


		/*****************************************************************************************************************
		 * 定数
		 *****************************************************************************************************************/

		Slide.prototype.SLIDE_TYPE_MOVE = 0;

		Slide.prototype.SLIDE_TYPE_FADE = 1;


		/*****************************************************************************************************************
		 * private関数
		 *****************************************************************************************************************/


		// スライドの位置更新関数。この関数でのみ、位置を更新する。
		function setPosition(){
			var x = (this.slideX % this.totalW - this.totalW)%this.totalW;

			// ループの場合、クローンした画面分ずらす
			if(this.loop){
				x -= (this.slideW + this.itemGap)*this.cloneNum;
			}

			if(this.useCSS3){
				this.slide.translate3d(x, 0);
			}else{
				this.slide.css({marginLeft:x});
			}
			if(this.stepCallback){
				this.stepCallback.call(this, this.slideX);
			}
		}

		// 移動前コールバック
		function beforeChange(first){
			// タイマー停止
			if(this.interval !== null) clearTimeout(this.intervalID);

			// ボタン切り替え
			if(this.buttons){
				this.buttons.removeClass('current').eq(this.getCurrent()).addClass('current');
			}

			if(!this.loop){
				if(this.getCurrent() === 0){
					this.arrowPrev.call(this, this.prev, false);
				}else{
					this.arrowPrev.call(this, this.prev, true);
				}
				if(this.getCurrent() === this.items.length-1){
					this.arrowNext.call(this, this.next, false);
				}else{
					this.arrowNext.call(this, this.next, true);
				}
			}

			// コールバック実行
			if(this.beforeCallback){
				this.beforeCallback.call(this, this.getCurrent());
			}

			if(this.type === this.SLIDE_TYPE_FADE){
				this.slide.append(this.items.eq(this.getCurrent()));
			}

			// Cookie保存
			if(!first && this.cookie){
				Shared.util.cookie(this.cookie.name, ''+this.getCurrent(), {expires:this.cookie.expires});
			}
		}

		// 移動後コールバック
		function afterChange(first){
			// コールバック実行
			if(this.afterCallback){
				this.afterCallback.call(this, this.getCurrent());
			}

			// タイマー実行
			if(this.intervalActive) this.startTimer();
		}

		function setEvent(){
			// 次に進む
			this.next.on('click', (function(self){
				return function(e){
					e.preventDefault();
					self.change(self.current+1);
				};
			})(this));

			// 前に戻る
			this.prev.on('click', (function(self){
				return function(e){
					e.preventDefault();
					self.change(self.current-1);
				};
			})(this));

			// ボタンによる移動
			if(this.buttons){
				this.buttons.on('click', (function(self){
					return function(e){
						e.preventDefault();
						self.change(self.buttons.index(this));
					};
				})(this));
			}

			// キーによる移動
			if(this.keyboard){
				$(document).on('keydown', (function(self){
					return function(e){
						var check = true;

						if(typeof self.keyboard === 'function'){
							check = self.keyboard.call(self, self.winW, self.winH);
						}
						if(check){
							if(e.keyCode === 37){
								self.change(self.current-1);
							}else if(e.keyCode === 39){
								self.change(self.current+1);
							}
						}
					};
				})(this));
			}

			// jQuery独自イベントを登録
			// this.wrapper.on('move.slide', (function(self){
			// 	return function(e, data){
			// 		if('index' in data) self.change(data.index);
			// 	};
			// })(this));

			// this.wrapper.on('startTimer.slide', (function(self){
			// 	return function(e, data){
			// 		self.startTimer();
			// 	};
			// })(this));

			// this.wrapper.on('stopTimer.slide', (function(self){
			// 	return function(e, data){
			// 		self.stopTimer();
			// 	};
			// })(this));

			// this.wrapper.on('next.slide', (function(self){
			// 	return function(e, data){
			// 		self.change(self.current+1);
			// 	};
			// })(this));

			// this.wrapper.on('prev.slide', (function(self){
			// 	return function(e, data){
			// 		self.change(self.current-1);
			// 	};
			// })(this));
		}

		function setFlick(){
			var tx     = null;
			var ty     = null;
			var dx     = 0;
			var scroll = null;
			var noJump = false;

			// フリック開始時にページ移動させない処理
			this.slide.on('touchend mouseup', 'a', (function(self){
				return function(e){
					if(dx !== null) noJump = true;
				};
			})(this));

			this.slide.on('click', 'a', (function(self){
				return function(e){
					if(noJump) e.preventDefault();
					noJump = false;
				};
			})(this));

			// フリック開始
			this.slide.on('touchstart mousedown', (function(self){
				return function(e){
					// 現行アニメーション停止
					Shared.util.cancelAF(self.animationID);

					// タイマー停止
					if(self.interval) clearTimeout(self.intervalID);

					// タッチ地点記憶
					if(e.type === 'touchstart'){
						tx = e.originalEvent.touches[0].screenX;
						ty = e.originalEvent.touches[0].screenY;
					}else{
						e.preventDefault();
						tx = e.pageX;
						scroll = false;
					}
				};
			})(this));

			// フリック中
			this.slide.on('touchmove mousemove', (function(self){
				return function(e){
					if(tx !== null){
						if(scroll === null){
							var _dx = Math.abs(e.originalEvent.touches[0].screenX - tx);
							var _dy = Math.abs(e.originalEvent.touches[0].screenY - ty);

							if(_dy > _dx){
								scroll = true;
							}else{
								scroll = false;
								tx = e.originalEvent.touches[0].screenX;
								e.preventDefault();
							}
						}else{
							if(scroll){
								return true;
							}else{
								e.preventDefault();

								if(e.type === 'touchmove'){
									dx = e.originalEvent.touches[0].screenX - tx;
									tx = e.originalEvent.touches[0].screenX;
								}else{
									dx = e.pageX - tx;
									tx = e.pageX;
								}

								self.slideX += dx;

								setPosition.call(self);
							}
						}
						if(!Shared.ua.isiOS){
							return false;
						}
					}
				}
			})(this));

			// フリック終了
			this.slide.on('touchend touchcancel mouseup mouseleave contextmenu', (function(self){
				return function(e){
					if(tx !== null){
						var mx = self.slideX + (self.slideW + self.itemGap) * self.current;

						if(scroll !== null){
							if(Math.abs(mx) > 50){
								if(mx > 0){
									self.change(self.current-1, true);
								}else{
									self.change(self.current+1, true);
								}
							}else{
								if(mx !== 0) self.change(self.current, true);
							}
						}else{
							if(mx !== 0) self.change(self.current, true);
						}
						tx = ty = null;
						dx = null;
					}
					scroll = null;
				};
			})(this));
		}


		 /*****************************************************************************************************************
		 * public関数
		 *****************************************************************************************************************/

		Slide.prototype.arrowPrev = function(prev, show){
			var img = prev.find('img');

			if(show){
				if(img.length === 0){
					prev.stop().fadeIn('normal');
				}else{
					prev.css({display:'block'});
					img.stop().animate({opacity:1}, 300, 'swing');
				}
			}else{
				if(img.length === 0){
					prev.stop().fadeOut('normal');
				}else{
					img.stop().animate({opacity:0}, 300, 'swing', function(){
						prev.css({display:'none'});
					});
				}
			}
		};

		Slide.prototype.arrowNext = function(next, show){
			var img = next.find('img');

			if(show){
				if(img.length === 0){
					next.stop().fadeIn('normal');
				}else{
					next.css({display:'block'});
					img.stop().animate({opacity:1}, 300, 'swing');
				}
			}else{
				if(img.length === 0){
					next.stop().fadeOut('normal');
				}else{
					img.stop().animate({opacity:0}, 300, 'swing', function(){
						next.css({display:'none'});
					});
				}
			}
		};

		Slide.prototype.change = function(index, noCheck, byTimer){

			if(!this.loop){
				index = Shared.util.clamp(index, 0, this.items.length-1);
			}

			if(index !== this.current || noCheck){
				var prevIndex = this.current;
				var nextIndex = index;

				this.current = index;

				if(!byTimer && this.stopIfManipulate){
					this.intervalActive = false;
				}

				// 現行アニメーション停止
				if(this.animationID !== null){
					Shared.util.cancelAF(this.animationID);
				}

				// コールバック実行
				beforeChange.call(this, nextIndex, prevIndex);

				// duration取得
				if(typeof this.duration === 'function'){
					var dur = this.duration.call(this, this.winW, this.winH);
				}else{
					var dur = this.duration;
				}

				// 移動スライド
				if(this.type === this.SLIDE_TYPE_MOVE){
					var x0 = this.slideX;
					var x1 = -(this.slideW + this.itemGap) * index;

					Shared.util.reqAF(function(ct, dt, pt, id){
						this.animationID = id;

						var px = Shared.util.clamp(pt/dur, 0, 1);

						this.slideX = x0 - (x0 - x1) * this.easing(px);

						setPosition.call(this);

						if(px === 1){
							this.current = this.getCurrent();
							this.slideX  = (this.slideX % this.totalW - this.totalW)%this.totalW;

							afterChange.call(this);
							this.animationID = null;
							return false;
						}
					}, 60, this);
				}
				// フェードスライド
				else if(this.type === this.SLIDE_TYPE_FADE){
					var x0 = this.slideX;
					var x1 = -(this.slideW + this.itemGap) * index;

					var nextItem = this.items.eq(index).css({opacity:0});

					this.slide.append(nextItem);


					Shared.util.reqAF(function(ct, dt, pt, id){
						this.animationID = id;

						var px = Shared.util.clamp(pt/dur, 0, 1);

						var opacity = this.easing(px);

						nextItem.css({opacity:opacity});

						if(px === 1){
							afterChange.call(this);
							this.animationID = null;
							return false;
						}
					}, 60, this);
				}
			}
		};

		Slide.prototype.getCurrent = function(){
			return (this.items.length +  this.current%this.items.length)%this.items.length;
		};

		Slide.prototype.startTimer = function(){
			if(this.interval){
				this.intervalActive = true;

				clearTimeout(this.intervalID);

				this.intervalID = setTimeout((function(self){
					return function(){
						if(self.loop){
							var next = self.current+1;
						}else{
							var next = (self.current+1)%self.items.length;
						}
						if(self.intervalActive) self.change(next, false, true);
					};
				})(this), this.interval);
			}
		};

		Slide.prototype.stopTimer = function(){
			if(this.interval){
				this.intervalActive = false;
				clearTimeout(this.intervalID);
			}
		};

		return Slide;
	})();


	// jQuery拡張
	jQuery.fn.extend({

		slide : function(param){
			if(typeof param !== 'object') param = {};
			param.selector = this.get(0);
			return new PluginSlide(param);
		}
	});

})();