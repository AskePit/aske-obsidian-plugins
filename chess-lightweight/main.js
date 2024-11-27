'use strict'
var obsidian = require('obsidian')

const removePrefix = (value, prefix) =>
    value.startsWith(prefix) ? value.slice(prefix.length) : value;

const whitesBoardHtml =
`<div class="board">
    <div class="row" id="row8">
        <div class="square white" id="a8"></div>
        <div class="square black" id="b8"></div>
        <div class="square white" id="c8"></div>
        <div class="square black" id="d8"></div>
        <div class="square white" id="e8"></div>
        <div class="square black" id="f8"></div>
        <div class="square white" id="g8"></div>
        <div class="square black" id="h8"></div>
    </div>
    <div class="row" id="row7">
        <div class="square black" id="a7"></div>
        <div class="square white" id="b7"></div>
        <div class="square black" id="c7"></div>
        <div class="square white" id="d7"></div>
        <div class="square black" id="e7"></div>
        <div class="square white" id="f7"></div>
        <div class="square black" id="g7"></div>
        <div class="square white" id="h7"></div>
    </div>
    <div class="row" id="row6">
        <div class="square white" id="a6"></div>
        <div class="square black" id="b6"></div>
        <div class="square white" id="c6"></div>
        <div class="square black" id="d6"></div>
        <div class="square white" id="e6"></div>
        <div class="square black" id="f6"></div>
        <div class="square white" id="g6"></div>
        <div class="square black" id="h6"></div>
    </div>
    <div class="row" id="row5">
        <div class="square black" id="a5"></div>
        <div class="square white" id="b5"></div>
        <div class="square black" id="c5"></div>
        <div class="square white" id="d5"></div>
        <div class="square black" id="e5"></div>
        <div class="square white" id="f5"></div>
        <div class="square black" id="g5"></div>
        <div class="square white" id="h5"></div>
    </div>
    <div class="row" id="row4">
        <div class="square white" id="a4"></div>
        <div class="square black" id="b4"></div>
        <div class="square white" id="c4"></div>
        <div class="square black" id="d4"></div>
        <div class="square white" id="e4"></div>
        <div class="square black" id="f4"></div>
        <div class="square white" id="g4"></div>
        <div class="square black" id="h4"></div>
    </div>
    <div class="row" id="row3">
        <div class="square black" id="a3"></div>
        <div class="square white" id="b3"></div>
        <div class="square black" id="c3"></div>
        <div class="square white" id="d3"></div>
        <div class="square black" id="e3"></div>
        <div class="square white" id="f3"></div>
        <div class="square black" id="g3"></div>
        <div class="square white" id="h3"></div>
    </div>
    <div class="row" id="row2">
        <div class="square white" id="a2"></div>
        <div class="square black" id="b2"></div>
        <div class="square white" id="c2"></div>
        <div class="square black" id="d2"></div>
        <div class="square white" id="e2"></div>
        <div class="square black" id="f2"></div>
        <div class="square white" id="g2"></div>
        <div class="square black" id="h2"></div>
    </div>
    <div class="row" id="row1">
        <div class="square black" id="a1"></div>
        <div class="square white" id="b1"></div>
        <div class="square black" id="c1"></div>
        <div class="square white" id="d1"></div>
        <div class="square black" id="e1"></div>
        <div class="square white" id="f1"></div>
        <div class="square black" id="g1"></div>
        <div class="square white" id="h1"></div>
    </div>
</div>`

const blacksBoardHtml =
`<div class="board">
    <div class="row" id="row1">
        <div class="square white" id="h1"></div>
        <div class="square black" id="g1"></div>
        <div class="square white" id="f1"></div>
        <div class="square black" id="e1"></div>
        <div class="square white" id="d1"></div>
        <div class="square black" id="c1"></div>
        <div class="square white" id="b1"></div>
        <div class="square black" id="a1"></div>
    </div>
    <div class="row" id="row2">
        <div class="square black" id="h2"></div>
        <div class="square white" id="g2"></div>
        <div class="square black" id="f2"></div>
        <div class="square white" id="e2"></div>
        <div class="square black" id="d2"></div>
        <div class="square white" id="c2"></div>
        <div class="square black" id="b2"></div>
        <div class="square white" id="a2"></div>
    </div>
    <div class="row" id="row3">
        <div class="square white" id="h3"></div>
        <div class="square black" id="g3"></div>
        <div class="square white" id="f3"></div>
        <div class="square black" id="e3"></div>
        <div class="square white" id="d3"></div>
        <div class="square black" id="c3"></div>
        <div class="square white" id="b3"></div>
        <div class="square black" id="a3"></div>
    </div>
    <div class="row" id="row4">
        <div class="square black" id="h4"></div>
        <div class="square white" id="g4"></div>
        <div class="square black" id="f4"></div>
        <div class="square white" id="e4"></div>
        <div class="square black" id="d4"></div>
        <div class="square white" id="c4"></div>
        <div class="square black" id="b4"></div>
        <div class="square white" id="a4"></div>
    </div>
    <div class="row" id="row5">
        <div class="square white" id="h5"></div>
        <div class="square black" id="g5"></div>
        <div class="square white" id="f5"></div>
        <div class="square black" id="e5"></div>
        <div class="square white" id="d5"></div>
        <div class="square black" id="c5"></div>
        <div class="square white" id="b5"></div>
        <div class="square black" id="a5"></div>
    </div>
    <div class="row" id="row6">
        <div class="square black" id="h6"></div>
        <div class="square white" id="g6"></div>
        <div class="square black" id="f6"></div>
        <div class="square white" id="e6"></div>
        <div class="square black" id="d6"></div>
        <div class="square white" id="c6"></div>
        <div class="square black" id="b6"></div>
        <div class="square white" id="a6"></div>
    </div>
    <div class="row" id="row7">
        <div class="square white" id="h7"></div>
        <div class="square black" id="g7"></div>
        <div class="square white" id="f7"></div>
        <div class="square black" id="e7"></div>
        <div class="square white" id="d7"></div>
        <div class="square black" id="c7"></div>
        <div class="square white" id="b7"></div>
        <div class="square black" id="a7"></div>
    </div>
    <div class="row" id="row8">
        <div class="square black" id="h8"></div>
        <div class="square white" id="g8"></div>
        <div class="square black" id="f8"></div>
        <div class="square white" id="e8"></div>
        <div class="square black" id="d8"></div>
        <div class="square white" id="c8"></div>
        <div class="square black" id="b8"></div>
        <div class="square white" id="a8"></div>
    </div>
</div>`

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase()
}

