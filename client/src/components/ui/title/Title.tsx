import styled from "styled-components";
import title from "../../../assets/title.png";

interface ITitle {
    width?: string;
    marginBottom?: string;
};


export const TitleIco = styled.img.attrs({
  src: `${title}`,
})``;


export const TitlePic = styled(TitleIco)<ITitle>`
    width: ${({ width }) => (width ? width : 800)}px;
    margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 80)}px;
`;

const Title = () => {
  return <TitlePic />;
};

export default Title;
