//fetch feeds from server
function displayExtFeed(url, elid)
{
	new Ajax.Request(url, {
		method:'get',
		onComplete: function(transport){
			var feed_json = transport.responseText.evalJSON();
			var feed_html = '<h2><a href="'+feed_json.link+'" target="_blank">'+feed_json.title+'</a></h2>';
			feed_html = feed_html + '<ul>';
			for (var i = 0; i < feed_json.items.length; i++) {
				feed_html = feed_html + '<li><a href="'+feed_json.items[i].link+'">'+feed_json.items[i].title;+'</a></li>';
			}
			feed_html = feed_html + '</ul>';
			$(elid).update(feed_html);
		}
	});
}
function displayExtTwitterFeed(url, elid)
{
	new Ajax.Request(url, {
		method:'get',
		onComplete: function(transport) {
			var feed_json = transport.responseText.evalJSON();
			var feed_html = '<h2><a href="'+feed_json.link+'" target="_blank">'+feed_json.title+'</a></h2>';
			feed_html += '<ul class="exttwitter">';
			for (var n = 0; n < feed_json.items.length; n++) {
				var tweet = feed_json.items[n];
				feed_html += '<li><a href="'+tweet.author_uri+'"><img src="'+tweet.image+'" class="twitter_image"><strong>'+tweet.author+' </a>';
				feed_html += 'tweeted: </strong>'+tweet.tweet+'<br><br></li>';
			}
			feed_html += '</ul>';
			$(elid).update(feed_html);
		}
	});
} 
function urlencode(formdata)
{
    //This function urlencodes a string for PHP, instead of the escape() for JS. There are 5 nasty differences
    var output = escape(formdata);
    output = output.replace(/\+/g, "%2B");
    output = output.replace(/%20/g, "+");
    output = output.replace(/\*/g, "%2A");
    output = output.replace(/\//g, "%2F");
    output = output.replace(/\@/g, "%40");
    return output;
}
function urldecode(wwwdata)
{
    //This function urldecodes a string from PHP to Javascript escape() notation.
    var output = wwwdata.replace(/%40/g, "@");
    output = output.replace(/%2F/g, "/");
    output = output.replace(/%2A/g, "*");
    output = output.replace(/\+/g, "%20");
    output = output.replace(/%2B/g, "+");
    output = unescape(output);
    return output;
}
//toggle login div
function divSwap (element,container)
{
    switch(element)
    {
        case 'loginheader':
            $('account').style.display = 'none';
            $('loginheader').style.display = 'inline';
            formhandler = new AjaxFormHandler('headerloginform', '/member/login', 'post');
            document.headerloginform.onsubmit = function() { return false; };
            document.headerloginform.elements['submit'].onclick = function()
            	{
            		formhandler.submit();
           		};
       		formhandler.waiting = function(modifier) {
                switch(modifier)
                {
                    case 'on':
                        divSwap('login-pleasewait', 'logincontainer');
                        break;
                    case 'off':
                        divSwap('account', 'logincontainer');
                        break;
                }
            };
            formhandler.onSuccess = function(resultdatatype) {
                try {
                    var oldmsgdiv = $('message-container');
                    if (oldmsgdiv) {
                        oldmsgdiv.parentNode.removeChild(oldmsgdiv);
                    }
                } catch(e) { }
                msgcontainer = document.createElement('div');
                msgcontainer.setAttribute('id', 'message-container');
                var servermsg = document.createElement('div');
                servermsg.setAttribute('class', 'flashmessage');
                if (typeof(formhandler.result.status) == 'undefined') {
                    servermsg.setAttribute('id', 'message_Error');
                    servermsg.innerHTML = "<h2>Error!</h2><ul><li>Server gave unrecognized response! Please try again!</li></ul>";
                } else {
                    switch(formhandler.result.status)
                    {
                        case 'error':
                            servermsg.setAttribute('id', 'message_Error');
                            servermsg.innerHTML = "<h2>" + formhandler.result.message + "</h2><ul><li>" + formhandler.result.message + "</li></ul>";
                            break;
                        case 'success':
                            // Redirect the user to reload the page.  Needed to set page attributes:
                            document.location.reload(true);
                            var nomsg = true;
                            break;
                    }
                }
                if (!nomsg) {
                    msgcontainer.appendChild(servermsg);
                    $('middle').insertBefore(msgcontainer, $('content'));                    
                }
            };
           	break;
        case 'account':
            $('login-pleasewait').style.display = 'none';
            $('loginheader').style.display = 'none';
            $('account').style.display = 'inline';
            break;
        case 'login-pleasewait':
            $('loginheader').style.display = 'none';
            $('login-pleasewait').style.display = 'inline';
            break;
    }
}

function javascriptize(action)
{
	switch(action)
	{
		case 'loginlink':
			try {
                $('loginlink').href = '#';
                $('loginlink').onclick = function() { divSwap('loginheader', 'logincontainer'); return false;};
            } catch (e) {}
            break;
        case 'add_comment':
            $$('.add_comment').each(function(o) {
                o.href = '#comment_form';
                o.onclick = function() { $('comment_form').show(); return true; }
            });
            break;
	}
}

function showLightbox() {
    $('lightbox_black').style.display = 'block';
    $('lightbox_white').style.display = 'block';
    return false;
}
function hideLightbox() {
    $('lightbox_black').style.display = 'none';
    $('lightbox_white').style.display = 'none';    
    return false;
}


var AjaxFormHandler = Class.create();
AjaxFormHandler.prototype = {

	formname: 	null,
	fields:		[],
	url:		null,
	available:	false,
	waiting:	null,
	customHandler: null,
	onSuccess:	null,
	onFailure:	null,
	result:		null,

	initialize: function(formname, url, method)
	{
		if (formname)
		{
			this.formname = formname;
			if (url) {
				this.url = url;
			} else {
				this.url = document.forms[this.formname].action;
			}
			if (method) {
				this.method = method;
			} else {
				this.method = document.forms[this.formname].method;
			}
            this.fields = null;
            this.fields = [];
			this.getFields();
			this.available = true;
		}
	},

	getFields: function()
	{
		//scan all fields, and add them to array
		var fields = document.forms[this.formname].elements;
		var fieldslength = fields.length;
		for (var n = 0; n < fieldslength; n++) {
            this.fields.push(fields[n].name);
		}
	},

	validate: function(ruleset)
	{
		//validate the form against the given ruleset
		//ruleformat: [fieldname, mandatory(bool), typeof(string|bool|int|email), default(none|'empty'|variable)]
	},

	submit: function()
	{
		//submits the form
		if (this.available == true)
		{
			var fieldslength = this.fields.length;
			var data = [];
			for (var n = 0; n < fieldslength; n++)
			{
				var formfield = document.forms[this.formname].elements[n];
				data.push(formfield.value);
			}
			try {
				if (this.customHandler && typeof(this.customHandler) == 'function') {
					this.customHandler();
				}
				if (this.waiting && typeof(this.waiting) == 'function') {
					this.waiting("on");
				}
			} catch (e) {
				throw "Failed to execute customHandler or waiting handler";
			}

			var appendurl = '';
	        for (var n = 0; n < fieldslength; n++)
	        {
	            appendurl += '&';
	            appendurl += urlencode(this.fields[n]);
	            appendurl += '=';
	            if (data[n] == '' || data[n] == 'undefined' || data[n] == undefined)
	           	{
	           		appendurl += '';
	           	} else {
	           		appendurl += urlencode(data[n]);
	          	}
	        }
        	var postdata = appendurl.substr(1);
        	var debug = ''; //"?start_debug=1&debug_host=192.168.1.100&debug_port=10013&debug_stop=1";
        	var _this = this;
            switch(this.method)
        	{
        		case 'post':
	        		var ajax = new Ajax.Request(this.url + debug,
	                	{
	                    	method: 'post',
	                    	parameters: postdata,
	                    	onComplete: function (obj,ajaxData){_this.callback(ajaxData);},
	                    	requestHeaders: ['X-Return-Type','JSON']
	                   	});
	            	break;
            	case 'get':
					var ajax = new Ajax.Request(this.url + debug + appendurl,
                    	{
                        	method: 'get',
                            onComplete: function (obj,ajaxData){_this.callback(ajaxData);},
                            requestHeaders: ['X-Return-Type','JSON']
                        });
                    break;
          	}
          	return;
       	} else {
       		throw "Form not available yet! Please debug the initializer!";
   		}
	},

	callback: function(ajaxData)
	{
		if (ajaxData) {
			this.result = ajaxData;
        }
		try {
			if (this.waiting && typeof(this.waiting) == 'function') {
				this.waiting("off");
			}
		} catch (e) {
			throw "Failed to execute wait handler for off state";
		}
		if(this.onSuccess && typeof(this.onSuccess) == 'function') {
			try {
				this.onSuccess(typeof(this.result));
			} catch(e) {
				throw "Failed to execute onSuccess handler"
			}
		} else {
			throw "AJAX callback succeeded, but no onSuccess handler registered!";
		}
	}
}

