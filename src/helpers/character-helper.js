export default class CharacterHelper {
  static charHasImg = (thumbnail) => {
    if (!thumbnail) {
      return false;
    }
    return thumbnail.indexOf("image_not_available.jpg") > -1 ? false : true;
  };
}
