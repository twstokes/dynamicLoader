# dynamicLoader
Responsive Design Dynamic Loader experiment

**[Demo](http://labs.tannr.com/projects/bootstrap-adaptive/)**

A simple jQuery plugin to dynamically load images based on responsive screen size. The idea is that smaller screens should load lower res images to reduce bandwidth.

By default the plugin expects four image sizes (that follow the Bootstrap breakpoints):
<pre>
* xs < 768px
* 768px >= sm < 992px
* 992px >= md < 1200px
* 1200px >= lg
</pre>

**To use:**

1. A version of the image should be created for each size: e.g. image-xs.jpg through image-lg.jpg
2. Add a special class to all images you want dynamic (this example uses .adaptive-image)
3. Set the src-basename and src-ext attributes

<pre><code>
  // Bind the following:
  // process our images on load
  $(document).ready(function() {
      $('img.adaptive-image').dynamicLoader();
  });

  // process our images on a resize
  $(window).resize(function() {
      $('img.adaptive-image').dynamicLoader();
  });</code></pre>
  
  ***Notes:***
  * Resizing on a large screen is inefficient
  * A new HTTP request happens on each image replacement
  * If a connection is slow, the image will be replaced once the new one is loaded
  * A task runner could be put into place to load the specified image sizes and batch process images
  
