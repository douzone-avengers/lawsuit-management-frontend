export type ClientData = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
};

const clientTable: ClientData[] = [
  {
    id: 1,
    name: "홍길동",
    phone: "010-1234-5678",
    email: "honggildong@gmail.com",
    address: "서울특별시 강남구 역삼동 123번지",
  },
  {
    id: 2,
    name: "김철수",
    phone: "010-9876-5432",
    email: "kimchulsu@gmail.com",
    address: "서울특별시 종로구 관철동 456번지",
  },
  {
    id: 3,
    name: "이영희",
    phone: "010-5555-5555",
    email: "leeyounghee@gmail.com",
    address: "부산광역시 해운대구 좌동 789번지",
  },
  {
    id: 4,
    name: "박민준",
    phone: "010-2222-2222",
    email: "parkminjun@gmail.com",
    address: "대구광역시 중구 동인동 321번지",
  },
  {
    id: 5,
    name: "정수빈",
    phone: "010-7777-7777",
    email: "jungsubin@gmail.com",
    address: "인천광역시 남동구 학익동 654번지",
  },
  {
    id: 6,
    name: "신지아",
    phone: "010-8888-8888",
    email: "shinjia@gmail.com",
    address: "대전광역시 서구 관저동 987번지",
  },
  {
    id: 7,
    name: "윤영호",
    phone: "010-3333-3333",
    email: "yungho@gmail.com",
    address: "광주광역시 동구 송정동 741번지",
  },
  {
    id: 8,
    name: "최지수",
    phone: "010-9999-9999",
    email: "choijisoo@gmail.com",
    address: "울산광역시 남구 신정동 852번지",
  },
  {
    id: 9,
    name: "배예진",
    phone: "010-4444-4444",
    email: "baeyejin@gmail.com",
    address: "세종특별자치시 한솔동 369번지",
  },
  {
    id: 10,
    name: "강민수",
    phone: "010-6666-6666",
    email: "kangminsoo@gmail.com",
    address: "경기도 수원시 장안구 정자동 258번지",
  },
];

export default clientTable;
