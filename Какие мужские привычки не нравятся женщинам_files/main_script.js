
// ��������� ����
function mobile_menu(TIP) {
	if(TIP==1) {
		if($('#mobile_menu_left').css('display')=='none') {
			$('#mobile_menu_left').show();
			$('#mobile_menu_t2_0 .t1').show();
			$('#mobile_menu_t2_0 .t2').hide();
			$('#mobile_menu_t2_1').hide();
			$('#mobile_menu_t2_0').show();
			$('#mobile_menu_bg').show();
		}
		else {
			$('#mobile_menu_left').hide();
			$('#mobile_menu_t2_0').hide();
			$('#mobile_menu_t2_1').show();
			$('#mobile_menu_bg').hide();
		}
		$('#mobile_menu_right2').hide();
	}
	else if(TIP==2) {
		if($('#mobile_menu_right2').css('display')=='none') {
			$('#mobile_menu_right2').show();
			$('#mobile_menu_t2_0 .t1').hide();
			$('#mobile_menu_t2_0 .t2').show();
			$('#mobile_menu_t2_1').hide();
			$('#mobile_menu_t2_0').show();
			$('#mobile_menu_bg').show();
		}
		else {
			$('#mobile_menu_right2').hide();
			$('#mobile_menu_t2_0').hide();
			$('#mobile_menu_t2_1').show();
			$('#mobile_menu_bg').hide();
		}
		$('#mobile_menu_right1').hide();
		$('#mobile_menu_left').hide();
	}
	else {
		$('#mobile_menu_right2').hide();
		$('#mobile_menu_left').hide();
		$('#mobile_menu_t2_0').hide();
		$('#mobile_menu_t2_1').show();
		$('#mobile_menu_bg').hide();
	}
}


// ������ ��� �������� ��������
$(document).ready(function() {
	city_bind();
	rkl_show_backend_bind();
});

// ������ �� �������  � ����� �����
function city_bind() {
	// ������
	$("#city_text").focus(function() {
		if($.browser.opera) {
			$("#city_text").keypress(function(event) { city_list(event.keyCode); });
		}
		else {
			$("#city_text").keyup(function(event) { city_list(event.keyCode); });
		}
		city_finde();
	});

	// �������� �������
	$("#city_text").focusout(function() {
		var listn=-1;
		$('#city_text').unbind('keypress');
		$('#city_text').unbind('keyup');

		setTimeout("$('#city_result').slideUp(800)", 800);
	});
}


// AJAX - ����� ����� ������ ������  � ����� �����
function city_top() {
	$('.city-select').css({ opacity: 0.5 });

	$.ajax({
		type: 'POST',
		url:  '/city_backend.php',
		cache: false,
		timeout: 7000,
		data: ({
			mod: 'top_change'
		}),
		dataType: 'json',
		success: function(jsondata){
			$('.city-select').css({ opacity: 1});
			$('#city_top').html(jsondata.body);
			city_bind();
			$('#city_text').focus();
		}
	});
}


// AJAX - ����� ������ � ����� �����
function city_finde() {
	var city_text = $('#city_text').val();

	$.ajax({
		type: 'POST',
		url:  '/city_backend.php',
		cache: false,
		timeout: 7000,
		data: ({
			mod:      'backend',
			city_text: city_text
		}),
		dataType: 'json',
		success: function(jsondata){
			$("#city_result").show();
			$("#city_result").html(jsondata.body);
			$("#city_top_id").val('0');

			$('#city_result div').unbind('click');
			$('#city_result div').bind('click', function() {
				var city = $(this).attr('city');
				var city_change_key = $('#city_change_key').val();
				$('#city_text').val($(this).html());
				location.href='/city_backend.php?action=city_change&city='+city+'&city_change_key='+city_change_key;
			});
		}
	});
}

// �������� ������ ������� � ����� �����
var listn=-1;
function city_list(keyCode) {
	if(keyCode==37|keyCode==38|keyCode==39|keyCode==40) {
		var maxn = $("#city_result div").length;
		if(maxn>0) {
			if(keyCode==38) listn--;
			if(keyCode==40 && listn<maxn-1) listn++;
			$('#city_result div').css("background-color","#fff");
			$('#city_result div').eq(listn).css("background-color","#eee");
			text = $('#city_result div').eq(listn).html();
			var city = $('#city_result div').eq(listn).attr('city');
			$('#city_text').val(text);
			$('#city_top_id').val(city);
		}
	}
	else if(keyCode==13) {
		$("#city_result").css("display", "none");
		$('#city_text').css("color","#080");
	}
	else {
		listn=-1;
		city_finde();
	}
}



/* ������ �������������� �������� */
function files_upload_preview() {
	var file_n = 0;
	$('#files_upload_preview').html('');

	var files = document.getElementById('files_upload').files;
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();
		var div = $('<div></div>');
		$('#files_upload_preview').append(div);

		// Only process image files.
		if (!f.type.match('image.*')) {
			continue;
		}

		reader.onload = function(e) {
			file_n++;
			if(file_n==6) alert('����� ��������� ������ 5 ������!');
			div.append("<img src='" + e.target.result + "'></img>");
		};

		reader.readAsDataURL(f);
	}
}

/* ����� */
function login_out() {
	var TEXT = '';
	TEXT += "<div style='font-size: 20px; margin: 0 0 15px 0;'>����� �� ������?</div>";
	TEXT += "<a href='/login.php?action=logout&skey="+uid_skey+"' class='submit_yellow' style='margin-right: 10px; padding: 5px 35px;'>��</a>";
	TEXT += "<span style='color: #777; border-bottom: 1px dotted #777; cursor: pointer;' onclick='popup_info_close(1)'>������</span>";
	TEXT += "<style>.ppp_info > div > div { width: 300px }</style>";
	popup_info(TEXT);
}


/* ������ ���� (���������) */
var MONILE_MENU_GROUP_NOW = 0;
function mobile_menu_gr(GROUP) {
	// �������� ������� ����
	if(GROUP==MONILE_MENU_GROUP_NOW) GROUP = 0;
	$('#mobile_menu_v4 .gr').removeClass('gr_on');

	// ������ � �����������
	if(GROUP==1) {
		$('#mobile_menu_v4 .gr_plus').hide();
		$('#mobile_menu_v4 .gr0').fadeIn();
		$('#mobile_menu_v4 .gr_plus1').slideDown();
		$('#mobile_menu_v4 .gr1').addClass('gr_on');
		MONILE_MENU_GROUP_NOW = 1;
	}

	// ���������� ����������
	else if(GROUP==2) {
		$('#mobile_menu_v4 .gr_plus').hide();
		$('#mobile_menu_v4 .gr0').fadeIn();
		$('#mobile_menu_v4 .gr_plus2').slideDown();
		$('#mobile_menu_v4 .gr2').addClass('gr_on');
		MONILE_MENU_GROUP_NOW = 2;
	}

	// ������ (�� ���������)
	else {
		$('#mobile_menu_v4 .gr0, #mobile_menu_v4 .gr_plus').hide(); //
		// $('#mobile_menu_v4 .gr_plus1, #mobile_menu_v4 .gr_plus2').slideUp();
		$('#mobile_menu_v4 .gr_plus0').slideDown();
		$('#mobile_menu_v4 .gr0').addClass('gr_on');
		MONILE_MENU_GROUP_NOW = 0;
	}
}



/* ���������������� ���� */
function profile_menu() {
	if(document.getElementById('profile_menu_a1').style.display=='none') {
		document.getElementById('profile_menu_a1').style.display='';
		$('#profile_menu_a2').slideDown();
		document.getElementById('profile_menu_b1').style.display='none';
		$('#profile_menu_b2').slideUp();
	}
	else {
		document.getElementById('profile_menu_a1').style.display='none';
		$('#profile_menu_a2').slideUp();
		document.getElementById('profile_menu_b1').style.display='';
		$('#profile_menu_b2').slideDown();
	}
}


/* �������� / ���������� ���� */
function HideShowDiv(ID1,ID2){
	if(ID1!='') $('#'+ID1).slideToggle('slow');
	if(ID2!='') $('#'+ID2).slideToggle('slow');
}
function HideShowSpan(ID1,ID2){
	if(ID1!='') {
	    if($('#'+ID1).is(':visible')) $('#'+ID1).hide();
	    else $('#'+ID1).css('display','inline');
	}
	if(ID2!='') {
	    if($('#'+ID2).is(':visible')) $('#'+ID2).hide();
	    else $('#'+ID2).css('display','inline');
	}
}


/* BB - ����������� ����� ������������ */
var quote_buf = "";
function quote_bufer() {
	quote_buf = "";
	if (window.getSelection)        quote_buf = window.getSelection().toString();
	else if (document.getSelection) quote_buf = document.getSelection();
	else if (document.selection)    quote_buf = document.selection.createRange().text;
}


