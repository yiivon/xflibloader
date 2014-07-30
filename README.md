xflibloader
===========

*load javascript and css resource dynamically, orderly, implemented loaded events for single resource and every execution. support for IE6+, FF, Chrome, Opera, and so on.*

simple usage
------------

- 	load single file
```XFLibLoader.load('demo/js/finished-param-string.js');```

-	load finished.js without specifing host, reporting loaded event.
```XFLibLoader.load({file:'demo/js/finished-param-object.js', loaded:function(){
    xfoutput('<i>finished-param-object.js loaded event</i>');
}});
```

-	load (1-3).js without specifing host, reporting every resource's loaded event
```XFLibLoader.load([
    {file:'demo/js/1.js', loaded:function(){
        xfoutput('<i>1.js loaded event</i>');
    }},
    {file:'demo/js/2.js', loaded:function(){
        xfoutput('<i>2.js loaded event</i>');
    }},
    {file:'demo/js/3.js', loaded:function(){
        xfoutput('<i>3.js loaded event</i>');
    }}
]);
```

-	after (1-5).js loaded orderly in directory "demo/js/", finished.js should be loaded also.
```XFLibLoader.load({
        host: 'demo/js',
        libs: ['1.js', '2.js', '3.js', '4.js', '5.js'],
        order: true,
        loaded: function () {
            XFLibLoader.load('finished.js');
        }
	});
```