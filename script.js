const app = document.getElementById("app")
const restartBtn = document.getElementById('restartBtn')

let sizeField = 16
restartBtn.onclick = Reset

const cells = [] // массив для инфы о ячейках
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] // массив из чисел

let moveScore = 0



const shuffledNumber = numbers.sort(() => {
    return Math.random() - 0.5})
//numbers.sort(() => Math.floor(Math.random() - 0.5) ) // перемешиваем их

function startGame(){
    
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
}
startGame()


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

     moveScore++

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

    const isWin = cells.every(cell => {
        //проверка на правильную координату
        return cell.value === cell.row * (sizeField / 4) + cell.col + 1;
        
    })
    
    if(isWin){
        alert("You win!") 
    }
    showMove()

} 

function showMove(){
    
    document.getElementById('move').innerText = "Move: " + `${moveScore}`
}
showMove()


function Reset(){
   location.reload()
}

 
//проверка выигрышной позиции




        