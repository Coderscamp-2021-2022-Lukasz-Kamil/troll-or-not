import styled from "styled-components";
import title from "../../../assets/title.png";
import { userSignOut } from "../../../services/user/auth";
import { Button } from "../Button/Button.style";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface ITitle {
  width?: string;
  marginBottom?: string;
}

export const TitleIco = styled.img.attrs({
  src: `${title}`,
})``;

export const TitlePic = styled(TitleIco)<ITitle>`
  width: ${({ width }) => (width ? width : 800)}px;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 80)}px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = ({ showButton }: { showButton: boolean }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uid, setUid, removeUid] = useCookies();

  const navigateToHomePage = () => {
    navigate("/");
  };

  const handleSignOut = async () => {
    await userSignOut();
    removeUid("TON_uid");
    navigateToHomePage();
  };
  return (
    <>
      {showButton ? (
        <TitleContainer>
          <TitlePic />
          <Button
            style={{ marginRight: "5%", marginTop: "2%" }}
            onClick={() => handleSignOut()}
          >
            WYLOGUJ
          </Button>
        </TitleContainer>
      ) : (
        <TitlePic />
      )}
    </>
  );
};

export default Title;
