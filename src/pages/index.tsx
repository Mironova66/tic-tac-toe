import React from "react"

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
      status: 2
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
  }

  render() {
    const { squares, step, status } = this.state;
    const user = step % 2 === 0 ? 'x' : 'o';
    const winner = step % 2 !== 0 ? 'x' : 'o';

    return (
      <div className="game">
        <div className="score">
          {status === 0 && <div>Текущий ход: {user}</div>}
          {status === 1 && <div className="winner">Победил: {winner}</div>}
        </div>
      </div>
    );
  }
}
