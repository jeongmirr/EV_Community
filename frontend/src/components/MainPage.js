import { Carousel } from 'antd';
const imageContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
};
const centeredImage = {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: '0 auto'
};
const App = () => (
    <Carousel autoplay autoplaySpeed={5000}>
        <div style={imageContainer}>
            <img src="./image/car1.jpg" alt="Slide 1" style={centeredImage} />
        </div>
        <div style={imageContainer}>
            <img src="./image/car2.jpg" alt="Slide 2" style={centeredImage} />
        </div>
        <div style={imageContainer}>
            <img src="./image/car3.jpg" alt="Slide 3" style={centeredImage} />
        </div>
    </Carousel>
);
export default App;