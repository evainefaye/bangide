(function(b){var v=(b.browser.msie?"paste":"input")+".mask",w=void 0!=window.orientation;b.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"}};b.fn.extend({caret:function(d,f){if(0!=this.length){if("number"==typeof d)return f="number"==typeof f?f:d,this.each(function(){if(this.setSelectionRange)this.focus(),this.setSelectionRange(d,f);else if(this.createTextRange){var g=this.createTextRange();g.collapse(!0);g.moveEnd("character",f);g.moveStart("character",d);g.select()}});if(this[0].setSelectionRange)d=
this[0].selectionStart,f=this[0].selectionEnd;else if(document.selection&&document.selection.createRange)var b=document.selection.createRange(),d=0-b.duplicate().moveStart("character",-1E5),f=d+b.text.length;return{begin:d,end:f}}},unmask:function(){return this.trigger("unmask")},mask:function(d,f){if(!d&&0<this.length){var m=b(this[0]),g=m.data("tests");return b.map(m.data("buffer"),function(f,b){return g[b]?f:null}).join("")}var f=b.extend({placeholder:"_",completed:null},f),r=b.mask.definitions,
g=[],k=d.length,o=null,j=d.length;b.each(d.split(""),function(f,b){"?"==b?(j--,k=f):r[b]?(g.push(RegExp(r[b])),null==o&&(o=g.length-1)):g.push(null)});return this.each(function(){function n(a){for(;++a<=j&&!g[a];);return a}function m(a){var c=b(this).caret(),a=a.keyCode;p=16>a||16<a&&32>a||32<a&&41>a;0!=c.begin-c.end&&(!p||8==a||46==a)&&t(c.begin,c.end);if(8==a||46==a||w&&127==a){for(c=c.begin+(46==a?0:-1);!g[c]&&0<=--c;);for(a=c;a<j;a++)if(g[a]){i[a]=f.placeholder;var e=n(a);if(e<j&&g[a].test(i[e]))i[a]=
i[e];else break}q();h.caret(Math.max(o,c));return!1}if(27==a)return h.val(s),h.caret(0,l()),!1}function x(a){if(p)return p=!1,8==a.keyCode?!1:null;var a=a||window.event,c=a.charCode||a.keyCode||a.which,e=b(this).caret();if(a.ctrlKey||a.altKey||a.metaKey)return!0;if(32<=c&&125>=c||186<c)if(a=n(e.begin-1),a<j&&(c=String.fromCharCode(c),g[a].test(c))){for(var e=a,d=f.placeholder;e<j;e++)if(g[e]){var u=n(e),k=i[e];i[e]=d;if(u<j&&g[u].test(k))d=k;else break}i[a]=c;q();a=n(a);b(this).caret(a);f.completed&&
a==j&&f.completed.call(h)}return!1}function t(a,c){for(var e=a;e<c&&e<j;e++)g[e]&&(i[e]=f.placeholder)}function q(){return h.val(i.join("")).val()}function l(a){for(var c=h.val(),e=-1,b=0,d=0;b<j;b++)if(g[b]){for(i[b]=f.placeholder;d++<c.length;){var l=c.charAt(d-1);if(g[b].test(l)){i[b]=l;e=b;break}}if(d>c.length)break}else i[b]==c[d]&&b!=k&&(d++,e=b);if(!a&&e+1<k)h.val(""),t(0,j);else if(a||e+1>=k)q(),a||h.val(h.val().substring(0,e+1));return k?b:o}var h=b(this),i=b.map(d.split(""),function(a){if("?"!=
a)return r[a]?f.placeholder:a}),p=!1,s=h.val();h.data("buffer",i).data("tests",g);h.attr("readonly")||h.one("unmask",function(){h.unbind(".mask").removeData("buffer").removeData("tests")}).bind("focus.mask",function(){s=h.val();var a=l();q();setTimeout(function(){a==d.length?h.caret(0,a):h.caret(a)},0)}).bind("blur.mask",function(){l();h.val()!=s&&h.change()}).bind("keydown.mask",m).bind("keypress.mask",x).bind(v,function(){setTimeout(function(){h.caret(l(!0))},0)});l()})}})})(jQuery);
