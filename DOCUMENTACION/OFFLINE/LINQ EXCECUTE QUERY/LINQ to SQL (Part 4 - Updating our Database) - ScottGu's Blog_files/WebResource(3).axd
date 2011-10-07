function PostRating (varName, containerId, valueId, numberOfItems, imagesPathUrl, useHalfStars, containerStyleClass, containerOverStyleClass, containerReadOnlyStyleClass, titles, isReadOnly, allowMultipleSelections) 
{
	this.VariableName = varName;
	this.ValueHandle = document.getElementById(valueId);
	this.ContainerHandle = document.getElementById(containerId);
	this.ImagesPathUrl = imagesPathUrl;
	this.UseHalfStars = useHalfStars;
	this.Items = new Array(numberOfItems);
	this.IsInitialized = false;
	this.NumberOfItems = numberOfItems;
	this.ContainerStyleClass = containerStyleClass;
	this.ContainerOverStyleClass = containerOverStyleClass;
	this.ContainerReadOnlyStyleClass = containerReadOnlyStyleClass;
	this.Titles = titles;
	this.IsReadOnly = isReadOnly;
	this.AllowMultipleSelections = allowMultipleSelections;
	this.SetAnimationHandle = null;
	this.SavingValue = false;
	this.CachedImages = new Array();
	
	this.MouseOver = function (value)
	{
		if (!this.IsInitialized || this.IsReadOnly)
			return;
			
		this.ContainerHandle.className = this.ContainerOverStyleClass;
	
		this.ShowValue(value);
	}
	
	this.MouseOut = function ()
	{
		if (!this.IsInitialized || this.IsReadOnly)
			return;
			
		this.ContainerHandle.className = this.ContainerStyleClass;
		
		this.ShowCurrentValue();
	}
	
	this.SetValue = function (value)
	{
		if (!this.IsInitialized || this.IsReadOnly)
			return;
		
		this.ShowValue(value);	
		this.ValueHandle.value = value;
		
		if (this.SetAnimationHandle)
			window.clearTimeout(this.SetAnimationHandle);
			
		if (!this.AllowMultipleSelections)
			this.IsReadOnly = true;
			
		this.SavingValue = true;
		eval(this.VariableName + "_ajax").SaveRating(value, new Function('result', 'window.' + this.VariableName + '.ValueSaved(result);'), new Function("alert('An error occured while saving the rating value.');"));
			
		this.SetAnimationHandle = window.setTimeout(this.VariableName + ".SetAnimation(0);", 99);
	}
	
	this.ValueSaved = function(result)
	{
		result = eval(result);
	
		this.ValueHandle.value = result[0];
		this.ContainerHandle.title = result[1];
		this.IsReadOnly = result[3] != 'true';
		if (result[2])
		{
			if (this.IsReadOnly)
			{
				this.ContainerHandle.onclick = new Function(result[2]);
				this.ContainerHandle.style.cursor = "pointer";
			}
		}
			
		this.SavingValue = false;
	}
	
	this.SetAnimation = function (step)
	{
		if (step > 6 || !this.IsInitialized)
		{
			if (!this.AllowMultipleSelections)
				this.IsReadOnly = true;
			
			this.Initialize();
			return;
		}
			
		if (step % 2 == 0)
			this.ContainerHandle.className = this.ContainerStyleClass;
		else
			this.ContainerHandle.className = this.ContainerOverStyleClass;

		if (!this.SavingValue)
			step = step + 1;
		else
			step = (step + 1) % 2;
			
		this.SetAnimationHandle = window.setTimeout(this.VariableName + ".SetAnimation(" + step + ");", 199);
	}
	
	this.ShowValue = function (value)
	{
		if (!this.IsInitialized)
			return;
			
		var i;
		var j = this.NumberOfItems * 2;
		value = value * 2;
		value = value - 1;
			
		for (i = 0; i < j; i++)
		{
			if (i <= value)
				this.ContainerHandle.childNodes[i].src = this.GetItemsOnSrc(i);
			else
				this.ContainerHandle.childNodes[i].src = this.GetItemsOffSrc(i);
		}
	}
	
	this.ShowCurrentValue = function()
	{
		if (!this.IsInitialized)
			return;
			
		this.ShowValue(this.ValueHandle.value);
	}
	
	this.GetValue = function()
	{
		if (!this.IsInitialized)
			return null;

		return this.ValueHandle.value;
	}
	
	this.GetItemsOnSrc = function (index)
	{
		if (index % 2 == 1)
			return this.ImagesPathUrl + 'star-right-on.gif';
		else
			return this.ImagesPathUrl + 'star-left-on.gif';
	}
	
	this.GetItemsOffSrc = function (index)
	{
		if (index % 2 == 1)
			return this.ImagesPathUrl + 'star-right-off.gif';
		else
			return this.ImagesPathUrl + 'star-left-off.gif';
	}
	
	this.GetItemTitle = function (index, value)
	{
		if (typeof(this.Titles) == "object")
			return this.Titles[index].replace("{0}", (value));
		else if (this.Titles)
			return this.Titles.replace("{0}", (value));
		else
			return value;			
	}
	
	this.CacheImages = function()
	{
		var image;
		var url;
		var i;
		var j = 2;

		for (i = 0; i < j; i++)
		{
			url = this.GetItemsOnSrc(i);
			if (!this.IsImageCached(url))
			{
				image = new Image();
				image.src = url;
				this.CachedImages[this.CachedImages.length] = image;
			}
			
			url = this.GetItemsOffSrc(i);
			if (!this.IsImageCached(url))
			{
				image = new Image();
				image.src = url;
				this.CachedImages[this.CachedImages.length] = image;
			}
		}
	}
	
	this.IsImageCached = function (url)
	{
		var i;
		for (i = 0; i < this.CachedImages.length; i++)
		{
			if (this.CachedImages[i].src == url)
				return true;
		}
		
		return false;
	}
	
	this.Initialize = function()
	{
		this.CacheImages();
	
	    if (this.ContainerHandle != null) {
	
		    while (this.ContainerHandle.childNodes.length > 0)
			    this.ContainerHandle.removeChild(this.ContainerHandle.childNodes[0]);
    			
		    if (!this.IsReadOnly)
			    this.ContainerHandle.className = this.ContainerStyleClass;
		    else
			    this.ContainerHandle.className = this.ContainerReadOnlyStyleClass;
    	
		    var i, e, value;
		    var j = this.NumberOfItems * 2;
    		
		    for (i = 0; i < j; i++)
		    {
			    e = document.createElement("img");
    			
			    value = (i + 1) / 2;

			    if (value <= this.ValueHandle.value)
				    e.src = this.GetItemsOnSrc(i);
			    else
				    e.src = this.GetItemsOffSrc(i);
    				
			    if (!this.IsReadOnly)
			    {
				    if (!this.UseHalfStars)
				    {
					    value = Math.ceil(value);
					    e.title = this.GetItemTitle(value, value);
				    }
				    else
					    e.title = this.GetItemTitle(i, value);

				    e.onclick = new Function("window." + this.VariableName + ".SetValue(" + value + ");");
				    e.onmouseover = new Function("window." + this.VariableName + ".MouseOver(" + value + ");");
				    e.onmouseout = new Function("window." + this.VariableName + ".MouseOut();");
			    }

			    e.align = "absmiddle";
			    e.border = 0;		
    			
			    this.ContainerHandle.appendChild(e);
		    }
    		
		    this.IsInitialized = true;
        }
	}
	
	this.Initialize();
}