/* BB CODE V2*/
function insert_bb(tag) {
	var element = document.getElementById('message');

	// ���������� ����
	if(tag!="b" && tag!="i" && tag!="u" && tag!="s" && tag!="img" && tag!="youtube" && tag!="spoiler" && tag!="quote" && tag!="hidden" && tag!="foto-1" && tag!="foto-2" && tag!="foto-3" && tag!="foto-4" && tag!="foto-5") {
		alert('����������� ��� ��������������');
		return;
	}

	// ����������� �������������� ���������
	var dop1 = "";
	var dop2 = "";
	if(tag=="img") {
		var tmp = prompt("������� ������ �� �����������");
		if(tmp==null || tmp=="") return;
		else dop2 = tmp;
	}
	else if(tag=="youtube") {
		var tmp = prompt("������� ������ �� �������� � �����. �������������� �������: YouTube, RuTube ��� Vimeo.");
		if(tmp==null || tmp=="") return;
		else dop2 = tmp;
	}
	else if(tag=="spoiler") {
		var tmp = prompt("������� ��������� ��� ������");
		if(tmp==null || tmp=="") return;
		else dop1 = '='+tmp;
	}
	else if(tag=="quote") {
		dop2 = quote_buf;
		//dop2 = '';
	}

	// ���� - ����������� � �����������
	start = '['+tag+dop1+']'+dop2;
	end   = '[/'+tag+']';
	if(tag=='foto-1'||tag=='foto-2'||tag=='foto-3'||tag=='foto-4'||tag=='foto-5') end = "";

	// ������� ������ � �����
	if(document.selection) {
		// IE
		element.focus();
		sel = document.selection.createRange();
		sel.text = start + sel.text + end;
	}
	else if(element.selectionStart || element.selectionStart == '0') {
		// ��������� - �� ������ �� ����� �� ��������
		var SEL_TEXT = '';
		if(tag=="quote") {
			var SEL_TEXT = '';
			if (window.getSelection && !window.opera) 	SEL_TEXT = window.getSelection(); // ff
			else if (document.getSelection) 			SEL_TEXT = document.getSelection(); // opera
			else if (document.selection) 				SEL_TEXT = document.selection.createRange().text; // ie
		}

		// ���������� ��������
		element.focus();
		var startPos = element.selectionStart;
		var endPos   = element.selectionEnd;

		// ���� � textarea �������� ����� � ��� ������� ������, �������� ����� (������� �������)
		if(tag=="quote" && startPos!=endPos) {
			start = '['+tag+dop1+']';
			console.log('Q11');
		}
		else if(tag=="quote" && SEL_TEXT!='') {
			//start = start + SEL_TEXT;
			console.log('Q22');
		}
		console.log('QQ_end');

		// ���������� ��������� ��� ������� �������� ��� �����
		if(tag=='youtube'||tag=='img') endPos = startPos;
		if(tag=='foto-1'||tag=='foto-2'||tag=='foto-3'||tag=='foto-4'||tag=='foto-5') endPos = startPos;

		element.value = element.value.substring(0, startPos) + start + element.value.substring(startPos, endPos) + end + element.value.substring(endPos, element.value.length);

		// �������� ������� ����� �������
		// ���� ��� �������� �������, ���������� ������ ������ ����
		if(startPos==endPos && tag!='youtube' && tag!='img') {
			var finishPos = endPos + start.length;
			element.setSelectionRange(finishPos,finishPos);
		}
	}
	else {
		// ������ ���������� ��������
		element.value += start + end;
	}
}


/* ������� ��������� */
function insert_bb_smile(e) {
	var element = document.getElementById('message');
	var tag = $(e).attr('title');
	tag = '['+tag+']';

	// ������� ������ � �����
	if(element.selectionStart || element.selectionStart == '0') {
		// ���������� ��������
		element.focus();
		var startPos = element.selectionStart;
		endPos = startPos;

		element.value = element.value.substring(0, startPos) + tag + element.value.substring(startPos, endPos) + element.value.substring(endPos, element.value.length);

		// �������� ������� ����� �������
		var finishPos = endPos + tag.length;
		element.setSelectionRange(finishPos,finishPos);
	}
	else {
		// ������ ���������� ��������
		element.value += tag;
	}
}


/* �������� / ���������� ���� */
function bb_spoiler(element){
	$(element).closest('div.spoiler').toggleClass('spoiler_on');
}
function bb_spoiler2(element){
	$(element).closest('div.class_spoiler').toggleClass('class_spoiler_on');
}


// ����� ������ (�������, �������� � �.�.)
function city_change_ajax(ACTION,MOD,CITY) {
	var city_text = $('#city_box_'+MOD+' .city_text_new').val();
	var UID = $('#profile_uid').val();
	$('#city_box_'+MOD+' .city_search_result').css({ opacity: 0.7});

	if(ACTION=='change_form') {
		$('#city_box_'+MOD).html("<span style='color: #999;'>��������...</span>");
	}

	$.ajax({
		type: 'GET',
		url: '/city_backend.php',
		data: ({
			'ajax'    : '1',
			action    : ACTION,
			mod       : MOD,
			city      : CITY,
			uid       : UID,
			city_text : city_text
		}),
		dataType: 'json',
		success: function(jsondata){
			if(ACTION=='change_form') {
				$('#city_box_'+MOD).html(jsondata.text);
				$('#city_box_'+MOD+' .city_text_new').keyup(function(event) { city_change_ajax('search',MOD,0); });
				$('#city_box_'+MOD+' .city_text_new').keydown(function(event) { if(event.keyCode==13){return false;} });
				$('#city_box_'+MOD+' .city_text_new').focus();
			}
			else if(ACTION=='search') {
				$('#city_box_'+MOD+' .city_search_result').show();
				$('#city_box_'+MOD+' .city_search_result').html(jsondata.text);
				$('#city_box_'+MOD+' .city_search_result').css({ opacity: 1});

				$('#city_box_'+MOD+' .city_search_form div.c').unbind('click');
				$('#city_box_'+MOD+' .city_search_form div.c').bind('click', function() {
					var CITY = $(this).attr('c');
					city_change_ajax('save',MOD,CITY);
				});
			}
			else if(ACTION=='save'||ACTION=='del') {
				$('#city_box_'+MOD).html(jsondata.text);
			}
			else {
				$('#city_box_'+MOD).html("<span style='color: #666;'>�������� ������ �� �������...</span>");
			}
		},
		error: function(xhr){
			$('#city_box_'+MOD).html("<span style='color: #966;'>������: " + xhr.status + " " + xhr.statusText + "<br>���������� � ����������� ��������� �����</span>");
		}
	});
}



// ����� ������ (�������, �������� � �.�.)
function city_finde_ajax(ACTION,MOD,CITY) {
	var UID = $('#profile_uid').val();
	$('.city_ajax_box').css({ opacity: 0.5});

	$.ajax({
		type: 'GET',
		url: '/city_backend_finde.php',
		cache: false,
		timeout: 7000,
		data: ({
			action : ACTION,
			mod    : MOD,
			skey   : uid_skey,
			city   : CITY,
			uid    : UID
		}),
		dataType: 'json',
		success: function(jsondata){
			if(jsondata.ok==1) {
				$('.city_ajax_box').html(jsondata.text);
				city_finde_bind();
				$('#city_finde').focus();
			}
			else {
				$('.city_ajax_box').html("<span style='color: #666;'>�������� ������ �� �������...</span>");
			}
			$('.city_ajax_box').css({ opacity: 1});
		},
		error: function(xhr){
			$('.city_ajax_box').html("<span style='color: #666;'>�������� ������ ������� �� ������� :-(<br><a href='/my_city.php?mod=profile'>��������� �������</a></span>");
			$('.city_ajax_box').css({ opacity: 1});
		}
	});
}




// ����� ������ (������ ������)
function city_finde_bind() {
	// ��������� �������
	var listn=-1;
	var MOD = $('#city_finde_mod').val();

	// ������ �������� ����� �� Enter
	$('#city_finde').on("keydown",function(e) {
		var code   = e.keyCode || e.which;
		if(code==13) { return false; }
	});

	// ����� ������
	$('#city_finde').on("keyup focus",function(e) { // change
		var length = this.value.length;
		var search = this.value;
		var code   = e.keyCode || e.which;
		var city_lim = 0;

		if(code==38|code==40) {
			// ������� ����� / ����
			var maxn = $("#city_finde_list div.i:visible").length;
			if(maxn>0) {
				if(code==38) listn--;
				if(code==40) listn++;
				if(listn<0)  listn=0;
				if(listn>maxn) listn=maxn;

				// ����� ����������
				$('#city_finde_list div.i').removeClass('activ');
				$('#city_finde_list div.i:visible').eq(listn).addClass('activ');

				// �������� ����������
				text = $('#city_finde_list div.i:visible').eq(listn).html();
				$('#city_finde').val(text);

				// ID ����������
				var city_id = $('#city_finde_list div.i:visible').eq(listn).attr('c');
				$('#city_finde_id').val(city_id);
			}
		}
		else if(code==13) {
			// Enter (��������� �����)
			var city_id = $('#city_finde_id').val();
			if(city_id>0) {
				city_finde_ajax('save',MOD,city_id);
			}
	    	e.cancelBubble = true;
			e.stopPropagation();
			return false;
		}
		else {
			// ����� �� ������
			listn=-1;
			$('#city_finde_id').val('0');
			$('#city_finde_list div').removeClass('activ');

			// ������ 2 ��������, ����
			if(length>2) {
				$('.city_finde .cancel').show();
				$('.city_finde_list').show();
				$('.city_finde_list .i').hide();

				var city_finde_show_n = 0;

				list:
				$('.city_finde_list div.i').each(function(i,elem) {
					// ������ 5 ���������
					if(city_finde_show_n<5) {
						var attr = $(this).html();
						if(attr.toLowerCase().indexOf(search.toLowerCase()) + 1) {
							$(this).show();
							city_finde_show_n++;
						}
					}
				});

				if(city_finde_show_n==0) {
					$('.city_finde_list div.b').hide();
					$('.city_finde_list div.x').show();
				}
				else {
					$('.city_finde_list div.b').show();
					$('.city_finde_list div.x').hide();
				}
			}
			// ������ ���������
			else {
				$('.city_finde_list').hide();
			}
		}
	});

	// ���� �� ����������
	$('#city_finde_list div.i').on("click",function(e) {
		var city_id = $(this).attr('c');
		city_finde_ajax('save',MOD,city_id);
	});


	// �������� �����
	$('.city_finde .cancel').on("click",function() {
		$('.city_finde').css("background-color","#fff");
		$('#city_finde').val('');
		$('.city_finde .cancel').hide();
		$('.city_finde_list .i').show();
	});
}





/* GO-TOP, ������������� �������� ���� */
var scroll_top = 0;
if($("div").is("#mobile_menu")) var scroll_mobile = 1;
else                            var scroll_mobile = 0;
$(document).ready(function(){
	$("#go_top, #go_top_m, #go_top_m2").click(function() {
		$("html, body").animate({scrollTop: 0}, "slow");
		return false;
	});

	$("#go_bottom, #go_bottom_m, #go_bottom_m2").click(function() {
		if(typeof index_next_process_n !== "undefined") index_next_process_n = 10; // ��������� ������������� �� �������
		$('html, body').animate({scrollTop:$(document).height()}, 'slow');
		return false;
	});

	if($(window).scrollTop() > "250") {
		$("#go_top, #go_top_m, #go_top_m2").fadeIn();
		$("#share41").fadeIn();
	}

    $(window).scroll(function() {
    	var scroll_top_new = $(window).scrollTop();
    	var scroll_top_old = scroll_top;
    	scroll_top = scroll_top_new;

		if(scroll_top_new < "250") {
			$("#go_top, #go_top_m, #go_top_m2").fadeOut();
			$("#share41").fadeOut();
		}
		else if(scroll_top_new > "500") {
			$("#go_top, #go_top_m, #go_top_m2").fadeIn();
			$("#share41").fadeIn();
			$("#share42").css({ opacity: 0.7});
		}
		else {
			$("#go_top, #go_top_m, #go_top_m2").fadeIn();
			$("#share41").fadeIn();
		}

		// ����� ���� - �������� ����
		if(scroll_top_new > scroll_top_old && scroll_top_new>5) {
			$('#mobile_menu_left, #mobile_menu_right2, #mobile_menu_bg').hide();

		}

		// ��������� ����
		/* if(scroll_mobile==1) {
			if(scroll_top_new<=100) {
				$('#mobile_menu').show();
			}
			else if(scroll_top_new == scroll_top_old) {}
			else if(scroll_top_new > scroll_top_old) {
				$('#mobile_menu').slideUp();
			}
			else {
				$('#mobile_menu').show();
			}
		} */
	});
});


