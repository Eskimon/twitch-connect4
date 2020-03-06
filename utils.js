// Some hacky hack to ease the translation things...

var Strings = {
  templatize : (function() {
    var regexp = /{([^{]+)}/g;

    return function(str, o) {
      return str.replace(regexp, function(ignore, key){
        return (key = o[key]) == null ? '' : key;
      });
    }
  })()
};

String.prototype.templatize = function(o) {
  return Strings.templatize(this, o);
}
