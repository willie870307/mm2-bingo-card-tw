var bingos = [
  "一大堆敵人",
  "一開始就能看到終點",
  "把耀西帶到終點",
  "上升的岩漿/毒沼澤",
  "選正確的門/水管",
  "1-1重製",
  "蒐集所有金幣",
  "音樂關卡",
  "超爽快關卡",
  "有無限火花供給的Boss戰",
  "沒有中繼點(且沒有過關條件)",
  "有過關條件",
  "日本人做的關卡",
  "林克或USA瑪利歐關",
  "被軟禁(需要重新開始)",
  "孔明磚",
  "毫髮無傷過關",
  "全/半自動關卡",
  "打倒奔奔",
  "打倒貓咪庫巴",
  "標題關卡",
  "快速過關的關卡",
  "死於咚咚",
  "夜晚關卡",
  "有粉紅金幣",
  "美國人做的關卡",
  "過關獲得3條命",
  "得到50金幣",
  "自動捲軸關",
  "開發者路徑",
  "拉到旗桿頂端",
  "變成建築工人瑪利歐",
  "跳關",
  "耀西必須死",
]

var squares = document.querySelectorAll(".bingo-square")
var modal = document.querySelector(".bingo-modal-backdrop")
var bingoMatch = straightBingoPatterns(5)
// /12345|678910|1112131415|1617181920|2122232425|1.*6.*11.*16.*21|2.*7.*12.*17.*22|3.*8.*13.*18.*23|4.*9.*14.*19.*24|5.*10.*15.*20.*25|1.*7.*13.*19.*25|5.*9.*13.*17.*21/

function straightBingoPatterns(length) {
  // // Version 1
  // var bingoLength = new Array(length).fill()
  // var totalSquares = new Array(length ** 2).fill().map((_, i) => i + 1)
  // var rows = bingoLength.map((_, i) =>
  //   totalSquares.slice(i * length, i * length + length).join("")
  // )
  // var columns = bingoLength.map((_, i) =>
  //   bingoLength.map((_, j) => totalSquares[j * length + i]).join(".*")
  // )
  // var topLeftDiagonal = bingoLength.map((_, i) => length * i + i + 1).join(".*")
  // var topRightDiagonal = bingoLength.map((_, i) => length * (i + 1) - i).join(".*")

  // return new RegExp(`${[...rows, ...columns, topLeftDiagonal, topRightDiagonal].join("|")}`)

  // Version 2
  var bingoLength = new Array(length).fill()
  var squareMap = bingoLength.reduce((obj, _, i) => {
    obj[i + 1] = bingoLength.map((_, j) => i * length + j + 1)
    return obj
  }, {})

  var rows = Object.values(squareMap).map(arr => arr.join(""))
  var columns = bingoLength.map((_, i) => bingoLength.map((_, j) => squareMap[j + 1][i]).join(".*"))
  var topLeftDiagonal = bingoLength.map((_, j) => squareMap[j + 1][j]).join(".*")
  var topRightDiagonal = bingoLength.map((_, j) => squareMap[j + 1][length - (j + 1)]).join(".*")

  return new RegExp(`${[...rows, ...columns, topLeftDiagonal, topRightDiagonal].join("|")}`)
}

function setCard() {
  shuffleArray()
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerText = bingos[i]
  }
}

function shuffleArray() {
  for (var i = bingos.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = bingos[i]
    bingos[i] = bingos[j]
    bingos[j] = temp
  }
}

function playAgain() {
  keepPlaying()
  clearBoard()
  setCard()
}

function markBoard(e) {
  e.target.classList.toggle("cross-off")
  checkBingo()
}

function clearBoard() {
  Array.from(squares).forEach(square => {
    square.classList.remove("cross-off")
  })
}

function checkBingo() {
  var values = Array.from(document.querySelectorAll(".cross-off"))
    .map(x => +x.getAttribute("value"))
    .sort((a, b) => a - b)
    .join("")
  if (bingoMatch.test(values)) bingo()
}

function bingo() {
  modal.classList.add("got-bingo")
}

function keepPlaying() {
  modal.classList.remove("got-bingo")
}

setCard()
document.querySelector(".copyright").innerText = `David Irvin © ${new Date().getFullYear()}`
