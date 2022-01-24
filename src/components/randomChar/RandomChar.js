import { Component } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelServer from "../../services/MarvelService";

const MAX_DESCRIPTION_LENGTH = 215;
const MIN_CHARACTER_ID = 1011000;
const MAX_CHARACTER_ID = 1011400;

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }
  state = {
    character: {},
  };
  marvelServer = new MarvelServer();

  onCharLoaded = (character) => {
    this.setState({ character });
  };

  updateChar = () => {
    const id = Math.floor(
      Math.random() * (MAX_CHARACTER_ID - MIN_CHARACTER_ID) + MIN_CHARACTER_ID
    );
    this.marvelServer.getCharacter(id).then(this.onCharLoaded);
  };

  render() {
    let { name, description, thumbnail, homepage, wiki } = this.state.character;

    if (!description) {
      description = "There is no information about this hero";
    }

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      description = description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
    }

    return (
      <div className="randomchar">
        <div className="randomchar__block">
          <img
            src={thumbnail}
            alt="Random character"
            className="randomchar__img"
          />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

export default RandomChar;
