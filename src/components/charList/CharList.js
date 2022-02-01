import { Component } from "react";
import CharacterHelper from "../../helpers/character-helper";
import abyss from "../../resources/img/abyss.jpg";
import { CharacterListService } from "../../services/CharacterListService";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      isLoading: true,
      error: false,
    };
  }
  marvelApi = new MarvelService();

  onCharactersLoad = (charactersArr) => {
    this.setState({
      characters: charactersArr,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.marvelApi
      .getAllCharacters()
      .then(this.onCharactersLoad)
      .catch(console.log);
  }

  onError = () => {
    this.setState({
      characters: [],
      isLoading: false,
      error: true,
    });
  };

  render() {
    const { characters, isLoading, error } = this.state;
    const characterList = characters?.map((char, idx) => {
      const { name, thumbnail } = char;
      const imgStyle = !CharacterHelper.charHasImg(thumbnail)
        ? { objectFit: "contain" }
        : null;
      return (
        <li className="char__item" key={idx}>
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    const spinner = isLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(isLoading || error) ? characterList : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
