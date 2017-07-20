/**
 * @desc Directive which describes the behavior needed to manage the
 * seek bar in the control bar. This is done via options/flags;
 * 'templateUrl', 'replace' (true/false), and 'restrict' (specifies declaration type:
 * -- 'E' element,
 * -- 'A' attribute,
 * -- 'C' class,
 * -- 'M' comment
 * @return {object} - Public
 *
 * Angular will look for directive '<seek-bar>' in HTML and call this directive to replace (restrict='E') the HTML between the tags with HTML in referenced template.
 */
(function() {
  function seekBar($document) {

    /**
     * @desc Calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occurred.
     * @param  {jQuery obj} seekBar [ Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it. ]
     * @param  {event} event   [activated triggered event]
     * @return {Integer}       [new percentage to play song]
     */
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;

      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);

      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {          // 'isolated scope' just for this directive
        onChange: '&'   // tell directive to evalute an attrib
      },
      link: function(scope, element, attributes) {
        // need posn of thumb and width of seek bar playback to determine
        //    how much of song is remaining to be played.
        scope.value = 0;
        scope.max = 100;
        //scope.volume = 45;      // default setting

        var seekBar = $(element);

        // use $observe to monitor changes in an attrib
        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });

        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        });

        // attributes.$observe('volume', function(newValue) {
        //   console.log('vol= ', newValue);
        //   scope.volume = newValue;
        // });

        // calculates % based on value and max value of a seek bar
        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;

          return percent + "%";
        };

        /**
        // @function fillStyle() - Public
        // @desc Formats seekbar based on how much of song has played.
        // (Is now visible since added to 'scope')
        */
        scope.fillStyle = function() {
          // formatted seekbar width to modify HTML
          return { width: percentString() };
        };

        /**
        // @function onClickSeekBar() - Public
        // @desc activated when seekbar clicked to adjust song playback posn
        // @param [$event] - saved to refer to page location
        */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);

          scope.value = percent * scope.max;

          // send updated value to func updated by onChange (in return object as property of scope)
          notifyOnChange(scope.value);
        };

        /**
        // @function thumbStyle() - Public
        // @desc format thumb portion of fill bar to show adjusted position
        */
        scope.thumbStyle = function() {
          return { left: percentString() };
        };


        /**
         * @function trackThumb() - Public
         * @desc Similar to scope.onClickSeekBar, but uses $apply to constantly apply the changed value as user drags seek bar thumb.
         */
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
              scope.$apply(function() {
                scope.value = percent * scope.max;

                // send updated scope value to func updated by onChange (in return object as property of scope object)
                notifyOnChange(scope.value);
              });
            });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

        /**
         * @function notifyOnChange() - Private
         * @desc Notifies onChange property of 'scope' which calls the function in the attribute ('&' flag)
         * @param  {Number} newValue changed value to apply to setting
         */
        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') {
            scope.onChange( { value: newValue } );
          }
        };
      } // end link attribute of returned object
    };
  }

  // With Angular, $document must be injected as a dependency to use it
  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar ] );
})();
