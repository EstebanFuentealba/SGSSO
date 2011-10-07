
function Telligent_InlineEditorPanel(varName,containerId,stateId,editorVarName,fitEditorToWindow,onEditFunction,onSaveFunction,onCloseFunction)
{this._variableName=varName;this._container=document.getElementById(containerId);this._state=document.getElementById(stateId);this._editor=null;this._editorVariableName=editorVarName;this.OnEditFunction=onEditFunction;this.OnSaveFunction=onSaveFunction;this.OnCloseFunction=onCloseFunction;this._isEditing=false;this.FitEditorToWindow=fitEditorToWindow;this._abandonedContent=null;if(this._container)
this._container.dispose=new Function(this._variableName+'.Dispose();');if(this._state.value.substr(0,6)=='value:')
this._container.innerHTML=decodeURIComponent(this._state.value.substr(6));else
this._state.value='value:'+encodeURIComponent(this._container.innerHTML);}
Telligent_InlineEditorPanel.prototype.IsEditing=function()
{return this._isEditing;}
Telligent_InlineEditorPanel.prototype.Edit=function(parameter)
{if(!this.IsEditing())
{if(!this._editor)
this._editor=eval(this._editorVariableName);var styleContext=this._getCurrentStyles();this._editor.FitToWindow=this.FitEditorToWindow;this._editor._show(this._container);this._editor._setInlineEditorPanel(this,parameter);if(this._abandonedContent)
{this._editor._setContent(this._abandonedContent);this._abandonedContent=null;}
else
this._editor._setContent(this._container.innerHTML);this._editor._setStyleContext(styleContext);this._editor.Focus();this._isEditing=true;if(this.OnEditFunction)
this.OnEditFunction(this);}}
Telligent_InlineEditorPanel.prototype.Save=function()
{if(this.IsEditing())
{this._container.innerHTML=this._editor._getContent();this._state.value='value:'+encodeURIComponent(this._container.innerHTML);this._editor._hide();this._isEditing=false;if(this.OnSaveFunction)
this.OnSaveFunction(this);}}
Telligent_InlineEditorPanel.prototype.Close=function()
{if(this.IsEditing())
{this._editor._hide();this._isEditing=false;if(this.OnCloseFunction)
this.OnCloseFunction(this);}}
Telligent_InlineEditorPanel.prototype.Refresh=function()
{if(this.IsEditing())
{this._editor.FitToWindow=this.FitEditorToWindow;this._editor._show(this._container);}}
Telligent_InlineEditorPanel.prototype.Dispose=function()
{this._container=null;}
Telligent_InlineEditorPanel.prototype.GetContent=function()
{if(this.IsEditing())
return this._editor._getContent();else
return this._container.innerHTML;}
Telligent_InlineEditorPanel.prototype.SetContent=function(html)
{if(this.IsEditing())
this._editor._setContent(html);else
{this._abandonedContent=null;this._container.innerHTML=html;this._state.value='value:'+encodeURIComponent(html);}}
Telligent_InlineEditorPanel.prototype._getCurrentStyles=function()
{var currentStyle=new Array();currentStyle[currentStyle.length]=["fontSize",Telligent_Common.GetCurrentStyleValue(this._container,'font-size','fontSize','inherit')];currentStyle[currentStyle.length]=["fontFamily",Telligent_Common.GetCurrentStyleValue(this._container,'font-family','fontFamily','inherit')];currentStyle[currentStyle.length]=["fontWeight",Telligent_Common.GetCurrentStyleValue(this._container,'font-weight','fontWeight','inherit')];currentStyle[currentStyle.length]=["fontStyle",Telligent_Common.GetCurrentStyleValue(this._container,'font-style','fontStyle','inherit')];currentStyle[currentStyle.length]=["color",Telligent_Common.GetCurrentStyleValue(this._container,'color','color','inherit')];currentStyle[currentStyle.length]=["backgroundColor",Telligent_Common.GetCurrentStyleValue(this._container,'background-color','backgroundColor','inherit')];currentStyle[currentStyle.length]=["textDecoration",Telligent_Common.GetCurrentStyleValue(this._container,'text-decoration','textDecoration','inherit')];return currentStyle;}
function Telligent_DblClickInlineEditorPanel(varName,containerId,stateId,cssClass,hoverCssClass,editingCssClass,toolTip,editor,fitEditorToWindow,onEditFunction,onSaveFunction,onCloseFunction,parameter)
{this._variableName=varName;this._container=document.getElementById(containerId);this._inlineEditorPanel=new Telligent_InlineEditorPanel(this._variableName+'._inlineEditorPanel',containerId,stateId,editor,fitEditorToWindow,new Function('window.'+this._variableName+'._onEdit();'),new Function('window.'+this._variableName+'._onSave();'),new Function('window.'+this._variableName+'._onClose();'));this.OnEditFunction=onEditFunction;this.OnSaveFunction=onSaveFunction;this.OnCloseFunction=onCloseFunction;this.ToolTip=toolTip;this.CssClass=cssClass;this.HoverCssClass=hoverCssClass;this.EditingCssClass=editingCssClass;this.FitEditorToWindow=fitEditorToWindow;this.Parameter=parameter;if(this._container)
this._container.dispose=new Function(this._variableName+'.Dispose();');this._container.title=this.ToolTip;this._container.ondblclick=new Function("window."+this._variableName+".Edit(); return false;");this._container.onmouseover=new Function("window."+this._variableName+"._mouseOver();");this._container.onmouseout=new Function("window."+this._variableName+"._mouseOut();");this._container.className=this.CssClass;}
Telligent_DblClickInlineEditorPanel.prototype.Edit=function()
{this._container.className=this.CssClass;this._inlineEditorPanel.Edit(this.Parameter);}
Telligent_DblClickInlineEditorPanel.prototype.Dispose=function()
{this._container=null;this._inlineEditorPanel.Dispose();}
Telligent_DblClickInlineEditorPanel.prototype.Refresh=function()
{this._inlineEditorPanel.FitEditorToWindow=this.FitEditorToWindow;this._inlineEditorPanel.Refresh();if(!this._inlineEditorPanel.IsEditing())
this._container.className=this.CssClass;this._container.title=this.ToolTip;}
Telligent_DblClickInlineEditorPanel.prototype.GetInlineEditorPanel=function()
{return this._inlineEditorPanel;}
Telligent_DblClickInlineEditorPanel.prototype._mouseOver=function()
{if(!this._inlineEditorPanel.IsEditing()&&this._container.className==this.CssClass)
this._container.className=this.HoverCssClass;}
Telligent_DblClickInlineEditorPanel.prototype._mouseOut=function()
{if(!this._inlineEditorPanel.IsEditing()&&this._container.className==this.HoverCssClass)
this._container.className=this.CssClass;}
Telligent_DblClickInlineEditorPanel.prototype._onEdit=function()
{this._container.className=this.EditingCssClass;if(this.OnEditFunction)
this.OnEditFunction(this);}
Telligent_DblClickInlineEditorPanel.prototype._onSave=function()
{this._container.className=this.CssClass;if(this.OnSaveFunction)
this.OnSaveFunction(this);}
Telligent_DblClickInlineEditorPanel.prototype._onClose=function()
{this._container.className=this.CssClass;if(this.OnCloseFunction)
this.OnCloseFunction(this);}
function Telligent_InlineEditor(varName,containerId,setInlineEditorPanelFunction,getContentFunction,setContentFunction,getStyleContextElementFunction,setFocusFunction,resizeFunction,minimumWidth,minimumHeight)
{this._variableName=varName;this._container=document.getElementById(containerId);this._inlineEditorPanel=null;this._getContentFunction=getContentFunction;this._setContentFunction=setContentFunction;this._getStyleContextElementFunction=getStyleContextElementFunction;this._setFocusFunction=setFocusFunction;this._resizeFunction=resizeFunction;this.MinimumWidth=minimumWidth;this.MinimumHeight=minimumHeight;this.FitToWindow=false;this._initialized=false;this._popupPanel=null;this._ignoreClose=false;this._setInlineEditorPanelFunction=setInlineEditorPanelFunction;}
Telligent_InlineEditor.prototype._setContent=function(html)
{if(!this._initialized)
this._initialize();html=this._trim(html);if(this._setContentFunction)
this._setContentFunction(html);}
Telligent_InlineEditor.prototype._trim=function(text)
{return text.replace(/^\s+|\s+$/g,'');}
Telligent_InlineEditor.prototype._getContent=function()
{if(!this._initialized)
this._initialize();if(this._getContentFunction)
return this._getContentFunction();else
return"";}
Telligent_InlineEditor.prototype._setInlineEditorPanel=function(inlineEditorPanel,parameter)
{this._inlineEditorPanel=inlineEditorPanel;this._ignoreClose=false;if(this._setInlineEditorPanelFunction)
this._setInlineEditorPanelFunction(this._inlineEditorPanel,parameter);}
Telligent_InlineEditor.prototype.Focus=function()
{if(!this._initialized)
this._initialize();if(this._setFocusFunction)
this._setFocusFunction();}
Telligent_InlineEditor.prototype._setStyleContext=function(styleArray)
{if(!this._initialized)
this._initialize();if(!this._getStyleContextElementFunction)
return;var element=this._getStyleContextElementFunction();if(!element)
return;for(var i=0;i<styleArray.length;i++)
{try{eval('element.style.'+styleArray[i][0]+' = \''+styleArray[i][1]+'\';');}catch(err){}}}
Telligent_InlineEditor.prototype._resize=function(width,height)
{if(!this._initialized)
this._initialize();if(this._resizeFunction)
this._resizeFunction(width,height);}
Telligent_InlineEditor.prototype.Save=function()
{if(!this._initialized)
this._initialize();this._ignoreClose=true;if(this._inlineEditorPanel)
{this._inlineEditorPanel.Save();this._inlineEditorPanel._abandonedContent=null;}}
Telligent_InlineEditor.prototype.Close=function()
{if(!this._initialized)
this._initialize();this._ignoreClose=true;if(this._inlineEditorPanel)
{this._inlineEditorPanel._abandonedContent=null;this._inlineEditorPanel.Close();}}
Telligent_InlineEditor.prototype.IsShown=function()
{if(!this._initialized)
this._initialize();return this._popupPanel.IsShown();}
Telligent_InlineEditor.prototype._hide=function()
{this._ignoreClose=true;if(this._popupPanel)
this._popupPanel.Hide();}
Telligent_InlineEditor.prototype._show=function(element)
{if(!this._initialized)
this._initialize();if(this.IsShown())
this._popupPanel.Hide();var elementInfo=Telligent_Common.GetElementInfo(element);var windowInfo=Telligent_Common.GetWindowInfo();if(this.FitToWindow)
{var recalculateElementInfo=false;if(elementInfo.Top<windowInfo.ScrollY||elementInfo.Top+elementInfo.Height>windowInfo.ScrollY+windowInfo.Height)
{if(elementInfo.Height<windowInfo.Height)
window.document.documentElement.scrollTop=elementInfo.Top-((windowInfo.Height-elementInfo.Height)/2);else
window.document.documentElement.scrollTop=elementInfo.Top;recalculateElementInfo=true;}
if(elementInfo.Left<windowInfo.ScrollX||elementInfo.Left+elementInfo.Width>windowInfo.ScrollX+windowInfo.Width)
{if(elementInfo.Width<windowInfo.Width)
window.document.documentElement.scrollLeft=elementInfo.Left-((windowInfo.Width-elementInfo.Width)/2);else
window.document.documentElement.scrollLeft=elementInfo.Left;recalculateElementInfo=true;}
if(recalculateElementInfo)
elementInfo=Telligent_Common.GetElementInfo(element);}
var width=elementInfo.Width;var left=elementInfo.Left;var height=elementInfo.Height;var top=elementInfo.Top;if(this.FitToWindow)
{if(width>windowInfo.Width)
{width=windowInfo.Width-(windowInfo.Width*.1);left+=(windowInfo.Width*.05);}
if(height>windowInfo.Height)
{height=windowInfo.Height-(windowInfo.Height*.1);top+=(windowInfo.Height*.05);}}
this._popupPanel.Show(left,top,0,0,true);this._resize((width<this.MinimumWidth&&this.MinimumWidth>0?this.MinimumWidth:width),(height<this.MinimumHeight&&this.MinimumHeight>0?this.MinimumHeight:height));this._popupPanel.Refresh();}
Telligent_InlineEditor.prototype._initialize=function()
{if(this._inititalized)
return;this._popupPanel=new Telligent_PopupPanel(this._variableName+'._popupPanel',this.CssClass,'rightdown',100,null,new Function('window.'+this._variableName+'._popupPanelClosed();'),false,'');this._popupPanel._initialize();this._popupPanel.ClearPanelContent();this._popupPanel.AddNodeToPanel(this._container);this._container.style.display='block';this._initialized=true;}
Telligent_InlineEditor.prototype._popupPanelClosed=function()
{if(!this._ignoreClose)
{if(this._inlineEditorPanel)
{this._inlineEditorPanel._abandonedContent=this._getContent();this._inlineEditorPanel.Close();}}
else
this._ignoreClose=false;}