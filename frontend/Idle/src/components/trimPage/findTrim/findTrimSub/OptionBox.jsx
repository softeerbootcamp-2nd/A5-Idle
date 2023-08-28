import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { dispatchContext } from "../../../../store/context";
import { POP_SELECTED_OPTION, PUSH_SELECTED_OPTION } from "../../../../store/actionType";
import OptionSelectModal from "./OptionSelectModal";
import palette from "../../../../styles/palette";
import { ReactComponent as OptionChecked } from "../../../../assets/images/optionChecked.svg";

function OptionBox({ data, disable = false }) {
  const [isSelected, setIsSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { stateDispatch } = useContext(dispatchContext);

  function boxClicked(e) {
    if (e.target.tagName === "svg" && e.target.dataset.name === "esc") return;

    setIsSelected((cur) => !cur);
    if (!isSelected) {
      stateDispatch({ type: PUSH_SELECTED_OPTION, payload: data.functionId });
    } else {
      stateDispatch({ type: POP_SELECTED_OPTION, payload: data.functionId });
    }
  }

  function dataNameCalc() {
    const dataName = data.name;
    if (dataName.length > 16) {
      return dataName.slice(0, 16) + "...";
    }
    return dataName;
  }

  function modalClicked(e) {
    e.stopPropagation();
    setModalVisible((cur) => !cur);
  }

  function renderModal() {
    return modalVisible ? (
      <OptionSelectModal
        data={data}
        setModalVisible={() => setModalVisible(false)}
        setIsSelected={setIsSelected}
        onClick={(e) => e.stopPropagation()}
      />
    ) : null;
  }

  useEffect(() => {
    if (disable) {
      setIsSelected(false);
    }
  }, []);

  return (
    <StContainer onClick={boxClicked} $isSelcted={isSelected} $disable={disable}>
      <StOption>
        <OptionChecked alt="OptionCheckedImg" data-name={data.name} loading="lazy" />
        <StTitle $isSelcted={isSelected}>{dataNameCalc()}</StTitle>
      </StOption>
      <StBtn $isSelcted={isSelected} onClick={modalClicked}>
        상세보기
      </StBtn>
      {renderModal()}
    </StContainer>
  );
}

export default OptionBox;

const StContainer = styled.div`
  display: flex;
  width: 302px;
  height: 32px;
  padding: 16px;
  border: 1px solid ${palette.Grey_2};
  background: ${({ $isSelcted }) => ($isSelcted ? `${palette.NavyBlue_5}` : `${palette.White}`)};
  opacity: ${({ $disable }) => ($disable ? 0.2 : 1)};
  pointer-events: ${({ $disable }) => ($disable ? "none" : "")};
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${({ $isSelcted }) =>
      $isSelcted ? `${palette.NavyBlue_5}` : `${palette.NavyBlue_1}`};
    opacity: 0.9;
    cursor: pointer;
    box-shadow: 2px 2px 10px #898989;
  }

  &:active {
    box-shadow: inset 1px 1px 4px #898989;
  }
  border-radius: 5px;
  box-shadow: 1px 1px 1px #b7b7b7;
`;

const StOption = styled.div`
  display: flex;
  width: 220px;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const StTitle = styled.div`
  color: ${({ $isSelcted }) => ($isSelcted ? `${palette.White}` : `${palette.Black}`)};
  font-family: "Hyundai Sans Text KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.42px;
`;

const StBtn = styled.button`
  color: ${({ $isSelcted }) => ($isSelcted ? `${palette.White}` : `${palette.NavyBlue_5}`)};
  font-family: "Hyundai Sans Text KR";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.36px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
