const securityEncode = (a, c, b) => {
  var d = '',
    e, f, g, h, k = 187,
    m = 187
  f = a.length
  g = c.length
  h = b.length
  e = f > g ? f : g
  for (var l = 0; l < e; l++) m = k = 187,
    l >= f ? m = c.charCodeAt(l) : l >= g ? k = a.charCodeAt(l) : (k = a.charCodeAt(l), m = c.charCodeAt(l)),
    d += b.charAt((k ^ m) % h)
  return d
}

const a = 'RDpbLfCPsJZ7fiv'
const c = 'yLwVl0zKqws7LgKPRQ84Mdt708T1qQ3Ha7xv3H7NyU84p21BriUWBU43odz3iP4rBL3cD02KZciXTysVXiV8ngg6vL48rPJyAUw0HurW20xqxv9aYb4M9wK1Ae0wlro510qXeU07kV57fQMc8L6aLgMLwygtc0F10a0Dg70TOoouyFhdysuRMO51yY5ZlOZZLEal1h0t9YQW0Ko7oBwmCAHoic4HYbUyVeU3sfQ1xtXcPcf1aT303wAQhv66qzW'

const b = '11'
const res = securityEncode(a, b, c)
console.log(res)
