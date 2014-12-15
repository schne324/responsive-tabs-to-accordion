(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
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

}, {"./tab-snip.html":2,"component/assert":3}],
2: [function(require, module, exports) {
module.exports = '<div id="tab-container" aria-multiselectable="false" class="tabs-view">\n    <ul id="navlist" role="tablist">\n      <li class="active">\n        <a role="tab" tabindex="0" href="#" aria-controls="panel-1" aria-selected="true">Tab one</a>\n      </li>\n      <li>\n        <a role="tab" tabindex="-1" href="#" aria-controls="panel-2" aria-selected="false">Tab two</a>\n      </li>\n      <li>\n        <a role="tab" tabindex="-1" href="#" aria-controls="panel-3" aria-selected="false">Tab three</a>\n      </li>\n      <li>\n        <a role="tab" tabindex="-1" href="#" aria-controls="panel-4" aria-selected="false">Tab four</a>\n      </li>\n    </ul>\n    <div id="panels">\n      <div aria-hidden="false" class="panel current" id="panel-1">\n        <h3>Panel 1 content</h3>\n        <div class="panel-body">\n          Aenean feugiat velit non est tempor, id consequat nunc vehicula. Suspendisse potenti. Duis elit lectus, fringilla in scelerisque at, laoreet nec nibh. Nam ac molestie nulla. Duis eu quam lacinia, bibendum erat sed, aliquet dolor. Quisque sit amet sem non massa rhoncus ornare nec eu leo. Aliquam consequat pulvinar venenatis. In lacinia sem nec pulvinar tincidunt. Cras risus quam, tincidunt vitae libero eget, gravida commodo ligula.\n          <a href="#">fake link</a>\n        </div>\n      </div>\n      <div aria-hidden="true" class="panel" id="panel-2">\n        <h3>Panel 2 content</h3>\n        <div class="panel-body">\n          <div>\n            <label for="voodoo">voodoo lady</label>\n            <input type="radio" name="song" id="voodoo" value="voodoo lady">\n          </div>\n          <div>\n            <label for="transdermal">transdermal celebration</label>\n            <input type="radio" name="song" id="transdermal" value="transdermal celebration">\n          </div>\n          <div>\n            <label for="marbles">happy little marbles</label>\n            <input type="radio" name="song" id="marbles" value="happy little marbles">\n          </div>\n          <div>\n            <label for="roses">roses are free</label>\n            <input type="radio" name="song" id="roses" value="roses are free">\n          </div>\n          <div>\n            <input type="submit" value="submit">\n          </div>\n        </div>\n      </div>\n      <div aria-hidden="true" class="panel" id="panel-3">\n        <h3>Panel 3 content</h3>\n        <div class="panel-body">\n          Donec eu nisl et tellus mattis pharetra. Pellentesque facilisis pellentesque sem sit amet posuere. Duis eleifend, ante nec porttitor tincidunt, dolor risus posuere massa, at facilisis ligula massa ut augue. Suspendisse ut finibus augue, fringilla consequat magna. Etiam ut ultricies massa. Nullam id dui nec urna sagittis tempor at rhoncus lacus. Aenean mi quam, efficitur id purus nec, porttitor lobortis enim. Donec est libero, bibendum vel neque ut, volutpat gravida lectus. Curabitur sodales, enim ut aliquam fringilla, erat diam aliquam augue, a consectetur urna tortor sed libero. Aliquam scelerisque diam ac felis vestibulum, et porttitor mauris tincidunt. Proin congue ultrices metus sed vulputate. Integer egestas, nunc sed condimentum egestas, velit ex rhoncus libero, eget sagittis nibh nulla ut diam. Donec porta metus sed mi sollicitudin posuere. Etiam non augue a elit pharetra blandit ac sed massa. In pharetra est at purus pellentesque suscipit.\n        </div>\n      </div>\n      <div aria-hidden="true" class="panel" id="panel-4">\n        <h3>Panel 4 content</h3>\n        <div class="panel-body">\n            Fusce faucibus vel orci eget commodo. Proin quis elementum lectus. Aliquam sed velit neque. Quisque enim elit, porttitor nec nisi in, laoreet condimentum libero. Etiam accumsan mauris id tincidunt viverra. Cras euismod suscipit lorem nec aliquet. Mauris suscipit massa id nunc facilisis sodales.\n            <div>\n              <a href="#">Read More...</a>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <script src="../tabs-to-accordion.js"></script>';
}, {}],
3: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var equals = require('equals');
var fmt = require('fmt');
var stack = require('stack');

