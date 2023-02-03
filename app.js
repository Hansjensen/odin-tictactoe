const Player = (x) => {
    let turn = false
    let name = x
    let moves = []

   
    return {turn, name, moves}

}

const gamePlay = (function () {
    const playerOne = Player()
    const playerTwo = Player()
    let boardDiv = [[],[],[]]
    
    

    const playerTurn = (x) => {
        
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
    
    
     const start = (name1, name2) =>  {
        playerOne.name = name1
        playerTwo.name = name2
        if (name1 === "") {
            playerOne.name = 'Player One'
            
        }
        if (name2 === "") {
            playerTwo.name = 'Player Two'
        }
    
        
        
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
        return playerOne, playerTwo
    }   
    return {
        start , playerOne, playerTwo, boardDiv, playerTurn, playAgain
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
    let controlButtonTwo = document.createElement('button')
    const nameForm = document.createElement('form')
    

    const playerTurn = (player) => {
        //change message to show whos turn
        gameMessage.textContent = player + "'s turn!"
    }
    
    const startGame = () => {
        // Remove Start Button
       let player1 = document.getElementById('name1').value
        let player2 = document.getElementById('name2').value 
        
       
        nameForm.remove()
        //create start over button
        controlButtonTwo.setAttribute('id', 'controlButtonOne')
        controlButtonTwo.textContent = "START OVER"

        //append children
        gameWrapper.appendChild(gameHeader)
        gameHeader.appendChild(gameMessage)
        gameWrapper.appendChild(gameBoard)
        gameWrapper.appendChild(controlButtonTwo)

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
        gamePlay.start(player1, player2)
        
        gameMessage.textContent = gamePlay.playerOne.name + "'s Turn!"


    }

    const playAgain = () => {
        // Remove Start Button
        controlButtonTwo.textContent ="START OVER"
        controlButtonTwo.remove()
        //reset divs
        let marker = gameBoard.querySelectorAll('div.gamediv')
        marker.forEach((element) => element.textContent = '')
        

        //append children
        
        gameWrapper.appendChild(gameBoard)
        gameWrapper.appendChild(controlButtonTwo)
        gamePlay.playAgain()
        gameMessage.textContent = gamePlay.playerOne.name + "'s Turn!"


    }


    const winner = (player) => {
        gameBoard.remove()
        gameMessage.textContent = player + ' wins!'
        controlButtonTwo.setAttribute('id', 'controlButtonOne')
        controlButtonTwo.textContent = "PLAY AGAIN"
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
        controlButtonOne.remove()
        
        nameForm.setAttribute('class' , 'nameForm');
        const labelp1 = document.createElement('label')
        const inputp1 = document.createElement('input')
        const labelp2 = document.createElement('label')
        const inputp2 = document.createElement('input')
        const submit = document.createElement('button')
        labelp1.setAttribute('for', 'name1' )
        labelp1.classList.add('label' )
        labelp1.textContent = 'Player One Name'
        labelp2.setAttribute('for', 'name2' )
        labelp2.classList.add('label' )
        labelp2.textContent = 'Player Two Name'
        inputp1.setAttribute('id', 'name1' )
        inputp1.setAttribute('name', 'name1' )
        inputp1.setAttribute('type', 'text')
        inputp1.classList.add('input' )
        inputp2.setAttribute('id', 'name2' )
        inputp2.setAttribute('name', 'name2' )
        inputp2.setAttribute('type', 'text')
        inputp2.classList.add('input')
        submit.setAttribute('type', 'submit')
        submit.setAttribute('value', 'submit')
        submit.setAttribute('id', 'controlButtonOne')
        submit.classList.add('center')
        submit.textContent = 'PLAY'
        
        submit.addEventListener('click', startGame)
        
        nameForm.appendChild(labelp1)
        nameForm.appendChild(inputp1)
        nameForm.appendChild(labelp2)
        nameForm.appendChild(inputp2)
        nameForm.appendChild(submit)
        gameWrapper.appendChild(nameForm)
        
        
        
    }

    controlButtonTwo.addEventListener('click', playAgain)
    controlButtonOne.addEventListener('click', getNames)
    return {
        startGame, playerTurn, winner, tieGame, getNames
    }

})();




