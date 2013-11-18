function is_touch() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
}
if( is_touch() ) {
    var $sideBar = document.getElementById('sidebar'),
        $content = document.getElementById('content'),
        $default = $sideBar.offsetWidth,
        $origX = 0,
        $viewport = document.querySelector('meta[name="viewport"]'),
        $minW = 30;
    if(sessionStorage.beenSeen == 'true') {
        $sideBar.style.width = $minW + 'px';
        $content.style.marginLeft = $minW + 'px';
    } else {
         jQuery(document).ready(function() {
           jQuery('#sidebar').animate({width:$minW}, 1000);
           jQuery('#content').animate({marginLeft:$minW}, 1000, function(){
            sessionStorage.beenSeen = 'true';   
           });
        });   
    }

    $sideBar.addEventListener('touchstart', function (event) {
        $origX = event.targetTouches[0].pageX;
        $viewport.content = 'user-scalable=false, width=device-width';
    }, false);
    $sideBar.addEventListener('touchmove', function (event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            var $pageX = event.targetTouches[0].pageX;
            $pageX = ($pageX - $origX) + $sideBar.offsetWidth;
            if($pageX <= $default && $pageX >= $minW) {
                $sideBar.style.width = $pageX + 'px';
                $content.style.marginLeft = $pageX + 'px';
            }
        }
    }, false);
    $sideBar.addEventListener('touchend', function (event) {
        $viewport.content = 'initial-scale=1.0, width=device-width';
    }, false);
};