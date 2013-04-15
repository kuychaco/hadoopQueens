var initArray = function(n, initial) {
  var result = [];
  for (var i = 0; i < n; i++ {
    result.push[initial];
  }
  return result;
}

var orBits = function() {

};

var placeQueens = function(leftThreats, columns, rightThreats) {
  var leftThreats = leftThreats || initArray
  var validSpots = 
};


var whereQueens = function(n) {
  var result = initArray(n, 0);

};

var Board = function() {
  //Left and Right DiagState is 2N-1
  var leftDiagState = [];
  var rightDiagState = [];
  var columns = [];
  var dimension;

  this.toString = function() {
    return JSON.stringify([leftDiagState, rightDiagState, columns, dimension] )
  }

  this.init = function(n) {
    dimension = n || 1;
    for (var i = 0; i < (2*n); i++) {
      leftDiagState.push(false);
    }
    rightDiagState = leftDiagState.slice(0);
    columns = rightDiagState.slice(0,n);
  };

  this.possible = function(row) {
    var result = [];
    for (var i = 0; i < dimension; i++) {
      result.push(!leftDiagState[row+i] || !rightDiagState[rightDiagState.length-(row+i+1)] || !columns[i]);
    };
    return (row < dimension) ? result : undefined;
  };

  this.pick = function(row, choice) {
    if (this.possible(row)[choice]) {
      leftDiagState[row+choice] = true;
      rightDiagState[rightDiagState.length-row-choice-1] = true;
      columns[choice] = true;
    };
  };

}

var boardState = new Board();
boardState.init(5);
