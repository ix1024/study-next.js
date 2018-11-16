import React from 'react'
import Swiper from 'swiper'
import './index.scss'

//import Swiper from 'swiper/dist/js/swiper.esm.bundle';
var list = [
    '/static/img/01.jpg',
    '/static/img/02.jpg',
    '/static/img/03.jpg',
    '/static/img/04.jpg'
];
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // dummy slides data
            slides: (function () {
                var slides = [];
                for (var i = 0; i < 4; i += 1) {
                    slides.push('Slide ' + (i + 1));
                }
                return list;
            }()),
            // virtual data
            virtualData: {
                slides: [],
            },
        }
    }
    componentDidMount() {
        const self = this;
        const swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 5000,
            },
            // ...
            virtual: {
                slides: self.state.slides,
                renderExternal(data) {
                    // assign virtual slides data
                    self.setState({
                        virtualData: data,
                    });
                }
            },
        });
    }
    render() {

        return (
            <div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {/* It is important to set "left" style prop on every slide */}
                        {this.state.virtualData.slides.map((slide, index) => (
                            <div className="swiper-slide"
                                key={index}
                                style={{ left: `${this.state.virtualData.offset}px` }}
                            >
                                <a href=""><img src={slide} alt="" /></a>
                            </div>
                        ))}
                    </div>
                    <div class="swiper-pagination"></div>
                </div>

            </div>
        )

    }
}