jQuery(document).ready(function( $ ) {

		// Menu settings
		$('#menuToggle, .menu-close').on('click', function(){
			$('#menuToggle').toggleClass('active');
			$('body').toggleClass('body-push-toleft');
			$('#theMenu').toggleClass('menu-open');
		});

		// Smooth scroll for the menu and links with .scrollto classes
	  $('.smoothscroll').on('click', function(e) {
	    e.preventDefault();
	    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      if (target.length) {

	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1500, 'easeInOutExpo');
	      }
	    }
			$('body').toggleClass('body-push-toleft');
			$('#theMenu').toggleClass('menu-open');
	  });

		// $('.carousel').carousel({
    //   interval: 3500
    // });

		// Javascript Chart
		if($('#javascript').length) {

			var doughnutData = [{
	        value: 70,
	        color: "#f85c37"
	      },
	      {
	        value: 30,
	        color: "#ecf0f1"
	      }
	    ];
	    var myDoughnut = new Chart(document.getElementById("javascript").getContext("2d")).Doughnut(doughnutData);
		};

		// Bootstrap Chart
		if($('#bootstrap').length) {
			var doughnutData = [{
					value: 90,
					color: "#f85c37"
				},
				{
					value: 10,
					color: "#ecf0f1"
				}
			];
			var myDoughnut = new Chart(document.getElementById("bootstrap").getContext("2d")).Doughnut(doughnutData);
		}

		// WordPress Chart
		if($('#wordpress').length) {
			var doughnutData = [{
					value: 55,
					color: "#f85c37"
				},
				{
					value: 45,
					color: "#ecf0f1"
				}
			];
			var myDoughnut = new Chart(document.getElementById("wordpress").getContext("2d")).Doughnut(doughnutData);
		}

});


//-------------------------------------------------------------------------
// Fireworks go up.
// Hanabi.js
// use an animation image.
// CopyRight(C) 2014 Simple Style, All rights reserved.
//-------------------------------------------------------------------------
// 調整や修正可能な定数
// HANABI[n] = new Array(配列１番目、配列２番目、配列３番目、配列４番目);
// 配列１番目：画像の保存場所(URL)
// 配列２番目：画像の幅（単位：px）
// 配列３番目：画像の高さ（単位：px）
// 配列４番目：表示する最大回数
// HASIRA : 火柱の画像
// MSEC   : 更新間隔(ミリ秒)
// TIMAX  : 処理時間のバラつき設定（秒）
// NUM    : １回に花火を打ち上げる数
// BTM    : 下からの打ち上げ位置（単位：px）
// DH     : 表示範囲の高さ（単位：px）
//-------------------------------------------------------------------------
// Setting constants that can be adjusted.
const HANABI = new Array();    // 配列オブジェクトHANABIを作成
HANABI[0]  = new Array('img_anime/hanabi-01.gif', 72 ,72, 18); //20frame
HANABI[1]  = new Array('img_anime/hanabi-02.gif', 72 ,72, 18);
HANABI[2]  = new Array('img_anime/hanabi-03.gif', 72 ,72, 18);
HANABI[3]  = new Array('img_anime/hanabi-04.gif', 72 ,72, 18);
HANABI[4]  = new Array('img_anime/hanabi-05.gif', 72 ,72, 33); //35frame
HANABI[5]  = new Array('img_anime/hanabi-06.gif', 72 ,72, 33);
HANABI[6]  = new Array('img_anime/hanabi-07.gif', 72 ,72, 33);
HANABI[7]  = new Array('img_anime/hanabi-08.gif', 72 ,72, 33);
HANABI[8]  = new Array('img_anime/hanabi-09.gif', 72 ,72, 20); //22frame
HANABI[9]  = new Array('img_anime/hanabi-10.gif', 72 ,72, 20);
HANABI[10] = new Array('img_anime/hanabi-11.gif', 72 ,72, 20);
HANABI[11] = new Array('img_anime/hanabi-12.gif', 72 ,72, 20);
const HASIRA = new Image();  // 変数 HASIRA を画像オブジェクト名とする
HASIRA.src = 'img_anime/hi.gif'; // 火柱の画像
const MSEC = 100;            // 更新処理間隔（ミリ秒）
const TIMAX = 10;            // 処理時間のバラつき設定(10秒)
const NUM = 12;              // １回に花火を打ち上げる数
const BTM = 100;             // 下からの打ち上げ位置
const DH = 360;              // 表示範囲の高さ（単位：px）
const LEN = HANABI.length;   // 設定した花火画像の数
//-------------------------------------------------------------------------
const HOBJ = new Array(NUM); // 花火輪のオブジェクト情報を格納
const FOBJ = new Array(NUM); // 火柱のオブジェクト情報を格納
const IMGW = new Array(NUM); // 画像の幅
const IMGH = new Array(NUM); // 画像の高さ
const FMAX = new Array(NUM); // 最大表示回数
var fx = new Array(NUM);     // 表示する花火のX座標
var fy = new Array(NUM);     // 表示する花火のY座標
var fh = new Array(NUM);     // 表示する花火の打ち上げ高さ
var cnt = new Array(NUM);    // 表示回数のカウント
var winx = 400;              // ウィンドウの幅(初期値600px)
var winy = 260;              // ウィンドウの高さ(初期値360px)
var scrlx = 0;               // 左端からのスクロール量
var scrly = 0;               // 上端からのスクロール量
//-------------------------------------------------------------------------

