import React, { useEffect, useRef } from 'react';
import { Input } from 'antd';
const { Search } = Input;

const KakaoMap = () => {
    const map = useRef(null);
    const marker = useRef(null);
    const infowindow = useRef(null);

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
                infowindow.current.open(map.current, marker.current);
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

                infowindow.current.open(map.current, marker.current);;
            } else {
                console.log('검색 결과가 없습니다.');
            }
        };

        ps.keywordSearch(value, callback);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="검색"
                size="large"
                onSearch={onSearch}
                style={{ width: '40%', marginBottom: '30px' }}
            />
            <div id="map" style={{ width: '80%', height: '700px', margin: '0 auto' }}></div>
        </div>
    );
};

export default KakaoMap;
