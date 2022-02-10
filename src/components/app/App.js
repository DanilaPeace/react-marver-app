import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedCharId: null,
    };
  }

  onClickToChar = (clickedCharId) => {
    this.setState({ clickedCharId });
  };

  render() {
    const { clickedCharId } = this.state;
    console.log(clickedCharId);
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onCharClick={this.onClickToChar}/>
            <CharInfo clickedCharId={clickedCharId}/>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
