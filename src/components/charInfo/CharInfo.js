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
    // const skeleton = loading || error || character ? null : <Skeleton />;
    const skeleton = !loading && !error && !character ? <Skeleton /> : null;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !character) ? (
      <View char={character} imgStyle={imgStyle}/>
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
  console.log(char);
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const comicsList = comics.map((item, idx) => {
    return (
      <li key={idx} className="char__comics-item">
        {item.name}
      </li>
    );
  });
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
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

export default CharInfo;
