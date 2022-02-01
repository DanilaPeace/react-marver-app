export class CharacterListService {
    _baseUrl = "https://gateway.marvel.com:443/v1/public"; 
    _apiKey = "apikey=db9c54d7c77cf96fdf3a8daac8b8a8b9";

    // getResources = async (url) => {
    static async g(url){
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error fetching data!');
        }

        return await response.json();
    }

    static getCharactersSet = async (setSize) => {
        // console.log(">>> getCharactersSet", setSize)
        // const serverResponse = await this.getResources(`${this._baseUrl}/limit=${setSize}&offset=210&${this._apiKey}`);
        const response = await CharacterListService.g(`${this._baseUrl}/characters?limit=9&offset=210&${this._apiKey}`);
        // console.log(serverResponse);

        // const response = await fetch(`${this._baseUrl}/limit=${setSize}&offset=210&${this._apiKey}`);

        // if (!response.ok) {
        //     throw new Error('Error fetching data!');
        // }

        const data = await response.json(); 
        console.log("data: ", data);
        return data;
    }
}