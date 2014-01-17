ui=window.ui||{}
ui.MBaseUI = {
	constructor : function(p) {
		this.pageId = p;
	},
	rpc : function(m, d, call) {
		var url = this.getServerUrl() + this.getPage().data('url');

		if (typeof d != 'string') {
			d = JSON.stringify(d)
		}

		$.ajax({
					type : "POST",
					url : url,
					data : d,
					success : call
				});

	},

	isMobileUserAgent : function() {

		return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i
				.test(window.navigator.userAgent.toLowerCase()));

	},
	getServerUrl : function() {
 
		return $.serverUrl;
	},
	getToken : function() {
 
		return $.auth_token;
	},
	getRequestUrl : function(path) {
 
		return $.serverUrl+path +"?auth_token="+$.auth_token;
	},
	getPage : function(selector) {

		return $('#' + this.pageId)
	},
	find : function(selector) {
		var p = $('#' + this.pageId);
		if (selector) {
			return p.find(selector);
		}
		return $('#' + this.pageId)

	},
	on : function(selector, fun) {
		this.find(selector).on('click', $.proxy(fun, this));
	},
	initEvent : function() {

	},
	onLoad : function() {
		this.initEvent();
	}
}

$(document).on("pagebeforecreate", function(event) {
			var pageId = event.target.id;
			var p = ui[pageId];
			var O = function(pid) {
				this.constructor(pid);
			};
			O.prototype = p;
			var o = new O(pageId);
			$(event.target).data('handler', o);
		});

$(document).on("pageinit", function(event) {
			var o = $(event.target).data('handler');
			o.onLoad();
		});
