var nQueenSolution = function(n) {
  var board      = [],
      globalCost = 0,
      maxCostIndex;


  var checkQueens = function(queen) {
    var thisCost = 0;

    for (var i = 0; i < n; i++) {
      if (queen === i) {
        continue;
      } else if (board[queen] - board[i] === i - board.indexOf(queen)) {
        thisCost++;
      };
    };
    return thisCost;
  };


  var generateBoard = function(n) {
    var arrayOnetoN = []

    for (var i = 0; i<n; i++) {
      arrayOnetoN.push(i)
    };
   var rows = fisherYates(arrayOnetoN.slice(0));
   var columns = fisherYates(arrayOnetoN.slice(0));
   for (var i = 0; i < n; i++) {
      board[columns[i]] = rows[i];
   }
   for (var i = 0; i < n; i++) {
    globalCost += checkQueens(i);
   }

  };

  var switchQueens = function(queen1, queen2) {
    var priorCost = checkQueens(queen1);
    originalQueen1Index = board.IndexOf(queen1);
    originalQueen2Index = board.IndexOf(queen2);
    originalQueen1Index = queen2;
    originalQueen2Index = queen1;
    var afterCost = checkQueens(queen1);
    if (afterCost > priorCost) {
      originalQueen1Index = queen1;
      originalQueen2Index = queen2;
      return 0;
    };
    return priorCost - afterCost;
  };

  this.solve = function(){
    var iterations = 0;
    while (globalCost) {
      var randomQueen1 = Math.floor(Math.random()*n);
      var randomQueen2 = Math.floor(Math.random()*n);
      if (randomQueen1 === randomQueen2) continue;
      console.log(globalCost)
      // a check to see whether or not that a given switch of pair increases or decreases that global cost
      globalCost += switchQueens(randomQueen1, randomQueen2);
      iterations++;
      if (iterations > Math.pow(n,2)) break;
    }
    return [board, iterations, globalCost];
  }

  generateBoard(n);
};

function fisherYates ( myArray ) {
  var i = myArray.length, j, tempi, tempj;
  if ( i == 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     tempi = myArray[i];
     tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   };
  return myArray;
}