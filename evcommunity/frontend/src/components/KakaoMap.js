import React, { useEffect, useRef, useState } from 'react';
import { Input, Modal, DatePicker, Button, Space } from 'antd';
const { Search } = Input;
const { RangePicker } = DatePicker;

const KakaoMap = () => {
    const map = useRef(null);
    const marker = useRef(null);
    const infowindow = useRef(null);
    const [modalVisible, setModalVisible] = useState(false); // 모달 창 열림 상태를 관리하는 state
    const [dateRange, setDateRange] = useState(null);
    const [placeInfo, setPlaceInfo] = useState({ placeName: '', roadAddressName: '' });


    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(37.50802, 127.062841),
            level: 3,
            disableDoubleClickZoom: true,
        };

        // 지도 생성
        map.current = new window.kakao.maps.Map(container, options);

        // 마커 이미지 주소
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        // 마커 이미지 크기
        var imageSize = new window.kakao.maps.Size(24, 35);

        // 마커 이미지 생성
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

        marker.current = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(37.50802, 127.062841),
            image: markerImage, // 마커 이미지
        });

        infowindow.current = new window.kakao.maps.InfoWindow({
            content: `<div style="width:100%; padding:5px;">`,
            zIndex: 1
        });

        // 마커에 마우스 오버 이벤트 등록
        window.kakao.maps.event.addListener(
            marker.current,
            'mouseover',
            () => {
                infowindow.current.open(map.current, marker.current); // 기존 마커 클릭 시 나오는 장소명과 주소 기능 주석처리
            }
        );

        // 마커에 마우스 아웃 이벤트 등록
        window.kakao.maps.event.addListener(
            marker.current,
            'mouseout',
            () => {
                infowindow.current.close();
            }
        );

        // 마커에 클릭 이벤트 리스너 등록
        window.kakao.maps.event.addListener(
            marker.current,
            'click',
            () => {
                setModalVisible(true); // 모달 창을 열고 닫는 데 사용
            }
        );

        marker.current.setMap(map.current);
    }, []);

    const onSearch = (value) => {
        const ps = new window.kakao.maps.services.Places(map.current);

        const callback = (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const position = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                map.current.setCenter(position);
                marker.current.setPosition(position);
                infowindow.current.setContent(
                    `<div style="text-align: left; width: 100%; padding:5px; margin-right: 5px; font-size: 16px;">
                    <span style="font-weight: bold; ">${result[0].place_name}</span><br/>
                    ${result[0].road_address_name}
                </div>`
                )
                infowindow.current.open(map.current, marker.current);

                // 검색 결과를 state에 저장
                setPlaceInfo({
                    placeName: result[0].place_name,
                    roadAddressName: result[0].road_address_name
                });
            } else {
                console.log('검색 결과가 없습니다.');
            }
        };

        ps.keywordSearch(value, callback);
    };

    // 모달 창 시작날짜 종료날짜
    const handleDateChange = (dates) => {
        setDateRange(dates);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Search
                placeholder="장소 검색"
                allowClear
                enterButton="검색"
                size="large"
                onSearch={onSearch}
                style={{ width: '40%', marginBottom: '30px' }}
            />

            {/* 모달 창 */}
            <Modal
                title={placeInfo.placeName}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <p>{placeInfo.roadAddressName}</p>
                <p>충전방식</p>
                <p>충전기상태</p>
                <br></br>
                <span style={{ fontWeight: "bold"}}>예약시간 설정</span>
                <p></p>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }} // 시간 선택 옵션 추가
                        format="YYYY-MM-DD HH:mm" // 날짜 및 시간 형식 지정
                        onChange={handleDateChange}
                        style={{ width: '100%' }}
                    />
                </Space>
                <div style={{ textAlign: 'center', marginTop: '10px' }}> {/* 버튼을 감싸는 div 추가 */}
                    <Button
                        type="primary"
                        onClick={() => console.log('예약 버튼 클릭')}
                        disabled={!dateRange || !dateRange[0] || !dateRange[1]}
                    >
                        예약
                    </Button>
                </div>
            </Modal>


            <div id="map" style={{ width: '80%', height: '700px', margin: '0 auto' }}></div>
        </div>
    );
};

export default KakaoMap;
