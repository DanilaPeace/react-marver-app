import { Component } from "react";
import CharacterHelper from "../../helpers/character-helper";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

class CharList extends Component {
  MAX_CHARACTER_ID_ON_SERVER = 1559;
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      isLoading: true,
      error: false,
      newCharactersLoading: false,
      charactersEnded: false,
      offset: 210,
    };
  }

  marvelApi = new MarvelService();
  componentDidMount() {
    this.onRequest();
  }

  onCharactersLoad = (newCharacters) => {
    this.setState(({ offset }) => ({ offset: offset + newCharacters.length }));

    let ended = false;
    if (
      newCharacters.length < 9 ||
      this.state.offset >= this.MAX_CHARACTER_ID_ON_SERVER
    ) {
      ended = true;
    }
    this.setState(({ characters, offset }) => ({
      characters: [...characters, ...newCharacters],
      isLoading: false,
      newCharactersLoading: false,
      charactersEnded: ended,
    }));
  };

  onNewCharactersLoading = () => {
    this.setState({ newCharactersLoading: true });
  };

  onRequest = (offset) => {
    this.onNewCharactersLoading();
    this.marvelApi
      .getAllCharacters(offset)
      .then(this.onCharactersLoad)
      .catch(console.log);
  };

  onError = () => {
    this.setState({
      characters: [],
      isLoading: false,
      error: true,
    });
  };

  onCharClick = (event, id) => {
    const { onCharClick } = this.props;
    onCharClick(id);
  };

  getCharacterList = () => {
    const { characters } = this.state;
    const charList = characters?.map((char) => {
      const { name, thumbnail, id } = char;
      const imgStyle = !CharacterHelper.charHasImg(thumbnail)
        ? { objectFit: "contain" }
        : null;
      return (
        <li
          className="char__item"
          key={id}
          onClick={(event) => this.onCharClick(event, id)}
        >
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return charList;
  };

  render() {
    const { isLoading, error, newCharactersLoading, charactersEnded, offset } =
      this.state;
    const characterList = this.getCharacterList();

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
        <button
          className="button button__main button__long"
          onClick={() => this.onRequest(offset)}
          disabled={newCharactersLoading}
          style={{ display: charactersEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
