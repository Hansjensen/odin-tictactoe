const Player = (x, i) => {

    let turn = false
    let name = x
    let mark = i

    return {turn, name}

}

const gamePlay = (function () {
    let playerOne = Player('Player One', 'X')
    let playerTwo = Player('Player Two', 'O')
    
    
     const start = () =>  {
        playerOne.turn = true
        playerTwo.turn = false
        playerOne.mark = 'X'
        playerTwo.mark = 'O'
    }

     return {
        start , playerOne , playerTwo
    }
})();

const DisplayController = (function() {
    const controlButtonOne = document.getElementById('controlButtonOne')
    const gameWrapper = document.getElementById('gameWrapper')
    

    
    const startGame = () => {
        // Remove Start Button
        controlButtonOne.remove()

        //Create divs for gameWrapper
        const gameHeader = document.createElement('div')
        const gameMessage = document.createElement('h3')
        gameHeader.setAttribute('id', 'gameHeader')
        gameMessage.setAttribute('id', 'gameMessage')
        const gameBoard = document.createElement('div')
        gameBoard.setAttribute('ID', 'gameBoard')
        
        //append children
        gameWrapper.appendChild(gameHeader)
        gameHeader.appendChild(gameMessage)
        gameWrapper.appendChild(gameBoard)
         for (let i = 1; i < 4; i++) {
            let div1 = document.createElement('div')
            div1.setAttribute('ID', 'a' + i)
            gameBoard.appendChild(div1)
            console.log(gameBoard)
            let div2 = document.createElement('div')
            div2.setAttribute('ID', 'b' + i)
            gameBoard.appendChild(div2)
            console.log(gameBoard)
            let div3 = document.createElement('div')
            div3.setAttribute('ID', 'c' + i)
            gameBoard.appendChild(div3)
            console.log(gameBoard)
        }
        gamePlay.start()
        gameMessage.textContent = gamePlay.playerOne.name + "'s Turn!"


    }
    controlButtonOne.addEventListener('click', startGame)
    return {
        startGame
    }

})();




