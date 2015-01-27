
// remvoe no-js
(function(){
	var htmlClasses = document.documentElement.className.split(' ');
	for(var i=0; i<htmlClasses.length;) (htmlClasses[i]==='' || htmlClasses[i]==='no-js') ? htmlClasses.splice(i, 1) : i++;
	htmlClasses.length===0 ? document.documentElement.removeAttribute('class') : document.documentElement.className = htmlClasses.join(' ');
})();

(function(){
	"use strict";

	var USE_CSS3 = true;

	window.Shared = (function(){

		/*****************************************************************************************************************
		 * ユーザーエージェント判別
		 *****************************************************************************************************************/

		var _ua = window.navigator.userAgent.toLowerCase(),
		    _IE, _IEver,
		    _Chrome, _ChromeVer,
		    _FireFox, _FireFoxVer,
		    _Safari, _SafariVer,
		    _Opera, _OperaVer,
		    _Mac, _iPhone, _iPad, _iPod, _iOSver, _BlackBerry,
		    _Android, _AndroidMobile, _AndroidTablet, _AndroidVer,
		    _WindowsPhone, _nexus7,
			_3ds, _dsi, _wii, _wiiu, _ps3, _ps4, _psp, _psv, _xbox,
			_bot;

		// ブラウザ
		if (_ua.indexOf("msie") != -1){
			_IE = true;
			_ua.match(/msie (\d+\.\d)/);
			_IEver = parseFloat(RegExp.$1);

		}else if(_ua.indexOf('trident') != -1){
			_IE = true;
			_ua.match(/rv:(\d+\.\d)/);
			_IEver = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("chrome")  != -1){
			_Chrome = true;
			_ua.match(/chrome[\/ ]?(\d+\.\d+)/);
			_ChromeVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("firefox") != -1){
			_FireFox = true;
			_ua.match(/firefox[\/ ]?(\d+\.\d+)/);
			_FireFoxVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("opera")   != -1){
			_Opera = true;
			_ua.match(/opera[\/ ]?(\d+\.\d+)/);
			_OperaVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("safari")  != -1){
			_Safari = true;
			_ua.match(/version[\/ ]?(\d+\.\d+)/);
			_SafariVer = parseFloat(RegExp.$1);
		}

		// モバイル
		if (_ua.indexOf("iphone") != -1){
			_iPhone = true;
			_ua.match(/iphone os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("ipad") != -1){
			_iPad = true;
			_ua.match(/cpu os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("ipod") != -1){
			_iPod = true;
			_ua.match(/os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("android") != -1){
			_Android = true;
			_ua.match(/android (\d+\.\d)/);
			_AndroidVer = parseFloat(RegExp.$1);

			if(_ua.indexOf('mobile') != -1){
				_AndroidMobile = true;
			}else{
				_AndroidTablet = true;
			}
		}else if (_ua.indexOf("windows phone") != -1) {
			_WindowsPhone = true;

		}else if (_ua.indexOf('blackberry') !== -1 || _ua.indexOf('bb10') !== -1) {
			_BlackBerry = true;
		}


		if(_ua.indexOf('mac os') != -1){
			_Mac = true;
		}
		if(_ua.indexOf('nexus 7') != -1){
			_nexus7 = true;
		}

		// ゲーム機
		if(_ua.indexOf('playstation 3') != -1){
			_ps3 = true;
		}
		if(_ua.indexOf('playstation 4') != -1){
			_ps4 = true;
		}
		if(_ua.indexOf('playstation portable') != -1){
			_psp = true;
		}
		if(_ua.indexOf('playstation vita') != -1){
			_psv = true;
		}
		if(_ua.indexOf('nintendo') != -1){
			if(_ua.indexOf('dsi;') != -1){
				_dsi = true;
			}else if(_ua.indexOf('3ds;') != -1){
				_3ds = true;
			}else if(_ua.indexOf('wii;') != -1){
				_wii = true;
			}else if(_ua.indexOf('wiiu') != -1){
				_wiiu = true;
			}
		}


		// その他
		if(_ua.indexOf('mac os') != -1){
			_Mac = true;
		}
		if(_ua.indexOf('nexus 7') != -1){
			_nexus7 = true;
		}

		// BOT
		if(_ua.indexOf('googlebot') != -1 || _ua.indexOf('yahoo') != -1 || _ua.indexOf('msnbot') != -1){
			_bot = true;
		}

		var ua = {
			// IE系
			 isIE     : !!_IE
			,isIE6    : (_IEver == 6.0)
			,isIE7    : (_IEver == 7.0)
			,isIE8    : (_IEver == 8.0)
			,isIE9    : (_IEver == 9.0)
			,isIE10   : (_IEver == 10.0)
			,isIE11   : (_IEver == 11.0)
			,isIEgt6  : !!(_IEver > 6)
			,isIEgt7  : !!(_IEver > 7)
			,isIEgt8  : !!(_IEver > 8)
			,isIEgt9  : !!(_IEver > 9)
			,isIEgt10 : !!(_IEver > 10)
			,isIEgt11 : !!(_IEver > 11)
			,isIElt6  : !!(_IE && _IEver < 6)
			,isIElt7  : !!(_IE && _IEver < 7)
			,isIElt8  : !!(_IE && _IEver < 8)
			,isIElt9  : !!(_IE && _IEver < 9)
			,isIElt10 : !!(_IE && _IEver < 10)
			,isIElt11 : !!(_IE && _IEver < 11)

			// スマートフォン系
			,isiPhone : !!_iPhone
			,isiPad   : !!_iPad
			,isiPod   : !!_iPod
			,isiOS    : !!(_iPhone || _iPad || _iPod)
			,isAndroid       : !!_Android
			,isAndroidMobile	: !!_AndroidMobile
			,isAndroidTablet : !!_AndroidTablet
			,isWindowsPhone : !!_WindowsPhone
			,isSmartPhone   : (!!_iPhone || !!_iPad || !!_iPod || !!_Android || !!_WindowsPhone)
			,isMobile       : (!!_iPhone || !!_iPod || !!_AndroidMobile || !!_WindowsPhone)
			,isTablet       : (!!_iPad || !!_AndroidTablet)
			,isNexus7       : (!!_nexus7)
			,isBlackBerry   : !!_BlackBerry

			// ゲーム系
			,isPS3    : (!!_ps3)
			,isPS4    : (!!_ps4)
			,isPSP    : (!!_psp)
			,isPSV    : (!!_psv)
			,is3DS    : (!!_3ds)
			,isDSi    : (!!_dsi)
			,isWii    : (!!_wii)
			,isWiiU   : (!!_wiiu)

			// ブラウザ種別
			,isSafari       : !!_Safari
			,isChrome       : !!_Chrome
			,isOpera        : !!_Opera
			,isFireFox      : !!_FireFox
			,isMac          : !!_Mac

			// ブラウザバージョン
			,verIE      : _IEver
			,verFireFox : _FireFoxVer
			,verChrome  : _ChromeVer
			,verSafari  : _SafariVer
			,verOpera   : _OperaVer
			,verAndroid : _AndroidVer
			,veriOS     : _iOSver

			// その他
			,isBot : !!_bot
		};


		/*****************************************************************************************************************
		 * CSS機能判別
		 *****************************************************************************************************************/

		var style  = document.createElement('div').style;
		var vendor = '';
		var prefix = '';

		var hasRGBA           = false;
		var hasZoom           = ('zoom' in style);
		var hasOpacity        = ('opacity' in style);
		var hasBoxShadow      = ('box-shadow' in style || 'boxShadow' in style);
		var hasBorderRadius   = ('border-radius' in style || 'borderRadius' in style);
		var hasBackgroundSize = ('background-size' in style || 'backgroundSize' in style);
		var hasTransition     = false;
		var hasAnimation      = false;
		var transitionEnd     = false;
		var hasFilter         = false;
		var hasMediaQuery     = false;
		var hasPositionFixed  = false;


		// RGBA
		try{
			style.backgroundColor = 'rgba(255,0,0,0.5)';
			hasRGBA = (style.backgroundColor.indexOf('rgba') == 0);
		}catch(e){}

		// vendor prefix
		prefix = (function(){
			var _vendors = ['o', 'ms', 'moz', 'Moz', 'webkit', ''];

			vendor = '';

			for(var i=1; i<_vendors.length; i++){
				if(_vendors[i] + 'Transform' in style){
					if(_vendors[i] != ''){
						vendor = _vendors[i].toLowerCase();
						return '-' + vendor + '-';
					}else{
						vendor = '';
						return '';
					}
				}
			}
			return '';
		})();

		// transition
		hasTransition = (function(){
			var prefixT = ['oT', 'msT', 'mozT', 'MozT', 'webkitT', 't'];

			for(var i=0; i<prefixT.length; i++){
				var property = prefixT[i] + 'ransition';
				if(property in style){
					style[property] = '';
					style[property] = 'left 1ms linear 1ms';
					if(style[property] != ''){
						if(property.indexOf('webkit') == 0){
							transitionEnd = 'webkitTransitionEnd';
						}else{
							transitionEnd = 'transitionend';
						}
						return true;
					}
				}
			}
			return false;
		})();

		// animation
		hasAnimation = (function(){
			var prefixA = ['oA', 'msA', 'mozA', 'MozA', 'webkitA', 'a'];
			for(var i=0; i<prefixA.length; i++){
				var property = prefixA[i] + 'nimation';
				if(property in style){
					style[property] = '';
					style[property] = 'check 1ms ease 0ms infinite';
					if(style[property] != ''){
						return true;
					}
				}
			}
			return false;
		})();

		// filter
		hasFilter = (function(){
			var prefixF = ['oF', 'msF', 'mozF', 'MozF', 'webkitF', 'f'];
			for(var i=0; i<prefixF.length; i++){
				var property = prefixF[i] + 'ilter';
				if(property in style){
					style[property] = '';
					style[property] = 'blur(10px)';
					if(style[property] != ''){
						if(_IE){
							return (typeof history.pushState === 'function');
						}else{
							return true;
						}

					}
				}
			}
			return false;
		})();

		// media query
		hasMediaQuery = (function(){
			if(typeof window.matchMedia == 'function'){
				try{
					return !!window.matchMedia('all').matches;
				}catch(ex){
					return (ua.isFireFox && window.parent != window);
				}
			}else if(typeof window.msMatchMedia == 'function'){
				return !!window.msMatchMedia('all').matches;
			}else{
				var dummyDiv = document.createElement('div');
				var checkDiv = document.createElement('div');
				var dummyCSS = '<style>@media all and (min-width: 0px) {#mqdummyelement{position:absolute;}}</style>';
				var head = document.getElementsByTagName('head')[0];

				dummyDiv.innerHTML = dummyCSS;
				head.appendChild(dummyDiv)

				checkDiv.setAttribute('id', 'mqdummyelement');
				dummyDiv.appendChild(checkDiv);

				var _has = (window.getComputedStyle ? getComputedStyle(checkDiv, null) : checkDiv.currentStyle)['position'] == 'absolute';
				head.removeChild(dummyDiv);

				return _has;
			}
		})();

		// position:fixed
		hasPositionFixed = (function(){
			// 誰か書いて
			return true;
		})();


		// transform
		var transform = {
			'translate'   : '1px, 1px',
			'translate3d' : '1px, 1px, 1px',
			'translateX'  : '1px',
			'translateY'  : '1px',
			'translateZ'  : '1px',
			'scale'       : '0, 0',
			'scale3d'     : '0, 0, 0',
			'scaleX'      : '1',
			'scaleY'      : '1',
			'scaleZ'      : '1',
			'rotate'      : '1deg',
			'rotate3d'    : '1, 1, 1, 1deg',
			'rotateX'     : '1deg',
			'rotateY'     : '1deg',
			'rotateZ'     : '1deg',
			'skew'        : '1deg, 1deg',
			'skewX'       : '1deg',
			'skewY'       : '1deg',
			'matrix'      : '1, 0, 0, 1, 1, 1',
			'matrix3d'    : '1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1',
			'perspective' : '100px'
		};

		if(USE_CSS3 && ('transform' in style || prefix+'transform' in style)){
			for(var property in transform){
				var val = property + '(' + transform[property] + ')';

				style[prefix+'transform'] = '';
				style[prefix+'transform'] = val;

				if(style[prefix+'transform'] != ''){
					transform[property] = true;
				}else{
					transform[property] = false;
				}
			}
		}else{
			for(var property in transform){
				transform[property] = false;
			}
		}

		var css = {
			// ブラウザベンダーの文字列
			 vendor : vendor

			// CSSプレフィックスの文字列
			,prefix : prefix

			// rgba()による色指定が可能かどうか
			,hasRGBA           : hasRGBA

			// zoomが使用可能かどうか
			,hasZoom           : hasZoom

			// プレフィックスなしにopacityが使用可能かどうか
			,hasOpacity        : hasOpacity

			// プレフィックスなしにboxshadowが使用可能かどうか
			,hasBoxShadow      : hasBoxShadow

			// プレフィックスなしにborder-radiusが使用可能かどうか
			,hasBorderRadius   : hasBorderRadius

			// プレフィックスなしにbackground-sizeが使用可能かどうか
			,hasBackgroundSize : hasBackgroundSize

			// メディアクエリが使用可能かどうか
			,hasMediaQuery     : hasMediaQuery

			// メディアクエリが使用可能かどうか
			,hasMediaQueries   : hasMediaQuery

			// positon:fixedが使用可能かどうか
			,hasPositionFixed  : hasPositionFixed

			// 使用可能なtransform判定オブジェクト
			,transform     : transform

			// transitionが使用可能かどうか
			,hasTransition : (USE_CSS3 ? hasTransition : false)

			// css-animationが使用可能かどうか
			,hasAnimation  : (USE_CSS3 ? hasAnimation  : false)

			// transtion-endが使用可能かどうか
			,transitionEnd : (USE_CSS3 ? transitionEnd : false)

			// filterが使用可能かどうか
			,hasFilter     : (USE_CSS3 ? hasFilter : false)
		};


		/*****************************************************************************************************************
		 * HTML機能判別
		 *****************************************************************************************************************/

		var hasFlash = false;

		try {
			hasFlash = !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
		}catch(e){
			hasFlash = (navigator.mimeTypes ["application/x-shockwave-flash"] != undefined);
		}

		var html = {
			// Flashが使用可能かどうか
			 hasFlash  : hasFlash

			// canvasが使用可能かどうか
			,hasCanvas : !!document.createElement('canvas').getContext

			// videoタグが使用可能かどうか
			,hasVideo  : !!document.createElement('video').canPlayType

			// audioタグが使用可能かどうか
			,hasAudio  : !!document.createElement('audio').canPlayType

			// SVGが使用可能かどうか
			,hasSVG    : !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)

			// WebGLが使用可能かどうか
			,hasWebGL  : !!window.WebGLRenderingContext

			// GPSが使用可能かどうか
			,hasGeolocation : ('geolocation' in navigator)

			// WebSocketが使用可能かどうか
			,hasWebSocket   : ('WebSocket' in window || 'MozWebSocket' in window)

			// WebWorkerが使用可能かどうか
			,hasWebWorkers  : ('Worker' in window)

			// HistoryAPIが使用可能かどうか
			,hasHistoryAPI  : (typeof history.pushState === 'function' && 'onpopstate' in window)

			// LocalStorageが使用可能かどうか
			,hasLocalStorage : ('localStorage' in window)

			// SessionStorageが使用可能かどうか
			,hasSessionStorage : ('sessionStorage' in window)

			,hasFormData : ('FormData' in window)

			// ドラッグ&ドロップAPIが使用可能かどうか
			,hasDragAndDrop : ('ondrop' in document.createElement('div'))

			// WebAudioAPIが使用可能かどうか
			,hasWebAudioAPI : ('AudioContext' in window || 'webkitAudioContext' in window)
		};


		/*****************************************************************************************************************
		 * イベント機能判別
		 *****************************************************************************************************************/

		var event = {
			// orientationchangeイベント(画面の向きの変更)を持つ
			 hasOrientationChange : ('onorientationchange' in window)

			// hashchangeイベント(URLハッシュの変化)を持つ
			,hasHashChange        : ('onhashchange' in window)

			// devicemotionイベント(加速度センサ)を持つ
			,hasDeviceMotion      : ('ondevicemotion' in window)

			// propertychangeイベント(HTMLタグの属性変更)を持つ
			,hasPropertyChange    : ('onpropertychange' in document.documentElement)
		};



		/*****************************************************************************************************************
		 * 端末機能判別
		 *****************************************************************************************************************/

		var device = {
			// タッチイベントが発生するかどうか
			 hasTouch       : ('ontouchstart' in window)

			// 加速度センサが使用可能かどうか
			,hasMotion      : ('ondevicemotion' in window)

			// 向きセンサが使用可能かどうか
			,hasOrientation : (typeof window.orientation !== 'undefined')

			// 端末のdevicepixelratio
			,pixelRatio     : (window.devicePixelRatio ? window.devicePixelRatio : 1)
		};


		/*****************************************************************************************************************
		 * イージング
		 *****************************************************************************************************************/

		var __cubicBezierParams = {
			linear : null,
			swing : [0.250, 0.100, 0.250, 1.000],
			iX2 : [0.55, 0.085, 0.68, 0.53],
			oX2 : [0.25, 0.460, 0.45, 0.94],
			ioX2 : [0.455, 0.03, 0.515, 0.955],
			iX3 : [0.550, 0.055, 0.675, 0.190],
			oX3 : [0.215, 0.610, 0.355, 1.000],
			ioX3 : [0.645, 0.045, 0.355, 1.000],
			iX4 : [0.895, 0.030, 0.685, 0.220],
			oX4 : [0.165, 0.840, 0.440, 1.000],
			ioX4 : [0.770, 0.000, 0.175, 1.000],
			iX5 : [0.755, 0.050, 0.855, 0.060],
			oX5 : [0.230, 1.000, 0.320, 1.000],
			ioX5 : [0.860, 0.000, 0.070, 1.000],
			iSin : [0.470, 0.000, 0.745, 0.715],
			oSin : [0.390, 0.575, 0.565, 1.000],
			ioSin : [0.445, 0.050, 0.550, 0.950],
			iExp : [0.950, 0.050, 0.795, 0.035],
			oExp : [0.190, 1.000, 0.220, 1.000],
			ioExp : [1.000, 0.000, 0.000, 1.000],
			iCirc : [0.600, 0.040, 0.980, 0.335],
			oCirc : [0.075, 0.820, 0.165, 1.000],
			ioCirc : [0.785, 0.135, 0.150, 0.860],
			iBack : [0.600, -0.280, 0.735, 0.045],
			oBack : [0.175, 0.885, 0.320, 1.275],
			ioBack : [0.680, -0.550, 0.265, 1.550]
		};

		var easing = {

			/*
			 * バウンドするイージング
			 * @param n バウンド数-1
			 * @param s 強さ
			 */
			bounce : function(x, n, s){
				var a = [1];
				var p = 2/n/n;
				for(var i=1; i<n; i++) a[a.length] = 1-p*i*(i+1)/2;
				a[a.length] = -n*p/2;

				for(var i=0; i<a.length; i++){
					if(x > a[i]){
						if(i == a.length-1){
							return x*x/(n*p/2)/(n*p/2);
						}else{
							return s*(x-a[i])*(x-a[i-1])+1;
						}
					}
				}
			},

			/*
			 * 弾性イージング
			 * @param c 回転数
			 * @param a オフセット
			 * @param s 強さ
			 */
			elastic : function(x, c, a, s){
				if(x < a){
					return Math.exp(10*(x/a-1));
				}else{
					return 1 + s*Math.exp((a-x)*5)*Math.sin(360*c*(x-a)/(1-a)*Math.PI/180);
				}
			},

			/*
			 * イージング名をcubic-bezierに変換する関数
			 */
			parse : function(name){
				if(name in __cubicBezierParams){
					var easing = __cubicBezierParams[name];

					if(easing != null){
						return 'cubic-bezier('+easing[0]+', '+easing[1]+', '+easing[2]+', '+easing[3]+')';
					}else{
						return 'linear';
					}
				}else{
					return 'linear';
				}
			}
		};


		/*****************************************************************************************************************
		 * 便利関数
		 *****************************************************************************************************************/

		var resizeListeners = null;
		var scrollListeners = null;
		var wheelListeners  = null;
		var animationList   = null;

		var size;
		var winW;
		var winH;

		var _seeds = [123456789, 362436069, 521288629, 88675123];
		var seeds  = [123456789, 362436069, 521288629, 88675123];
		var ustock = {};


		function getWindowSize(){
			var w = 0;
			var h = 0;

			if(typeof window.innerWidth === 'number'){
				w = Math.min(window.innerWidth, document.documentElement.clientWidth);
				h = window.innerHeight;
			}else{
				w = document.documentElement.clientWidth;
				h = document.documentElement.clientHeight;
			}

			return {w:w, h:h};
		}


		function startResizeObserver(){
			if(resizeListeners === null){
				resizeListeners = [];

				size = getWindowSize();
				winW = size.w;
				winH = size.h;

				var handler = function(){
					size = getWindowSize();
					winW = size.w;
					winH = size.h;
					for(var i=0; i<resizeListeners.length; i++){
						resizeListeners[i].callback.call(resizeListeners[i].thisObject, winW, winH);
					}
				};

				if(window.addEventListener){
					window.addEventListener('resize', handler, false);
					window.addEventListener('orientationchange', function(){
						setTimeout(handler, 1000);
					}, false);
				}else{
					window.attachEvent('onresize', handler);
				}
			}
		}

		function startScrollObserver(){
			if(scrollListeners === null){
				scrollListeners = [];

				var handler = function(){
					size = getWindowSize();
					var t = document.body.scrollTop || document.documentElement.scrollTop;
					var l = document.body.scrollLeft || document.documentElement.scrollLeft;
					var b = t + size.h;
					var r = l + size.w;

					for(var i=0; i<scrollListeners.length; i++){
						scrollListeners[i].callback.call(scrollListeners[i].thisObject, t, b, l, r);
					}
				};

				if(window.addEventListener){
					window.addEventListener('scroll', handler, false);
				}else{
					window.attachEvent('onscroll', handler);
				}
				if(device.hasTouch && ua.isiOS){
					window.addEventListener('touchmove', handler, false);
				}
			}
		}


		var util = {
			/*
			 * ゼロ埋め関数
			 * @param n number
			 * @param d digit
			 * ex) zeroPad(12, 4) => 0012
			 */
			zeroPad : function(n, d){
				if(typeof d == 'number'){
					var len = (n+'').length;
					if(len < d) for(var i=0; i<d-len; i++) n = '0' + n;
					return n+'';
				}else{
					return n+'';
				}
			},

			/*
			 * 数値を指定した範囲内に収める関数
			 * @param x   数値
			 * @param min 最小値
			 * @param max 最大値
			 */
			clamp : function(x, min, max){
				return Math.min(max, Math.max(min, x));
			},

			/*
			 * キャメル記法をCSSの記法に変換する関数。
			 */
			reverseCamelCase : function(arg){
				if(typeof arg == 'string'){
					return arg.split(/(?=[A-Z])/).join('-').toLowerCase();
				}
				return arg;
			},

			stringify : function(arg){
				if(util.isArray(arg)){
					var args = [];

					for(var i=0, len=arg.length; i<len; i++){
						args.push(util.stringify(arg[i]));
					}
					return '[' + args.join(',') + ']';

				}else if(typeof arg === 'object'){
					var args = [];

					for(var key in arg){
						args.push('"'+key+'"'+':'+util.stringify(arg[key]));
					}
					return '{' + args.join(',') + '}';

				}else if(typeof arg === 'string'){
					return '"'+arg+'"';

				}else if(typeof arg === 'number'){
					return arg;
				}
			},

			/*
			 * requestAnimationFrameのラッパー。
			 * @param fn コールバック関数
			 * @param fps requestAnimationFrameが使えない場合のFPS。省略した場合は、60fps。
			 * 
			 * コールバック関数の引数は、[経過時間, 前回描画からの経過時間, 描画開始からの経過時間]
			 * コールバック関数内でfalseを返すと、終了する。
			 */
			reqAF : function(fn, fps, thisObject){
				var interval;

				if(!isNaN(fps)){
					interval = 1000/fps;
				}else{
					if(ua.isIElt9){
						interval = 1000/30;
					}else{
						interval = 1000/60;
					}
				}

				if(thisObject === undefined) thisObject = window;

				if(animationList === null){
					animationList = [];

					var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.setTimeout;
					var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.clearTimeout;
					var timerID;

					var tick = function(){
						var ct = +new Date();
						var dt;
						var pt;

						for(var i=0; i<animationList.length;){
							dt = ct - animationList[i].t1;
							pt = ct - animationList[i].t0;

							animationList[i].t1 = ct;

							if(animationList[i].fn.call(animationList[i]._this, ct, dt, pt, animationList[i].id) === false){
								animationList.splice(i, 1);
							}else{
								i++;
							}
						}
						if(animationList.length === 0){
							cancelAnimationFrame(timerID);
							animationList = null;
						}else{
							timerID = requestAnimationFrame(tick, interval);
						}
					};
					timerID = requestAnimationFrame(tick, interval);
				}

				animationList.push({
					id : 'animation'+util.uniqueString(),
					t0 : +new Date(),
					t1 : +new Date(),
					fn : fn,
					_this : thisObject
				});
			},

			cancelAF : function(id){
				if(animationList !== null){
					for(var i=0; i<animationList.length;){
						if(animationList[i].id == id){
							animationList.splice(i, 1);
						}else{
							i++;
						}
					}
				}
			},

			/*
			 * 配列オブジェクトか判定する関数。
			 */
			isArray : function(arg){
				return (
					   arg
					&& typeof arg == 'object'
					&& typeof arg.length == 'number'
					&& typeof arg.splice === 'function'
				);
			},

			/*
			 * 16進数カラーコードを、数値配列に変換する関数。
			 * ex) #aabbff => [170, 187, 255]
			 */
			hex2rgb : function(arg){
				var hexCode = new Array(3);

				if(arg.match(/#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/)){
					hexCode[0] = RegExp.$1;
					hexCode[1] = RegExp.$2;
					hexCode[2] = RegExp.$3;
				}else if(arg.match(/#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/)){
					hexCode[0] = RegExp.$1 + '' + RegExp.$1;
					hexCode[1] = RegExp.$2 + '' + RegExp.$2;
					hexCode[2] = RegExp.$3 + '' + RegExp.$3;
				}else{
					hexCode = null;
				}

				if(hexCode){
					var rgb = [0, 0, 0];

					for(var i=0; i<3; i++){
						rgb[i] = parseInt(hexCode[i], 16);
					}
					return rgb;
				}
				return null;
			},

			/*
			 * 色配列を16進数カラーコードに変換する関数。#がついて返ってくるので注意。
			 * ex) [170, 187, 255] => #aabbff
			 */
			rgb2hex : function(arg){
				if(util.isArray(arg)){
					var R = arg[0].toString(16);
					var G = arg[1].toString(16);
					var B = arg[2].toString(16);
				}else{
					var R = arguments[0].toString(16);
					var G = arguments[1].toString(16);
					var B = arguments[2].toString(16);
				}
				if(R.length == 1) R = '0'+R;
				if(G.length == 1) G = '0'+G;
				if(B.length == 1) B = '0'+B;
				return '#' + R + G + B;
			},

			/*
			 * URL分解関数。
			 * @param arg URL。省略した場合は、現在のURL。
			 */
			parseURI : function(arg){
				var p = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
				var r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
				var m = r.exec(arg || location.href);
				var u = {}
				var i = p.length;

				while(i--){
					u[p[i]] = m[i] || '';
				}
				return u;
			},

			/*
			 * クエリパラメータをオブジェクト化する関数。
			 * @param arg URL。省略した場合は、現在のlocation.search。
			 */
			parseParam : function(arg){
				var param = {};

				if(!arg){
					arg = location.search;
				}
				if(arg && arg.indexOf('?') != -1){
					arg = arg.split('?')[1];
				}else{
					arg = false;
				}
				if(arg){
					var _f = arg.split('&');

					for(var i=0; i<_f.length; i++){
						if(_f[i].indexOf('=') != -1){
							var _p = _f[i].split('=');
							param[_p[0]] = _p[1];
						}else{
							param[_f[i]] = '';
						}
					}
				}
				return param;
			},

			/*
			 * クラス継承を行う関数。
			 * @param superClass 親クラス
			 * @param subConstructor　子クラスのコンストラクタ
			 * @param methods 小クラスに登録するメソッド(オブジェクト形式)。

			 * @return 小クラスの定義。
			 */
			extend : function(superClass, subConstructor, methods){
				if (typeof Object.create !== 'function') {
					Object.create = function(o) {
						var F = function(){};
						F.prototype = o;
						return new F();
					};
				}
				subConstructor.prototype = Object.create(superClass.prototype);
				subConstructor.prototype.constructor = subConstructor;

				subConstructor.prototype.__super__ = superClass.prototype;
				subConstructor.prototype.__super__.constructor = superClass;

				// スーパーコンストラクタ呼び出しのエイリアス
				subConstructor.prototype['super'] = function(){
					this.__super__.constructor.apply(this, arguments);
				};

				if(typeof methods == 'object'){
					for(var name in methods){
						subConstructor.prototype[name] = methods[name];
					}
				}
				return subConstructor;
			},

			/*
			 * サイズ変更時のリスナを登録する関数。
			 * @param fn コールバック関数。関数には引数として、[画面幅, 画面高]が渡される。
			 * @param thisObject コールバック関数内のthisオブジェクト
			 * @param init 登録直後に実行するかどうか。省略した場合は、true。
			 */
			addResizeListener : function(fn, thisObject, init){
				if(typeof fn === 'function'){
					startResizeObserver();

					if(thisObject === undefined) thisObject = window;

					resizeListeners[resizeListeners.length] = {callback:fn, thisObject:thisObject};

					if(init === undefined || init){
						fn.call(thisObject, winW, winH);
					}
				}
			},

			/*
			 * スクロール時のリスナを登録する関数。
			 * @param fn コールバック関数。関数には引数として、[スクロールトップ, スクロールボトム, スクロールレフト, スクロールライト]が渡される。
			 * @param thisObject コールバック関数内のthisオブジェクト
			 * @param init 登録直後に実行するかどうか。省略した場合は、true。
			 */
			addScrollListener : function(fn, thisObject, init){
				if(typeof fn === 'function'){
					startResizeObserver();
					startScrollObserver();

					if(thisObject === undefined) thisObject = window;

					scrollListeners[scrollListeners.length] = {callback:fn, thisObject:thisObject};

					if(init === undefined || init){
						var t = document.body.scrollTop || document.documentElement.scrollTop;
						var l = document.body.scrollLeft || document.documentElement.scrollLeft;
						var b = t + winH;
						var r = l + winW;
						fn.call(thisObject, t, b, l, r);
					}
				}
			},

			addWheelListener : function(target, fn, thisObject){
				if(typeof fn === 'function'){

					if(thisObject === undefined) thisObject = window;

					var wheelEvent = {
						type : '',
						wheelDeltaX : 0,
						wheelDeltaY : 0,
						returnValue : true,
						originalEvent : null,

						preventDefault : function(){
							this.returnValue = false;
						},
						reset : function(){
							this.returnValue = true;
						}
					};

					if(wheelListeners === null){
						wheelListeners = [];
					}

					wheelListeners.push({target:target, callback:fn});

					if(target.addEventListener){
						// IE,Safari,Chrome etc
						target.addEventListener('mousewheel', function(e){
							var dx = e.wheelDeltaX ? e.wheelDeltaX : 0;
							var dy = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;

							if(dy%40 == 0){
								dy *= 0.8;
							}else{
								dy *= 0.15;
							}
							if(dx%40 == 0){
								dx *= 0.8;
							}else{
								dx *= 0.15;
							}
							wheelEvent.reset();
							wheelEvent.type = 'mousewheel';
							wheelEvent.wheelDeltaX = dx;
							wheelEvent.wheelDeltaY = dy;
							wheelEvent.originalEvent = e;

							for(var i=0; i<wheelListeners.length; i++){
								if(target == wheelListeners[i].target){
									wheelListeners[i].callback.call(thisObject, wheelEvent);
								}
							}

							if(wheelEvent.returnValue === false){
								e.preventDefault();
							}
						}, false);

						// Firefox
						target.addEventListener('MozMousePixelScroll', function(e){
							var dx = 0;
							var dy = 0;

							if(e.axis === e.VERTICAL_AXIS){
								dy = -e.detail*0.6;
							}else if(e.axis === e.HORIZONTAL_AXIS){
								dx = -e.detail*0.6;
							}

							wheelEvent.reset();
							wheelEvent.type = 'mousewheel';
							wheelEvent.wheelDeltaX = dx;
							wheelEvent.wheelDeltaY = dy;
							wheelEvent.originalEvent = e;

							for(var i=0; i<wheelListeners.length; i++){
								if(target == wheelListeners[i].target){
									wheelListeners[i].callback.call(thisObject, wheelEvent);
								}
							}

							if(wheelEvent.returnValue === false){
								e.preventDefault();
							}
						}, false);

						if(device.hasTouch){
							var timer = null;
							var dx, dy, sx, sy;

							var tick = function(e){
								dx *= 0.9;
								dy *= 0.9;

								wheelEvent.reset();
								wheelEvent.type = 'touchend';
								wheelEvent.wheelDeltaX = dx;
								wheelEvent.wheelDeltaY = dy;

								for(var i=0; i<wheelListeners.length; i++){
									if(target == wheelListeners[i].target){
										wheelListeners[i].callback.call(thisObject, wheelEvent);
									}
								}

								if(Math.abs(dx) > 1 || Math.abs(dy) > 1){
									timer = setTimeout(tick, 10);
								}
							};

							target.addEventListener('touchstart', function(e){
								clearTimeout(timer);
								sx = e.touches[0].clientX;
								sy = e.touches[0].clientY;
							}, false);

							target.addEventListener('touchmove', function(e){
								dx = e.touches[0].clientX - sx;
								dy = e.touches[0].clientY - sy;
								sx = e.touches[0].clientX;
								sy = e.touches[0].clientY;

								wheelEvent.reset();
								wheelEvent.type = 'touchmove';
								wheelEvent.wheelDeltaX = dx;
								wheelEvent.wheelDeltaY = dy;
								wheelEvent.originalEvent = e;

								for(var i=0; i<wheelListeners.length; i++){
									if(target == wheelListeners[i].target){
										wheelListeners[i].callback.call(thisObject, wheelEvent);
									}
								}

								if(wheelEvent.returnValue === false){
									e.preventDefault();
								}
							}, false);

							target.addEventListener('touchend', tick, false);
							target.addEventListener('touchcancel', tick, false);
						}
					}else{
						// IElte8
						target.attachEvent('onmousewheel', function(e){

							wheelEvent.reset();
							wheelEvent.type = 'mousewheel';
							wheelEvent.wheelDeltaX = 0;
							wheelEvent.wheelDeltaY = e.wheelDelta*1.5;
							wheelEvent.originalEvent = window.event;

							for(var i=0; i<wheelListeners.length; i++){
								if(target == wheelListeners[i].target){
									wheelListeners[i].callback.call(thisObject, wheelEvent);
								}
							}

							if(wheelEvent.returnValue === false){
								return false;
							}
						});
					}
				}
			},

			/*
			 * リサイズ時のリスナを削除する関数。
			 * @param fn 削除するコールバック関数。
			 */
			removeResizeListener : function(fn){
				if(resizeListeners !== null){
					for(var i=0; i<resizeListeners.length;){
						fn === resizeListeners[i].callback ? resizeListeners.splice(i, 1) : i++;
					}
				}
			},

			/*
			 * スクロール時のリスナを削除する関数。
			 * @param fn 削除するコールバック関数。
			 */
			removeScrollListener : function(fn){
				if(scrollListeners !== null){
					for(var i=0; i<scrollListeners.length;){
						fn === scrollListeners[i].callback ? scrollListeners.splice(i, 1) : i++;
					}
				}
			},

			removeWheelListener : function(fn){
				if(wheelListeners !== null){
					for(var i=0; i<wheelListeners.length;){
						fn === wheelListeners[i].callback ? wheelListeners.splice(i, 1) : i++;
					}
				}
			},

			triggerResizeListener : function(){
				if(resizeListeners !== null){
					size = getWindowSize();
					winW = size.w;
					winH = size.h;

					for(var i=0; i<resizeListeners.length; i++){
						resizeListeners[i].callback.call(resizeListeners[i].thisObject, winW, winH);
					}
				}
			},

			triggerScrollListener : function(){
				if(scrollListeners !== null){
					size = getWindowSize();
					var t = document.body.scrollTop || document.documentElement.scrollTop;
					var l = document.body.scrollLeft || document.documentElement.scrollLeft;
					var b = t + size.h;
					var r = l + size.w;

					for(var i=0; i<scrollListeners.length; i++){
						scrollListeners[i].callback.call(scrollListeners[i].thisObject, t, b, l, r);
					}
				}
			},

			/*
			 * cookie読み込み/書き込み関数。
			 * @param name 第1引数のみの場合は、読み込みを行う。第2引数が存在する場合は、書き込みを行う。
			 * @param value 書き込む値。
			 * @param options path、domain、expires、secureの設定が可能。
			 * 
			 * expiresは、保存秒数または数値+単位で設定する。
			 * ex1) 3600 => 1時間
			 * ex2) 1month => 30日
			 */
			cookie : function(){
				var name = arguments[0];

				if(!!name){
					if(arguments.length > 1){
						// write
						var value   = (arguments[1] || '');
						var options = (arguments[2] || {});

						var path    = options.path   ? '; path=' + (options.path) : '';
	        			var domain  = options.domain ? '; domain=' + (options.domain) : '';
	       				var secure  = options.secure ? '; secure' : '';
						var expires = options.expires ? options.expires : '';

						if(expires != ''){
							var date;

							if(typeof expires == 'number'){
								date = new Date();
								date.setTime(date.getTime() + expires*1000);
							}else if(expires.toUTCString){
								date = expires;
							}else if(typeof expires == 'string'){
								var msec = 0;

								if(expires.match(/^([0-9]+)second(s)?$/)){
									msec = (RegExp.$1-0)*1000;
								}else if(expires.match(/^([0-9]+)minute(s)?$/)){
									msec = (RegExp.$1-0)*60*1000;
								}else if(expires.match(/^([0-9]+)hour(s)?$/)){
									msec = (RegExp.$1-0)*60*60*1000;
								}else if(expires.match(/^([0-9]+)day(s)?$/)){
									msec = (RegExp.$1-0)*24*60*60*1000;
								}else if(expires.match(/^([0-9]+)week(s)?/)){
									msec = (RegExp.$1-0)*7*24*60*60*1000;
								}else if(expires.match(/^([0-9]+)month(s)?$/)){
									msec = (RegExp.$1-0)*30*24*60*60*1000;
								}else if(expires.match(/^([0-9]+)year(s)?$/)){
									msec = (RegExp.$1-0)*365*24*60*60*1000;
								}
								if(msec > 0){
									date = new Date();
									date.setTime(date.getTime() + msec);
								}
							}
							if(date) expires = '; expires=' + date.toUTCString();
						}
						document.cookie = name + '=' + encodeURIComponent(value) + path + domain + secure + expires;
					}else{
						// read
						if(!!document.cookie){
							var sp = document.cookie.split(';');

							for(var i=0; i<sp.length; i++){
								var pair = sp[i].split('=');
								if(jQuery.trim(pair[0]) == name){
									return decodeURIComponent(jQuery.trim(pair[1]));
								}
							}
						}
						return undefined;
					}
				}
			},

			/*
			 * 乱数シード設定関数。
			 * @param seed 新しいシード値
			 */
			srand : function(seed){
				if(!isNaN(seed)){
					seeds = _seeds;
					seed = parseInt(seed);
					seeds[2] ^= seed;
					seeds[2] ^= seeds[2] >> 21;
					seeds[2] ^= seeds[2] << 35;
					seeds[2] ^= seeds[2] >> 4;
					seeds[2] *= 268582165;
					util.rand();
					util.rand();
				}
			},

			/*
			 * 整数乱数生成関数。アルゴリズムにxorshiftを使用
			 * @param min 最小値
			 * @param max 最大値-1
			 * 引数を省略した場合は、処理系に依存する正整数値を返す。
			 */
			rand : function(min, max){
				var t = (seeds[0]^(seeds[0]<<11));
				seeds[0]=seeds[1];
				seeds[1]=seeds[2];
				seeds[2]=seeds[3];

				var r = ( seeds[3]=(seeds[3]^(seeds[3]>>19))^(t^(t>>8)) );

				if(arguments.length >= 2){
					return min + r%(max-min);
				}else{
					return r;
				}
			},

			uniqueString : function(len){
				var str = '';
				var stack = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';

				if(len && !isNaN(len)){
					len = parseInt(len);
				}else{
					len = 10;
				}
				for(var i=0; i<len; i++){
					str += stack.charAt(parseInt(Math.random()*stack.length));
				}
				if(str in ustock){
					return util.uniqueString(len+1);
				}else{
					ustock[str] = 1;
					return str;
				}
			},

			/*
			 * 配列シャッフル関数。
			 * @param arr シャッフルする配列
			 * @param overwrite 配列を上書きするかどうか
			 */
			shuffle : function(arr, overwrite){
				if(util.isArray(arr)){
					if(overwrite || overwrite === undefined){
						for(var i=0; i<arr.length; i++){
							var j = util.rand(0, arr.length);
							var t = arr[i];
							arr[i] = arr[j];
							arr[j] = t;
						}
					}else{
						var index = [];

						for(var i=0; i<arr.length; i++){
							index[i] = i;
						}
						for(var i=0; i<index.length; i++){
							var j = util.rand(0, index.length);
							var t = index[i];
							index[i] = index[j];
							index[j] = t;
						}
						for(var i=0; i<index.length; i++){
							index[i] = arr[index[i]];
						}
						return index;
					}
				}
			},

			sanitize : function(str, nl2br){
				if(str && typeof str == 'string'){
					str = str.replace(/</igm,"&lt;").replace(/>/igm,"&gt;");

					if(nl2br){
						str = str.replace(/[\n]/g, '<br />');
					}
				}
				return str;
			},

			ellipsis : function(str, limit){
				var displayName  = str.replace(/[\n]/g, ' ');
				var displayWidth = 0;

				for(var n=0; n<displayName.length; n++){
					if(!displayName.charAt(n).match(/[a-zA-Z0-9\!@\.]/)){
						displayWidth += 2;
					}else{
						displayWidth += 1;
					}
					if(displayWidth > limit){
						displayName = displayName.substr(0, n) + '...';
						break;
					}
				}
				return displayName;
			},

			gaTrack : function(category, action, label, value){
				if(typeof _gaq == 'object' && typeof _gaq.push == 'function'){
					_gaq.push(['_trackEvent', category, action, label, value]);

				}else if(typeof ga == 'function'){
					ga('send', 'event', category, action, label, value);

				}
			}
		};


		/*****************************************************************************************************************
		 * readyイベント
		 *****************************************************************************************************************/

		var readyFn = [];

		function ready(fn){
			if(document.readyState === 'complete'){
				fn.call();
			}else{
				readyFn[readyFn.length] = fn;
			}
		};
		function doReady(){
			for(var i=0; i<readyFn.length; i++){
				readyFn[i].call();
			}
		}
		function check(){
			try {
				document.documentElement.doScroll('left');
			} catch(e) {
				setTimeout(check, 4);
				return;
			}
			doReady();
		}

		if(document.readyState === 'complete'){
			doReady();
		}else{
			if(document.addEventListener){
				document.addEventListener('DOMContentLoaded', doReady, false);
			}else{
				check();
			}
		}


		/*****************************************************************************************************************
		 * factory
		 *****************************************************************************************************************/

		var Factory = (function(){

			var Factory = function(){
				this.products = {};
			};

			Factory.prototype.set = function(name, arg){
				this.products[name] = arg;
			};

			Factory.prototype.get = function(name){
				if(name in this.products){
					return this.products[name];
				}
			};

			Factory.prototype.inject = function(name, contructor, arg){
				this.products[name] = new contructor(this, arg);
			};

			return Factory;
		})();


		var Product = (function(){

			var Product = function(factory){
				this.factory = factory;
			};

			Product.prototype.notify = function(){
			};

			return Product;
		})();


		/*****************************************************************************************************************
		 * public
		 *****************************************************************************************************************/

		// 変更不可にする
		if(Object.freeze) ua = Object.freeze(ua);
		if(Object.freeze) css = Object.freeze(css);
		if(Object.freeze) html = Object.freeze(html);
		if(Object.freeze) event = Object.freeze(event);
		if(Object.freeze) device = Object.freeze(device);

		return {
			ua : ua,
			css : css,
			html : html,
			event : event,
			device : device,
			easing : easing,
			util : util,
			ready : ready,

			Factory : Factory,
			Product : Product
		};
	})();
})();


// jQuery拡張
if(typeof $ != 'undefined'){

	/*******************************************************************************************************************************
	 * Easing
	 *******************************************************************************************************************************/

	(function(){

		jQuery.extend(
			jQuery.easing, {
				 iX2  : function(x,t,b,c,d){ return x*x; }
				,oX2  : function(x,t,b,c,d){ return -x*(x-2); }
				,ioX2 : function(x,t,b,c,d){ return (x < 0.5 ? 2*x*x : 1-2*(--x)*x); }
				,oiX2 : function(x,t,b,c,d){ return (x < 0.5 ? -2*x*(x-1) : 1+2*x*(x-1)); }

				,iX3  : function(x,t,b,c,d){ return x*x*x; }
				,oX3  : function(x,t,b,c,d){ return 1+(--x)*x*x; }
				,ioX3 : function(x,t,b,c,d){ return (x < 0.5 ? 4*x*x*x: 1+4*(--x)*x*x); }

				,iX4  : function(x,t,b,c,d){ return x*x*x*x; }
				,oX4  : function(x,t,b,c,d){ return 1-(--x)*x*x*x; }
				,ioX4 : function(x,t,b,c,d){ return (x < 0.5 ? 8*x*x*x*x : 1-8*(--x)*x*x*x); }

				,iX5  : function(x,t,b,c,d){ return x*x*x*x*x; }
				,oX5  : function(x,t,b,c,d){ return 1+(--x)*x*x*x*x; }
				,ioX5 : function(x,t,b,c,d){ return (x < 0.5 ? 16*x*x*x*x*x : 1+16*(--x)*x*x*x*x); }

				,iExp  : function(x,t,b,c,d){ return Math.exp(10*(x-1)); }
				,oExp  : function(x,t,b,c,d){ return 1-Math.exp(-10*x); }
				,ioExp : function(x,t,b,c,d){ return (x < 0.5 ? 0.5*Math.exp(10*(x*2-1)) : 1-0.5*Math.exp(-10*(x-0.5)*2)); }

				,iSin  : function(x,t,b,c,d){ return 1-Math.cos(x*Math.PI/2); }
				,oSin  : function(x,t,b,c,d){ return Math.sin(x*Math.PI/2); }
				,ioSin : function(x,t,b,c,d){ return 0.5-0.5*Math.cos(x*Math.PI); }

				,iBack  : function(x,t,b,c,d){ var s=1.8; return x*x*((s+1)*x - s); }
				,oBack  : function(x,t,b,c,d){ var s=1.8; return 1 + (x-1)*(x-1)*((s+1)*(x-1) + s); }
				,ioBack : function(x,t,b,c,d){}

				,iCirc  : function(x,t,b,c,d){ return -c *(Math.sqrt(1 -(t/=d)*t) - 1)+b; }
				,oCirc  : function(x,t,b,c,d){ return c * Math.sqrt(1 -(t=t/d-1)*t)+b; }
				,ioCirc : function(x,t,b,c,d){ if((t/=d/2)<1) return -c/2 *(Math.sqrt(1 - t*t) - 1)+b;return c/2 *(Math.sqrt(1 -(t-=2)*t)+1)+b; }

				,elastic  : function(x,t,b,c,d){ return Shared.easing.elastic(x, 3, 0.1, 0.4); }
				,elastic2 : function(x,t,b,c,d){ return Shared.easing.elastic(x, 2, 0.1, 0.4); }
				,elastic3 : function(x,t,b,c,d){ return Shared.easing.elastic(x, 3, 0.1, 0.4); }
				,elastic4 : function(x,t,b,c,d){ return Shared.easing.elastic(x, 4, 0.1, 0.4); }
				,elastic5 : function(x,t,b,c,d){ return Shared.easing.elastic(x, 5, 0.1, 0.4); }
				,elastic6 : function(x,t,b,c,d){ return Shared.easing.elastic(x, 6, 0.1, 0.4); }

				,bounce  : function(x,t,b,c,d){ return Shared.easing.bounce(x,4,5); }
				,bounce2 : function(x,t,b,c,d){ return Shared.easing.bounce(x,2,2); }
				,bounce3 : function(x,t,b,c,d){ return Shared.easing.bounce(x,3,4); }
				,bounce4 : function(x,t,b,c,d){ return Shared.easing.bounce(x,4,5); }
				,bounce5 : function(x,t,b,c,d){ return Shared.easing.bounce(x,5,7); }
				,bounce6 : function(x,t,b,c,d){ return Shared.easing.bounce(x,6,9); }
			}
		);
	})();
	

	

	/*******************************************************************************************************************************
	 * Utility
	 *******************************************************************************************************************************/

	var dummyElement = null;

	jQuery.extend({
		preload : function(src){
			if(!dummyElement){
				dummyElement = document.createElement('div');
				dummyElement.style.cssText = 'position:absolute; left:-9999px; top:-9999px; display:none';
				document.body.appendChild(dummyElement);
			}
			var img = document.createElement('img');
			img.src = src;
			img.setAttribute('width', 'auto');
			img.setAttribute('height', 'auto');
			dummyElement.appendChild(img);
		},

		useVML : function(){
			if(document.namespaces){
				if(!document.namespaces['v']){
					if(Shared.ua.isIE8){
						document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
					}else{
						document.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
					}
					document.createStyleSheet().cssText = "v\\:rect, v\\:fill, v\\:shape, v\\:group, v\\:path, v\\:oval, v\\:image { behavior: url(#default#VML); display:inline-block; margin:0; padding:0; }";
					document.createStyleSheet().cssText = "._rewrited2vml {visibility:hidden !important; position:absolute !important; top:-9999px !important; left:-9999px !important;}";
				}
				return true;
			}else{
				return false;
			}
		}
	});

	jQuery.fn.extend({

		img2vml : function(){
			if(Shared.ua.isIElt9){
				if(document.namespaces){
					jQuery.useVML();

					var images = this.filter('img');

					images.each(function(i){
						var img = this;
						var src = this.getAttribute('src');

						if(src.indexOf('.png') === -1) return 1;

						if(images.eq(i).hasClass('_rewrited2vml')){
							return true;
						}else{
							images.eq(i).addClass('_rewrited2vml');
						}
						if(Shared.ua.isIElt8){
							images.eq(i).css({visibility:'hidden', position:'absolute', top:'-9999px', left:'-9999px'});
						}
						if(Shared.ua.isIE8){
							var dummy = document.createElement('div');
							dummy.innerHTML = '<v:rect><v:fill></v:fill></v:rect>';
							var rect = dummy.firstChild;
							var fill = rect.firstChild;
						}else{
							var rect = document.createElement('v:rect');
							var fill = document.createElement('v:fill');
							rect.appendChild(fill);
						}
						var w = images.eq(i).attr('width');
						var h = images.eq(i).attr('height');

						fill.src     = src || '';
						fill.type    = 'frame';
						fill.opacity = 1;

						rect.fillcolor    = 'none';
						rect.stroked      = false;
						rect.coorsize     = w+','+h;
						rect.coordorigin  = '0,0';
						rect.style.width  = w + 'px';
						rect.style.height = h + 'px';

						img.parentNode.insertBefore(rect, img);

						fill.color = 'none';

						img.attachEvent('onpropertychange', function(e){
							if(e.propertyName == 'src'){
								fill.src = img.src;
							}
							else if(e.propertyName == 'width' || e.propertyName == 'style.width'){
								rect.style.width = img.currentStyle.width;
							}
							else if(e.propertyName == 'height' || e.propertyName == 'style.height'){
								rect.style.height = img.currentStyle.height;
							}
							else if(e.propertyName == 'style.filter'){
								var opacity = 1;

								if(img.style.filter){
									opacity = (img.style.filter.split('alpha(opacity=')[1]).split(')')[0]/100;
									if(opacity <= 0) opacity = 0.001;
									if(opacity >= 1) opacity = 1;
								}
								fill.opacity = opacity;
								fill.color = 'none';
							}
							else if(e.propertyName == 'style.marginTop'){
								rect.style.marginTop = img.style.marginTop;
							}
							else if(e.propertyName == 'style.marginLeft'){
								rect.style.marginLeft = img.style.marginLeft;
							}
							fill.color = 'none';
						});
					});
				}
			}
			return this;
		},

		img2bg : function(useFilter){
			if(!$('html').hasClass('_bgstyle')){
				$('html').addClass('_bgstyle');

				if(document.createStyleSheet){
					document.createStyleSheet().cssText = "._rewrited2bg { display:inline-block!important; width:auto!important; height:auto!important; } ._rewrited2bg img { visibility:hidden!important; }";
				}else{
					var style = document.createElement('style');
					style.innerHTML = "._rewrited2bg { display:inline-block!important; width:auto!important; height:auto!important; } ._rewrited2bg img { visibility:hidden!important; }";
					document.getElementsByTagName('head')[0].appendChild(style);
				}
			}

			this.filter('img').each(function(){
				var span = $('<span class="_rewrited2bg"></span>');

				if(!Shared.css.hasOpacity && useFilter){
					span.css({filter:'progid:DXImageTransform.Microsoft.AlphaImageLoader(Src='+this.src+',SizingMethod=scale)'});
				}else{
					span.css({background:'url('+this.src+') top left no-repeat', backgroundSize:'100% 100%'});
				}
				$(this).after(span);

				span.append(this);
			});
			return this;
		},


		/*
		 * マウスオーバー関数
		 * data-srcによる遅延ロードにも対応。遅延ロードにはjQuery.fn.postloadを使用すること。
		 * @param options {off:'オフマウス時の接尾辞', ov:'オンマウス時の接尾辞', cu:'選択時の接尾辞。trueの場合は_cu'}
		 *
		 * jQuery.fn.triggerHandler(type)またはjQuery.fn.trigger(type)を実行することで、強制的に画像を変更することが可能。typeは以下の通り。
		 * pause.ov   マウスオーバー判定を停止する。
		 * resume.ov  マウスオーバー判定を再開する。
		 * enter.ov   オン画像に変更する。triggerの第2引数を省略するかtrueにした場合、判定も停止する。
		 * leave.ov   オフ画像に変更する。triggerの第2引数を省略するかtrueにした場合、判定も停止する。
		 * current.ov 選択画像に変更する。triggerの第2引数を省略するかtrueにした場合、判定も停止する。
		 * reset.ov   初期状態にする。
		 */
		ov : function(options){
			var suffixOf = '';
			var suffixOv = '_ov';
			var suffixCu = false;

			if(options){
				if('off' in options && options.off && typeof options.off == 'string'){
					suffixOf = options.off;
				}
				if('ov' in options && options.ov && typeof options.ov == 'string'){
					suffixOv = options.ov;
				}
				if('cu' in options && options.cu){
					if(typeof options.cu == 'string'){
						suffixCu = options.cu;
					}else{
						suffixCu = '_cu';
					}
				}
			}

			var regexp = new RegExp('^(.+)'+suffixOf+'(\.(png|gif|jpg|jpeg|bmp))$');


			return this.each(function(){
				var self    = $(this);
				var area    = self;
				var enabled = true;
				var srcOff  = null;
				var srcOv   = null;
				var srcCu   = null;


				function enter(){
					if(enabled) self.attr('src', srcOv);
				}
				function leave(){
					if(enabled) self.attr('src', srcOff);
				}

				if(this.tagName == 'IMG' || (this.tagName == 'INPUT' && typeof this.type === 'string' && this.type.toLowerCase() == 'image')){

					var post = false;

					// OV画像（遅延ロードも対応）
					if(self.attr('data-src')){
						srcOff = self.attr('data-src'); post = true;
					}else{
						srcOff = self.attr('src');
					}

					srcOv = srcOff.replace(regexp, '$1'+suffixOv+'$2');

					if(!post){
						jQuery.preload(srcOv);
					}else{
						self.attr('data-src-ov', srcOv);
					}

					// CU画像（遅延ロードも対応）
					if(suffixCu){
						srcCu = srcOff.replace(regexp, '$1'+suffixCu+'$2');

						if(!post){
							jQuery.preload(srcCu);
						}else{
							self.attr('data-src-cu', srcCu);
						}
					}

					// カーソルがポインタにならないバグの対応
					if(self.hasClass('_rewrited2vml')){
						if(this.parentNode.tagName == 'A' && this.parentNode.currentStyle['cursor'] == 'auto'){
							this.parentNode.style.cursor = 'pointer';
						}
					}
					if(this.parentNode.tagName == 'A'){
						area = self.parent('a');
					}

					// イベント登録
					if(Shared.device.hasTouch){
						area.bind('touchstart', enter).bind('touchend touchcancel', leave);
					}else{
						area.hover(enter, leave);

						if(this.parentNode.tagName == 'A'){
							$(this.parentNode).bind('focus', enter).bind('blur', leave);
						}
					}

					// 判定停止
					self.bind('pause.ov', function(e){
						enabled = false;
					});
					// 判定再開
					self.bind('resume.ov', function(e){
						enabled = true;
					});
					// 強制的にオン状態
					self.bind('enter.ov', function(e, pause){
						self.attr('src', srcOv);
						if(pause || pause===undefined) enabled = false;
					});
					// 強制的にオフ状態
					self.bind('leave.ov', function(e, pause){
						self.attr('src', srcOff);
						if(pause || pause===undefined) enabled = false;
					});
					// 強制的に選択状態
					self.bind('current.ov', function(e, pause){
						if(srcCu){
							self.attr('src', srcCu);
							if(pause || pause===undefined) enabled = false;
						}
					});
					// 通常状態に
					self.bind('reset.ov', function(){
						enabled = true;
						self.attr('src', srcOff);
					});
				}
			});
		},

		/*
		 * 画像ファイル名置換関数。
		 * @param options {prefix:"接頭辞", suffix:"接尾辞", ext:"拡張子"}
		 */
		replaceSrc : function(options){
			var pre = false;
			var suf = false;
			var ext = false;

			if(typeof options == 'object'){
				if('prefix' in options && typeof options.prefix == 'string'){
					pre = options.prefix;
				}
				if('suffix' in options && typeof options.suffix == 'string'){
					suf = options.suffix;
				}
				if('ext' in options && typeof options.ext == 'string'){
					ext = options.ext.split('.')[0];
				}

				var regexp = new RegExp('(?:(.+)/)?([^\/\.]+)\.([a-zA-Z0-9]+)([\?#;].*)?$');

				this.each(function(){
					if(this.tagName == 'IMG' || (this.tagName == 'INPUT' && typeof this.type === 'string' && this.type.toLowerCase() == 'image')){
						if(this.getAttribute('data-src')){
							var src = this.getAttribute('data-src');
						}else{
							var src = this.getAttribute('src');
						}

						if(src.match(regexp)){
							var _path = RegExp.$1;
							var _name = RegExp.$2;
							var _ext  = RegExp.$3;

							if(pre) _name = pre + _name;
							if(suf) _name = _name + suf;
							if(ext) _ext  = ext;

							var file = (_path ? _path+'/' : '') + _name + '.' + _ext;

							if(this.getAttribute('data-src')){
								this.setAttribute('data-src', file);
							}else{
								this.setAttribute('src', file);
							}
						}
					}
				});
			}
			return this;
		},

		/*
		 * HTMLエレメントのstyleプロパティを除去する。
		 */
		clearStyle : function(){
			return this.each(function(){
				this.setAttribute('style', ''); // 空にしてからでないと、chromeで属性名が残る
				this.removeAttribute('style');
			});
		},

		/*
		 * imgタグを遅延ロードする。
		 * @param fn コールバック関数
		 * @param thisObject コールバック関数内のthisオブジェクト
		 * @param promise $.Deferred
		 */
		postload : function(fn, thisObject, promise){
			var these = this;
			var target = new Array();

			if(promise) var deferred = new jQuery.Deferred();

			if(!thisObject) thisObject = window;


			this.each(function(){
				if(this.getAttribute('data-src')){
					target[target.length] = this;
				}
				if(this.getAttribute('data-src-ov')){
					(new Image()).src = this.getAttribute('data-src-ov');
					this.removeAttribute('data-src-ov');

				}
				if(this.getAttribute('data-src-cu')){
					(new Image()).src = this.getAttribute('data-src-cu');
					this.removeAttribute('data-src-cu');
				}
			});
			if(target.length > 0){
				var success = true;
				var count = 0;

				for(var k=0; k<target.length; k++){
					(function(i){
						var src = target[i].getAttribute('data-src');

						target[i].removeAttribute('data-src');

						if(target[i].tagName === 'IMG'){
							target[i].src = src;
						}else{
							target[i].style.backgroundImage = 'url(' + src + ')';
						}
						var img = new Image();

						img.onload = function(){
							if(++count == target.length){
								if(promise){
									if(success){
										deferred.resolve();
									}else{
										deferred.reject();
									}
								}
								if(fn && typeof fn == 'function') fn.call(thisObject, success);
							}
						};
						img.onerror = function(){
							success = false;

							if(++count == target.length){
								if(promise) deferred.reject();
								if(fn && typeof fn == 'function') fn.call(thisObject, success);
							}
						};
						img.src = src;
					})(k);
				}
			}else{
				if(promise) deferred.resolve();
				if(fn && typeof fn == 'function') fn.call(thisObject, undefined);
			}
			return promise ? deferred.promise() : this;
		},

		/*
		 * 要素および要素内の画像の読み込み完了のコールバック
		 * @param fn コールバック関数
		 * @param thisObject コールバック関数内のthisオブジェクト
		 * @param async $.Deferred
		 */
		loadEnd : function(fn, thisObject, promise){
			var imgSrc = new Array();
			var success = true;
			var deferred = new jQuery.Deferred();

			if(promise) var deferred = new jQuery.Deferred();

			if(!thisObject) thisObject = window;

			this.filter('img').each(function(){
				imgSrc[imgSrc.length] = this.src;
			});
			this.find('img').each(function(){
				imgSrc[imgSrc.length] = this.src;
			});

			if(imgSrc.length > 0){
				for(var i=0, count=0; i<imgSrc.length; i++){
					var img = new Image();

					img.onload = function(){
						if(++count == imgSrc.length){
							if(promise){
								if(success){
									deferred.resolve();
								}else{
									deferred.reject();
								}
							}
							if(fn && typeof fn == 'function') fn.call(thisObject, success);
						}
					};
					img.onerror = function(){
						success = false;
						if(++count == imgSrc.length){
							if(promise) deferred.reject();
							if(fn && typeof fn == 'function') fn.call(thisObject, success);
						}
					};
					img.src = imgSrc[i];
				}
			}else{
				if(promise) deferred.resolve();
				if(fn && typeof fn == 'function') fn.call(thisObject, undefined);
			}
			return promise ? deferred.promise() : this;
		},

		wheel : function(fn){
			return this.each(function(){
				Shared.util.addWheelListener(this, fn, this);
			});
		},

		/*
		 * transtionを設定する関数
		 * @param prop 変化させるCSSプロパティ
		 * @param duration 変化にかかる時間
		 * @param easing イージング(jQuery.easingの名前)
		 * @param delay 遅延時間
		 */
		transition : function(prop, duration, easing, delay){
			if(Shared.css.hasTransition){
				if(prop){
					if(!duration) duration = 0;
					if(!easing) easing = 'linear';
					if(!delay) delay = 0;
					if(prop == 'filter') prop = Shared.css.prefix+prop;
					if(prop == 'transform') prop = Shared.css.prefix+prop;

					this.css('transition', prop+' '+duration+'ms '+Shared.easing.parse(easing)+' '+delay+'ms');
					this.css(Shared.css.prefix+'transition', prop+' '+duration+'ms '+Shared.easing.parse(easing)+' '+delay+'ms');
				}else{
					this.css('transition', 'none');
					this.css(Shared.css.prefix+'transition', 'none');
				}
			}
			return this;
		},

		/*
		 * transitionの終了イベントを登録する関数
		 * @param fn コールバック関数
		 * @param once 一度きりのコールバック実行か。省略した場合は、true。
		 * @param property transition対象のCSSプロパティ属性。省略した場合は、プロパティに関わらず実行。
		 */
		transitionEnd : function(fn, once, property){
			if(Shared.css.transitionEnd){
				if(fn){
					this.each(function(){
						function listener(e){
							if(e.target == this && (property === undefined || e.propertyName == property || e.propertyName == Shared.css.prefix + property)){
								if(once === undefined || once) this.removeEventListener(Shared.css.transitionEnd, listener);
								fn.call(this, e);
							}
						}
						this.addEventListener(Shared.css.transitionEnd, listener, false);
					});
				}else{
					this.each(function(i){
						this.removeEventListener(Shared.css.transitionEnd);
					});
				}
			}
			return this;
		},

		/*
		 * transformのエイリアス。
		 */
		transform : function(){
			if(arguments.length > 0){
				this.css('transform', arguments[0]).css(Shared.css.prefix+'transform', arguments[0]);
			}else{
				this.css('transform', '').css(Shared.css.prefix+'transform', '');
			}
			return this;
		},

		/*
		 * translate3dのエイリアス。
		 * @param x x軸方向(右)の変量。省略した場合は0px。
		 * @param y y軸方向(下)の変量。省略した場合は0px。
		 * @param z z軸方向(前)の変量。省略した場合は0px。
		 */
		translate3d : function(x, y, z){
			if(x === undefined) x = 0;
			if(y === undefined) y = 0;
			if(z === undefined) z = 0;
			if(typeof x === 'number') x += 'px';
			if(typeof y === 'number') y += 'px';
			if(typeof z === 'number') z += 'px';

			if(Shared.css.transform.translate3d){
				this.css('transform', 'translate3d('+x+','+y+','+z+')').css(Shared.css.prefix+'transform', 'translate3d('+x+','+y+','+z+')');
			}else if(Shared.css.transform.translate){
				this.css('transform', 'translate('+x+','+y+')').css(Shared.css.prefix+'transform', 'translate('+x+','+y+')');
			}
			return this;
		},

		/*
		 * transform-originのエイリアス。
		 * @param x x軸方向の中心。数値で指定した場合は自動的にpxを付ける。%による文字列指定も可能。
		 * @param y y軸方向の中心。数値で指定した場合は自動的にpxを付ける。%による文字列指定も可能。
		 * @param z z軸方向の中心。数値で指定した場合は自動的にpxを付ける。%はNG。
		 */
		transformOrigin : function(x, y, z){
			if(x === undefined) x = '50%';
			if(y === undefined) y = '50%';
			if(z === undefined) z = '0px';
			if(typeof x === 'number') x += 'px';
			if(typeof y === 'number') y += 'px';
			if(typeof z === 'number') z += 'px';

			if(Shared.css.transform.translate){
				if(arguments.length == 3){
					this.css('transform-origin', x+' '+y+' '+z).css(Shared.css.prefix+'transform-origin', x+' '+y+' '+z);
				}else{
					this.css('transform-origin', x+' '+y).css(Shared.css.prefix+'transform-origin', x+' '+y);
				}
			}
			return this;
		},

		matrix : function(a, b, c, d, x, y){
			if(!x) x = 0;
			if(!y) y = 0;

			if(arguments.length == 0){
				a = d = 1;
				b = c = x = y = 0;
			}
			if(Shared.css.transform.matrix){
				this.css('transform', 'matrix('+a+','+b+','+c+','+d+','+x+','+y+')').css(Shared.css.prefix+'transform', 'matrix('+a+','+b+','+c+','+d+','+x+','+y+')');
			}else{
				this.css('filter', "progid:DXImageTransform.Microsoft.Matrix(M11="+a+", M12="+c+", M21="+b+", M22="+d+", SizingMethod='auto expand')");
			}
			return this;
		},

		scale : function(s){
			if(Shared.css.transform.scale){
				this.css('transform', 'scale('+s+')').css(Shared.css.prefix+'transform', 'scale('+s+')');
			}else{
				this.css('filter', "progid:DXImageTransform.Microsoft.Matrix(M11="+s+", M12=0, M21=0, M22="+s+", SizingMethod='auto expand')");
			}
			return this;
		},

		cssAnimation : function(arg, duration, easing, delay, iteration){

			if(arguments.length === 0){
				this.css('animation', '').css(Shared.css.prefix+'animation', '');
			}else{
				if(typeof arg === 'string'){
					var name = arg;

				}else if(typeof arg === 'object'){
					var name   = 'css_animation_' + Shared.util.uniqueString(10);
					var style  = document.createElement('style');
					var frames = [];

					if(document.getElementsByTagName('head')){
						document.getElementsByTagName('head')[0].appendChild(style);
					}else if(document.body){
						document.body.insertBefore(style, document.body.firstChild);
					}else{
						document.documentElement.appendChild(style);
					}

					for(var f in arg){
						var val = [];

						for(var p in arg[f]){
							if(CSSRule.WEBKIT_KEYFRAMES_RULE){
								if(p === 'transform'){
									val.push('-webkit-' + p + ':' + arg[f][p]);
								}else{
									val.push(p + ':' + arg[f][p]);
								}
							}else{
								val.push(p + ':' + arg[f][p]);
							}
						}
						frames.push( f + '% { ' + val.join(';') + '; }');
					}

					var sheet = style.sheet;

					var rule = name + ' { ' + frames.join(' ') + ' }';

					if(CSSRule.WEBKIT_KEYFRAMES_RULE){ 
						sheet.insertRule('@-webkit-keyframes ' + rule, sheet.length);
					}else{
						sheet.insertRule('@keyframes ' + rule, sheet.length);
					}
				}else{
					return this;
				}

				if(typeof delay === 'undefined' || isNaN(delay)){
					delay = 0;
				}

				if(typeof iteration === 'undefined' || isNaN(iteration)){
					iteration = 'infinite';
				}

				var val = name+' '+duration+'ms '+delay+'ms '+Shared.easing.parse(easing)+' '+iteration;

				this.css('animation', val).css(Shared.css.prefix+'animation', val);
			}
			return this;
		},

		rotateZ : function(deg, duration, easing, fn){
			if(Shared.css.transform.rotateZ){
				this.css(Shared.css.prefix+'transform', 'rotateZ('+deg+'deg)');
			}else if(Shared.css.transform.rotate){
				this.css(Shared.css.prefix+'transform', 'rotate('+deg+'deg)');
			}else{
				var cos = Math.cos(deg*Math.PI/180);
				var sin = Math.sin(deg*Math.PI/180);
				var that = this;

				return this.each(function(i){
					var w  = that.eq(i).outerWidth();
					var h  = that.eq(i).outerHeight();
					var mx = (w*cos + h*sin) - w;
					var my = (w*sin + h*cos) - h;
					//that.eq(i).css({marginLeft:-mx/2, marginTop:-my/2});
					this.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+cos+", M12="+(sin)+", M21="+(-sin)+", M22="+cos+", SizingMethod='auto expand')";
				});
			}
			return this;
		},

		/*
		 * transtionアニメーション関数。stopは効かないので注意。
		 * @param property 変化させるCSSプロパティ
		 * @param duration 変化にかかる時間
		 * @param easing   イージング名
		 * @param callback 終了後コールバック
		 */
		transit : function(property, duration, easing, callback){
			if(Shared.css.hasTransition){
				if(typeof property == 'object'){
					duration = (duration ? duration + 'ms' : '0ms');
					easing   = (easing   ? Shared.easing.parse(easing) : 'linear');

					var transition = [];
					var targetProp = {};

					for(var key in property){
						var cssKey = key;

						if(key == 'transform'){
							targetProp[key] = property[key];
							cssKey = Shared.css.prefix+key;
							targetProp[Shared.css.prefix+key] = property[key];
						}else if(key == 'filter'){
							cssKey = Shared.css.prefix+key;
							targetProp[Shared.css.prefix+key] = property[key];
						}else{
							cssKey = Shared.util.reverseCamelCase(key);

							if(typeof property[key] == 'string' || cssKey==='opacity' || cssKey==='zoom' || cssKey==='z-index' || cssKey==='font-weight' || cssKey==='line-height'){
								targetProp[key] = property[key];
							}else{
								targetProp[key] = property[key] + 'px';
							}
						}
						transition[transition.length] = [cssKey, duration, easing].join(' ');
					}
					transition = transition.join(',');

					this.queue(function(){
						function listener(e){
							if(e.target === this){
								if(typeof callback === 'function') callback.call(this, e);
								this.removeEventListener(Shared.css.transitionEnd, listener);
								$(this).dequeue();
							}
						}
						this.addEventListener(Shared.css.transitionEnd, listener, false);
						
						$(this).css('transition', transition).css(Shared.css.prefix+'transition', transition).css(targetProp);//.dequeue();
					});
				}else{
					this.css('transition', 'none').css(Shared.css.prefix+'transition', 'none').dequeue();
				}
			}else{
				this.animate(property, duration, easing, callback);
			}
			return this;
		}
	});
}