/* �������� ���� V2 */
/*$(document).ready(function () {
    var offset = $('#fly-box-0').offset();
    $(window).scroll(function() {
		// ��������� ����
        if($(window).scrollTop() > offset.top) {
			if($(window).scrollTop()>1000) $('#fly-box').fadeIn(800);
			$("#fly-box").css({position: "fixed", top: 0, left: "50%", margin: "5px 0 0 265px" });
        }
        else {
        	$('#fly-box').css({position: "relative", top: 0, left: "8px", margin: 0 });
        }
    });

	// �������� �� ���� ����
    $('#fly-close').click(function() {
		$('#fly-box-0').fadeOut(300);
		var cookie_date = new Date ( );  // ������� ���� � �����
		cookie_date.setTime(cookie_date.getTime() + 60*60*24*3*1000);
		document.cookie = "fly-close=1; expires="+ cookie_date.toGMTString() +"; path=/";
    });
}); */

function fly_close(H) {
	var cookie_date = new Date ( );  // ������� ���� � �����
	cookie_date.setTime(cookie_date.getTime() + 60*60*H*1000);
	document.cookie = "fly-close=2; expires="+ cookie_date.toGMTString() +"; path=/";
}



// ����� ����������, �� �������, ��� ������ ���� �� ��������?

// ������ ����� � ������ ������
$(document).ready(function(){
	$('form.if_changed input, form.if_changed textarea, form.if_changed select').on('change', function(){
		if_changed_val = 1;
	});
	$('form input[type="submit"]').on('click', function(){
		if_changed_val = 0;
	});
});

// ��������� � ������������� ����������
var if_changed_val = 0;
$(window).on('beforeunload', function(){
	if(if_changed_val==1) return '�� �������, ��� ������ �������� �������� ��� ����������?';
	else return;
});



// ������� ���������� � �������� �������
function pay_info_close() {
	$('#pay_info_block').slideUp();
	$('.my_fi').removeClass('my_fi_on');

	$.ajax({
		type: "POST",
		url: "/main_backend.php?action=pay_info_close",
		cache: false,
		data: ({
			action : 'pay_info_close',
			skey   : uid_skey
		}),
		dataType: "json",
		success: function(jsondata){}
	});
}




// ���������� ���������� �������
function rk_ignor(ID) {
	$('#rklmn'+ID).fadeOut();

	$.ajax({
		type: 'GET',
		url: '/rekklama_backend.php',
		data: ({
			action : "ignor",
			skey   : uid_skey,
			id : ID
		}),
		dataType: 'json',
		success: function(jsondata){ }
	});
}

// ���������� ���������� ������� ��������
function rk_ignor_tre(ID) {
	$('#rklmn'+ID).fadeOut();

	$.ajax({
		type: 'GET',
		url: '/rekklama_backend.php',
		data: ({
			action : "ignor_tre",
			skey   : uid_skey,
			id : ID
		}),
		dataType: 'json',
		success: function(jsondata){ }
	});
}

// �������� �� ����������� / ������� �����������
function comment_otvet(FOR_UID,FIO) {
	$('#comments_for_uid').val(FOR_UID);
	//$('#message').append('[b]'+FIO+'[/b], ');
	var text = $('#message').val();
	$('#message').val(text + '[b]'+FIO+'[/b], ');

	// ���������� ����� ��� ������ (������, �������)
	$('#comments_form0').hide();
	$('#comments_form1').show();
	$('#comments_subscribe').show();

	$('#message').focus();
}
function comment_del_ajax(COM_N,ID,KEY) {
	$('#cn'+COM_N).css({ opacity: 0.8});
	$.ajax({
		type: 'POST',
		url:  '/my_comments.php?action=del_ajax',
		data: ({
			action : 'del_ajax',
			id     : ID,
			key    : KEY
		}),
		dataType: 'json',
		success: function(jsondata){
			if(jsondata.ok==1) {
				$('#cn'+COM_N).html(jsondata.text);
			}
		}
	});
}

// �������� �� ����������
function comments_subscribe(ACTION,TIP,ID) {
	$('#comments_subscribe').css({ opacity: 0.7});

	$.ajax({
		type: 'GET',
		url: '/my_comments.php',
		data: ({
			action: ACTION,
			tip:    TIP,
			skey:   uid_skey,
			id:     ID
		}),
		dataType: 'json',
		success: function(jsondata){
			if(jsondata.ok==1) {
				$('#comments_subscribe').html(jsondata.text);
				$('#comments_subscribe').css({ opacity: 1});
			}
		}
	});
}




/* ������� �� ����������� - ���������� ������ */
/*var podarok_now = 0;
$(document).ready(function() {
	var podarok_max = $("div.slide").length-1;
	// ����������
	$('#podarok_block_show .podarok_prev').bind('click', function() {
		var podarok_prev = podarok_now - 1;
		if(podarok_prev<0) podarok_prev = podarok_max;
		podarok_now = podarok_prev;
		$('#podarok_block_show .slide').fadeOut(300);
		$("#podarok_block_show .slide:eq("+podarok_prev+")").fadeIn(300);
	});
	// ���������
	$('#podarok_block_show .podarok_next').bind('click', function() {
		var podarok_next = podarok_now + 1;
		if(podarok_next>podarok_max) podarok_next = 0;
		podarok_now = podarok_next;
		$('#podarok_block_show .slide').fadeOut();
		$("#podarok_block_show .slide:eq("+podarok_next+")").fadeIn(1500);
	});
	// ��������
	$('#podarok_block_hide .podarok_show').bind('click', function() {
		$('#podarok_block_show').slideDown();
		$('#podarok_block_hide').slideUp();
	});
	// ������ 1
	$('#podarok_block_show .podarok_close').bind('click', function() {
		$('#podarok_block_show').slideUp();
		$('#podarok_block_hide').slideDown();
	});
	// ������ 2
	$('#podarok_block_show .podarok_hide').bind('click', function() {
		$('#podarok_block_show').slideUp();
		$('#podarok_block_hide').slideDown();
	});
	// ������������� ����� 30 ������
	var cookie = document.cookie;
	if(cookie.indexOf("podarok-close")===-1) setTimeout(podarok_auto, 25000);
	function podarok_auto() {
		$('#podarok_block_show').slideDown();
		$('#podarok_block_hide').slideUp();
		podarok_close();
	}
	// ���� - �� ��������� ���� ����
	function podarok_close() {
		var cookie_date = new Date ( );  // ������� ���� � �����
		cookie_date.setTime(cookie_date.getTime() + 60*60*24*2*1000);
		document.cookie = "podarok-close=1; expires="+ cookie_date.toGMTString() +"; path=/";
	}
});*/



// ������-�������� �����
function show_hide(ID1,ID2) {
	document.getElementById(ID1).style.display="";
	document.getElementById(ID2).style.display="none";
}



// AJAX �������
function book_rating(ID,SET) {
	if(SET!='zero0') $('#br'+ID).html("<img src='/img/process.gif' width=16 height=16>");

	$.ajax({
		type: "POST",
		url: "/books_backend.php",
		data: ({
			book_id: ID,
			book_set: SET,
			skey   : uid_skey,
			mod: "count_real"
		}),
		dataType: "json",
		success: function(jsondata){
			if(jsondata.ok==1) {
				$('#br'+ID).html(jsondata.text);
			}
		}
	});
}

// AJAX ��������
function book_bookmark(ID,tip) {
	if(tip=="users_art") {
		$('.avt_block_bkm_on').slideToggle();
		$('.avt_block_bkm_off').slideToggle();

		$('.art_subscribe_bttn').css({ opacity: 0.5});
		$('.art_subscribe_bttn').toggleClass('art_subscribe_bttn_on');
		$('.art_subscribe_bttn').toggleClass('art_subscribe_bttn_off');
	}

	$("#bkmrk"+ID).css({ opacity: 0.5});
	var nocache = new Date().getTime() + Math.random();

	$.ajax({
		type: "POST",
		cache: false,
		url: "/bookmark_backend.php",
		data: ({
			mid : ID,
			tip: tip,
			mod: "ajax",
			skey: uid_skey,
			nocache: nocache
		}),
		dataType: "json",
		success: function(jsondata){
			if(jsondata.ok==1) {
				$("#bkmrk"+ID).html(jsondata.text);
				$("#bkmrk"+ID).css({ opacity: 1});
				if(tip=="users_art") {
					if(jsondata.on==1) {
						$('.avt_block_bkm_on').slideUp();
						$('.avt_block_bkm_off').slideDown();

						$('.art_subscribe_bttn').html('�� ���������');
						$('.art_subscribe_bttn').removeClass('art_subscribe_bttn_off');
						$('.art_subscribe_bttn').addClass('art_subscribe_bttn_on');
						$('.art_subscribe_bttn').css({ opacity: 1});
						$('.art_avt_bottom').append("<div class=art_subscribe_success><b>�� ������� ��������� �� ����������� � ����� ����������� ������� ������!</b><br><a href='/help/article_subscribe/'>��������� ��� �����������</a></div>");
					}
					else {
						$('.avt_block_bkm_on').slideDown();
						$('.avt_block_bkm_off').slideUp();

						$('.art_subscribe_bttn').html('�����������');
						$('.art_subscribe_bttn').removeClass('art_subscribe_bttn_on');
						$('.art_subscribe_bttn').addClass('art_subscribe_bttn_off');
						$('.art_subscribe_bttn').css({ opacity: 1});
						$('.art_subscribe_success').remove();
					}
				}
			}
		}
	});
}

