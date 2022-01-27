import { Component, useEffect } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelServer from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const MAX_DESCRIPTION_LENGTH = 215;
const MIN_CHARACTER_ID = 1011000;
const MAX_CHARACTER_ID = 1011400;

class RandomChar extends Component {
  state = {
    character: {},
    loading: true,
    error: false,
  };
  marvelServer = new MarvelServer();

  componentDidMount = () => {
    this.updateChar();
  };

  onCharLoaded = (character) => {
    this.setState({ character, loading: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    const id = Math.floor(
      Math.random() * (MAX_CHARACTER_ID - MIN_CHARACTER_ID) + MIN_CHARACTER_ID
    );
    this.marvelServer
      .getCharacter(id)
      .then((charData) => {
        this.onCharLoaded(charData);
      })
      .catch(this.onError);
  };

  render() {
    let { character, loading, error } = this.state;

    const errorImg = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={character} /> : null;
    return (
      <div className="randomchar">
        {errorImg}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            className="button button__main"
            onClick={() => this.updateChar()}
          >
            <div className="inner">Try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

class View extends Component {
  render() {
    const { thumbnail, name, homepage, wiki } = this.props.char;
    let { description } = this.props.char;

    return (
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
    );
  }
}

export default RandomChar;