// 花火輪画像の出力 NUMで指定した数だけループ処理
for( var i=0; i<NUM; i++ ){
  fx[i]=0; fy[i]=0; fh[i]=0;  // 各配列の初期化
  // ランダムに指定する場合は以下に変更
  // var img_no = Math.floor(Math.random()*LEN);
  var img_no = i % LEN;
  const ADD_WA = document.createElement('img');
  ADD_WA.src = HANABI[img_no][0];
  ADD_WA.setAttribute('id','bon'+i);
  ADD_WA.style.position = 'absolute';
  ADD_WA.style.left = '-100px';
  ADD_WA.style.top  = '-100px';
  ADD_WA.style.visibility = 'hidden';
  ADD_WA.style.zIndex = (i+1);
  document.body.appendChild(ADD_WA);

  // 火柱画像の出力 花火輪の数と同じだけ出力
  const ADD_HI = document.createElement('img');
  ADD_HI.src = HASIRA.src;
  ADD_HI.setAttribute('id','fire'+i);
  ADD_HI.style.position = 'absolute';
  ADD_HI.style.left = '-100px';
  ADD_HI.style.top  = '-100px';
  ADD_HI.style.visibility = 'hidden';
  ADD_HI.style.zIndex = 2;
  document.body.appendChild(ADD_HI);
}

// 変数の初期設定
document.addEventListener('DOMContentLoaded',initSet,false);
function initSet(){
  getWindowSize();
  getScrollSize();
  winx = winx + scrlx; // 横幅、横スクロール量を加算
  winy = DH;           // 高さは360pxで固定
  for( var i=0; i<NUM; i++ ){
    IMGW[i] = HANABI[i%LEN][1];     // 画像の幅
    IMGH[i] = HANABI[i%LEN][2];     // 画像の高さ
    FMAX[i] = HANABI[i%LEN][3];     // 表示する最大回数
    HOBJ[i] = document.getElementById('bon'+i);          // 花火輪画像object情報取得
    HOBJ[i].style.visibility = 'hidden';                 // 花火輪を非表示
    FOBJ[i] = document.getElementById('fire'+i);        // 火柱画像object情報取得
    FOBJ[i].style.visibility = 'hidden';                // 火柱を非表示
    fx[i]= Math.floor(Math.random()*(winx/3)+(winx/3)); // 表示開始位置(水平位置)
    fy[i] = winy-BTM;                                   // 表示開始位置(垂直位置)
    fh[i] = Math.floor(80*Math.random()+(IMGH[i]/2+10));// 打ち上げ高さ花火輪表示位置
    cnt[i] = 0;                               // 打ち上げ回数のカウントの初期化
  }
  hanabiStart();
}

// ランダムに打ち上げ開始
function hanabiStart(){
  for( var i=0; i<NUM; i++ ){
    var stime = (Math.floor(Math.random()*TIMAX)+(i*2))*1000;
    setTimeout( moveFire, stime, i );      // 乱数時間後花火を打ち上げる
  }
}

