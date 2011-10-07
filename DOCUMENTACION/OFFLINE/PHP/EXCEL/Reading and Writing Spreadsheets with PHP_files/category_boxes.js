// Is this still necessary?
function getElementsByClassName(oElm, strTagName, strClassName) {
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	
	for(var i=0; i<arrElements.length; i++) {
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)) {
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}

/*
* The following code is used for the categoeies
*/
function closeOpen(arrowId,categoryId) {
	var openArrow = getElementsByClassName(document, "a", "true");
	var openCategory = getElementsByClassName(document, "ul", "categories-items-show");
	var arrow=document.getElementById(arrowId);
	var category=document.getElementById(categoryId);
	
	for (i = 0; i < openArrow.length; i++) {
		if (arrow != openArrow[i])	
			openArrow[i].className='false';
	}
	for (i = 0; i < openCategory.length; i++) {	
		if (category != openCategory[i])
			openCategory[i].className='categories-items-hide';
	}
}

function toggle(arrowId,categoryId) {
	var arrow=document.getElementById(arrowId);
	var category=document.getElementById(categoryId);
	
	if(arrow.className=='true') {	
		arrow.className='false';
	} else {
		arrow.className='true';
	}
	
	if(category.className=='categories-items-show') {
		category.className='categories-items-hide';
	} else {
		category.className='categories-items-show';
	}
	return(false);
}

function arrow(arrowId,categoryId) {
	closeOpen(arrowId,categoryId);
	return(toggle(arrowId,categoryId));
}
/*
* End Category code
*/
