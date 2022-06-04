import styled from "styled-components";
import title from "../../../assets/title.png";

interface Title {
    width: string;
};


export const TitleIco = styled.img.attrs({
    src: `${title}`,
})``;

export const TitlePic = styled(TitleIco)`
    width: ${({ width }) => (width ? width : 800)}px;
`;


const Title = () => {
    return (
        <TitlePic />
    )
}

export default Title;