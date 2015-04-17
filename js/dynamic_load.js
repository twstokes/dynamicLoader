/*

Dynamic image loader plugin for responsive designs
Tanner Stokes
www.tannr.com
Version 0.1

*/

(function( $ ) {

  $.fn.dynamicLoader = function(options) {
    // handle options passed in
    var opts = $.extend( {}, $.fn.dynamicLoader.defaults, options );
    // process each element matched
    return this.each(function() {
      $.fn.dynamicLoader.detectAndSet(this);
    });
  }

  // set some defaults
  $.fn.dynamicLoader.defaults = {
      minWidths : {
        "lg" : 1200,
        "md" : 992,
        "sm" : 768,
        "xs" : 0
      }
  }

  // detect the proper size string for the image
  $.fn.dynamicLoader.detectSizeString = function(imgNode) {
    // width of the image's parent
    // testing showed the parent size was always the same for Bootstrap at least
    // on initial load the image would have a value of 0 and wouldn't work here
    var width = $(imgNode).parent().width();
    // iterate through each width
    $.each($.fn.dynamicLoader.defaults.minWidths, function(sizeString, sizeWidth) {
      returnSize = sizeString;
      // break out of the loop if the width of the element is greater
      if(width > sizeWidth) {  
        return false;
      }
    });

    return returnSize;
  }

  // iterate through each adaptive image and set the new source if necessary
  $.fn.dynamicLoader.detectAndSet = function(imgNode) {
      // detect what the size string should be
      var sizeString = $.fn.dynamicLoader.detectSizeString(imgNode);

      // if our property doesn't match our detected size string
      // on the first run the property will be undefined
      // !! consider doing a check to quickly see if we're still within the bounds of the size we're on
      // rather than iterate every time
      if(sizeString !== imgNode.sizeString) {
        // set the size string property
        imgNode.sizeString = sizeString;
        // construct the new file name
        var newFileName = $.fn.dynamicLoader.constructFilename(imgNode)
        // set the new image
        $.fn.dynamicLoader.setNewImage(imgNode, newFileName);
      } 
  }

  // change the image by setting the src attribute
  $.fn.dynamicLoader.setNewImage = function(imgNode, newFileName) {
    $(imgNode).attr('src', newFileName);
  }

  // create the new filename
  $.fn.dynamicLoader.constructFilename = function(imgNode) {
    // base name attribute
    var basename = $(imgNode).attr('src-basename');
    // extension attribute
    var extension = $(imgNode).attr('src-ext');
    // size string property
    var sizeString = imgNode.sizeString;
    // construct the new filename
    var newFileName = basename + '-' + sizeString + extension;

    return newFileName;
  }

})( jQuery );