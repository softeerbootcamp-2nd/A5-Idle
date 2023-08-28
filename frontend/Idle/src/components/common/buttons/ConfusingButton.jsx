import { styled } from "styled-components";
import palette from "../../../styles/palette";
import { CONFUSE, NONE } from "../../../constant/constants";

function ConfusingButton({ state, onClick }) {
  return (
    <StContainer onClick={onClick} $state={state}>
      {state === CONFUSE ? "취소하기" : "고민해보기"}
    </StContainer>
  );
}

export default ConfusingButton;

const StContainer = styled.div`
  display: flex;
  width: 53px;
  padding: 3.5px 12px;
  border: 0.5px solid ${({ $state }) => ($state === NONE ? `${palette.Black}` : `${palette.White}`)};
  justify-content: center;
  align-items: center;
  gap: 11.624px;
  color: ${({ $state }) => ($state === NONE ? `${palette.Black}` : `${palette.White}`)};
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
    filter: brightness(1%);
  }

  &:active {
    box-shadow: inset 1px 1px 4px #898989;
  }
  border-radius: 2px;
  box-shadow: 1px 1px 1px #b7b7b7;
`;
