

body, html
{
    color: #000000;
    font-family: Arial, Helvetica;
    background-color: #FFFFFF;
    background-image: none;
}

a:link
{
    color: #3399FF;
}

a:hover, a:active
{
    color: #3399FF;
}

a:visited
{
    color: #0066CC;
}

#header 
{
    background-image: url(http://i1.asp.net/wan/blogs/traveler/images/seattle.jpg?cdn_id=2010-10-05-001);
}

#title h1
{
    color: #996633;
    font-family: Georgia, serif;
    font-size: 2.5em;
}

#title h1 a:link, #title h1 a:visited, #title h1 a:active
{
    color: #996633;
}

.pageTitle
{
    color: #C68B4A;
    font-family: Arial, Helvetica;
    font-size: 2.4em;
}

#sidebar-a h3, #sidebar-b h3
{
    color: #C68B4A;
    font-family: Arial, Helvetica;
    font-size: 2em;
}

#sidebar-a
{
    color: #000000;
    font-family: Arial, Helvetica;
    background-color: #FFFFFF;
}

#sidebar-a ul
{
    font-size: 1em;
}

#sidebar-a li
{
    border-color: #EBDAA6;
}

#sidebar-a a:link
{
    color: #3399FF;
}

#sidebar-a a:visited
{
    color: #0066CC;
}

#sidebar-a a:active, #sidebar-a a:hover
{
    color: #3399FF;
}

.Tag1 a:link, .Tag1 a:visited, .Tag1 a:active
{
    color: #0044AA;
}

.Tag2 a:link, .Tag2 a:visited, .Tag2 a:active
{
    color: #0055BB;
}

.Tag3 a:link, .Tag3 a:visited, .Tag3 a:active
{
    color: #0066CC;
}

.Tag4 a:link, .Tag4 a:visited, .Tag4 a:active
{
    color: #1177DD;
}

.Tag5 a:link, .Tag5 a:visited, .Tag5 a:active
{
    color: #2288EE;
}

.Tag6 a:link, .Tag6 a:visited, .Tag6 a:active
{
    color: #3399FF;
}

#wrapper
{
    width: 95%;
}

#sidebar-a
{
    width: 220px;;
}

.commentowner { background-color: #f4efc3; padding: 4px; border: solid 1px #e7d59c; margin-top: 1em;}

.post img { max-width: none; }

.comment
{
background-color:#F2F2F2;
border:1px solid #CCCCCC;
margin-top:1em;
padding:4px;
}

.syntaxhighlighter,
.syntaxhighlighter div,
.syntaxhighlighter code,
.syntaxhighlighter span
{
	margin: 0 !important;
	padding: 0 !important;
	border: 0 !important;
	outline: 0 !important;
	background: none !important;
	text-align: left !important;
	float: none !important;
	vertical-align: baseline !important;
	position: static !important;
	left: auto !important;
	top: auto !important;
	right: auto !important;
	bottom: auto !important;
	height: auto !important;
	width: auto !important;
	line-height: 1.1em !important;
	font-family: "Consolas", "Monaco", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace !important;
	font-weight: normal !important;
	font-style: normal !important;
	font-size: 1em !important;
}

.syntaxhighlighter
{
	width: 100% !important;
	margin: 1em 0 1em 0 !important;
	padding: 1px !important; /* adds a little border on top and bottom */
	position: relative !important;
}

.syntaxhighlighter .bold {
	font-weight: bold !important;
}

.syntaxhighlighter .italic {
	font-style: italic !important;
}

.syntaxhighlighter .line .number
{
	float: left !important; 
	width: 3em !important; 
	padding-right: .3em !important;
	text-align: right !important;
	display: block !important;
}

/* Disable numbers when no gutter option is set */
.syntaxhighlighter.nogutter .line .number
{
	display: none !important;
}

.syntaxhighlighter .line .content
{
	margin-left: 3.3em !important; 
	padding-left: .5em !important;
	display: block !important;
}

.syntaxhighlighter .line .content .block
{
	display: block !important;
	padding-left: 1.5em !important;
	text-indent: -1.5em !important;
}

.syntaxhighlighter .line .content .spaces
{
	display: none !important;
}

/* Disable border and margin on the lines when no gutter option is set */
.syntaxhighlighter.nogutter .line .content
{
	margin-left: 0 !important; 
	border-left: none !important;
}

.syntaxhighlighter .bar
{
}

.syntaxhighlighter.collapsed .bar
{

}

.syntaxhighlighter.nogutter .ruler
{
	margin-left: 0 !important;
	padding-left: 0 !important;
}

.syntaxhighlighter .ruler
{
	padding: 0 0 .5em .5em !important;
	margin-left: 3.3em !important;
	overflow: hidden !important;
}

/* Adjust some properties when collapsed */

.syntaxhighlighter.collapsed .lines,
.syntaxhighlighter.collapsed .ruler
{
	display: none !important;
}

/* Styles for the toolbar */

.syntaxhighlighter .toolbar
{
	position: absolute !important;
	right: 0px !important;
	top: 0px !important;
	font-size: 1px !important;
	padding: 8px 8px 8px 0 !important; /* in px because images don't scale with ems */
}

.syntaxhighlighter.collapsed .toolbar
{
	font-size: 80% !important;
	padding: .2em 0 .5em .5em !important;
	position: static !important;
}

.syntaxhighlighter .toolbar a.item,
.syntaxhighlighter .toolbar .item
{
	display: block !important;
	float: left !important;
	margin-left: 8px !important;
	background-repeat: no-repeat !important;
	overflow: hidden !important;
	text-indent: -5000px !important;
}

.syntaxhighlighter.collapsed .toolbar .item
{
	display: none !important;
}

.syntaxhighlighter.collapsed .toolbar .item.expandSource
{
	background-image: url(magnifier.png) !important;
	display: inline !important;
	text-indent: 0 !important;
	width: auto !important;
	float: none !important;
	height: 16px !important;
	padding-left: 20px !important;
}

.syntaxhighlighter .toolbar .item.viewSource
{
	background-image: url(page_white_code.png) !important;
}

.syntaxhighlighter .toolbar .item.printSource
{
	background-image: url(printer.png) !important;
}

.syntaxhighlighter .toolbar .item.copyToClipboard
{
	text-indent: 0 !important;
	background: none !important;
	overflow: visible !important;
}

.syntaxhighlighter .toolbar .item.about
{
	background-image: url(help.png) !important;
}

/** 
 * Print view.
 * Colors are based on the default theme without background.
 */

.syntaxhighlighter.printing,
.syntaxhighlighter.printing .line.alt1 .content,
.syntaxhighlighter.printing .line.alt2 .content,
.syntaxhighlighter.printing .line.highlighted .number,
.syntaxhighlighter.printing .line.highlighted.alt1 .content,
.syntaxhighlighter.printing .line.highlighted.alt2 .content,
.syntaxhighlighter.printing .line .content .block
{
	background: none !important;
}

/* Gutter line numbers */
.syntaxhighlighter.printing .line .number
{
	color: #bbb !important;
}

/* Add border to the lines */
.syntaxhighlighter.printing .line .content
{
	color: #000 !important;
}

/* Toolbar when visible */
.syntaxhighlighter.printing .toolbar,
.syntaxhighlighter.printing .ruler
{
	display: none !important;
}

.syntaxhighlighter.printing a
{
	text-decoration: none !important;
}

.syntaxhighlighter.printing .plain,
.syntaxhighlighter.printing .plain a
{ 
	color: #000 !important;
}

.syntaxhighlighter.printing .comments,
.syntaxhighlighter.printing .comments a
{ 
	color: #008200 !important;
}

.syntaxhighlighter.printing .string,
.syntaxhighlighter.printing .string a
{
	color: blue !important; 
}

.syntaxhighlighter.printing .keyword
{ 
	color: #069 !important; 
	font-weight: bold !important; 
}

.syntaxhighlighter.printing .preprocessor 
{ 
	color: gray !important; 
}

.syntaxhighlighter.printing .variable 
{ 
	color: #a70 !important; 
}

.syntaxhighlighter.printing .value
{ 
	color: #090 !important; 
}

.syntaxhighlighter.printing .functions
{ 
	color: #ff1493 !important; 
}

.syntaxhighlighter.printing .constants
{ 
	color: #0066CC !important; 
}

.syntaxhighlighter.printing .script
{
	font-weight: bold !important;
}

.syntaxhighlighter.printing .color1,
.syntaxhighlighter.printing .color1 a
{ 
	color: #808080 !important; 
}

.syntaxhighlighter.printing .color2,
.syntaxhighlighter.printing .color2 a
{ 
	color: #ff1493 !important; 
}

.syntaxhighlighter.printing .color3,
.syntaxhighlighter.printing .color3 a
{ 
	color: red !important; 
}

/************************************
 * Default Syntax Highlighter theme.
 * 
 * Interface elements.
 ************************************/

.syntaxhighlighter
{
	background-color: #E7E5DC !important;
}

/* Highlighed line number */
.syntaxhighlighter .line.highlighted .number
{
	background-color: #6CE26C !important;
	color: black !important;
}

/* Highlighed line */
.syntaxhighlighter .line.highlighted.alt1 .content,
.syntaxhighlighter .line.highlighted.alt2 .content
{
	background-color: #6CE26C !important;
}

/* Gutter line numbers */
.syntaxhighlighter .line .number
{
	color: #5C5C5C !important;
}

/* Add border to the lines */
.syntaxhighlighter .line .content
{
	border-left: 3px solid #6CE26C !important;
	color: #000 !important;
}

.syntaxhighlighter.printing .line .content 
{
	border: 0 !important;
}

/* First line */
.syntaxhighlighter .line.alt1 .content
{
	background-color: #fff !important;
}

/* Second line */
.syntaxhighlighter .line.alt2 .content
{
	background-color: #F8F8F8 !important;
}

.syntaxhighlighter .line .content .block
{
	background: url(wrapping.png) 0 1.1em no-repeat !important;
}

.syntaxhighlighter .ruler
{
	color: silver !important;
	background-color: #F8F8F8 !important;
	border-left: 3px solid #6CE26C !important;
}

.syntaxhighlighter.nogutter .ruler
{
	border: 0 !important;
}

.syntaxhighlighter .toolbar
{
	background-color: #F8F8F8 !important;
	border: #E7E5DC solid 1px !important;
}

.syntaxhighlighter .toolbar a
{
	color: #a0a0a0 !important;
}

.syntaxhighlighter .toolbar a:hover
{
	color: red !important;
}

/************************************
 * Actual syntax highlighter colors.
 ************************************/
.syntaxhighlighter .plain,
.syntaxhighlighter .plain a
{ 
	color: #000 !important;
}

.syntaxhighlighter .comments,
.syntaxhighlighter .comments a
{ 
	color: #008200 !important;
}

.syntaxhighlighter .string,
.syntaxhighlighter .string a
{
	color: blue !important; 
}

.syntaxhighlighter .keyword
{ 
	color: #069 !important; 
	font-weight: bold !important; 
}

.syntaxhighlighter .preprocessor 
{ 
	color: gray !important; 
}

.syntaxhighlighter .variable 
{ 
	color: #a70 !important; 
}

.syntaxhighlighter .value
{ 
	color: #090 !important; 
}

.syntaxhighlighter .functions
{ 
	color: #ff1493 !important; 
}

.syntaxhighlighter .constants
{ 
	color: #0066CC !important; 
}

.syntaxhighlighter .script
{ 
	background-color: yellow !important;
}

.syntaxhighlighter .color1,
.syntaxhighlighter .color1 a
{ 
	color: #808080 !important; 
}

.syntaxhighlighter .color2,
.syntaxhighlighter .color2 a
{ 
	color: #ff1493 !important; 
}

.syntaxhighlighter .color3,
.syntaxhighlighter .color3 a
{ 
	color: red !important; 
}
