import React from "react";

interface IProps {}

interface IState {
  squares: Array<null | string>,
  step: number,
  status: 0 | 1 | 2
}

export default class extends React.Component<IProps, IState> {
  private winnerLines: Array<Array<number>>;

  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      step: 0,
      status: 0
    };

    this.winnerLines = [
      // Горизонталь
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Вертикаль
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Диагонали
      [0, 4, 8],
      [2, 4, 6]
    ];

    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  handleClick(e) {
    const { step } = this.state;
    const { index } = e.currentTarget.dataset;
    const squares = [...this.state.squares];

    if (squares[index]) {
      return;
    }

    squares[index] = step % 2 === 0 ? 'x' : 'o';

    this.setState({
      squares,
      step: step + 1
    }, () => this.checkWinner());
  }

  checkWinner() {
    const { squares, step } = this.state;

    const user = step % 2 !== 0 ? 'x' : 'o';

    this.winnerLines.forEach((line) => {
      // console.log(squares[line[0]], squares[line[1]], squares[line[2]], '=', s);
      if (
        squares[line[0]] === user
        && squares[line[1]] === user
        && squares[line[2]] === user
      ) {
        this.setState({
          status: 1
        });
      }
    });

    const { status } = this.state;

    if (
      status === 0
      && step === 9
    ) {
      this.setState({ status: 2 });
    }
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      step: 0,
      status: 0
    });
  }

  render() {
    const { squares, step, status } = this.state;
    const user = step % 2 === 0 ? 'x' : 'o';
    const winner = step % 2 !== 0 ? 'x' : 'o';

    return (
      <div className="game">
        <div className="squares">
          {squares.map((item, index) => (
            <div
              className="square"
              key={index}
              data-index={index}
              onClick={this.handleClick}
            >
              <div className="index">{index}</div>
              {item}
            </div>
          ))}
        </div>
        <div className="score">
          {status === 0 ? (
            <div>Текущий ход: {user}</div>
          ) : (
            <div>
              {status === 1 ? (
                <div className="winner">Победил: {winner}</div>
              ) : (
                <div>
                  <div className="winner">Ничья</div>
                  <button onClick={this.resetGame}>Ничья</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
