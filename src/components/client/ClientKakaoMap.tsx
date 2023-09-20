import { useEffect, useRef, useState } from "react";
import clientIdState from "../../states/client/ClientIdState.tsx";
import { useRecoilValue } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import Card from "@mui/material/Card";
import { ClientData } from "../../type/ResponseType.ts";

// window.kakao에 대한 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

type Props = {
  parentWidth: number;
  parentHeight: number;
};

export default function KakaoMap({ parentWidth, parentHeight }: Props) {
  const clientId = useRecoilValue(clientIdState);
  const [address, setAddress] = useState("");
  const container = useRef<HTMLDivElement>(null); // 지도를 담을 영역의 DOM 레퍼런스
  const { current } = container; // container의 current 속성
  // 지도를 생성할 때 필요한 기본 옵션
  const options = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표.
    level: 3, // 지도의 레벨 (확대, 축소 정도)
  };

  const [map, setMap] = useState<any>(null);
  const [width, setWidth] = useState<number>(parentWidth);
  const [height, setHeight] = useState<number>(parentHeight);

  // 부모 컴포넌트 크기가 변경될 때마다 지도 영역 크기를 업데이트하는 함수
  const updateMapSize = () => {
    if (current) {
      setWidth(parentWidth);
      setHeight(parentHeight);
    }
  };

  // 화면 크기 변경 이벤트 핸들러 등록
  useEffect(() => {
    updateMapSize(); // 처음 컴포넌트가 마운트될 때 크기 업데이트

    // resize 이벤트 핸들러 등록
    const handleResize = () => {
      updateMapSize();
    };
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [parentWidth, parentHeight]);

  // clientId가 변경될 때마다 해당 주소 가져옴
  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const clientData: ClientData = res.data;
      setAddress(clientData.address);
    };

    requestDeprecated("GET", `/clients/${clientId}`, {
      withToken: true,
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  // address(주소)가 변경될 때마다 지도 렌더링
  useEffect(() => {
    if (address === "") {
      return;
    }

    if (!map) {
      setMap(new window.kakao.maps.Map(current, options));
    } else {
      const geocoder = new window.kakao.maps.services.Geocoder(); // 주소를 좌표로 변환하기 위한 객체

      geocoder.addressSearch(address, function (result: any[], status: any) {
        // 정상적으로 검색 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명 표시
          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:200px;text-align:center;padding:6px 0;">${address}</div>`,
          });

          // 마커에 마우스오버 이벤트 등록
          window.kakao.maps.event.addListener(marker, "mouseover", function () {
            infoWindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트 등록
          window.kakao.maps.event.addListener(marker, "mouseout", function () {
            infoWindow.close();
          });

          map.setCenter(coords); // 지도의 중심을 결과값으로 받은 위치로 이동
          map.relayout(); // 지도의 픽셀과 좌표 정보 새로 설정
        }
      });
    }
  }, [address, map, width, height]);

  return (
    <Card ref={container}>
      <div style={{ width: `${width}px`, height: `${height}px` }}></div>
    </Card>
  );
}
