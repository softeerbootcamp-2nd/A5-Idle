import { styled } from "styled-components";
import { ADD, CONFUSE, NONE } from "../../../constant/constants";
import palette from "../../../styles/palette";

function AddButton({ state, onClick }) {
  return (
    <StContainer onClick={onClick} $state={state}>
      {state === ADD ? "취소하기" : "추가하기"}
    </StContainer>
  );
}

export default AddButton;

const StContainer = styled.div`
  display: flex;
  width: 53px;
  padding: 3.5px 12px;
  border: 0.5px solid ${({ $state }) => ($state === NONE ? `${palette.Black}` : `${palette.White}`)};
  color: ${({ $state }) => {
    switch ($state) {
      case NONE:
        return `${palette.White}`;
      case CONFUSE:
        return `${palette.Gold_5}`;
      case ADD:
        return `${palette.NavyBlue_5}`;
    }
  }};
  background: ${({ $state }) => ($state === NONE ? `${palette.NavyBlue_5}` : `${palette.White}`)};
  justify-content: center;
  align-items: center;
  gap: 11.624px;
  font-family: "Hyundai Sans Text KR";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.36px;
  text-align: center;
  z-index: 1;
  &:hover {
    cursor: pointer;
    filter: brightness(150%);
  }
  &:active {
    box-shadow: inset 1px 1px 4px #898989;
  }
  border-radius: 2px;
  box-shadow: 1px 1px 1px #b7b7b7;
`;
