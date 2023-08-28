import { styled } from "styled-components";
import hyundaiVideo from "../assets/images/palisadeVideo.mp4";
import MainLogoWhite from "../components/common/logos/MainLogoWhite";
import { useNavigate } from "react-router-dom";
import { setClickedOptionPage } from "../constant/constants";

function MainPage() {
  const navigate = useNavigate();
  setClickedOptionPage(false);

  return (
    <StWrapper>
      <StContainer>
        <StLogo>
          <MainLogoWhite />
        </StLogo>
        <StMain>
          <StTitle>
            내게 맞는 견적부터 <br />
            카마스터 연결까지
          </StTitle>
          <StSub>마이 카마스터와 함께해요</StSub>
          <StBtn onClick={() => navigate("/selectCar")}>마이 카마스터 시작하기</StBtn>
        </StMain>
        <StVideo autoPlay muted loop>
          <source src={hyundaiVideo} type="video/mp4"></source>
        </StVideo>
      </StContainer>
    </StWrapper>
  );
}

export default MainPage;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StContainer = styled.div`
  position: relative;
  width: 1280px;
  height: 720px;
`;

const StVideo = styled.video`
  object-fit: fill;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const StLogo = styled.div`
  cursor: pointer;
  z-index: 1;
  position: absolute;
  top: 32px;
  left: 128px;
`;

const StMain = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40%;
  right: 10%;
  color: #ffffff;
`;

const StTitle = styled.div`
  font-family: "Hyundai Sans Head KR";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: -0.96px;
`;

const StSub = styled.div`
  margin-top: 10px;
  font-family: "Hyundai Sans Text KR";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.48px;
`;

const StBtn = styled.button`
  width: 241px;
  height: 44px;
  background: #fff;
  color: #222222;
  font-family: "Hyundai Sans Head KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-top: 50px;
  cursor: pointer;

  &:hover {
    opacity: 0.93;
  }

  &:active {
    box-shadow: inset 1px 1px 4px #898989;
  }

  border-radius: 5px;
  box-shadow: 1px 1px 1px #b7b7b7;
`;
