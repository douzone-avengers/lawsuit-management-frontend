import { useEffect, useRef, useState } from "react";
import clientIdState from "../../states/client/ClientIdState.tsx";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { ClientData } from "../../mock/client/clientTable.ts";
import Card from "@mui/material/Card";

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
  // 지도를 담을 영역의 DOM 레퍼런스
  const container = useRef<HTMLDivElement>(null);
  // container의 current 속성
  const { current } = container;
  const [width, setWidth] = useState<number>(parentWidth);
  const [height, setHeight] = useState<number>(parentHeight);

  // 화면 크기가 변경될 때마다 지도 영역 크기를 업데이트하는 함수
  const updateMapSize = () => {
    if (current) {
      setWidth(width);
      setHeight(height);
    }
  };

  // 화면 크기 변경 이벤트 핸들러 등록
  useEffect(() => {
    // 처음 컴포넌트가 마운트될 때 크기 업데이트
    updateMapSize();

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
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: ClientData } = res.data;
      const { data } = body;
      const { address } = data;
      setAddress(address);
    };

    request("GET", `/clients/${clientId}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  // address(주소)가 변경될 때마다 지도 렌더링
  useEffect(() => {
    if (address === "") {
      return;
    }
    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표.
      level: 3, // 지도의 레벨 (확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(current, options); // 지도 생성
    const geocoder = new window.kakao.maps.services.Geocoder(); // 주소를 좌표로 변환하기 위한 객체

    if (typeof clientId !== "number") {
      // TODO
      return;
    }

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
        infoWindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
      }
    });
  }, [address]);

  return (
    <Card>
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        ref={container}
      ></div>
    </Card>
  );
}
