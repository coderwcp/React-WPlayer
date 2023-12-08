import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./index.scss";
// import required modules
import { Autoplay, EffectCoverflow, EffectFade, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { getBannerApi } from "@/api/modules/home";
import { BannerType } from "@/api/interface";
import { Carousel, Image } from "antd";

const contentStyle: React.CSSProperties = {
	height: "160px",
	color: "#fff",
	lineHeight: "160px",
	textAlign: "center",
	background: "#364d79"
};

function _Banner() {
	const [bannerList, setBannerList] = useState<BannerType[]>([]);

	const [swiperEffect, setSwiperEffect] = useState<"coverflow" | "fade">("fade");
	const [bannerHeight, setBannerHeight] = useState<number>(0);

	const getBanner = () => {
		getBannerApi().then(({ banners, code }) => {
			if (code !== 200) return;
			setBannerList(banners);
		});
	};

	// 获取宽度计算轮播图高度
	const getBannerHeight = () => {
		if (window.innerWidth > 680) {
			setSwiperEffect("coverflow");
			if (window.innerWidth >= 1200 && window.innerWidth <= 1500) {
				setBannerHeight(window.innerWidth / 5.5);
			} else if (window.innerWidth <= 1500) {
				setBannerHeight(window.innerWidth / 5);
			} else {
				setBannerHeight(300);
			}
		} else {
			setSwiperEffect("fade");
			setBannerHeight(window.innerWidth / 3);
		}
	};

	useEffect(() => {
		getBanner();
		getBannerHeight();
		window.addEventListener("resize", getBannerHeight);
		return () => {
			window.removeEventListener("resize", getBannerHeight);
		};
	}, [swiperEffect]);

	return (
		<div className="banner">
			{bannerList[0] && (
				<>
					<Swiper
						effect={swiperEffect}
						grabCursor={true}
						centeredSlides={true}
						slidesPerView={"auto"}
						initialSlide={0}
						fadeEffect={{ crossFade: false }}
						coverflowEffect={{
							rotate: 0,
							stretch: 100,
							depth: 200,
							modifier: 1,
							scale: 0.83,
							slideShadows: true
						}}
						autoplay={{
							delay: 3000,
							stopOnLastSlide: false,
							disableOnInteraction: true,
							pauseOnMouseEnter: false,
							reverseDirection: false,
							waitForTransition: true
						}}
						pagination={true}
						modules={[EffectCoverflow, EffectFade, Pagination, Autoplay]}
						className="pc-swiper"
					>
						{bannerList.map(item => {
							return (
								<SwiperSlide
									style={swiperEffect === "coverflow" ? { width: "60%", height: bannerHeight } : { height: bannerHeight }}
									key={item.imageUrl + bannerHeight}
								>
									<Image
										src={item.imageUrl.replace(/^http:/, "https:") + "?imageView&quality=89"}
										preview={false}
										loading="lazy"
										key={item.imageUrl + bannerHeight}
										alt="banner"
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>

					{false && (
						<Carousel autoplay className="mb-swiper">
							<div>
								<h3 style={contentStyle}>1</h3>
							</div>
							<div>
								<h3 style={contentStyle}>2</h3>
							</div>
							<div>
								<h3 style={contentStyle}>3</h3>
							</div>
							<div>
								<h3 style={contentStyle}>4</h3>
							</div>
						</Carousel>
					)}
				</>
			)}
		</div>
	);
}

const Banner = connect()(_Banner);

export default Banner;
