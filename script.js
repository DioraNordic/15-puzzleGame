const app = document.getElementById("app")
const restartBtn = document.getElementById('restartBtn')
const boardElement = document.createElement('div')
document.body.appendChild(boardElement)


let sizeField = 16
restartBtn.onclick = Reset

const cells = [] // массив для инфы о ячейках
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] // массив из чисел
const empty = []
let moveScore = 0
const result = []

// const shuffledNumber = numbers.sort(() => {
//     return Math.random() - 0.5})
 // перемешиваем их

function startGame(){

    const shuffledNumber = numbers.sort(() => {
        return Math.random() - 0.5})
    
    for (let i = 0; i < sizeField; i++) {
        
    //создаем тег
    const cell = document.createElement("div")
    cell.classList.add("cell")
    app.appendChild(cell)

    const value = shuffledNumber[i]
    //записываем в ячейку значение
    cell.innerText = value
    
    //позиция в строке
    const row = Math.floor(i / 4);
    //позиция в столбце
    const col = i % 4;

    cell.style.left = `${col * 100}px`;
    cell.style.top = `${row * 100}px`;
    
    //записываем ячейку в массив
    cells.push({
        value: value,
        element: cell,
        row: row,
        col: col
    })
    
    //ход по клику ячейки
    cell.addEventListener('click', () => { move(i) })  
}

const lastCell = cells.filter((cell) => cell.value === 16)
lastCell[0].element.style.display = 'none'
    

function move(index) {
    //достаем ячейку
    const cell = cells[index]
    const empty = lastCell
    

    //берем разницу по координате

    const rowDiff = Math.abs(empty[0].row - cell.row)
    const colDiff = Math.abs(empty[0].col - cell.col)


    //если разница больше одного, то ячейка не является соседней
    if (rowDiff + colDiff > 1) {
        return;
    }

        //перемещаемся на прошлую ячейку
    cell.element.style.left = `${empty[0].col * 100}px`
    cell.element.style.top = `${empty[0].row * 100}px`

    empty[0].element.style.left = `${cell.col * 100}px`
    empty[0].element.style.top = `${cell.row * 100}px`
        
        
    //сохраняем координаты пустой клетки в новой переменной
    const emptyRow = empty[0].row
    const emptyCol = empty[0].col


    //перезаписываем координаты пустой клетки 
    empty[0].row = cell.row
    empty[0].col = cell.col

    
    //в перемещенную ячейку передаем координаты пустой клетки 
    cell.row = emptyRow
    cell.col = emptyCol

    moveScore++
    showMove()
    isWin()
} 
}
startGame()

function isWin(){
const isWin = cells.every(cell => {
    //проверка на правильную координату
 return cell.value === cell.row * (sizeField / 4) + cell.col + 1;    
})
    
if(isWin){
 popupShow()
 
 }
}

function resetNumbers(){
    app.innerHTML = ""
    cells.splice(0, cells.length)
    startGame()    
}

    const wrapper = document.createElement("div")
    const popupContent = document.createElement("div")
    const body = document.createElement("div")
    wrapper.classList.add("wrapper-popup")
    popupContent.classList.add("popup-content")
    body.classList.add("popup-body")
    document.body.appendChild(wrapper)
    wrapper.appendChild(popupContent)
    popupContent.appendChild(body)

    body.innerHTML = "WINNER!"
    const input = document.createElement("input")
    popupContent.appendChild(input)
    const button = document.createElement("div")
    button.classList.add("button")
    popupContent.appendChild(button)
    button.innerText = "Next game"
    

function popupShow(){
    wrapper.style.display = "flex"
    button.addEventListener('click',() => checkWin())
}

function checkWin(){
    if(moveScore != 0){
    wrapper.style.display = 'none'
    const name = input.value

    result.push ({
    score: moveScore,
    player: name
    })

resetNumbers()
saveResults()
}
   
moveScore = 0
showMove()

}

function saveResults(){
    let leaderBoard = " "

    result.sort((x,y) => y.score - x.score)
    for (let i of result){
        leaderBoard += `<div>${i.player} ---- ${+ i.score} </div>`
    }
    boardElement.innerHTML = leaderBoard
    }

function showMove(){
    document.getElementById('move').innerText = "Move: " + `${moveScore}`
}
showMove()


function Reset(){
   location.reload()
}

 
//проверка выигрышной позиции

