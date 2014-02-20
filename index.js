
/**
 * mouseleave
 */

var within = require('stagas-within')
var events = require('component-event')

module.exports = mouseleave

var listeners = []
var fns = []

function mouseleave (el, fn) {
  function listener (ev) {
    var inside = within(ev, ev.target, 'toElement')
    if (inside) return
    if (fn) fn.call(this, ev)
  }
  listeners.push(listener)
  fns.push(fn)
  events.bind(el, 'mouseout', listener)
}

mouseleave.bind = mouseleave

mouseleave.unbind = function (el, fn) {
  var idx = fns.indexOf(fn)
  if (!~idx) return
  fns.splice(idx, 1)
  events.unbind(el, 'mouseout', listeners.splice(idx, 1)[0])
}
