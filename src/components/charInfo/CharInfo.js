import PropTypes from "prop-types";

import "./charInfo.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import CharacterHelper from "../../helpers/character-helper";

class CharInfo extends Component {
  state = {
    character: null,
    loading: false,
    error: false,
  };
  marvelServer = new MarvelService();

  componentDidMount() {
    this.updateCharInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.clickedCharId !== prevProps.clickedCharId) {
      this.updateCharInfo();
    }
  }

  onCharLoaded = (character) => {
    this.setState({ character, loading: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
      error: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateCharInfo = () => {
    const { clickedCharId } = this.props;
    if (!clickedCharId) {
      return;
    }
    this.onCharLoading();
    this.marvelServer
      .getCharacter(clickedCharId)
      .then((data) => {
        this.onCharLoaded(data);
      })
      .catch(this.onError);
  };

  render() {
    const { character, error, loading } = this.state;
    const imgStyle = !CharacterHelper.charHasImg(character?.thumbnail)
      ? { objectFit: "contain" }
      : null;
    const skeleton = !loading && !error && !character ? <Skeleton /> : null;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !character) ? (
      <View char={character} imgStyle={imgStyle} />
    ) : null;

    return (
      <div className="char__info">
        {skeleton}
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

const View = ({ char, imgStyle }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const getAmountComics = (amount) => {
    const comicsArray = [];
    for (let comicsIndex = 0; comicsIndex < comics.length; comicsIndex++) {
      if (comicsIndex > amount) break;
      const comicsItem = (
        <li key={comicsIndex} className="char__comics-item">
          {comics[comicsIndex].name}
        </li>
      );
      comicsArray.push(comicsItem);
    }
    return comicsArray;
  };

  const comicsList = comics.length
    ? getAmountComics(9)
    : "There is no commics with this character.";
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{comicsList}</ul>
    </>
  );
};

CharInfo.propTypes = {
  clickedCharId: PropTypes.number,
};

View.propTypes = {
  char: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    homepage: PropTypes.string,
    wiki: PropTypes.string,
    comics: PropTypes.array
  }).isRequired,
  imgStyle: PropTypes.object
};
export default CharInfo;
