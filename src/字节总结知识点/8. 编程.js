String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
}
<!-- /^\s+/  /\s+$/ -->

function deepCopy(obj,map=new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj
  if (map.has(obj)) return map.get(obj)
  let clone = Array.isArray(obj) ? [] : {}
  map.set(obj,clone)
  
}