function rowToString(r) {
    return r.toString()
}

function colToString(c) {
    return String.fromCharCode('a'.charCodeAt() + c - 1)
}

function getAddress(r, c) {
    return colToString(c) + rowToString(r)
}

class BoardData {
    // map of {address piece} like {'a4': '♞'}
    addresses = {}

    // arrays of [address] like [e2, e4]
    reds = []
    greens = []
    blues = []

    flipBoard = false

    constructor(source) {
        const lines = source.split('\n').map(line => line.trim())

        for (const line of lines) {
            if (line.startsWith('fen:')) {
                const fen = removePrefix(line, 'fen:').trim()
                this.#parseFen(fen)
            } else if (line.startsWith('red:')) {
                const redLine = removePrefix(line, 'red:').trim()
                this.reds = redLine.split(' ')
            } else if (line.startsWith('green:')) {
                const greenLine = removePrefix(line, 'green:').trim()
                this.greens = greenLine.split(' ')
            } else if (line.startsWith('blue:')) {
                const blueLine = removePrefix(line, 'blue:').trim()
                this.blues = blueLine.split(' ')
            } else if (line.startsWith('flipBoard:')) {
                const flipLine = removePrefix(line, 'flipBoard:').trim().toLowerCase()
                this.flipBoard = flipLine === 'true'
            } else {
                if (line.contains(':')) {
                    continue
                }
                this.#parseFen(line)
            }
        }
    }

    #parseFen(fen) {
        const data = fen.split(' ')
        const positions = data?.[0]
        const nextColor = data?.[1]
        const castling = data?.[2]
        const enPassant = data?.[3]
        const clock0 = data?.[4]
        const clock1 = data?.[5]
    
        const rowLines = positions.split('/')
    
        let row = 8
        let col = 1
    
        this.addresses = {}
    
        for (const rowLine of rowLines) {
            col = 1
            for (const ch of rowLine) {
                if (isLetter(ch)) {
                    let piece = ''
    
                    if (ch == 'p') piece = '♟'
                    else if (ch == 'r') piece = '♜'
                    else if (ch == 'n') piece = '♞'
                    else if (ch == 'b') piece = '♝'
                    else if (ch == 'q') piece = '♛'
                    else if (ch == 'k') piece = '♚'
                    else if (ch == 'P') piece = '♙'
                    else if (ch == 'R') piece = '♖'
                    else if (ch == 'N') piece = '♘'
                    else if (ch == 'B') piece = '♗'
                    else if (ch == 'Q') piece = '♕'
                    else if (ch == 'K') piece = '♔'
    
                    this.addresses[getAddress(row, col)] = piece
    
                    col += 1
                } else {
                    col += parseInt(ch, 10)
                }
            }
            row -= 1
        }
    }
}

class ChessLightweightPlugin extends obsidian.Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor('chess', (source, el, ctx) => {
            // Parse code
            const data = new BoardData(source)

            // Render chess board
            el.innerHTML = data.flipBoard ? blacksBoardHtml : whitesBoardHtml

            // Fill chess board with pieces
            for (const [addr, piece] of Object.entries(data.addresses)) {
                el.querySelector('[id=' + addr + ']').innerText = piece
            }

            for (const addr of data.reds) {
                el.querySelector('[id=' + addr + ']').classList.add('red-hihglight')
            }

            for (const addr of data.greens) {
                el.querySelector('[id=' + addr + ']').classList.add('green-hihglight')
            }

            for (const addr of data.blues) {
                el.querySelector('[id=' + addr + ']').classList.add('blue-hihglight')
            }
        })
    }
}

module.exports = ChessLightweightPlugin
