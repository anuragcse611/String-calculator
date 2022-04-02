
const cal = (function(){

  function add(stringNum){

    if (stringNum === ''){
      return 0
    }
    const Delmeter = getDelmeter(stringNum)
    const inputs = clearInput(stringNum)
    return calSum(getNumbers(inputs, Delmeter))

  }

  function clearInput(input){
    const reqDelmeter = /^(\/\/.*\n)/
    const found = reqDelmeter.exec(input)
    if(found && found.length > 0){
      return input.replace(reqDelmeter,'')
    }
    return input
  }

  function getDelmeter(input) {
    const Delmeters = []
    const allDelmeter = /(?:^\/\/)?\[([^\[\]]+)\]\n?/g
    let found = allDelmeter.exec(input)
    while(found !== null){
      Delmeters.push(found[1])
      found = allDelmeter.exec(input)
    }
    if(Delmeters.length > 0){
      return new RegExp('['+Delmeters.join('')+']')
    }
    found = /^\/\/(.*)\n/.exec(input)
    if(found && found[1]){
      return found[1]
    }
    return /[\n,]/

  }

  function getNumbers(string, Delmeter){
    return string.split(Delmeter)
      .filter(n => n !== '')
      .map(n => parseInt(n))
  }

  function calSum(numbers){
    const negNum = []
    const result = numbers.reduce((sum, n) =>{
      if(n > 1000){
        return 0
      }
      if(n < 0){
        negNum.push(n)
        return 0
      }
      return sum + n
    },0)
    if(negNum.length > 0){
      throw new Error('negNum not allowed: '+negNum.join(','))
    }
    return result
  }


  return {add}

}())



console.log(cal.add('3,3,3')) // 6
console.log(cal.add('3\n3,3')) // 6
console.log(cal.add('//;\n3;2;3')) // 6
console.log(cal.add('1011,2')) // 6
console.log(cal.add('//[**]\n3**3**3')) // 6
console.log(cal.add('//[*][%]\n3*3%3')) // 6
console.log(cal.add('//[..][%%]\n3..3%%3')) // 6
console.log(cal.add('-3,-4,2')) // 6