// AJAX �������� V2
function add_bookmark(ID,tip) {
	// $("#bkmrk"+ID).toggleClass("bookmark_on");
	if($("#bkmrk"+ID).hasClass("bookmark_on")) {
		$("#bkmrk"+ID).removeClass("bookmark_on");
		$("#bkmrk"+ID).html("�������� � ��������");
	}
	else {
		$("#bkmrk"+ID).addClass("bookmark_on");
		$("#bkmrk"+ID).html("� ���������");
	}

	$.ajax({
		type: "POST",
		cache: false,
		url: "/bookmark_backend.php",
		data: ({
			mid: ID,
			tip: tip,
			ver: "2",
			skey: uid_skey,
			mod: "ajax"
		}),
		dataType: "json",
		success: function(jsondata){
			if(jsondata.ok==1) {
				$("#bkmrk"+ID).html(jsondata.text);
				if(jsondata.on==1) $("#bkmrk"+ID).addClass("bookmark_on");
				else               $("#bkmrk"+ID).removeClass("bookmark_on");
			}
		}
	});
}

// AJAX �������� ��� ����
function book_bookmark_light(ID,tip) {
	$.ajax({
		//type: "POST",
		url: "/bookmark_backend.php",
		data: ({
			'mid' : ID,
			'tip': tip,
			skey: uid_skey,
			'mod': "light"
		}),
		dataType: "json",
		success: function(jsondata){
			if(jsondata.ok==1) {
				$("#bkmrk"+ID).html(jsondata.text);
				if(tip=="users_art") {
					if(jsondata.on==1) {
						$('.avt_block_bkm_on').slideUp();
						$('.avt_block_bkm_off').slideDown();
					}
					else {
						$('.avt_block_bkm_on').slideDown();
						$('.avt_block_bkm_off').slideUp();
					}
				}
			}
		}
	});
}

// AJAX ������� ��������
function book_bookmark_del(ID) {
	$.ajax({
		type: "POST",
		url: "/bookmark_backend.php",
		data: ({
			id  : ID,
			skey: uid_skey,
			mod : "del"
		}),
		dataType: "json",
		success: function(jsondata){
			$("#bkmrk"+ID).fadeOut(700);
		}
	});
}


// ������������� �����������
function profrek(ID) {}


// ��������
var graffiti_loaded = 0;

// ���������� ��������
function graffiti_drow() {
	// ��������� ������ � ��������
	if(graffiti_loaded==0) {
		graffiti_loaded = 1;

		var new_elem = document.createElement('script');
		new_elem.setAttribute('src','/js/drawingboard/dist/drawingboard.min.js');
		new_elem.setAttribute('type','text/javascript');
		$('head').append(new_elem);

		var new_elem = document.createElement('link');
		new_elem.setAttribute('href', '/js/drawingboard/dist/drawingboard.min.css');
		new_elem.setAttribute('rel', 'stylesheet');
		new_elem.setAttribute('type', 'text/css');
		$('head').append(new_elem);
	}

	// ����� ���� ���������
	if(screen.width <= '375') {
		popup_info("<b style='font-size: 17px;'>���������</b><div class=board id=graffiti-board style='height: 300px; margin: 10px 0; overflow: hidden;'></div><div style='overflow: hidden;'><span onclick='graffiti_save();' class=submit_yellow>����������</span><span onclick='popup_info_close();' style='margin-left: 20px; color: #666; border-bottom: 1px dotted #666; cursor: pointer;'>��������</span></div>");

		$('#ppp_info_text').css({width: 'auto'});
		$('.ppp_info > div > div').css({'border-width': '5px', 'padding':'10px'});

		var defaultBoard = new DrawingBoard.Board('graffiti-board', {
			color: '#003f7f',
			controls: [
				'Color',
				{ Size: { } },
				{ DrawingMode: {  } },
				'Navigation'
			],
			size: 3,
			webStorage: false,
			enlargeYourContainer: true
		});
	}
	else {
		popup_info("<h1>���������</h1><div class=board id=graffiti-board style='width: 600px; height: 400px; margin: 10px 0; overflow: hidden;'></div><div style='overflow: hidden;'><span onclick='graffiti_save();' class=submit_yellow>���������� � ���������</span><span onclick='popup_info_close();' style='margin-left: 20px; color: #666; border-bottom: 1px dotted #666; cursor: pointer;'>��������</span></div>");

		$('#ppp_info_text').css({width: 'auto'});

		var defaultBoard = new DrawingBoard.Board('graffiti-board', {
			color: '#003f7f',
			controls: [
				'Color',
				{ Size: {  } },
				{ DrawingMode: {  } },
				'Download',
				'Navigation'
			],
			size: 3,
			webStorage: false,
			enlargeYourContainer: true
		});
	}

	// ������ ��������� ���� ������ �����
	$('.ppp_info').unbind('click');
	$('.ppp_info').die('click');
}

// ��������� ��������
function graffiti_save() {
	var canvas = document.getElementsByClassName('drawing-board-canvas');
	var dataURL = canvas[0].toDataURL();

	$.ajax({
		type: 'POST',
		url: '/my_convas_save.php',
		data: {
			skey: uid_skey,
			imgBase64: dataURL
		},
		dataType: 'json',
		success: function(jsondata){
			$('#graffiti_preview').append(jsondata.graffity_img);
			$('#graffiti_preview').fadeIn();

			var text = $('#message').val();
			if(text=='') $('#message').val(jsondata.graffity_bb + '\n');
			else         $('#message').val(text + '\n' + jsondata.graffity_bb);

			popup_info_close();
		}
	});
}



// �������
function bloknot(ACTION,ID) {
	// �������� / ��������
	if(ACTION=="bloknot_show" || ACTION=="bloknot_show_small" || ACTION=="bloknot_add") {
		if(ACTION=="bloknot_add") var TEXT = $("#bloknot_"+ID+" .bloknot_text").val();
		else                      var TEXT = "";

		$.ajax({
			type: "POST",
			url: "/main_backend.php",
			cache: false,
			data: ({
				action : ACTION,
				text   : TEXT,
				skey   : uid_skey,
				id     : ID
			}),
			dataType: "json",
			success: function(jsondata){
				if(jsondata.ok==1) {
					$("#bloknot_"+ID).html(jsondata.text);
					$("#bloknot_"+ID).fadeIn();
					$("#bloknot_n_"+ID).html(jsondata.n);

					if(ACTION=="bloknot_show") {
						destination = $("#bloknot_"+ID).offset().top - 30;
						$("html").animate({ scrollTop: destination}, 900 );
						$("body:not(:animated)").animate({ scrollTop: destination }, 0);
					}
				}
			}
		});
	}

	// ������� ������
	if(ACTION=="bloknot_del") {
		$("#bloknot_post_"+ID).css({ opacity: 0.5});

		$.ajax({
			type: "POST",
			url: "/main_backend.php",
			cache: false,
			data: ({
				action : ACTION,
				skey   : uid_skey,
				id     : ID
			}),
			dataType: "json",
			success: function(jsondata){
				if(jsondata.ok==1) {
					$("#bloknot_post_"+ID).fadeOut();
					$("#bloknot_n_"+jsondata.for_id).html(jsondata.n);
				}
			}
		});
	}


	// �������� �������
	if(ACTION=="bloknot_close") {
		$("#bloknot_"+ID).slideUp();
	}
}



// ���������������� �����������
function video_hello(ID) {
	$.ajax({
		type: "POST",
		url: "/main_backend.php?action=video_hello",
		cache: false,
		data: ({
			action : 'video_hello',
			id     : ID
		}),
		dataType: "json",
		success: function(jsondata){
			if(jsondata.ok==1) {
				popup_info(jsondata.text);
			}
		}
	});
}


// ������ ������������
function coterapevt_ppp(ID) {
	$.ajax({
		type: "POST",
		url: "/main_backend.php?action=coterapevt_ppp",
		cache: false,
		data: ({
			action : 'coterapevt_ppp',
			id     : ID
		}),
		dataType: "json",
		success: function(jsondata){
			if(jsondata.ok==1) {
				popup_info(jsondata.text);
			}
		}
	});
}




// ����� - ��� ������ ������� (������ �����)
function popup_like(LIKE_ID) {

	// ��������� ����
	$.ajax({
		dataType: 'json',
		url: '/like_backend.php?action=popup&like_id='+LIKE_ID,
		success: function(jsondata){
			// $('#ppp_like div.border').html(jsondata.text);

			popup_info(jsondata.text);
		}
	});
}



// ����� - ��� ������ ������� (������ �����)
function popup_login(TIP) {

	// ������ ����������, ��, ���� ������� ����
	if(TIP=='like')          $('#ppp_like div.border').html("<div style='line-height: 200%; text-align: center; color: #666;'>����� ������������� ������ ������, ����������,<br><a href='/login.php'><b>�������</b></a> ��� <a href='/register.php'><b>�����������������</b></a></div>");
	else if(TIP=='bookmark') $('#ppp_like div.border').html("<div style='line-height: 200%; text-align: center; color: #666;'>��� ������������� ������ �������<br><a href='/login.php'><b>������� �� ����</b></a> ��� <a href='/register.php'><b>�����������������</b></a></div>");
	else                     $('#ppp_like div.border').html("<div style='line-height: 200%; text-align: center; color: #666;'>��� ������������� ������ �������<br><a href='/login.php'><b>������� �� ����</b></a> ��� <a href='/register.php'><b>�����������������</b></a></div>");
	$('#ppp_like').fadeIn();

	//��������� ���� ���� �� ������ ��������
	//��������� �� 10px � ������ � ������
	var popuptopmargin = ($('#ppp_like').height() + 10) / 2;
	var popupleftmargin = ($('#ppp_like').width() + 10) / 2;

	//��������� jQuery ������� .css - ����������� ��������� ���� �� ������
	$('#ppp_like').css({
		'margin-top' : -popuptopmargin,
		'margin-left' : -popupleftmargin
	});

	//������� div #fade ���� ���� body
	//�� ��� �������� ��� ����� � css
	$('body').append('<div id="fade"></div>');
	$('#fade').css({'filter' : 'alpha(opacity=50)'}).fadeIn();
}



