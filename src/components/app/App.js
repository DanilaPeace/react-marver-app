import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

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
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharClick={this.onClickToChar} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo clickedCharId={clickedCharId} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
