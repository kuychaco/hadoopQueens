var mapreduce = function (data, map, reduce) {
        var mapResult = [], reduceResult = [];
        var mapIx, reduceKey;
        
        var mapEmit = function(key, value) {
                if(!mapResult[key]) {
                        mapResult[key] = [];
                }
                mapResult[key].push(value);
        };
        
        var reduceEmit = function(obj) {
                reduceResult.push(obj);
        };
        
        for(mapIx = 0; mapIx < data.length; mapIx++) {
                map(data[mapIx], mapEmit);
        }
        
        for(reduceKey in mapResult) {
                reduce(reduceKey, mapResult[reduceKey], reduceEmit);
        }
        
        return reduceResult;
};

var nQueens = function(n) {
  var boards, solutions,
      cap = (1<<n) - 1;

  var qMap = function(d, emitter) {
    var possible = ~(d[0] | d[1] | d[2]) & d[3],
        pick;

    while (possible > 0) {
      pick = -possible & possible;
      possible = possible ^ pick;
      emitter('boards',[(d[0] | pick)<<1,(d[1] | pick),(d[2] | pick)>>>1,d[3]]);
    }
    if (d[1] === d[3]) emitter('solutions',1);
  };

  var qReduce = function(key, value, emitter) {
    switch (key) {
      case 'boards':
        emitter(value);
        break;
      case 'solutions':
        emitter(value.reduce(function(prev,val) {
          return prev + val;
        }));
        break;
      default:
        emitter(value);
    }
  };

  boards = [[0,0,0,cap]];
  solutions = 0;
  var row = 1;

  while (cap > 0 && boards.length > 0) {
    var result = mapreduce(boards, qMap, qReduce);
    boards = (result[0] instanceof Array) ? result[0] : [];
    solutions = (!(result[0] instanceof Array)) ? solutions + result[0] : solutions;
    if (row < n) {
      console.log('R: ' + row);
      console.log('B: ' + boards.length + '\n');
      row++;
    }
  }
  return solutions;
};