// ���� � ������� ����� ========================================================
function popup_box(TIP) {
	var TEXT;
	if(TIP=='like')          TEXT = "<div style='line-height: 150%; color: #000; font-size: 18px;'>������������� ������ ������ ����� ���� ������������������ ������������.</div>";
	else if(TIP=='bookmark') TEXT = "<div style='line-height: 150%; color: #000; font-size: 17px;'>�����������������, ����� �� �������� ������������� ������ � �� ���������� ����� ���������� ������������� �������.</div>";
	else if(TIP=='podpiska') TEXT = "<div style='line-height: 150%; color: #000; font-size: 18px;'>����� ����������� �� ����� ���������� ������, ������������� �� b17.ru</div>";
	else if(TIP=='like_art') TEXT = "<div style='line-height: 150%; color: #000; font-size: 17px;'>�����������������, ����� ������������� ��������� �� ������.<div style='margin-top: 10px;'>���� ������������� ������ �� ������� ����������� � ���������� ��� ������ ������.</div></div>";
	else if(TIP=='otzyv')    TEXT = "<div style='color: #000; font-size: 20px;'>����� �����</div><div style='margin-top: 10px; line-height: 150%; color: #222; font-size: 15px;'>��� ���������� ������ ���������� ����� � ������ ��� ������������������ �� �����. ����������� �������������� ������� �� ��� Email � ���������� SMS (����� �� ����� �� ��������� � ������ �� ����������).</div>";
	else if(TIP=='kurs')     TEXT = "<div style='color: #000; font-size: 20px;'>�������� �� ����</div><div style='margin-top: 10px; line-height: 150%; color: #222; font-size: 15px;'>��� ������ �� ����, ���������� ������������������ �� ����� �� Email, �� ������� �� ������, ����� ��������� ������ ������� ��������-�����.</div>";
	else                     TEXT = "<div style='line-height: 150%; color: #000; font-size: 18px;'>������ ������� �������� ������ ������������������ �������������.</div>";

	/* TEXT += "<div style='border-top: 1px solid #ccc; margin-top: 20px; padding-top: 20px; font-size: 16px; color: #999;'>";
		TEXT += "<div style='margin-bottom: 15px; color: #111;'>����� ����� <a href='/login_vk.php?auto=1&utm=like_vk'>���������</a> ��� <a href='/login_fb.php?auto=1&utm=like_fb'>Facebook</a></div>";
		TEXT += "<div style='opacity: 0.9;'><a href='/login.php?utm=like'>����</a> / <a href='/register.php?utm=like'>�����������</a></div>";
	TEXT += "</div>"; */



	TEXT += "<div style='border-top: 1px solid #ccc; margin-top: 20px; padding-top: 20px; font-size: 16px; color: #999;'>";
		if(TIP=='otzyv') {
			var tmp_partner = $('#masters_id').val();
			if(tmp_partner === undefined) tmp_partner = '';

			var tmp_go = $('#masters_id_go').val();
			if(tmp_go === undefined) tmp_go = '';

			TEXT += "<a href='/register.php?tip=1&fast=1&utm=otzyv&partner="+tmp_partner+"&go="+tmp_go+"' class=submit_yellow style='margin-right: 20px;'>������� �����������</a>";
		}
		else if(TIP=='kurs') {
			var tmp_go = $('#url_go').val();
			if(tmp_go === undefined) tmp_go = '';

			TEXT += "<a href='/register.php?tip=1&fast=1&utm=otzyv&go="+tmp_go+"' class=submit_yellow style='margin-right: 20px;'>������� �����������</a>";
		}
		else {
			TEXT += "<a href='/register.php?utm=like' class=submit_yellow style='margin-right: 20px;'>������� �����������</a>";
		}
		TEXT += "<div style='margin-top: 10px; display: inline-block;'><span style='color: #666; border-bottom: 1px dotted #666; cursor: pointer; font-size: 15px;' onclick=\"popup_info_close();\">� ������ ���</span></div>";
	TEXT += "</div>";

	popup_info(TEXT);
}






// ����������� ���� ============================================================
function popup_info(TEXT) {
	if($("div").is(".ppp_info_text")) {
		$(".ppp_info .ppp_info_text").html(TEXT);
		$('.ppp_info').fadeIn();
	}
	else {
		$("div.ppp_info").remove();
		$("#body_padding").prepend("<div class='ppp_info' style='display: none;'><div><div class=ppp_info_text id='ppp_info_text'>"+TEXT+"</div></div></div>");
		$('.ppp_info').fadeIn();
	}

	// ��������� ���� ������ �����
	$('.ppp_info_text').on('click',function(e) {
    	e.cancelBubble = true;
		e.stopPropagation();
	});

	// ������ ��������� ���� ������ �����
	$('.ppp_info').on('click',function() {
		$('.ppp_info').fadeOut();
		$('#ppp_info_text iframe').remove();
		return false;
	});

	// ������ ��������� ���� ������ �����
	$('.ppp_info').live('click',function() {
		$('.ppp_info').remove();
	});
}

function popup_info_close(X) {
	if(X==1) {
		$("div.ppp_info").remove();
	}
	else {
		$('.ppp_info').fadeOut();
		$('#ppp_info_text iframe').remove();
	}
}



// ������.������� AJAX
function yandex_metrika_ajax(ACTION,URL,URL_KEY,PERIOD,LIMIT) {
	popup_info("<img src='/img/soun_rec_progress.gif' class=ico16>�������� ���������� �� ������� ���-���������...<br>��� ����� ������ ����� 1 ������ �������.<br><br>� ���������, � ��������� ����� ����� ����������� ������� � ������ ������-������� � ������������� ������������� �������� ����������.");

	$.ajax({
		type: 'POST',
		url: '/yandex_api.php',
		cache: true,
		data: ({
			action  : ACTION,
			url     : URL,
			url_key : URL_KEY,
			period  : PERIOD,
			limit   : LIMIT,
		}),
		dataType: 'json',
		success: function(jsondata){
			if(jsondata.ok==1) {
				$('.ppp_info .ppp_info_text').html(jsondata.text);
			}
		}
	});
}





// AJAX ������� ������� � ������� � �������� - V2
$(document).ready(function () {
	var like_show = 0;
	var like_refresh = 0;
	var like_off = 0;

	// ���� �� ����
	if(self.uid_id) {
		/*$('.like').live('tap', function(e) {
			$(this).trigger('mouseover');
	    	event.cancelBubble = true;
			event.stopPropagation();
		});*/


	    $('.like').click(function(event) {
			// ����� ������
			if(like_off==0) {
		    	like_off = 1;
		    	setTimeout(function(){ like_off = 0; },500);

				// id �����
				var LIKE_ID  = $(this).attr('id');
				// ����� ���������
				var LIKE_UID = $(this).attr('usr');
				if(!self.LIKE_UID) var LIKE_UID = 0;
				// id ����������
				if(!self.uid_id) uid_id = 0;


				// ��������
				// ���� �� �� ������ ���������
				if((LIKE_UID!=uid_id)&&(uid_id!=0)) {
					// ������� ����� �����
					var LIKE_ID_TEXT = $('#'+LIKE_ID+" .text").html();
					// ������� ����� ������
					var LIKE_ID_N    = $('#'+LIKE_ID+" .n").html();
					if(!LIKE_ID_N) var LIKE_ID_N = 0;
					LIKE_ID_N = Number(LIKE_ID_N);

					// ������� ���������
					if(LIKE_ID_TEXT=="������� �������") {
						// �������� ����
						$('#'+LIKE_ID+" .text").html('�������!');
						$('#'+LIKE_ID+" .text").addClass('text_on');
						// + �������
						LIKE_ID_N++;
						if(LIKE_ID_N>1&&LIKE_ID_N<5) $('#'+LIKE_ID+" .nn").html(LIKE_ID_N+' ��������');
						else $('#'+LIKE_ID+" .nn").html(LIKE_ID_N+' �������');
						// + ����
						if(uid_foto>0) $('#'+LIKE_ID+" .like_n_text").after("<a class=like_foto_40 href='#' usr='"+uid_id+"' style='display: none;'><img src='/users/micro_user_"+uid_id+".jpg'></a>");
						else           $('#'+LIKE_ID+" .like_n_text").after("<a class=like_foto_40 href='#' usr='"+uid_id+"' style='display: none;'><img src='/img/micro.gif'></a>");
						$('#'+LIKE_ID+" [usr="+uid_id+"]").fadeIn();
						$('#'+LIKE_ID+" .like_foto_40").eq(7).remove();
						// + ������
						$('#'+LIKE_ID+" .like_extra").fadeIn('slow');
					}
					else {
						// ������ ����
						$('#'+LIKE_ID+" .text").html('������� �������');
						$('#'+LIKE_ID+" .text").removeClass('text_on');
						// - �������
						LIKE_ID_N--;
						if(LIKE_ID_N>1&&LIKE_ID_N<5) $('#'+LIKE_ID+" .nn").html(LIKE_ID_N+' ��������');
						else $('#'+LIKE_ID+" .nn").html(LIKE_ID_N+' �������');
						// - ����
						$('#'+LIKE_ID+" [usr="+uid_id+"]").remove();
						if(LIKE_ID_N>7) $('#'+LIKE_ID+" .like_foto_40:eq(5)").after("<a class=like_foto_40 href='#' usr=''><img src='/img/micro.gif'></a>");
						// - ������
						$('#'+LIKE_ID+" .like_extra").fadeOut('slow');
					}
					// ������ ����� ������
					$('#'+LIKE_ID+" .n").remove();
					if(LIKE_ID_N>0) $('#'+LIKE_ID+" .text").after("<span class=n>"+LIKE_ID_N+"</span>");
					if(LIKE_ID_N<1) $('#'+LIKE_ID+" .like_1").html('');
				}


				// ���������� �����
				$.ajax({
					dataType: 'json',
					url: '/like_backend.php?action=click&like_id='+LIKE_ID,
					success: function(jsondata){
						var MOD    = jsondata.mod;
						var like_n = jsondata.like_n;
						$('#'+LIKE_ID+" .text").html(jsondata.like_text);

						$('#'+LIKE_ID+" .n").remove();
						if(like_n>0) $('#'+LIKE_ID+" .text").after("<span class=n>"+jsondata.like_n+"</span>");

						// ��������� ���� �����
						like_refresh = 1;
						$('#'+LIKE_ID).trigger('mouseenter');

						if(jsondata.share==1) {
							$('#share_mini').addClass('share_mini2_animate');
							$('#share_mini').fadeIn('slow');

						}
					}
				});
			}
	    });

		// �������� ���� �� ��������� �����
	    $('.like .like_1').click(function(event) {
	    	event.cancelBubble = true;
			event.stopPropagation();
	    });
	}

    // ��������
    $('.like').mouseenter(function() {
		var LIKE_ID = $(this).attr('id');
		like_show = 1;

		// ���� ��� ����������?
		if($("#"+LIKE_ID+" .n").length > 0) {

			// ���� ����� ��� ����������
			if(($("#"+LIKE_ID+" .like_3").length > 0) && (like_refresh==0)) {
				$("#"+LIKE_ID+' .like_1').fadeIn('fast');
			}
			// AJAX ������ ������ ������
			else {
				var LIKE_ID = $(this).attr('id');
				$.ajax({
					dataType: 'json',
					url: '/like_backend.php?action=show&like_id='+LIKE_ID,
					success: function(jsondata){
						// var LIKE_ID = jsondata.like_id;
						var OK = jsondata.ok;
						var MOD = jsondata.mod;
						$('#'+LIKE_ID+' .like_1').html(jsondata.text);
						if(OK==1&&like_show==1) {
							$('#'+LIKE_ID+' .like_1').fadeIn('fast');
						}
						like_refresh = 0;
					}
				});
			}
		}
    });

	// �������� �������� (��������� �� �����)
	$('.like_1').mouseenter(function() { like_show = 1; });

	// ������ (� ���������)
	$('.like').mouseleave(function() {
		like_show = 0;
		setTimeout(function() {
			if(like_show==0) $('div.like_1').fadeOut('');
		}, 200);
	});

	// ������ ��������� ���� ������ �����
	$('#fade').live('click',function() {
		//���������� ��� id ���� ��������� ����
		$('#fade, .popupbox').fadeOut();
		return false;
	});
});



