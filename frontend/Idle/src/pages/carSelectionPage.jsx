import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWithoutQueryAPI } from "../utils/api";
import { PATH } from "../constant/path";
import { styled } from "styled-components";
import { CAR_SELECTION_NUM } from "../constant/constants";
import CategoryTabs from "../components/common/tabs/CategoryTabs";
import MainLogoBlack from "../components/common/logos/MainLogoBlack";
import WarningModal from "../components/common/modals/WarningModal";
import CarSelectionContainer from "../components/carSelectionPage/carSelectionMain/CarSelectionContainer";
import palette from "../styles/palette";
import CarSelectionPagenation from "../components/carSelectionPage/carSelectionSub/CarSelectionPagenation";
import { preloadContext } from "../store/context";

function filterData(data, selectedTab, currentPage) {
  if (data.length === 0) return {};

  const tabData = data.filter((item) => item.carCategoryName === selectedTab)[0].carTypeDtoList;
  const maxPage = Math.ceil(tabData.length / CAR_SELECTION_NUM);
  const filteredData = [];
  for (let i = (currentPage - 1) * CAR_SELECTION_NUM; i < currentPage * CAR_SELECTION_NUM; i++) {
    tabData[i] !== undefined ? filteredData.push(tabData[i]) : null;
  }
  return { filteredData, maxPage };
}

function btnClicked(navigate, selectedCar, setWarningModalVisible) {
  if (selectedCar !== null) {
    navigate("/trim");
    return;
  }
  setWarningModalVisible(true);
}
function tabClicked(item, setSelectedTab, setSelectedCar) {
  setSelectedTab(item);
  setSelectedCar(null);
}

function CarSelectionPage() {
  const [selectedTab, setSelectedTab] = useState("SUV");
  const [selectedCar, setSelectedCar] = useState(null);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [carData, setCarData] = useState([]);
  const { setPreLoadData } = useContext(preloadContext);

  const tabs = ["수소/전기차", "N", "승용", "SUV", "소형트럭&택시", "트럭", "버스"];
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getWithoutQueryAPI(PATH.SELECTCAR);
      setCarData(res);
    })();
  }, []);

  const { filteredData, maxPage } = filterData(carData, selectedTab, currentPage);

  function mouseEnter() {
    setPreLoadData([]);
    (async () => {
      const res = await getWithoutQueryAPI(PATH.COLOR.EXTERIOR, { trimId: 4 });
      res?.map((item) => {
        setPreLoadData((prev) => [...prev, item.carImgUrls]);
      });
    })();
  }

  function renderTabs() {
    return tabs.map((item, index) => {
      return (
        <CategoryTabs
          text={item}
          key={index}
          isClicked={selectedTab === item}
          onClick={() => tabClicked(item, setSelectedTab, setSelectedCar)}
        />
      );
    });
  }

  return (
    <StWrapper>
      <StContainer id="carSelectModal">
        <StLogo>
          <MainLogoBlack modalPosition={"carSelectModal"} />
        </StLogo>
        <StHeader>
          <StP>모델을 선택해주세요</StP>
          <StTabs>{renderTabs()}</StTabs>
        </StHeader>
        {filteredData && (
          <CarSelectionContainer
            data={filteredData}
            setSelectedCar={setSelectedCar}
            selectedCar={selectedCar}
          />
        )}
        <CarSelectionPagenation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={maxPage}
        />
        <StBtn
          onClick={() => btnClicked(navigate, selectedCar, setWarningModalVisible)}
          onMouseEnter={mouseEnter}
        >
          마이 카마스터 시작하기
        </StBtn>
        {warningModalVisible && (
          <WarningModal
            title={"차량을 선택하지 않았습니다."}
            setModalVisible={setWarningModalVisible}
            onSubmitClick={() => navigate("/")}
            detail={"이전 페이지로 돌아가시겠습니까?"}
            modalPosition={"carSelectModal"}
          />
        )}
      </StContainer>
    </StWrapper>
  );
}

export default CarSelectionPage;

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
const StLogo = styled.div`
  position: absolute;
  left: 128px;
  top: 32px;
`;
const StHeader = styled.div`
  width: 1024px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 128px;
  top: 74px;
`;
const StP = styled.p`
  color: ${palette.Black};
  font-family: "Hyundai Sans Head KR";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: -0.72px;
`;
const StTabs = styled.div`
  display: flex;
  gap: 50px;
`;

const StBtn = styled.div`
  position: absolute;
  bottom: 39px;
  left: 476.5px;
  display: flex;
  width: 327px;
  height: 44px;
  background: ${palette.NavyBlue_5};
  justify-content: center;
  align-items: center;
  color: ${palette.White};
  font-family: "Hyundai Sans Text KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.42px;
  text-align: center;
  cursor: pointer;

  &:active {
    box-shadow: inset 1px 1px 4px #898989;
  }

  border-radius: 2px;
  box-shadow: 1px 1px 1px #b7b7b7;
  &:hover {
    filter: brightness(1.5);
  }
`;
