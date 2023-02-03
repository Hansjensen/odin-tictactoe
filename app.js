const Player = (x) => {

    let turn = false
    let name = x
    let moves = []

    return {turn, name, moves}

}

const gamePlay = (function () {
    let playerOne = Player('Player One', 'X')
    let playerTwo = Player('Player Two', 'O')
    let boardDiv = [[],[],[]]
    
    const playerTurn = (x) => {
        console.log(x)
        let buttonPushed = x.target;
        let scoreKeep = x.target.id;
        if (buttonPushed.textContent == '')
            if (playerOne.turn) {
                buttonPushed.textContent = "X"
                playerOne.turn = false
                playerTwo.turn = true
                playerOne.moves.push(scoreKeep)
                DisplayController.playerTurn(playerTwo.name)
                checkWinnerClean(playerOne)
                
                
            } else {
                buttonPushed.textContent = "O"
                playerOne.turn = true
                playerTwo.turn = false
                playerTwo.moves.push(scoreKeep)
                DisplayController.playerTurn(playerOne.name)
                checkWinnerClean(playerTwo)
                
                
            }
        console.log(scoreKeep)

            
    }



   

    const checkWinnerClean = (player) =>{
        if (player.moves.length > 2) {
           
            let score = {
                a: 0,
                b: 0,
                c: 0,
                zero: 0,
                one: 0,
                two: 0,
                diagOne: 0,
                diagTwo: 0
            }
            
            

            for (let i = 0; i < player.moves.length; i++) {
                if (player.moves[i] === 'b1') {
                    score.diagOne++
                    score.diagTwo++
                } else if (player.moves[i] ==='a0') {
                    score.diagOne++
                } else if (player.moves[i] === 'c2') {
                    score.diagOne++
                } else if (player.moves[i] === 'a2') {
                   score.diagTwo++
                } else if (player.moves[i] === 'c0') {
                    score.diagTwo++
                }
            }

            for (let i = 0; i < player.moves.length; i++) {
                let first = player.moves[i][0]
                if (first === 'a') {
                    score.a++;
                } else if (first === 'b') {
                    score.b++
                } else {
                    score.c++
                }
            }
            for (let i = 0; i < player.moves.length; i++) {
                let second = player.moves[i][1]
                if (second === '0') {
                    score.zero++;
                } else if (second === '1') {
                    score.one++
                } else {
                    score.two++
                }
            }

            if (player.moves.length === 5) {
                DisplayController.tieGame()
            }

            for (const prop in score) {
                if (score[prop] === 3) {
                    DisplayController.winner(player.name)

                } 
            }

            

        }
           
    }   

    const playAgain = () => {
        playerOne.turn = true
        playerTwo.turn = false
        playerOne.moves = []
        playerTwo.moves = []
    }
    
    
     const start = () =>  {
        playerOne.turn = true
        playerTwo.turn = false
        playerOne.mark = 'X'
        playerTwo.mark = 'O'
        for (let i = 0; i < 3; i++) {
            let loopId = 'a' + i
            let gameDiv = document.getElementById(loopId)
            gameDiv.addEventListener('click', playerTurn)
            boardDiv[i].push(gameDiv)
        }
        for (let i = 0; i < 3; i++) {
            let loopId = 'b' + i
            let gameDiv = document.getElementById(loopId)
            gameDiv.addEventListener('click', playerTurn)
            boardDiv[i].push(gameDiv)
            
        }
        for (let i = 0; i < 3; i++) {
            let loopId = 'c' + i
            let gameDiv = document.getElementById(loopId)
            gameDiv.addEventListener('click', playerTurn)
            boardDiv[i].push(gameDiv)
        }
        console.log(boardDiv)
    }   
    return {
        start , playerOne , playerTwo, boardDiv, playerTurn, playAgain
    }
})();

