'use strict'

Function::method = (name, func) ->
  @::[name] = func
  this

if typeof Object.create isnt 'function'
  Object.create = (obj) ->
    Func = ->
    Func:: = obj
    new Func

# Global Namespace for the app
MW = {}


MW.stooge =
  firstName: "Jerome"
  lastName: 'Howard'


MW.flight =
  airline: 'Oceanic'
  number: 815
  departure:
    IATA: "SYD"
    time: "2004-09-22 14:55"
    city: 'Sydney'
  arrival:
    IATA: "LAX"
    time: "2004-09-23 10:42"
    city: 'Los Angeles'


MW.flight.equipment =
  model: 'Boeing 777'
MW.flight.status = 'overdue'

console.log MW.flight
MW.stooge.nickname = 'Curly'
MW.another_stooge = Object.create MW.stooge
MW.another_stooge.firstName = "Harry"
MW.another_stooge.middleName = "Moses"
MW.another_stooge.nickname = 'Moe'
MW.stooge.profession = 'actor'
console.log MW.another_stooge

console.log MW.flight.hasOwnProperty 'number'

for key, value of MW.another_stooge
  console.log "#{key}: #{value}"

delete MW.another_stooge.nickname
console.log MW.another_stooge.nickname
