var Timer = function(func, n) {
  var Start = Date.now();

  console.log(func(n));
  var End = Date.now();
  console.log(End - Start + " milliseconds");
}

// var nQueens = function(n, ld, col, rd, cap, position) {
//   var cap = (1<<n) - 1,
//       ld  = ld  || 0,
//       col = col || 0,
//       rd  = col || 0,
//       sol = 0,
//       pos = ~(ld | col | rd) & cap;
//   while (pos > 0) {
//     var pick = -pos & pos;
//          pos = pos ^ pick;
//     sol += nQueens(n, (ld | pick) << 1, (col | pick), (rd | pick)>>1, cap)
//   }
//   col == cap && (sol++);
//   return sol;
// };


var nQ = function(n, solution, ld, col, rd, cap) {
  var recursionCount = 0,
      s = 0,
      c = (1<<n) - 1;

  var f = function(ld, col, rd, c) {
        var pos = ~(ld | col | rd) & c;
        while (pos > 0) {
          var pick = -pos & pos;
          pos = pos ^ pick;
          recursionCount++;
          f((ld | pick) << 1, (col | pick), (rd | pick)>>>1, c);
         }
        if (col === c) s++;
      };
  recursionCount++;
  c === 0 || f(0,0,0,c);
  return [n, s, recursionCount];
};

var stream = "";
for (var i = 0; i < 16; i++){
  var calc = nQ(i);
  stream+= calc[0] + '\t' + calc[1] + '\t' + calc[2] + '\n';
}
console.log(stream);

// var nQ = function(n) {
//   var s = 0,
//       c = (1<<n) - 1,
//       answers = '';

//       f = function(ld, col, rd, c, picks) {
//         var pos = ~(ld | col | rd) & c;
//         while (pos > 0) {
//           var pick = -pos & pos;
//           pos = pos ^ pick;
//           picks += pick;
//           answers += f((ld | pick) << 1, (col | pick), (rd | pick)>>>1, c, picks);
//          }
//         if (col === c) { return picks; }
//       };
//   f(0,0,0,c,'');
//   return s;
// };
// nQ(4);
// var nQ=function(e){var t=0,n=(1<<e)-1,r=function(e,n,i,o){var u=~(e|n|i)&o;while(u>0){var a=-u&u;u=u^a;r((e|a)<<1,n|a,(i|a)>>>1,o)}if(n===o)t++};r(0,0,0,n);return t


// nQ = (e) ->
//   t = 0
//   n = (1 << e) - 1
//   r = (e, n, i, o) ->
//     u = ~(e | n | i) & o
//     while u > 0
//       a = -u & u
//       u = u ^ a
//       r (e | a) << 1, n | a, (i | a) >>> 1, o
//     t++  if n is o
//   r 0, 0, 0, n
//   t


if(nQ(4) !== 2) console.log("WRONG!!!");