const DisplayController = (function() {
    const controlButtonOne = document.getElementById('controlButtonOne')
    const gameWrapper = document.getElementById('gameWrapper')
    const gameMessage = document.createElement('h3')
    const gameBoard = document.createElement('div')
    const gameHeader = document.createElement('div')
    gameHeader.setAttribute('id', 'gameHeader')
    gameMessage.setAttribute('id', 'gameMessage')
    gameBoard.setAttribute('ID', 'gameBoard')
    let controlButtonTwo = document.createElement('div')

    const playerTurn = (player) => {
        //change message to show whos turn
        gameMessage.textContent = player + "'s turn!"
    }
    
    const startGame = () => {
        // Remove Start Button
        controlButtonOne.remove()

        //append children
        gameWrapper.appendChild(gameHeader)
        gameHeader.appendChild(gameMessage)
        gameWrapper.appendChild(gameBoard)
         for (let i = 0; i < 3; i++) {
            let div1 = document.createElement('div')
            div1.setAttribute('id', 'a' + i)
            div1.classList.add('gamediv')
            gameBoard.appendChild(div1)
           
            let div2 = document.createElement('div')
            div2.setAttribute('id', 'b' + i)
            div2.classList.add('gamediv')
            gameBoard.appendChild(div2)
            
            let div3 = document.createElement('div')
            div3.setAttribute('id', 'c' + i)
            div3.classList.add('gamediv')
            gameBoard.appendChild(div3)
            
        }
        gamePlay.start()
        gameMessage.textContent = gamePlay.playerOne.name + "'s Turn!"


    }

    const playAgain = () => {
        // Remove Start Button
        controlButtonTwo.remove()
        
        //reset divs
        let marker = gameBoard.querySelectorAll('div.gamediv')
        marker.forEach((element) => element.textContent = '')
        

        //append children
        
        gameWrapper.appendChild(gameBoard)
        gamePlay.playAgain()
        gameMessage.textContent = gamePlay.playerOne.name + "'s Turn!"


    }


    const winner = (player) => {
        gameBoard.remove()
        gameMessage.textContent = player + ' wins!'
        controlButtonTwo.setAttribute('id', 'controlButtonOne')
        controlButtonTwo.textContent = "PLAY AGAIN"
        controlButtonTwo.addEventListener('click', playAgain)
        gameWrapper.appendChild(controlButtonTwo)
    
    }

    const tieGame = () => {
        gameBoard.remove()
        gameMessage.textContent = 'Tie Game!'
        controlButtonTwo.setAttribute('id', 'controlButtonOne')
        controlButtonTwo.textContent = "PLAY AGAIN"
        controlButtonTwo.addEventListener('click', playAgain)
        gameWrapper.appendChild(controlButtonTwo)

    }

    const getNames = () => {
        const form = document.createElement('form')
        form.classlist.add('form')
        const labelp1 = document.createElement('label')
        const inputp1 = document.createElement('input')
        const labelp2 = document.createElement('label')
        const inputp2 = document.createElement('input')
        const sumbit = document.createElement('button')
        labelp1.setAttribute('for', 'name1' )
        labelp1.classlist.add('label' )
        labelp2.setAttribute('for', 'name2' )
        labelp2.classlist.add('label' )
        inputp1.setAttribute('id', 'name1' )
        inputp1.setAttribute('name', 'name1' )
        inputp1.classlist.add('input' )
        inputp2.setAttribute('id', 'name2' )
        inputp2.setAttribute('name', 'name2' )
        inputp2.classlist.add('input')
        submit.setAttribute('type', 'submit')
        submit.setAttribute('value', 'submit')
        submit.setAttribute('id', 'controlButtonOne')
        form.appendChild('labelp1')
        form.appendChild('inputp1')
        form.appendChild('labelp2')
        form.appendChild('inputp2')
        form.appendChild('submit')
        gameWrapper.appendChild()

    }


    controlButtonOne.addEventListener('click', startGame)
    return {
        startGame, playerTurn, winner, tieGame
    }

})();




