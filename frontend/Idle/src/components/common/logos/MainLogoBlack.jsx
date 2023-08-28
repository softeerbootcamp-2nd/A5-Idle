import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ReactComponent as MainLogoImg } from "../../../assets/images/hyundai.svg";
import { carContext } from "../../../store/context";
import { RESET_ALL } from "../../../store/actionType";
import WarningModal from "../modals/WarningModal";
import palette from "../../../styles/palette";

function MainLogoBlack({ modalPosition = null }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(carContext);

  const pathArr = useLocation().pathname.split("/");
  const location = pathArr[pathArr.length - 1];
  let position;
  if (modalPosition === null) {
    location === "bill" ? (position = "carMasterModal") : (position = "modal");
  } else {
    position = modalPosition;
  }

  function resetPage() {
    dispatch({ type: RESET_ALL, payload: null });
    navigate("/");
  }

  function logoClicked() {
    setModalVisible(true);
  }

  return (
    <Stdiv>
      <MainLogoImg
        alt="MainLogoImg"
        onClick={logoClicked}
        style={{ cursor: "pointer" }}
        loading="lazy"
      />
      <Stdivision></Stdivision>
      <Stspan>마이 카마스터</Stspan>
      {modalVisible ? (
        <WarningModal
          title={"마이 카마스터를 종료하시겠습니까?"}
          setModalVisible={setModalVisible}
          onSubmitClick={resetPage}
          modalPosition={position}
        />
      ) : null}
    </Stdiv>
  );
}

export default MainLogoBlack;

const Stdiv = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
const Stdivision = styled.span`
  width: 0.549px;
  height: 8.235px;
  background: ${palette.CoolGrey_3};
`;
const Stspan = styled.span`
  color: ${palette.Black};
  font-family: "Hyundai Sans Head KR";
  font-size: 8.784px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: -0.22px;
`;
