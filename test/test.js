describe('responsive tabs to accordion', function () {
  var tabsMarkup = require('./tab-snip.html');
  var assert = require('component/assert');
  var $tabs, $panels;
  beforeEach(function () {
    $('#fixture').html(tabsMarkup);
  });

  afterEach(function () {
    $('#fixture').html('');
  });

  describe('Arrow key navigation', function () {
    it('should move to the NEXT tab when down or right is pressed', function () {
      $tabs = $('#navlist > li > a');

      $tabs[0].focus();
      var e = $.Event('keydown');
      e.which = 39; // RIGHT ARROW
      $($tabs[0]).trigger(e);

      assert(document.activeElement === $tabs[1]);

      var ev = $.Event('keydown');
      ev.which = 40; // DOWN ARROW
      $($tabs[1]).trigger(ev);

      assert(document.activeElement === $tabs[2]);
    });

    it('should move to the PREVIOUS tab when left or up is pressed', function () {
      $tabs = $('#navlist > li > a');

      $tabs[2].focus();
      var keyVent = $.Event('keydown');
      keyVent.which = 37; // LEFT ARROW
      $($tabs[2]).trigger(keyVent);

      assert(document.activeElement === $tabs[1]);

      var kv = $.Event('keydown');
      kv.which = 38; // DOWN ARROW
      $($tabs[1]).trigger(kv);

      assert(document.activeElement === $tabs[0]);
    });

    it('should go from the first to the last tab traversing backwards', function () {
      $tabs = $('#navlist > li > a');

      $tabs[0].focus();
      var e = $.Event('keydown');
      e.which = 37; // LEFT ARROW
      $($tabs[0]).trigger(e);

      assert(document.activeElement === $tabs[$tabs.length - 1]);
    });

    it('should go from the last to the first tab traversing forwards', function () {
      $tabs = $('#navlist > li > a');
      $tabs[$tabs.length - 1].focus(); // focus the last tab
      var e = $.Event('keydown');
      e.which = 39;
      $($tabs[$tabs.length - 1]).trigger(e);

      assert(document.activeElement === $tabs[0]);
    });
  });

  describe('activating tabs/panels', function () {
    it('should display only the active tab when a tab is clicked', function () {
      $tabs = $('#navlist > li > a');
      $panels = $('.panel');
      $tabs[2].click();

      $panels.each(function (i) {
        if (2 === i) {
          assert($(this).hasClass('current'));
        } else {
          assert(!$(this).hasClass('current'));
        }
      });
    });

    it('should update/apply proper attributes when a tab is selected', function () {
      $tabs = $('#navlist > li > a');
      $panels = $('.panel');

      $tabs[1].click(); // clicks the second tab

      $tabs.each(function (i) {
        if (1 === i) {
          assert($(this.parentNode).hasClass('active'));
          assert(this.getAttribute('aria-selected') === 'true');
          assert(this.tabIndex === 0);
        } else {
          assert(!$(this.parentNode).hasClass('active'));
          assert(this.getAttribute('aria-selected') === 'false');
          assert(this.tabIndex === -1);
        }
      });

      $panels.each(function (i) {
        if (1 === i) {
          assert(this.getAttribute('aria-hidden') === 'false');
        } else {
          assert(this.getAttribute('aria-hidden') === 'true');
        }
      });
    });
  });


  describe('Responsive: based on the window\'s width, either tabs or accordion', function () {
    if ($(window).width() <= 800) {
      it('should be markedup as an accordion', function () {
        var $container = $('#tab-container');
        assert($container.hasClass('accordion-view')); // ensure it has the proper class
        $container.find('.panels').each(function () {
          // in the accordion view, the panels are within the div#tab-container
          assert($(this).closest('#tab-container')[0]);
        });
      });
    } else {
      it('should be markuped as tabs', function () {
        var $container = $('#tab-container');
        assert($container.hasClass('tabs-view')); // ensure it has the proper class
        $container.find('.panels').each(function () {
          // in the tabs view, the panels are within the div#panels
          assert($(this).closest('#panels')[0]);
        });
      });
    }
  });

});
