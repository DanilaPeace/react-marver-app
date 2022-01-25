import img from "./error.gif";
import styled from "styled-components";

const ErrorImg = styled.img`
  display: block;
  width: 250px;
  object-fit: contain;
  margin: 0 auto;
`;

const ErrorMessage = () => {
  // Так можно импортировать статические изображения из public
 { /* <img src={process.env.PUBLIC_URL + "error.gif"} /> */  }

  return <ErrorImg src={img} alt="error" />;
};

export default ErrorMessage;
