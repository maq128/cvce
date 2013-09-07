var app = {
	layoutCards: function() {
		var w = Math.floor( ( $('#card-box').width() - 10 * 3 ) / 4 ) - 2;
		$('#card-box .card').width( w );
		$('#card-box .card .letter').css( 'font-size', Math.floor(w*4/5) );
	},

	audioBtn: null,
	audioCard: null,

	onDeviceReady: function() {
		// �رջ�ӭ������ʾ������
		$('#splash').css( 'display', 'none' );
		$('#workarea').css( 'display', 'block' );

		// ��Ļ��תʱ���¼��㲼��
		$(window).on( 'resize', function( evt ) {
			app.layoutCards();
		});
		app.layoutCards();

		// ��ʼ����Ƶ�豸
		try {
			app.audioBtn = new Media( 'file:///android_asset/www/res/btn.mp3' );
			app.audioCard = new Media( 'file:///android_asset/www/res/card.mp3' );
		} catch ( e ) {
			console.log('error', e);
		}

		// ����Ƭ
		var genChar = function( dom, skipChar ) {
			var tmpl = dom.attr( 'data-char-tmpl' );
			if ( skipChar ) tmpl = tmpl.replace( skipChar, '' );
			var pos = Math.floor( Math.random() * tmpl.length );
			var newChar = tmpl.slice( pos, pos + 1 );
			return newChar;
		};
		var genWord = function() {
			var word = '';
			var bad = false;
			do {
				word = genChar( $('#card1') )
					 + genChar( $('#card2') )
					 + genChar( $('#card3') )
					 + genChar( $('#card4') );
				bad = false;
				if ( word.toLowerCase().substr( 0, 3 ) == 'fuk' ) bad = true;
				if ( word.toLowerCase().substr( 1 ) == 'age' ) bad = true;
				if ( word.toLowerCase().substr( 0, 2 ) == 'ru' && word.substr( 3 ) == 'e' ) bad = true;
				if ( word.toLowerCase() == 'gone' ) bad = true;
			} while ( bad );
			return word;
		};
		var changeCard = function( dom, newChar ) {
			$('.letter', dom).html( newChar );
		};

		// ��һ�鿨Ƭ
		$('#btnPlay').on( 'click', function( evt ) {
			if ( app.audioBtn ) app.audioBtn.play();

			var word = genWord();
			changeCard( $('#card1'), word.substr( 0, 1 ) );
			changeCard( $('#card2'), word.substr( 1, 1 ) );
			changeCard( $('#card3'), word.substr( 2, 1 ) );
			changeCard( $('#card4'), word.substr( 3, 1 ) );

			$('.hot-btn').removeClass( 'act' );
		});

		// ��һ����Ƭ
		$('.card').on( 'click', function( evt ) {
			if ( app.audioCard ) app.audioCard.play();

			var card = $(evt.currentTarget);
			var oldChar = $('.letter', card).text();
			var newChar = genChar( card, oldChar );
			changeCard( card, newChar );

			$('.hot-btn').removeClass( 'act' );
		});

		// ���ʱ������Ч��
		$('.hot-btn').on( 'vmousedown', function( evt ) {
			$(this).addClass( 'act' );
		});
		$('.hot-btn').on( 'vmouseout', function( evt ) {
			$(this).removeClass( 'act' );
		});
	},

	playAudio: function( src ) {
		// ��Ŀ���ļ�����Media����
		var my_media = new Media( src,
			function() {
				alert('onSuccess');
			},
			function() {
				alert('onError)');
			}
		);

		// ������Ƶ
		my_media.play();
	},

	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	}
};