// 一定時間毎に画像を動かす
function moveFire(n){
  getWindowSize();
  getScrollSize();
  winx = winx + scrlx;
  winy = DH;
  if( fy[n] > fh[n] ){                     // 花火輪表示位置より下の場合
    FOBJ[n].style.visibility = 'visible';  // 火柱を表示
    fy[n] -= 5;                            // 火柱を上へ移動
    FOBJ[n].style.left = fx[n] +'px';      // X座標に表示
    FOBJ[n].style.top  = fy[n] +'px';      // Y座標に表示
    setTimeout( moveFire, MSEC, n );       // 指定時間に呼び出し
  }
  else if( fy[n] <= fh[n] ){               // 花火輪表示位置になった場合
    FOBJ[n].style.visibility = 'hidden';   // 火柱を非表示
    var sx = fx[n] -IMGW[n]/2+5;           // 左端位置の設定
    var sy = fy[n] -IMGH[n]/2;             // 上端位置の設定
    HOBJ[n].style.visibility = 'visible';  // 花火輪を表示
    HOBJ[n].style.left = sx +'px';         // X座標に表示
    HOBJ[n].style.top  = sy +'px';         // Y座標に表示
    cnt[n] = cnt[n]+1;                     // カウント開始

    if( cnt[n]<FMAX[n] ){                  // 最大表示回数まで繰り返し
      var timer = setTimeout( moveFire, MSEC, n );
    }else{           // 最大表示回数に達したらスタート時の設定をし直す
      HOBJ[n].style.visibility = 'hidden';  // 花火輪を非表示
      fh[n] = Math.floor(80*Math.random()+(IMGH[n]/2+10));
      fx[n] = Math.floor( (winx/3)*Math.random()+(winx/3) );
      fy[n] = winy-BTM;
      cnt[n] = 0;
      clearTimeout(timer);
      stime = Math.floor(Math.random()*TIMAX)*1000;
      setTimeout( moveFire, stime, n );
    }
  }
}

// ウィンドウサイズの取得
const propType = (document.documentElement)?
  document.documentElement:document.body;
window.addEventListener('resize',getWindowSize,false);
function getWindowSize(){
  if( typeof window.innerWidth != 'number' ){
    winx = window.innerWidth-18;
    winy = window.innerHeight;
  }else{
    winx = propType.clientWidth;
    winy = propType.clientHeight;
  }
}
// スクロール量の取得
function getScrollSize(){
  if( window.pageXOffset || window.pageYOffset ){
    scrlx = window.pageXOffset;
    scrly = window.pageYOffset;
  }else{
    scrlx = propType.scrollLeft;
    scrly = propType.scrollTop;
  }
}


document.getElementById("London").onclick = function() {
	document.getElementById("London").src = "img/s2.png";
  };

// =============================carousel==================

const images = [
  'images/1お花見_200823.jpg',
  'images/2河口湖_200823.jpg',
  'images/3韓国_200823.jpg',
  'images/4エモフィラ_200823.jpg',
  'images/5高尾山×トリックアート_200823.jpg',
  'images/6青森旅行_200823.jpg',
  'images/6青森旅行_200823_0.jpg',
];

const comments = [
  "0desu",
  "1desu",
  "2desu",
  "3desu",
  "4desu",
  "5desu",
  "6desu",
]

let currentIndex = 0;

const mainImage = document.getElementById('carousel__main');
mainImage.src = images[currentIndex]; 
//console.log(mainImage.src);

// forEach for of
for( let [index, image] of images.entries()){
  //console.log(index, image);

  const img = document.createElement('img');
  img.src = image;

  // ここから独自
  const mainComment = document.getElementById('carousel__comment');
  const p1 = document.createElement('p');
  const comment = document.createTextNode("test");
  p1.appendChild(comment)
  mainComment.appendChild(p1)
  // ここまで

  const li = document.createElement('li');
  if (index === currentIndex) {
    li.classList.add('current');
  }

  li.addEventListener('click', () => {
    mainImage.src = image;
    mainImage.classList.add('active');

    setTimeout(() => {
      mainImage.classList.remove('active');
    }, 800); //ミリ秒 1000=1秒
    
    const thumbnails = document.querySelectorAll('.carousel__thumbnails > li');
    thumbnails[currentIndex].classList.remove('current');
    currentIndex = index;
    thumbnails[currentIndex].classList.add('current');
  });

  li.appendChild(img);
  document.querySelector('.carousel__thumbnails').appendChild(li);
}

const next = document.getElementById('carousel__next');
next.addEventListener('click', () => {
  let target = currentIndex + 1;
  if (target === images.length) {
    target = 0;
  }
  document.querySelectorAll('.carousel__thumbnails > li')[target].click();
});

const prev = document.getElementById('carousel__prev');
prev.addEventListener('click', () => {
  let target = currentIndex - 1;
  if (target < 0) {
    target = images.length - 1;
  }
  document.querySelectorAll('.carousel__thumbnails > li')[target].click();
});

