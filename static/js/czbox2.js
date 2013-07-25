/**
 * CzBox2 - simple Zepto.js / jQuery lightbox
 * @author		Jan Pecha, <janpecha@email.cz>
 * @version		2013-01-12-1
 */
var CzBox=CzBox||{};CzBox.lang={textImage:"Image",textOf:"of",textPrev:"Previous",textNext:"Next",textClose:"Close",textLoading:"Loading"};CzBox.nodes={};CzBox._created=false;CzBox.enableRels=["czbox","lightbox"];CzBox.currentRel="";CzBox.currentIndex=0;CzBox.create=function(){if(CzBox._created===false){CzBox._created=true;CzBox.modifyDom();CzBox.init();var b=CzBox.enableRels.join("|");b="("+b+")(\\[(.+)\\])?";var a=[];for(var c=0;c<CzBox.enableRels.length;c++){a.push("a[rel*="+CzBox.enableRels[c]+"]")}CzBox.scanDocument(a.join(", "),new RegExp(b))}};CzBox.modifyDom=function(){if(!($("#czbox-box").length)){$("body").first().append('<div id="czbox-box"><div id="czbox-background"></div><div id="czbox-image-box"><div id="czbox-description"></div><div id="czbox-info-bar"><span class="czbox-text">'+this.lang.textImage+'</span> <span id="czbox-image-number"></span> <span class="czbox-text">'+this.lang.textOf+'</span> <span id="czbox-images-count"></span> </div><div id="czbox-loading"><span class="czbox-text">'+this.lang.textLoading+'</span></div><div id="czbox-image-wrapper"><img id="czbox-image" src="#" alt=""></div><a id="czbox-btn-prev" href="#"><span class="czbox-text">'+this.lang.textPrev+'</span></a><a id="czbox-btn-next" href="#"><span class="czbox-text">'+this.lang.textNext+'</span></a><a id="czbox-btn-close" href="#"><span class="czbox-text">'+this.lang.textClose+"</span></a></div></div>")}};CzBox.init=function(){$("#czbox-btn-close, #czbox-background").on("click",function(){CzBox.close();return false});$("#czbox-btn-next").on("click",function(){CzBox.next();return false});$("#czbox-btn-prev").on("click",function(){CzBox.prev();return false});$("body").on("keydown",function(b){if($("#czbox-box").hasClass("czbox-open")){var a;if(!b){b=window.event}if(b.keyCode){a=b.keyCode}else{if(b.which){a=b.which}}switch(a){case 27:CzBox.close();return false;case 13:case 39:case 40:CzBox.next();return false;case 37:case 38:CzBox.prev();return false}}});if(window.addEventListener){window.addEventListener("DOMMouseScroll",CzBox.handlerWheel,false)}window.onmousewheel=document.onmousewheel=CzBox.handlerWheel;$("#czbox-image").on("load",function(){$("#czbox-loading").css("display","none");$(this).parent().css("visibility","visible").animate({opacity:1},600)})};CzBox.scanDocument=function(a,b){$(a).each(function(e){var d=$(this);var c=d.attr("rel");c=CzBox.parseRelAttr(c,b);if(c===""){c="i_"+e}else{c="c_"+c}if(typeof CzBox.nodes[c]==="undefined"){CzBox.nodes[c]=[]}CzBox.nodes[c].push(d);d.data("czbox-rel",c);d.data("czbox-index",CzBox.nodes[c].length-1);d.on("click",function(){CzBox.open(this);return false})})};CzBox.open=function(b){if(b.href!==$("#czbox-image").attr("src")){$("#czbox-box").addClass("czbox-open");$("#czbox-loading").css("display","block");$("#czbox-image-wrapper").css("opacity",0).css("visibility","hidden");var a=b.href;if(typeof(dataUrl=$(b).data("czbox-href"))==="string"){a=dataUrl}$("#czbox-image").attr("src",a);CzBox.update(b)}};CzBox.close=function(){$("#czbox-box").removeClass("czbox-open");$("#czbox-image").attr("src","");$("#czbox-description").hide()};CzBox.next=function(){if(CzBox.currentRel!==""){if(CzBox.currentIndex<(CzBox.nodes[CzBox.currentRel].length-1)){CzBox.open(CzBox.nodes[CzBox.currentRel][CzBox.currentIndex+1].get(0))}}};CzBox.prev=function(){if(CzBox.currentRel!==""){if(CzBox.currentIndex>0){CzBox.open(CzBox.nodes[CzBox.currentRel][CzBox.currentIndex-1].get(0))}}};CzBox.update=function(c){c=$(c);var a=c.data("czbox-rel");var b=parseInt(c.data("czbox-index"),10);if(CzBox.nodes[a].length<2){$("#czbox-info-bar").hide();$("#czbox-btn-next").hide();$("#czbox-btn-prev").hide()}else{$("#czbox-info-bar").show();$("#czbox-image-number").html(b+1);$("#czbox-images-count").html(CzBox.nodes[a].length);if(b===0){$("#czbox-btn-prev").hide()}else{$("#czbox-btn-prev").show()}if(b===(CzBox.nodes[a].length-1)){$("#czbox-btn-next").hide()}else{$("#czbox-btn-next").show()}}var d=CzBox.getDescription(c);if(d!==""){$("#czbox-description").html(d).show()}else{$("#czbox-description").hide()}CzBox.currentRel=a;CzBox.currentIndex=b};CzBox.parseRelAttr=function(b,c){var a=b.match(c);if(a===null){return""}a=a[3];if(typeof a==="undefined"){return""}return a};CzBox.getDescription=function(a){var c="";var b=a.children("img").first();c=b.attr("title");if(c){return c}c=a.attr("title");if(c){return c}c=b.attr("alt");if(c){return c}return""};CzBox.handlerWheel=function(a){if($("#czbox-box").hasClass("czbox-open")){a=a?a:window.event;if(a.stopPropagation){a.stopPropagation()}if(a.preventDefault){a.preventDefault()}a.cancelBubble=true;a.cancel=true;a.returnValue=false;return false}};CzBox.langCs=function(){CzBox.lang.textImage="Obrázek";CzBox.lang.textOf="ze";CzBox.lang.textPrev="Předchozí";CzBox.lang.textNext="Další";CzBox.lang.textClose="Zavřít";CzBox.lang.textLoading="Načítám"};