// AJAX ������� ������� � ������� � �������� - V3
$(document).ready(function () { like_bind(); });
function like_bind() {
	var like_show = 0;
	var like_refresh = 0;
	var like_off = 0;

	$('.like_activ .like_main').unbind('click');

	// ���� �� ����
	$('.like_activ .like_main').on("click",function(event) {
		// ����� ������
		if(like_off==0) {
	    	like_off = 1;
	    	setTimeout(function(){ like_off = 0; },500);

			// id �����
			var LIKE_ID  = $(this).closest('.like_new').attr('id');

			// ��������
			// ������� ����� ������
			var LIKE_ID_N = $('#'+LIKE_ID+" .like_main .n").html();
			if(!LIKE_ID_N) var LIKE_ID_N = 0;
			LIKE_ID_N = Number(LIKE_ID_N);

			// ������� ���������
			if($('#'+LIKE_ID).hasClass("like_on")) {
				// ������ ����
				$('#'+LIKE_ID).removeClass('like_on');
				$('#'+LIKE_ID+" .like_main .t span").html('������� �������');
				// - �������
				LIKE_ID_N--;
				// - ����
				$('#'+LIKE_ID+" [usr="+uid_id+"]").remove();
				// - ������
				$('#'+LIKE_ID+" .like_ppp .like_extra").hide();
			}
			else {
				// �������� ����
				$('#'+LIKE_ID).addClass('like_on');
				$('#'+LIKE_ID+" .like_main .t span").html('�������!');
				// + �������
				LIKE_ID_N++;
				// + ����
				if(uid_foto>0) $('#'+LIKE_ID+" .like_ppp .f").prepend("<a class=like_foto_40 href='#' usr='"+uid_id+"' style='display: none;'><img src='/users/micro_user_"+uid_id+".jpg'></a>");
				else           $('#'+LIKE_ID+" .like_ppp .f").prepend("<a class=like_foto_40 href='#' usr='"+uid_id+"' style='display: none;'><img src='/img/micro.gif'></a>");
				$('#'+LIKE_ID+" [usr="+uid_id+"]").fadeIn();
				// + ������
				$('#'+LIKE_ID+" .like_ppp .like_extra").fadeIn('slow');
			}
			// ������ ����� ������
			if(LIKE_ID_N>1&&LIKE_ID_N<5) $('#'+LIKE_ID+" .nn").html(LIKE_ID_N+' ��������');
			else $('#'+LIKE_ID+" .nn").html(LIKE_ID_N+' �������');

			$('#'+LIKE_ID+" .like_main .n").remove();
			if(LIKE_ID_N>0) $('#'+LIKE_ID+" .like_main .t").after("<span class=n>"+LIKE_ID_N+"</span>");
			if(LIKE_ID_N<1) $('#'+LIKE_ID+" .like_ppp").remove();

			if($("#"+LIKE_ID+" .ppp").length > 0) {}
			else if(LIKE_ID_N>0) $("#"+LIKE_ID).prepend("<div class=like_ppp><div class=ppp><span style='opacity: 0.5;'>�������� ����������...</span></div></div>");


			// ���������� �����
			$.ajax({
				dataType: 'json',
				url: '/like_backend.php?action=click&like_id='+LIKE_ID+'&skey='+uid_skey,
				cache: false,
				success: function(jsondata){
					// ����� �������
					var like_n = jsondata.like_n;
					if(like_n>0) $('#'+LIKE_ID+" .like_main .n").html(jsondata.like_n);
					else         $('#'+LIKE_ID+" .like_main .n").remove();

					// ����������� ����������� ���� � ����
					like_refresh = 1;
					if(like_n>0) $('#'+LIKE_ID).trigger('mouseenter');
					else         $("#"+LIKE_ID+" .ppp").remove();

					// ����������
					if(jsondata.share==1) {
						$('#share_mini').addClass('share_mini2_animate');
						$('#share_mini').fadeIn('slow');
					}
				}
			});
		}
    });

	// ��������
	$('.like_new').on("mouseenter",function(event) {
		var LIKE_ID = $(this).attr('id');
		like_show = 1;

		// ���� ��� ����������?
		if($("#"+LIKE_ID+" .like_main .n").length > 0) {

			// ���� ������
			if(($("#"+LIKE_ID+" .like_ppp_preview").length > 0)) {
				like_refresh = 1;

				// ���������� ��������
				$("#"+LIKE_ID+" .like_ppp_preview img.src_defer").each( function(){ var new_src = this.getAttribute('src_defer'); $(this).attr('src',new_src); });
			}

			// ���� ����� ��� ����������
			if(($("#"+LIKE_ID+" .ppp").length > 0) && (like_refresh==0)) {
				$("#"+LIKE_ID+' .like_ppp').show();
			}
			// AJAX ������ ������ ������
			else {
				// $('#'+LIKE_ID+" .like_ppp").remove();

				if($("#"+LIKE_ID+" .ppp").length > 0) {}
				else $("#"+LIKE_ID).prepend("<div class=like_ppp style='display: none;'><div class=ppp><span style='opacity: 0.5;'>�������� ����������...</span></div></div>");
				$('#'+LIKE_ID+' .like_ppp').fadeIn();

				$.ajax({
					dataType: 'json',
					url: '/like_backend.php?action=show&like_id='+LIKE_ID,
					cache: false,
					success: function(jsondata){
						// var LIKE_ID = jsondata.like_id;
						var OK  = jsondata.ok;
						var MOD = jsondata.mod;

						if(jsondata.like_n>0) $('#'+LIKE_ID+' .ppp').html(jsondata.text);
						else                  $('#'+LIKE_ID+' .ppp').remove();
						$("#"+LIKE_ID+' .like_ppp').removeClass('like_ppp_preview');

						like_refresh = 0;
						//$('#'+LIKE_ID+' .like_ppp').hide();
						//$('#'+LIKE_ID+' .like_ppp').show();  // !!!
					}
				});
			}
		}
    });

	// ������
	$('.like_new').on("mouseleave",function(event) {
		var LIKE_ID = $(this).attr('id');
		$('#'+LIKE_ID+' .like_ppp').fadeOut();
    });
}




// �������� �������� (����������� � ��������)
function show_kontakt(MOD,ID) {
	// $('#kontakt_'+ID).html("<img class=ico16 src='/img/process.gif'>");
	// $('#kontakt_'+ID).css({ opacity: 0.5});
	$.ajax({
		dataType: 'json',
		url: '/telefon_backend.php?mod='+MOD+'&id='+ID,
		success: function(jsondata){
			if(MOD=='spec_id') {
				$('.tmp_contact2').remove();
				$('#table_kontakt').prepend(jsondata.kontakt2);
				$('#table_kontakt_tel').hide();
			}

			if(MOD=='tre_id' || MOD=='center_id' || MOD=='job_id') {
				$('#kontakt_shw').html(jsondata.kontakt);
				$('#kontakt_btn').hide();
				$('#kontakt_shw').fadeIn();
			}

			var CLEAR_ID = ID.replace(/_[0-9a-z]{1,9}$/gi,"");

			$('#kontakt_'+ID).html(jsondata.kontakt);
			$('#kontakt_'+ID).fadeIn();
			$('#kontakt_'+CLEAR_ID).html(jsondata.kontakt);
			$('#kontakt_'+CLEAR_ID).fadeIn();
			// $('#kontakt_'+ID).css({ opacity: 1});
		}
	});
	if(MOD!='spec_list' && MOD!='tre_list' && MOD!='tre_id') location.hash = "contact";
}






// �������� ���� ������
function show_finde() {
	$('#finde').slideToggle('slow');
	$('#search-field').focus();
}


// �������� ���� ������ - � �����
function title_search(ON) {
	if(ON==1) {
		$('#main_menu').hide();
		$('#wrapper-title').slideUp();
		$('#title_search').slideDown();
		$('#title_search input.words').focus();
	}
	else {
		$('#main_menu').slideDown();
		$('#wrapper-title').slideDown();
		$('#title_search').slideUp();
	}
}


