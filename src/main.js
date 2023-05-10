window.onload = () => {
    document.querySelector('.gameplay').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.gameplay').style.opacity = '1';
        game.init();
        loadGame();
    },250)
}

function loadGame(){
    var gameplay = document.querySelector('.gameplay');
    var aside = document.querySelector('aside');
    document.querySelector('.key').style.opacity = '0';
    setTimeout(() => {
        aside.classList.add('active');
        aside.style.transition = 'all ease 0.4s';
        gameplay.style.transform = 'translateX(10%)';
        gameplay.style.transition = 'all ease 0.4s';
        document.querySelector('.key').style.opacity = '1';

        setTimeout(() => {
            game.setTwo();
            game.setTwo();
        },500)
    },1000)
}

var game = {
    score : 0,
    rows : 4,
    cols : 4,
    board :[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ],
    canvas : null,


    init(){
        this.canvas = document.getElementById('board');
        this.setTile();
        this.moveTile();
    },
    setTile(){
        for(var row = 0; row < this.rows; row++){
            for(var col = 0; col < this.cols; col++){
                // Build Tile
                var tile = document.createElement('div')
                tile.id = row.toString() + '-' + col.toString();
                let number = this.board[row][col];
                this.upadteTile(tile, number);
                this.canvas.appendChild(tile);
            }
        }
    },
    upadteTile(tile, number){
        tile.innerHTML = '';
        // Class List 
        tile.classList.value = '';
        tile.classList.add('tile');
        if(number > 0){
            tile.innerHTML = number;
            if(number <= 128){
                tile.classList.add('x' + number.toString());
            }else{
                tile.classList.add('x128');
            }
        }
    },
    filterZero(row){
        return row.filter(number => number != 0);
    },
    slide(row){
        row = this.filterZero(row); // get grid zero (Locate)
        
        //Slide
        for(i = 0;  i < row.length -1 ; i++){
            if(row[i] == row[i + 1] && row[i] < 128){
                row[i] *= 2;
                row[i + 1] = 0;
                this.score += row[i];
            }
        }
        
        // [4,0,2] to [4,2]
        row = this.filterZero(row);
        
        // [4,2] to [4,2,0,0]
        while(row.length < this.cols){
            row.push(0);
        }

        document.querySelector('.score').innerHTML = `Score : ${this.score}`;
        return row;
    },
    slideLeft(){
        for(var r = 0; r < this.rows; r++){
            let row = this.board[r];
            row = this.slide(row);
            this.board[r] = row;
            for(var c = 0; c < this.cols; c++){
                let tile = document.getElementById(r.toString() + '-' + c.toString());
                let number = this.board[r][c];
                this.upadteTile(tile, number);
            }
        }
    },
    slideRight(){
        for(var r = 0; r < this.rows; r++){
            let row = this.board[r];
            row.reverse();
            row = this.slide(row);
            row.reverse();
            this.board[r] = row;
            for(var c = 0; c < this.cols; c++){
                let tile = document.getElementById(r.toString() + '-' + c.toString());
                let number = this.board[r][c];
                this.upadteTile(tile, number);
            }
        }
    },
    slideUp(){
        for(var c = 0; c < this.cols; c++){
            let row = [
                this.board[0][c],
                this.board[1][c],
                this.board[2][c],
                this.board[3][c],
            ];
            row = this.slide(row);
            for(var r = 0; r < this.rows; r++){
                this.board[r][c] = row[r];
                let tile = document.getElementById(r.toString() + '-' + c.toString());
                let number = this.board[r][c];
                this.upadteTile(tile, number);
            }
        }
    },
    slideDown(){
        for(var c = 0; c < this.cols; c++){
            let row = [
                this.board[0][c],
                this.board[1][c],
                this.board[2][c],
                this.board[3][c],
            ];
            row.reverse();
            row = this.slide(row);
            row.reverse();
            for(var r = 0; r < this.rows; r++){
                this.board[r][c] = row[r];
                let tile = document.getElementById(r.toString() + '-' + c.toString());
                let number = this.board[r][c];
                this.upadteTile(tile, number);
            }
        }
    },
    moveTile(){
        document.addEventListener('keyup', (e) => {
            if(e.code == 'KeyA' || e.code == 'ArrowLeft'){
                setTimeout(() => {
                    this.slideLeft();
                    document.querySelector('#output').innerHTML = e.code
                },100)
                setTimeout(() => {
                    this.setTwo();
                },250)
            }
            else if(e.code == 'KeyD' || e.code == 'ArrowRight'){
                setTimeout(() => {
                    this.slideRight();
                    document.querySelector('#output').innerHTML = e.code
                },100)
                setTimeout(() => {
                    this.setTwo();
                },250)
            }
            else if(e.code == 'KeyW' || e.code == 'ArrowUp'){
                setTimeout(() => {
                    this.slideUp();
                    document.querySelector('#output').innerHTML = e.code
                },100)
                setTimeout(() => {
                    this.setTwo();
                },250)
            }
            else if(e.code == 'KeyS' || e.code == 'ArrowDown'){
                setTimeout(() => {
                    this.slideDown();
                    document.querySelector('#output').innerHTML = e.code
                },100)
                setTimeout(() => {
                    this.setTwo();
                },250)
            }
        });
    },
    hasEmptyTile(){
        for(var row = 0; row < this.rows; row++){
            for(var col = 0; col < this.cols; col++){
                if(this.board[row][col] == 0){
                    return true;
                }
            }
        }
        return false;
    },
    setTwo(){
        if(!this.hasEmptyTile()){
            return;
        }

        let found = false;
        while(!found){
            let r = Math.floor(Math.random() * this.rows);
            let c = Math.floor(Math.random() * this.cols);

            if(this.board[r][c] == 0){
                this.board[r][c] = 2;
                let tile = document.getElementById(r.toString() + '-' + c.toString());
                tile.innerHTML = '2';
                tile.classList.add('x2');
                found = true
            }
        }
    }
}