/**
 * Assert `expr` with optional failure `msg`.
 *
 * @param {Mixed} expr
 * @param {String} [msg]
 * @api public
 */

module.exports = exports = function (expr, msg) {
  if (expr) return;
  throw error(msg || message());
};

/**
 * Assert `actual` is weak equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.equal = function (actual, expected, msg) {
  if (actual == expected) return;
  throw error(msg || fmt('Expected %o to equal %o.', actual, expected), actual, expected);
};

/**
 * Assert `actual` is not weak equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.notEqual = function (actual, expected, msg) {
  if (actual != expected) return;
  throw error(msg || fmt('Expected %o not to equal %o.', actual, expected));
};

/**
 * Assert `actual` is deep equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.deepEqual = function (actual, expected, msg) {
  if (equals(actual, expected)) return;
  throw error(msg || fmt('Expected %o to deeply equal %o.', actual, expected), actual, expected);
};

/**
 * Assert `actual` is not deep equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.notDeepEqual = function (actual, expected, msg) {
  if (!equals(actual, expected)) return;
  throw error(msg || fmt('Expected %o not to deeply equal %o.', actual, expected));
};

/**
 * Assert `actual` is strict equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.strictEqual = function (actual, expected, msg) {
  if (actual === expected) return;
  throw error(msg || fmt('Expected %o to strictly equal %o.', actual, expected), actual, expected);
};

/**
 * Assert `actual` is not strict equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.notStrictEqual = function (actual, expected, msg) {
  if (actual !== expected) return;
  throw error(msg || fmt('Expected %o not to strictly equal %o.', actual, expected));
};

/**
 * Assert `block` throws an `error`.
 *
 * @param {Function} block
 * @param {Function} [error]
 * @param {String} [msg]
 * @api public
 */

exports.throws = function (block, err, msg) {
  var threw;
  try {
    block();
  } catch (e) {
    threw = e;
  }

  if (!threw) throw error(msg || fmt('Expected %s to throw an error.', block.toString()));
  if (err && !(threw instanceof err)) {
    throw error(msg || fmt('Expected %s to throw an %o.', block.toString(), err));
  }
};

/**
 * Assert `block` doesn't throw an `error`.
 *
 * @param {Function} block
 * @param {Function} [error]
 * @param {String} [msg]
 * @api public
 */

exports.doesNotThrow = function (block, err, msg) {
  var threw;
  try {
    block();
  } catch (e) {
    threw = e;
  }

  if (threw) throw error(msg || fmt('Expected %s not to throw an error.', block.toString()));
  if (err && (threw instanceof err)) {
    throw error(msg || fmt('Expected %s not to throw an %o.', block.toString(), err));
  }
};

/**
 * Create a message from the call stack.
 *
 * @return {String}
 * @api private
 */

function message() {
  if (!Error.captureStackTrace) return 'assertion failed';
  var callsite = stack()[2];
  var fn = callsite.getFunctionName();
  var file = callsite.getFileName();
  var line = callsite.getLineNumber() - 1;
  var col = callsite.getColumnNumber() - 1;
  var src = get(file);
  line = src.split('\n')[line].slice(col);
  var m = line.match(/assert\((.*)\)/);
  return m && m[1].trim();
}

/**
 * Load contents of `script`.
 *
 * @param {String} script
 * @return {String}
 * @api private
 */

function get(script) {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', script, false);
  xhr.send(null);
  return xhr.responseText;
}

/**
 * Error with `msg`, `actual` and `expected`.
 *
 * @param {String} msg
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @return {Error}
 */

