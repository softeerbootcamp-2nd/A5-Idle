import { useContext, useEffect, useRef, useState } from "react";
import { css, keyframes, styled } from "styled-components";
import { carContext } from "../store/context";
import { getWithQueryAPI } from "../utils/api";
import { PATH } from "../constant/path";
import Header from "../components/layout/Header";
import ReactToPrint from "react-to-print";
import WhiteButton from "../components/common/buttons/WhiteButton";
import BlueButton from "../components/common/buttons/BlueButton";
import BillMain from "../components/billPage/billMain/BillMain";
import WarningModal from "../components/common/modals/WarningModal";
import MapModal from "../components/billPage/carMaster/MapModal";
import CarMasterTooltip from "../components/common/toolTips/CarMasterTooltip";

let cachedBillData = null;

function BillPage() {
  const { car } = useContext(carContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [carMasterVisible, setCarMasterVisible] = useState(false);
  const [tooltipState, setTooltipState] = useState(true);
  const [billData, setBillData] = useState(cachedBillData);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [prevMoney, setPrevMoney] = useState(car.getAllSum());
  const [targetMoney, setTargetMoney] = useState(car.getAllSum());

  useEffect(() => {
    setTargetMoney(car.getAllSum());
  }, [car.getAllSum()]);

  const updateAnimation = () => {
    if (prevMoney !== targetMoney) {
      setPrevMoney(prevMoney + (targetMoney - prevMoney) * 0.5);
    }
  };

  useEffect(() => {
    if (prevMoney !== targetMoney) {
      requestAnimationFrame(updateAnimation);
    }
  }, [prevMoney, targetMoney]);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function carMasterBtnClicked() {
    setCarMasterVisible(true);
    setTooltipState(false);
  }
  let additionalOptionIds = [];
  const billRef = useRef();
  car.option.additional.map((item) => additionalOptionIds.push(item.optionId));
  car.option.confusing.map((item) => additionalOptionIds.push(item.optionId));

  useEffect(() => {
    if (car.color.exterior.exteriorId === undefined) {
      setModalVisible(true);
    } else {
      (async () => {
        const res = await getWithQueryAPI(PATH.BILL, {
          trimId: car.trim.trimId,
          exteriorId: car.color.exterior.exteriorId,
          interiorId: car.color.interior.interiorId,
          selectedOptionIds: additionalOptionIds,
        });
        setBillData(res);
        cachedBillData = res;
      })();
    }
  }, []);
  function scrollTop() {
    document.documentElement.scrollTop = 0;
  }

  return (
    <StWrapper>
      <StContainer id={"carMasterModal"} ref={billRef}>
        <Header />
        <TitleContainer>
          <StTitle>
            팰리세이드와 함께 <br />
            드라이브 떠나볼까요?
          </StTitle>
          카마스터 찾기를 통해 구매 상담을 할 수 있어요
        </TitleContainer>
        <BlueBG />
        <CarContainer $src={JSON.stringify(car.carImg)} />
        <BlueBgBottom />
        <StConfirmContainer>
          <StConfirmText onClick={scrollTop} $scrollPosition={scrollPosition}>
            <p>예상 가격</p>
            <h1>{Math.round(prevMoney).toLocaleString()} 원</h1>
          </StConfirmText>
          <StButtonContainer>
            <StTooltipContainer
              onClick={() => {
                setTooltipState(false);
              }}
            >
              <StTooltip isActive={tooltipState} />
            </StTooltipContainer>

            <ReactToPrint
              trigger={() => <WhiteButton text={"공유하기"} />}
              content={() => billRef.current}
            ></ReactToPrint>

            <BlueButton text={"카마스터 찾기"} onClick={carMasterBtnClicked} />
          </StButtonContainer>
        </StConfirmContainer>
        <BillMain data={billData} />
        {carMasterVisible && <MapModal setCarMasterVisible={setCarMasterVisible} />}
        {modalVisible && (
          <WarningModal
            title={"메인페이지로 이동합니다."}
            setModalVisible={setModalVisible}
            onSubmitClick={() => {
              location.replace("/");
            }}
            detail={"현재까지의 변경사항은 저장되지 않습니다."}
            modalPosition={"carMasterModal"}
          />
        )}
      </StContainer>
    </StWrapper>
  );
}

export default BillPage;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1280px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  @media print {
    & * {
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;
const BlueBG = styled.div`
  width: 1280px;
  height: 641px;
  background: linear-gradient(180deg, #dde4f8 0%, rgba(231, 235, 246, 0) 100%);
`;
const BlueBgBottom = styled(BlueBG)`
  position: absolute;
  height: 100%;
  top: 414px;
  z-index: -1;
  animation: ${keyframes`
  0% {
    transform: translateY(20%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  `} 0.7s ease-in-out;
`;
const TitleContainer = styled.div`
  position: absolute;
  top: 88px;
  left: 148px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  p {
    color: #222;
    font-family: "Hyundai Sans Text KR";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.48px;
  }
`;
const StTitle = styled.h1`
  color: #222;
  width: 261px;
  font-family: "Hyundai Sans Head KR";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: -0.96px;
`;
const CarContainer = styled.div`
  position: absolute;
  width: 860px;
  height: 471px;
  flex-shrink: 0;
  top: 130px;
  left: 50px;
  background-image: url(${({ $src }) => $src});
  animation: ${keyframes`
  0% {
    transform: translateX(20%)translateY(-3%);
    opacity: 0;
  }
  50% {
    transform: translateX(20%)translateY(-3%);
    opacity: 0;
  }
  100% {
    transform: translateX(0) translateY(0%);
    
    opacity: 1;
  }
  `} 1.5s ease-in-out;
`;
const StConfirmContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  top: 420px;
  right: 100px;
  gap: 40px;
  justify-content: center;
  align-items: flex-end;
`;
const fixedAnimation = css`
  position: fixed;
  flex-direction: column;
  right: 60px;
  bottom: 120px;
  height: fit-content;
  border-radius: 8px;
  padding: 10px 20px 10px 20px;
  border: 1px ridge #dde4f8;
  background-color: white;
`;
const StConfirmText = styled.div`
  display: flex;
  flex-direction: column;
  color: #222;
  top: 580px;
  gap: 8px;
  right: 320px;
  cursor: pointer;
  ${({ $scrollPosition }) => ($scrollPosition > 500 ? fixedAnimation : "")};
  p {
    font-family: "Hyundai Sans Text KR";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.48px;
    text-align: right;
    margin-top: 5px;
  }
  h1 {
    font-family: "Hyundai Sans Head KR";
    font-size: 28px;
    font-weight: 500;
    line-height: 36px;
    letter-spacing: -0.84px;
  }
`;
const StButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  left: 998px;
  top: 503px;
`;

const StTooltip = styled(CarMasterTooltip)``;

const StTooltipContainer = styled.div`
  cursor: pointer;
  position: relative;
  right: 23%;
  width: 199px;
  height: 65px;
  animation: bounceTop 1.3s infinite linear;
  @keyframes bounceTop {
    0% {
      top: 0;
    }

    50% {
      top: -3px;
    }

    70% {
      top: -7px;
    }

    100% {
      top: 0;
    }
  }
`;
