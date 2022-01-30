class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=db9c54d7c77cf96fdf3a8daac8b8a8b9";
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} status: ${res.stat}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );

    return res.data.results.map(this._tansformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

    return this._tansformCharacter(res.data.results[0]);
  };

  _tansformCharacter = (character) => {
    return {
      name: character.name,
      description: character.description,
      thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
    };
  };
}

export default MarvelService;
