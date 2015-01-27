// v1.0
(function(){

	window.Modal = (function(){

		/**
		 * 中央制御クラス
		 * 拡張は行わない。
		 */
		var Factory = (function(){

			var Factory = function(){
				// モーダル要素管理クラス
				this.wrapper = null;

				// アニメーションクラス
				this.animation = null;

				// クライアントオブジェクト集合
				this.clients = {};

				// 現在開いているクライアントオブジェクト
				this.current = null;

				// 画面サイズ
				this.winW = null;
				this.winH = null;

				// 状態保存用の変数
				this.scrollTop = 0;
				this.originalHtmlStyle = '';
				this.originalBodyStyle = '';

				// リスナー関数
				this.openListeners = [];
				this.closeListeners = [];
				this.resizeListeners = [];

				// ハッシュ変化イベントを登録
				this.hashEnabled = this.setHashEnabled(true);

				// ハッシュ変化の履歴を保持
				this.history = [];

				$(window).on('load', (function(self){
					return function(){
						if(self.hashEnabled){
							self.hashchange();
						}
					};
				})(this));
			};

			/**
			 * 開いているかどうか
			 */
			Factory.prototype.isOpen = function(){
				return this.current !== null;
			};

			/**
			 * リサイズ時に実行する関数
			 */
			Factory.prototype.resized = function(w, h){
				if(arguments.length >= 2){
					this.winW = w;
					this.winH = h;
				}
				if(this.isOpen()){
					var w = Math.max(this.winW, this.current.getWidth()+this.current.getPadding()*2);
					var h = Math.max(this.winH, this.current.getHeight()+this.current.getPadding()*2);

					$('html').css({width:w, minWidth:w, height:h})
					$('body').css({top:-this.scrollTop, width:w, minWidth:w, height:this.scrollTop+h});

					this.wrapper.getElement().css({width:w, height:h, top:this.scrollTop});

					for(var i=0; i<this.resizeListeners.length; i++){
						this.resizeListeners[i].call(this);
					}
				}
			};

			/**
			 * ハッシュ変化時のイベントリスナー
			 */
			Factory.prototype.hashchange = function(){
				if(location.hash){
					var hash = location.hash.split('#')[1];

					if(hash in this.clients){
						this.open(hash);
					}else{
						this.close();
					}
				}else{
					this.close();
				}
			};

			/**
			 * ハッシュ制御の変更
			 */
			Factory.prototype.setHashEnabled = function(arg){
				this.hashEnabled = arg && Shared.event.hasHashChange;

				if(this.hashEnabled){
					$(window).on('hashchange', (function(self){
						return function(){
							self.hashchange();
						};
					})(this));
				}else{
					$(window).off('hashchange', this.hashchange);
				}
				return this.hashEnabled;
			};

			/**
			 * クライアント追加
			 */
			Factory.prototype.addClient = function(client){
				this.clients[client.getId()] = client;
			};

			/**
			 * 開く直前のリスナー関数を追加
			 */
			Factory.prototype.hookOpen = function(callable){
				if(typeof callable === 'function'){
					this.openListeners.push(callable);
				}
			};

			/**
			 * 閉じた後のリスナー関数を追加
			 */
			Factory.prototype.hookClose = function(callable){
				if(typeof callable === 'function'){
					this.closeListeners.push(callable);
				}
			};

			/**
			 * リサイズ時のリスナー関数を追加
			 */
			Factory.prototype.addResizeHook = function(callable){
				if(typeof callable === 'function'){
					this.resizeListeners.push(callable);
				}
			};

			Factory.prototype.open = function(id){
				if(id in this.clients){
					// サイズ変更リスナー開始
					Shared.util.addResizeListener(this.resized, this);

					// 表示中クライアント
					this.current = this.clients[id];

					// エレメント作成クラス初期化
					if(this.wrapper === null){
						this.wrapper = new Modal.Wrapper();
					}

					// アニメーションクラス初期化
					if(this.animation === null){
						this.animation = new Modal.Animation();
					}

					// 要素作成
					this.wrapper.create(this.current);

					// 開く前の状態を保存
					if(!$('html').hasClass('modalopen')){
						this.originalHtmlStyle = document.documentElement.getAttribute('style');
						this.originalBodyStyle = document.body.getAttribute('style');
						this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
					}

					$('html').addClass('modalopen');

					this.resized();

					window.scrollTo(0, 0);

					for(var i=0; i<this.openListeners.length; i++){
						this.openListeners[i].call(this);
					}

					// 開くアニメーションを実行
					var openPromise = this.animation.open();

					openPromise.done((function(self){
						return function(){
						};
					})(this));

					openPromise.fail((function(self){
						return function(){
						};
					})(this));
				}
			};

			Factory.prototype.close = function(){
				if(this.animation !== null){
					var closePromise = this.animation.close();


					closePromise.done((function(self){
						return function(){
							$('html').removeClass('modalopen');

							self.current.destroy();
							self.wrapper.destroy();
							Shared.util.removeResizeListener(this.resized);

							if(self.originalHtmlStyle){
								document.documentElement.style.cssText = self.originalHtmlStyle;
							}else{
								$('html').clearStyle();
							}
							if(self.originalBodyStyle){
								document.body.style.cssText = self.originalBodyStyle;
							}else{
								$('body').clearStyle();
							}
							window.scrollTo(0, self.scrollTop);

							self.current = null;

							for(var i=0; i<self.closeListeners.length; i++){
								self.closeListeners[i].call(self);
							}
						};
					})(this));

					closePromise.fail((function(self){
						return function(){
							;
						};
					})(this));

					this.animation = null;
				}
			};

			Factory.prototype.onOpen = function(clientID){
				if(this.hashEnabled){
					location.hash = clientID;
					this.history.unshift(clientID);
				}else{
					this.open(clientID);
				}
			};

			Factory.prototype.onClose = function(selector){
				$(document).on('click', selector, (function(self){
					return function(e){
						e.preventDefault();

						if(self.hashEnabled){
							if(self.history.length > 0){
								history.back();
								self.history.shift();
							}else{
								location.hash = '';

								if(Shared.html.hasHistoryAPI){
									history.pushState('base', '', location.pathname);
								}
							}
						}else{
							self.close();
						}
					};
				})(this));
			};

			return new Factory();
		})();

		/**
		 * 要素を作成するクラス
		 */
		var Wrapper = (function(){

			var Wrapper = function(){
				// jQueryオブジェクト
				this.element = null;
			};

			/**
			 * エレメントクラスのプロトタイプ拡張
			 */
			Wrapper.extend = function(arg){
				for(var key in arg) Wrapper.prototype[key] = arg[key];
			};

			/**
			 * 要素を取得
			 * 基本的に上書きしない
			 */
			Wrapper.prototype.getElement = function(){
				return this.element;
			};

			/**
			 * 要素作成
			 * 基本的に上書きしない
			 */
			Wrapper.prototype.create = function(client){
				if(this.element === null){
					this.element = $(this.template());
					$('body').append(this.element);
				}

				var container = this.element.find('.container');

				if(container.length === 0){
					alert('Modal.Wrapperのテンプレートには、containerクラス要素を含む必要があります。');
				}

				if(client.getElement() === null){
					container.append(client.create());
				}else{
					client.getElement().css({display:'block'});
				}

				container.css({
					marginLeft : -(client.getWidth()+client.getPadding()*2)/2,
					marginTop  : -(client.getHeight()+client.getPadding()*2)/2
				});

				return this.element;
			};

			/**
			 * 要素削除
			 * 基本的に上書きしない
			 */
			Wrapper.prototype.destroy = function(){
				this.element.css({display:'none'});
			};

			/**
			 * 要素を作成する関数
			 * 必要に応じて上書き
			 * containerクラスは必須
			 * htmlテキスト、jQueryオブジェクト、DOMエレメントのどれかを返すように実装する。
			 */
			Wrapper.prototype.template = function(){
				return '<div class="modal"><div class="background"></div><div class="container"></div><a href="#" class="close"></a></div>';
			};

			return Wrapper;
		})();

		/**
		 * 
		 */
		var Client = (function(){

			var Client = function(tag){
				// 内部要素のjQueryオブジェクト
				this.element = null;

				// 必須属性の取得
				this.id = tag.getAttribute('data-id');
				this.width = tag.getAttribute('data-width')-0;
				this.height = tag.getAttribute('data-height')-0;
				this.padding = tag.getAttribute('data-padding')-0 || 0;
				this.persistent = tag.getAttribute('data-persistent') != '0';

				// 初期化
				this.init(tag);
			};

			/**
			 * クライアントクラスのプロトタイプ拡張
			 */
			Client.extend = function(arg){
				for(var key in arg) Client.prototype[key] = arg[key];
			};

			/**
			 * 初期化
			 * 必要に応じて上書き
			 */
			Client.prototype.init = function(tag){
				if(tag.tagName === 'A'){
					this.url = tag.getAttribute('href');
				}
			};

			/**
			 * 識別IDを取得する
			 * 基本的に上書きしない
			 */
			Client.prototype.getId = function(){
				return this.id;
			};

			/**
			 * 内部要素を取得
			 * 基本的に上書きしない
			 */
			Client.prototype.getElement = function(){
				return this.element;
			};

			/**
			 * 内部要素の幅を取得
			 * 基本的に上書きしない
			 */
			Client.prototype.getWidth = function(){
				return this.width;
			};

			/**
			 * 内部要素の高さを取得
			 * 基本的に上書きしない
			 */
			Client.prototype.getHeight = function(){
				return this.height;
			};

			/**
			 * 内部要素の余白を取得
			 * 基本的に上書きしない
			 */
			Client.prototype.getPadding = function(){
				return this.padding;
			};

			/**
			 * 内部要素を作成する関数
			 * 基本的に上書きしない
			 */
			Client.prototype.create = function(){
				if(this.element === null){
					this.element = $(this.template());
					this.element.attr('id', 'modal_'+this.id);
				}
				return this.element;
			};

			/**
			 * 内部要素を削除する関数
			 * 基本的に上書きしない
			 */
			Client.prototype.destroy = function(){
				if(this.persistent){
					this.element.css({display:'none'});
				}else{
					this.element.remove();
					this.element = null;
				}
			};

			/**
			 * 内部要素を作成する関数
			 * 必要に応じて上書き
			 * htmlテキスト、jQueryオブジェクト、DOMエレメントのどれかを返すように実装する。
			 */
			Client.prototype.template = function(){
				return '<iframe src="'+this.url+'" width="'+this.width+'" height="'+this.height+'" frameborder="0" allowtransparency="true" />';
			};

			return Client;
		})();

		/**
		 * アニメーションクラス
		 */
		var Animation = (function(){

			var Animation = function(){};

			/**
			 * アニメーションクラスのプロトタイプ拡張
			 */
			Animation.extend = function(arg){
				for(var key in arg) Animation.prototype[key] = arg[key];
			};

			/**
			 * 開くアニメーションを行う関数
			 * 必要に応じて上書き
			 * 上書きする場合、必ずpromiseオブジェクトを返すようにすること。
			 */
			Animation.prototype.open = function(){
				var def = new jQuery.Deferred();

				Modal.Factory.wrapper.getElement().stop().css({display:'block', opacity:0}).animate({opacity:1}, {duration:600, easing:'iX2', complete:function(){
					def.resolve();
				}, fail:function(){
					def.reject();
				}});
				return def.promise();
			};

			/**
			 * 閉じるアニメーションを行う関数
			 * 必要に応じて上書き
			 * 上書きする場合、必ずpromiseオブジェクトを返すようにすること。
			 */
			Animation.prototype.close = function(){
				var def = new jQuery.Deferred();

				Modal.Factory.wrapper.getElement().stop().animate({opacity:0}, 600, 'oX2', function(){
					def.resolve();
				});
				Modal.Factory.wrapper.getElement().stop().animate({opacity:0}, {duration:600, easing:'oX2', complete:function(){
					def.resolve();
				}, fail:function(){
					def.reject();
				}});
				return def.promise();
			};

			return Animation;
		})();

		return {
			 Factory   : Factory
			,Wrapper   : Wrapper
			,Client    : Client
			,Animation : Animation
		};
	})();

	/**
	 * jQuery拡張
	 */
	jQuery.fn.extend({

		modal : function(){
			return this.each(function(){

				client = new Modal.Client(this);

				Modal.Factory.addClient(client);

				$(this).on('click', function(e){
					e.preventDefault();
					Modal.Factory.onOpen(client.getId());
				});
			});
		}
	});
})();