function error(msg, actual, expected){
  var err = new Error(msg);
  err.showDiff = 3 == arguments.length;
  err.actual = actual;
  err.expected = expected;
  return err;
}

}, {"equals":4,"fmt":5,"stack":6}],
4: [function(require, module, exports) {
var type = require('type')

// (any, any, [array]) -> boolean
function equal(a, b, memos){
  // All identical values are equivalent
  if (a === b) return true
  var fnA = types[type(a)]
  var fnB = types[type(b)]
  return fnA && fnA === fnB
    ? fnA(a, b, memos)
    : false
}

var types = {}

// (Number) -> boolean
types.number = function(a, b){
  return a !== a && b !== b/*Nan check*/
}

// (function, function, array) -> boolean
types['function'] = function(a, b, memos){
  return a.toString() === b.toString()
    // Functions can act as objects
    && types.object(a, b, memos)
    && equal(a.prototype, b.prototype)
}

// (date, date) -> boolean
types.date = function(a, b){
  return +a === +b
}

// (regexp, regexp) -> boolean
types.regexp = function(a, b){
  return a.toString() === b.toString()
}

// (DOMElement, DOMElement) -> boolean
types.element = function(a, b){
  return a.outerHTML === b.outerHTML
}

// (textnode, textnode) -> boolean
types.textnode = function(a, b){
  return a.textContent === b.textContent
}

// decorate `fn` to prevent it re-checking objects
// (function) -> function
function memoGaurd(fn){
  return function(a, b, memos){
    if (!memos) return fn(a, b, [])
    var i = memos.length, memo
    while (memo = memos[--i]) {
      if (memo[0] === a && memo[1] === b) return true
    }
    return fn(a, b, memos)
  }
}

types['arguments'] =
types.array = memoGaurd(arrayEqual)

// (array, array, array) -> boolean
function arrayEqual(a, b, memos){
  var i = a.length
  if (i !== b.length) return false
  memos.push([a, b])
  while (i--) {
    if (!equal(a[i], b[i], memos)) return false
  }
  return true
}

types.object = memoGaurd(objectEqual)

// (object, object, array) -> boolean
function objectEqual(a, b, memos) {
  if (typeof a.equal == 'function') {
    memos.push([a, b])
    return a.equal(b, memos)
  }
  var ka = getEnumerableProperties(a)
  var kb = getEnumerableProperties(b)
  var i = ka.length

  // same number of properties
  if (i !== kb.length) return false

  // although not necessarily the same order
  ka.sort()
  kb.sort()

  // cheap key test
  while (i--) if (ka[i] !== kb[i]) return false

  // remember
  memos.push([a, b])

  // iterate again this time doing a thorough check
  i = ka.length
  while (i--) {
    var key = ka[i]
    if (!equal(a[key], b[key], memos)) return false
  }

  return true
}

// (object) -> array
function getEnumerableProperties (object) {
  var result = []
  for (var k in object) if (k !== 'constructor') {
    result.push(k)
  }
  return result
}

module.exports = equal

}, {"type":7}],
7: [function(require, module, exports) {

var toString = {}.toString
var DomNode = typeof window != 'undefined'
  ? window.Node
  : Function

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = exports = function(x){
  var type = typeof x
  if (type != 'object') return type
  type = types[toString.call(x)]
  if (type) return type
  if (x instanceof DomNode) switch (x.nodeType) {
    case 1:  return 'element'
    case 3:  return 'text-node'
    case 9:  return 'document'
    case 11: return 'document-fragment'
    default: return 'dom-node'
  }
}

var types = exports.types = {
  '[object Function]': 'function',
  '[object Date]': 'date',
  '[object RegExp]': 'regexp',
  '[object Arguments]': 'arguments',
  '[object Array]': 'array',
  '[object String]': 'string',
  '[object Null]': 'null',
  '[object Undefined]': 'undefined',
  '[object Number]': 'number',
  '[object Boolean]': 'boolean',
  '[object Object]': 'object',
  '[object Text]': 'text-node',
  '[object Uint8Array]': 'bit-array',
  '[object Uint16Array]': 'bit-array',
  '[object Uint32Array]': 'bit-array',
  '[object Uint8ClampedArray]': 'bit-array',
  '[object Error]': 'error',
  '[object FormData]': 'form-data',
  '[object File]': 'file',
  '[object Blob]': 'blob'
}

}, {}],
5: [function(require, module, exports) {

/**
 * Export `fmt`
 */

module.exports = fmt;

/**
 * Formatters
 */

fmt.o = JSON.stringify;
fmt.s = String;
fmt.d = parseInt;

/**
 * Format the given `str`.
 *
 * @param {String} str
 * @param {...} args
 * @return {String}
 * @api public
 */

function fmt(str){
  var args = [].slice.call(arguments, 1);
  var j = 0;

  return str.replace(/%([a-z])/gi, function(_, f){
    return fmt[f]
      ? fmt[f](args[j++])
      : _ + f;
  });
}

}, {}],
6: [function(require, module, exports) {

/**
 * Expose `stack()`.
 */

module.exports = stack;

/**
 * Return the stack.
 *
 * @return {Array}
 * @api public
 */

function stack() {
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack){ return stack; };
  var err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
}
}, {}]}, {}, {"1":""})