/* ���� ������ � ���������� ����������? */
function isMobile(){
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/* ������ �������� ���������� ���� ����� �������� �������� */
$(document).ready(function () {
	if(!isMobile()) {
		$('#nav li').bind("mouseenter", function(){
			$('#nav ul').hide();
			$('#nav ul').show();
			$('#nav li').unbind('mouseenter');
		});
		$('#nav ul').hide();
	}

	/* ������ �������� - ����� �� */
	$('#nav_my').on("mouseenter",function() {
		$('#nav_my a.my_ls i').css('animation','none');
		$('#nav_my a.my_ls i').css('-webkit-animation','none');
	});
});




// ����������� �� ������
$(document).ready(function() {
	$("div.quote a, a.y_scroll").unbind('click');
	$("div.quote a, a.y_scroll").click(function () {
		elementHref = $(this).attr("href");
		if($("div").is(elementHref)) {
			destination = $(elementHref).offset().top - 30;
			$("html").animate({ scrollTop: destination}, 900 );
			$("body:not(:animated)").animate({ scrollTop: destination }, 0);
		}
		//return false;
	});
});


// ����� - �������� ���������
function vote_backend(vote_id,vote_mod) {
	$("#vote_"+vote_id).css({ opacity: 0.5});

	if(vote_mod=="vote_ajax_post") var vote_param = $("#vote_"+vote_id+" input").serialize();
	else var vote_param = "";

	var vote_skey = $('#vote_skey_'+vote_id).val();

	// AJAX
	$.ajax({
		type: 'POST',
		url:  '/vote_backend.php',
		cache: false,
		timeout: 7000,
		data: ({
			'vote_mod':   vote_mod,
			'vote_id':    vote_id,
			'vote_param': vote_param,
			'skey'      : vote_skey
		}),
		dataType: 'json',
		success: function(jsondata){
			$("#vote_"+vote_id).html(jsondata.body);
			$("#vote_"+vote_id).css({opacity: 1});
		}
	});

	return false;
}



$(document).ready(function() {
	//������� ��� ��������� ������� click �� ������ � ������� popup
	$('a.popup').click(function() {

		//������� ������� rel ������� ������ � ����������
		var popupid = $(this).attr('rel');

		//������ ����������, ��, ���� ������� ����, ������� ����� ������� rel, ���������� � ���������� popupid
		$('#' + popupid).fadeIn();

		//������� div #fade ���� ���� body
		//�� ��� �������� ��� ����� � css
		$('body').append('<div id="fade"></div>');
		$('#fade').css({'filter' : 'alpha(opacity=50)'}).fadeIn();

		//��������� ���� ���� �� ������ ��������
		//��������� �� 10px � ������ � ������
		var popuptopmargin = ($('#' + popupid).height() + 10) / 2;
		var popupleftmargin = ($('#' + popupid).width() + 10) / 2;

		//��������� jQuery ������� .css - ����������� ��������� ���� �� ������
		$('#' + popupid).css({
			'margin-top' : -popuptopmargin,
			'margin-left' : -popupleftmargin
		});
	});

	//���������� ��� ���� �������, ������� ������������ ��� ������� ������ ���������� ����
	$('#fade').live('click',function() {
		//���������� ��� id ���� ��������� ����
		$('#fade, .popupbox').fadeOut();
		return false;
	});
});


// ����������� ���������
$(document).ready(function() {
	$("[data-tooltip]").focus(function (eventObject) {
	    $data_tooltip = $(this).attr("data-tooltip");
	    $("#tooltip").text($data_tooltip)
	        .css({
	            "top" : $(this).offset().top + $(this).height() + 5,
	            "left" : $(this).offset().left
	        })
	        .fadeIn('fast');

	}).focusout(function () {
	    $("#tooltip").hide().text("")
	        .css({
	            "top" : 10,
	            "left" : 0
	        });
	});
});


// ����������� ����� ������ ��� TEXTAREA
$(document).ready(function() {
	// ��������� �������
	$('.maxlength').on("change keypress focus",function() {
		var length     = this.value.length;
		var maxlength  = $(this).attr('maxlength');
		var limit_n  = 0;

		// ����� ������ ����������
		if(length>maxlength) {
			limit_n = length-maxlength;
			// ������� �������������� ��� textarea
			if(!$("div").is(".textarea_maxlength_info")) {
				$(this).css("background-color","#ffe4e4");
				$(this).after("<div class=textarea_maxlength_info>��������� ���������� ����� ������, ���������� ��������� ���!</div>");
			}
			// ���������� �� N ��������
			$('.textarea_maxlength_info').html("��������� ���������� ����� ������, ���������� ��������� ���! ("+limit_n+")");
		}
		// �������� ��������������
		else {
			$(this).css("background-color","#fff");
			$('.textarea_maxlength_info').remove();
		}
	});
});



/* ������ �� ��������� */
function comments_share_link(ID,URL) {
	$("div.comments[com_id='"+ID+"'] .comment_link_copy").remove();
	$("div.comments[com_id='"+ID+"'] div.text").prepend("<div class=comment_link_copy style='display: none;'>������ ������ �� ��� ���������:<div><div onclick='comment_link_copy(this);'>����������</div><input type=text value='http://www.b17.ru"+URL+"'></div></div>");
	$("div.comments[com_id='"+ID+"'] .comment_link_copy").fadeIn('slow');
}
function comment_link_copy(event) {
	$(event).closest('div.comment_link_copy').find('input').focus();
	$(event).closest('div.comment_link_copy').find('input').select();
	document.execCommand('copy');
}


/* ������ ����� */
var audio_rec_loaded = 0;
function audio_rec_show() {
	if(audio_rec_loaded==0) {
		audio_rec_loaded = 1;
		var tmp = Math.random();

		/*var new_elem = document.createElement('script');
		new_elem.setAttribute('src','/js/sound_rec.js?v='+tmp);
		new_elem.setAttribute('type','text/javascript');
		$('head').append(new_elem);

		audio_rec_init();
		$('#audio_rec_box').slideDown(); */

		var new_elem = document.createElement('script');
		new_elem.setAttribute('src','/js/sound_recorder_v3/js/WebAudioRecorder.min.js');
		new_elem.setAttribute('type','text/javascript');
		$('head').append(new_elem);

		var new_elem2 = document.createElement('script');
		new_elem2.setAttribute('src','/js/sound_recorder_v3/js/app.js?v=3'); // +tmp
		new_elem2.setAttribute('type','text/javascript');
		$('head').append(new_elem2);

		audio_rec_init();
		$('#audio_rec_box').slideDown();
	}
}



/* �������� ��������� �� Ctrl + Enter */
function ctrlEnter(event, formElem) {
	if((event.ctrlKey || event.metaKey) && ((event.keyCode == 0xA)||(event.keyCode == 0xD))) {
		$("#post").submit();
	}
}


// ���������� ��� ��� ����������
function art_top_info(TIP) {
	var TEXT = '';
	TEXT += "<div style='color: #000; max-width: 500px; margin: 0px;'>";
		TEXT += "<div style='font-size: 21px;'>����������� ����������</div>";
		if(TIP==10) TEXT += "<div style='margin: 12px 0 20px 0;'>������� ������ �� ����������� ��������� �� �������� ������ ����� ���������� � ������ �� ������� �������� ����� b17.ru � � ������� ����������.</div>";
		else        TEXT += "<div style='margin: 12px 0 20px 0;'>������� ������ �� ����������� ��������� �� �������� ������� ����� ���������� � ������ �� ������� �������� ����� b17.ru � � ������� ����������.</div>";

		TEXT += "<a class=submit_yellow href='/my_reklama.php?mod=edit&tip=100'>���������</a>&nbsp; <span onclick='popup_info_close()' style='color: #666; border-bottom: 1px dotted #666; cursor: pointer;'>�������</span>";
	TEXT += "</div>";
	popup_info(TEXT);
}

// ����������� ����� ������ �������
var b17_timer_ppp;
var b17_timer_sec = 0;
// b17_timer_ppp = setInterval("b17_timer_ppp_show()", 1000);
/* $(document).ready(function() {
	if(screen.width<700) b17_timer_ppp = setInterval("b17_timer_ppp_show()", 1000);
}); */

function b17_timer_ppp_show() {
	//b17_timer_sec = b17_timer_sec + 1;
	//if(b17_timer_sec>=15) {
		clearTimeout(b17_timer_ppp);

		// ������� ������
		// ���������� �� ���������� �����
		var h1 = $(window).scrollTop() + $(window).height();
		var h2 = $('.rklmn3').offset().top;

		// �� �������, ������������� ������
		if(screen.width>700) {
			clearTimeout(b17_timer_ppp);
		}

		// ����������
		else if(h2>h1) {
			clearTimeout(b17_timer_ppp);
			$('.rklmn3').hide();
			$('.rklmn3').addClass('rklmn3_fly');
			$('.rklmn3').slideDown();
		}
	//}
}


// ��������� ���������� ��� ������
function art_stat_click(TIP) {
	$('.city-select').css({ opacity: 0.5 });

	$.ajax({
		type: 'POST',
		url:  '/main_backend.php',
		cache: false,
		timeout: 5000,
		data: ({
			action: 'art_stat_click',
			tip:    TIP
		}),
		dataType: 'json',
		success: function(jsondata){}
	});
}


// ���������� �����
function share_ppp(URL,IMG,TITLE,DESC) {
	$('.a_art_share').css({ opacity: 0.6 });

	var URL_IG_SHARE = $('#url_ig_share').val();

	$.ajax({
		type: 'POST',
		url:  '/main_backend.php',
		cache: false,
		timeout: 5000,
		data: ({
			action: 'share_ppp',
			url:    URL,
			url_ig: URL_IG_SHARE,
			img:    IMG,
			title:  TITLE,
			desc:   DESC
		}),
		dataType: 'json',
		success: function(jsondata){
			popup_info(jsondata.text);
			$('.a_art_share').css({ opacity: 1 });
		}
	});
}



// ������ � ������ - ��� 1 - ������������ Ctrl + Enter
$(document).ready(function() {
	if($('input').is('#for_word_err')) {
		$('body').on('keydown',function(e) {
			if((e.metaKey || e.ctrlKey) && e.keyCode == 13) {
				text_word_err();
			}
		});
	}
});


// ������ � ������ - ��� 2 - �������� ���� � ������ �������� ������
function text_word_err() {
	// �������� ����� ������
	var TEXT_QUOTE = '';
	if (window.getSelection)        TEXT_QUOTE = window.getSelection().toString();
	else if (document.getSelection) TEXT_QUOTE = document.getSelection();
	else if (document.selection)    TEXT_QUOTE = document.selection.createRange().text;
	else                            TEXT_QUOTE = '';

	// ���������� ����� �������� ��������� �� ������
	if(TEXT_QUOTE!='') {
		// �������� HTML
		TEXT_QUOTE = TEXT_QUOTE.replace(/&/g, "&amp;");
		TEXT_QUOTE = TEXT_QUOTE.replace(/</g, "&lt;");
		TEXT_QUOTE = TEXT_QUOTE.replace(/>/g, "&gt;");
		//TEXT_QUOTE = TEXT_QUOTE.replace(/"/g, "&quot;");
		//TEXT_QUOTE = TEXT_QUOTE.replace(/'/g, "&#039;");

		if(typeof uid_id == 'undefined')  {
			// �� �����������
			alert('����� �������� �� ������ � ������, ������������� �� �����, �������� �������� ������ � ������� � ������� Ctrl + Enter');
		}
		else if((TEXT_QUOTE.length > 0 && TEXT_QUOTE.length < 5) || TEXT_QUOTE.length > 250) {
			// ������� ���� ��������
			var TEXT_OUT = '';
			TEXT_OUT += "<div style='font-size: 19px;'>�������� �� ������ � ������</div>";
			TEXT_OUT += "<div style='margin: 15px 0 5px 0; color: #991717;'>";
				if(TEXT_QUOTE.length < 5) TEXT_OUT += "������� ������� �������� �������� ������. ���������� �������� ����� ��� ����� �������.";
				else                      TEXT_OUT += "������� ������� ������� �������� ������. ����������� ���������� ������ ����������� ��� ����� � �������.";
			TEXT_OUT += '</div>';
			TEXT_OUT += "<div style='margin: 15px 0 0 0;'>";
				TEXT_OUT += " <span style='color: #666; border-bottom: 1px dotted #666; cursor: pointer;' onclick='popup_info_close()'>������� ����</span>";
			TEXT_OUT += "</div>";

			popup_info(TEXT_OUT);
		}
		else {
			// ��� �����
			var TEXT_OUT = '';

			TEXT_OUT += "<div style='font-size: 19px;'>�������� �� ������ � ������</div>";

			TEXT_OUT += "<div id=form_word_err>";
				TEXT_OUT += "<div style='margin: 15px 0 5px 0; font-size: 13px;'><b>�������� ������ � �������:</b></div>";
				TEXT_OUT += "<div id=form_word_err1 style='background-color: #fff; border: 1px solid #ddd; padding: 10px; border-radius: 5px; color: #991717; word-wrap: break-word;'>";
					TEXT_OUT += TEXT_QUOTE;
				TEXT_OUT += '</div>';

				TEXT_OUT += "<div style='margin: 10px 0 5px 0; font-size: 13px;'><b>����������� (��� ���������):</b></div>";
				TEXT_OUT += "<textarea id=form_word_err2 rows=2 class=profile style='background-color: #fff; border: 1px solid #ddd; padding: 10px; border-radius: 5px; color: #170; width: 100%; max-height: 100px; overflow-x: auto;'>";
				TEXT_OUT += "</textarea>";

				TEXT_OUT += "<div style='margin: 10px 0 0 0;'>";
					TEXT_OUT += "<input type='button' class=submit_yellow value='��������� ������' onclick='text_word_err_ajax()' style='margin: 6px 12px 0 0; display: inline-block;'>";
					TEXT_OUT += "<span style='color: #666; border-bottom: 1px dotted #666; cursor: pointer; margin: 6px 12px 0 0; display: inline-block; font-size: 15px;' onclick='popup_info_close()'>��������</span>";
					TEXT_OUT += "<a href='/my_word_err.php?mod=my' style='border-bottom: 1px dotted #666; text-decoration: none; margin: 6px 0 0 0; display: inline-block; color: #666; font-size: 15px; white-space: nowrap;' onclick='popup_info_close()'>����� ���� ���������</a>";
				TEXT_OUT += "</div>";
			TEXT_OUT += "</div>";

			popup_info(TEXT_OUT);
			$('#form_word_err2').focus();
		}
	}


}


// ������ � ������ - ��� 3 - Ajax
function text_word_err_ajax() {
	var TEXT1 = $('#form_word_err1').html();
	var TEXT2 = $('#form_word_err2').val();
	var TEXT3 = $('#for_word_err').val();

	if(TEXT2.length < 3) {
		alert('��������� ��������� �� ������!');
	}
	else {
		$('#form_word_err').css({ opacity: 0.5 });

		$.ajax({
			type: 'POST',
			url:  '/main_backend.php',
			cache: false,
			timeout: 7000,
			data: ({
				action: 'word_err',
				text1:  TEXT1,
				text2:  TEXT2,
				text3:  TEXT3
			}),
			dataType: 'json',
			success: function(jsondata){
				$('#form_word_err').html(jsondata.text);
				$('#form_word_err').css({ opacity: 1 });
			}
		});
	}
}


// �������� �������� - POPAP
function show_kontakt_ppp(MOD,ID) {
	$.ajax({
		dataType: 'json',
		url: '/telefon_backend.php?mod='+MOD+'&id='+ID,
		success: function(jsondata){
			popup_info(jsondata.kontakt);
		}
	});
}



/* ����������� ����������� � ���������� */
function comment_quote(ID,NOM,SKEY) {
	// ���������� ����� ��� ������ (������, �������)
	$('#comments_form0').hide();
	$('#comments_form1').show();
	$('#comments_subscribe').show();

	var SEL_TEXT = '';
	if (window.getSelection && !window.opera) 	SEL_TEXT = window.getSelection(); // ff
	else if (document.getSelection) 			SEL_TEXT = document.getSelection(); // opera
	else if (document.selection) 				SEL_TEXT = document.selection.createRange().text; // ie

	// ���� ���������� �����
	if(SEL_TEXT!='') {
		var TEXT = $('#message').val();
		TEXT = TEXT + '[quote=' + FIO + ']' + SEL_TEXT + '[/quote]\n';
		$('#message').val(TEXT);
		$('#message').focus();
	}

	// ��� ������, ������ ������
	else {
		$.ajax({
			type: "POST",
			url: "/main_backend.php",
			data: ({
				action : "comment_quote",
				id:   ID,
				nom:  NOM,
				skey: SKEY
			}),
			dataType: "json",
			success: function(jsondata){
				if(jsondata.ok==1) {
					var TEXT = $('#message').val();
					TEXT = TEXT + jsondata.text;
					$('#message').val(TEXT);
					$('#message').focus();
				}
			}
		});
	}
}



// ��������� ��������� �������
var rkl_show_backend_status = 0;
var rkl_show_backend_status_r = 0;
var rkl_show_backend_status_b = 0;

function rkl_show_backend_bind() {
	var tmp_window_width = $(window).width();

	if($('div').is('#rkl_place_r')) var tmp_r_on = 1;
	else                            var tmp_r_on = 0;

	if($('div').is('#rkl_place_b')) var tmp_b_on = 1;
	else                            var tmp_b_on = 0;

	if($('div').is('#rkl_place_z')) var tmp_z_on = 1;
	else                            var tmp_z_on = 0;

	if((tmp_r_on==1 || tmp_b_on==1) && rkl_show_backend_status==0) {
		// ������� - ���������� ����� ������
		if(tmp_window_width>580 && tmp_r_on==1) {
			rkl_show_backend_go(1);
		}

		// ��������� - ��� ������ �������� ����� ��������� �� �������
		if(tmp_b_on==1) {
			$(window).on('scroll.rkl',function(e) {
		    	if(rkl_show_backend_status==0) {
			    	var scroll_top1 = $(window).scrollTop() + $(window).height() + 300; // �� ����� + ������ ������ + �������
			    	var scroll_top2 = $('#rkl_place_b').offset().top;

					if(scroll_top1 > scroll_top2) {
						rkl_show_backend_go(2);
						$(window).off('scroll.rkl');
					}
				}
			});
		}
	}

	if(tmp_z_on==1) {
		$.ajax({
			type: 'GET',
			url: '/rkl_show_backend.php?action=show&rkl_position=3',
			dataType: 'json',
			success: function(jsondata){
				if(jsondata.ok==1) {
					$('#rkl_place_z').hide();
					$('#rkl_place_z').html(jsondata.z_text);
					$('#rkl_place_z').fadeIn();
				}
			}
		});
	}
}


function rkl_show_backend_go(RKL_POSITION) {
	var tmp_window_width = $(window).width();

	if(RKL_POSITION==2)                  var tmp_r_on = 0;  // ������ �����
	else if($('div').is('#rkl_place_r')) var tmp_r_on = 1;
	else                                 var tmp_r_on = 0;

	if(RKL_POSITION==1)                  var tmp_b_on = 0;  // ������ ������
	else if($('div').is('#rkl_place_b')) var tmp_b_on = 1;
	else                                 var tmp_b_on = 0;

	if(rkl_show_backend_status_r==1) tmp_r_on = 0; // ������ ��� ��������

	// ����������
	var tmp_exception = '';
	if(RKL_POSITION==2) {
		//.menu-blue-box-rkklmn id=rklmn19648
		$('div.menu-blue-box-rkklmn').each(function (index, value) {
			tmp_exception += ' '+$(this).attr('id');
		});
		// tmp_exception = Number(tmp_exception.replace(/\D\s+/g,""));
	}

	var tmp_page_url = window.location.pathname;

	if((tmp_r_on==1 || tmp_b_on==1) && rkl_show_backend_status==0) {
		if(RKL_POSITION==1) {
			rkl_show_backend_status_r = 1;
		}
		else {
			rkl_show_backend_status = 1;
			rkl_show_backend_status_b = 1;
		}

		$.ajax({
			type: 'GET',
			url: '/rkl_show_backend.php',
			data: ({
				'action': 'show',
				'window_width': tmp_window_width,
				'rkl_position': RKL_POSITION,
				'exception':    tmp_exception,
				'r_on':         tmp_r_on,
				'b_on':         tmp_b_on,
				'url':          tmp_page_url
			}),
			dataType: 'json',
			success: function(jsondata){
				if(jsondata.ok==1) {
					if(jsondata.r_text!='') {
						$('#rkl_place_r').hide();
						$('#rkl_place_r').html(jsondata.r_text);
						$('#rkl_place_r').fadeIn();
					}
					if(jsondata.b_text!='') {
						$('#rkl_place_b').hide();
						$('#rkl_place_b').html(jsondata.b_text);
						$('#rkl_place_b').fadeIn();

						setTimeout("$('.rklmn3').css('pointer-events','auto')", 1500);
					}
				}
			}
		});
	}
}


// ���������� ������ �� ��� �������� (����������)
function curent_page_url_copy() {
	$('#curent_page_url').focus();
	$('#curent_page_url').select();
	document.execCommand('copy');
	$('div.mobile_menu_left div.cop').html('������ �����������');
	$('#curent_page_url').blur();
}