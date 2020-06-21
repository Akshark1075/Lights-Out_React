import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
static defaultProps={
  nrows:5,
  ncols:5,
  chanceLightStartsOn:0.25
}
  constructor(props) {
    super(props);
    this.state={board:this.createBoard(),hasWon:false}
    this.flipCellsAround=this.flipCellsAround.bind(this);
    
  }

  

  createBoard() {
    let board = [];

    for(var i=0;i<this.props.nrows;i++){
          let arr=[]
          for(var j=0;j<this.props.ncols;j++){
        arr.push(Math.random()<this.props.chanceLightStartsOn)
      }
      board.push(arr);

      
    }

    
    return board
  }



  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = [...this.state.board];    
    let [y, x] = coord.split("-").map(Number);
    flipCell(y, x);
    flipCell(y-1,x);
    flipCell(y+1,x);
    flipCell(y,x-1);
    flipCell(y,x+1);
    let hasWon=Won();
    function flipCell(y, x) {
           if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    function Won(){
      return board.every(x=>x===false);
    }
    
    this.setState({board:board,hasWon:hasWon});
  }




  render() {
    
    let cells=this.state.board.map((x,a)=> { return <tr key={a}>{x.map((y,b)=>{return <Cell isLit={y} flipCellsAroundMe={this.flipCellsAround}key={a+"-"+b}></Cell>})
  }</tr>    
    
    })
    return(<div className={this.state.hasWon?"winner":""}>
      <h1>{!this.state.hasWon?<div><span className="neon-orange">Lights</span><span className="neon-blue">out</span></div>:<div><span className="neon-orange">you</span><span className="neon-blue">win</span></div>} </h1>
           {!this.state.hasWon? <table className='Board'>
              <tbody>
                
                {cells}
                  
               
              </tbody>
            </table>
  :''}
      
            </div>
      
    )
  }
}


export default Board;
