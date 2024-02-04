class OEW_Carousel extends elementorModules.frontend.handlers.Base {
    getDefaultSettings() {
        return {
            selectors: {
                carousel: ".oew-carousel-container",
                carouselNextBtn: `.swiper-button-next-${this.getID()}`,
                carouselPrevBtn: `.swiper-button-prev-${this.getID()}`,
                carouselPagination: `.swiper-pagination-${this.getID()}`,
            },
            effect: "slide",
            loop: false,
            autoplay: 0,
            speed: 400,
            navigation: false,
            pagination: false,
            centeredSlides: false,
            pauseOnHover: false,
            slidesPerView: {
                widescreen: 3,
                desktop: 3,
                laptop: 3,
                tablet: 2,
                tablet_extra: 2,
                mobile: 1,
                mobile_extra: 1,
            },
            slidesPerGroup: {
                widescreen: 3,
                desktop: 3,
                laptop: 3,
                tablet: 2,
                tablet_extra: 2,
                mobile: 1,
                mobile_extra: 1,
            },
            spaceBetween: {
                widescreen: 10,
                desktop: 10,
                laptop: 10,
                tablet: 10,
                tablet_extra: 10,
                mobile: 10,
                mobile_extra: 10,
            },
            swiperInstance: null,
        };
    }

    getDefaultElements() {
        const element = this.$element.get(0);
        const selectors = this.getSettings("selectors");

        return {
            carousel: element.querySelector(selectors.carousel),
            carouselNextBtn: element.querySelectorAll(selectors.carouselNextBtn),
            carouselPrevBtn: element.querySelectorAll(selectors.carouselPrevBtn),
            carouselPagination: element.querySelectorAll(selectors.carouselPagination),
        };
    }

    onInit(...args) {
        super.onInit(...args);

        this.setUserSettings();
        this.initSwiper();
        this.setupEventListeners();
        this.updateCarouselStyles(this.getSettings());
    }

    setUserSettings() {
        const settings = this.getSettings();
        const userSettings = JSON.parse(this.elements.carousel.getAttribute("data-settings"));

        const currentSettings = {
            effect: !!userSettings.effect ? userSettings.effect : settings.effect,
            loop: !!userSettings.loop ? Boolean(Number(userSettings.loop)) : settings.loop,
            autoplay: !!userSettings.autoplay ? Number(userSettings.autoplay) : settings.autoplay,
            speed: !!userSettings.speed ? Number(userSettings.speed) : settings.speed,
            navigation: !!userSettings.arrows ? Boolean(Number(userSettings.arrows)) : settings.navigation,
            pagination: !!userSettings.dots ? Boolean(Number(userSettings.dots)) : settings.pagination,
            pauseOnHover: !!userSettings["pause-on-hover"]
                ? JSON.parse(userSettings["pause-on-hover"])
                : settings.pauseOnHover,
            slidesPerView: {
                widescreen: userSettings['items-widescreen'] !== undefined ? Number(userSettings['items-widescreen']) : settings.slidesPerView['widescreen'],
                desktop: userSettings['items'] !== undefined ? Number(userSettings['items']) : settings.slidesPerView['desktop'],
                laptop: userSettings['items-laptop'] !== undefined ? Number(userSettings['items-laptop']) : settings.slidesPerView['laptop'],
                tablet: userSettings['items-tablet'] !== undefined ? Number(userSettings['items-tablet']) : settings.slidesPerView['tablet'],
                tablet_extra: userSettings['items-tablet_extra'] !== undefined ? Number(userSettings['items-tablet_extra']) : settings.slidesPerView['tablet_extra'],
                mobile: userSettings['items-mobile'] !== undefined ? Number(userSettings['items-mobile']) : settings.slidesPerView['mobile'],
                mobile_extra: userSettings['items-mobile_extra'] !== undefined ? Number(userSettings['items-mobile_extra']) : settings.slidesPerView['mobile_extra']
            },
            slidesPerGroup: {
                widescreen: !!userSettings['slides-widescreen'] ? Number(userSettings['slides-widescreen']) : settings.slidesPerGroup.widescreen,
                desktop: !!userSettings['slides'] ? Number(userSettings['slides']) : settings.slidesPerGroup.desktop,
                laptop: !!userSettings['slides-laptop'] ? Number(userSettings['slides-laptop']) : settings.slidesPerGroup.laptop,
                tablet: !!userSettings["slides-tablet"]
                    ? Number(userSettings["slides-tablet"])
                    : settings.slidesPerGroup.tablet,
                tablet_extra: !!userSettings["slides-tablet_extra"]
                    ? Number(userSettings["slides-tablet_extra"])
                    : settings.slidesPerGroup.tablet_extra,
                mobile: !!userSettings["slides-mobile"]
                    ? Number(userSettings["slides-mobile"])
                    : settings.slidesPerGroup.mobile,
                mobile_extra: !!userSettings["slides-mobile_extra"]
                    ? Number(userSettings["slides-mobile_extra"])
                    : settings.slidesPerGroup.mobile_extra,
            },
            spaceBetween: {
                widescreen: userSettings['margin-widescreen'] !== undefined ? Number(userSettings['margin-widescreen']) : settings.spaceBetween.widescreen,
                desktop: userSettings['margin'] !== undefined ? Number(userSettings['margin']) : settings.spaceBetween.desktop,
                laptop: userSettings['margin-laptop'] !== undefined ? Number(userSettings['margin-laptop']) : settings.spaceBetween.laptop,
                tablet: userSettings["margin-tablet"] !== undefined ? Number(userSettings["margin-tablet"]) : settings.spaceBetween.tablet,
                tablet_extra: userSettings["margin-tablet_extra"] !== undefined ? Number(userSettings["margin-tablet_extra"]) : settings.spaceBetween.tablet_extra,
                mobile: userSettings["margin-mobile"] !== undefined ? Number(userSettings["margin-mobile"]) : settings.spaceBetween.mobile,
                mobile_extra: userSettings["margin-mobile_extra"] !== undefined ? Number(userSettings["margin-mobile_extra"]) : settings.spaceBetween.mobile_extra,

          },
        };

        currentSettings.centeredSlides = currentSettings.effect === "coverflow" ? true : settings.centeredSlides;

        this.setSettings(currentSettings);

    }

    updateCarouselStyles(settings) {
      const { spaceBetween } = settings;

      // console.log("Updating Carousel Styles:", spaceBetween); // For debugging

      if (spaceBetween.desktop === 0) {
          // console.log("Setting margin-right for Desktop"); // For debugging
          this.elements.carousel.querySelectorAll('.oew-carousel-slide').forEach(slide => {
              slide.style.marginRight = "0px";
          });
      }
      if (spaceBetween.tablet === 0) {
          // console.log("Setting margin-right for Tablet"); // For debugging
          this.elements.carousel.querySelectorAll('.oew-carousel-slide').forEach(slide => {
              slide.style.marginRight = "0px";
          });
      }
      if (spaceBetween.mobile === 0) {
          // console.log("Setting margin-right for Mobile"); // For debugging
          this.elements.carousel.querySelectorAll('.oew-carousel-slide').forEach(slide => {
              slide.style.marginRight = "0px";
          });
      }
  }


    initSwiper() {
        const swiper = new Swiper(this.elements.carousel, this.swiperOptions());

        this.setSettings({
            swiperInstance: swiper,
        });
    }

    swiperOptions() {
        const settings = this.getSettings();

        const swiperOptions = {
            direction: "horizontal",
            effect: settings.effect,
            loop: settings.loop,
            speed: settings.speed,
            centeredSlides: settings.centeredSlides,
            autoHeight: true,
            autoplay: !settings.autoplay
                ? false
                : {
                      delay: settings.autoplay,
                  },
            navigation: !settings.navigation
                ? false
                : {
                      nextEl: settings.selectors.carouselNextBtn,
                      prevEl: settings.selectors.carouselPrevBtn,
                  },
            pagination: !settings.pagination
                ? false
                : {
                      el: settings.selectors.carouselPagination,
                      clickable: true,
                  },
        };

        // Fetch Elementor's responsive breakpoints
        var breakpoints = elementorFrontend.config.responsive.activeBreakpoints;
        var breakpointsBootstrap = elementorFrontend.config.breakpoints;

        if (settings.effect === "fade") {
            swiperOptions.items = 1;
        } else {
          swiperOptions.breakpoints = {};
    
            let devicesBreakPoints = [];
            for (let deviceName in breakpoints) {
              let max_width = breakpoints[deviceName]['default_value'];
              if( breakpoints[deviceName]['value'] !== undefined ) {
                max_width = breakpoints[deviceName]['value'];
              }
              devicesBreakPoints.push({
                'label' : deviceName,
                'max_width' : max_width
              });
            }
            devicesBreakPoints.sort((a, b) => {
              return a.max_width - b.max_width
            });
            
            let tmpSlidesPerView = 0;
    
            let desktopWidth = breakpointsBootstrap.lg;
            for (let devicesBreakPointItem of devicesBreakPoints) {
    
              let responsivKeySetting = devicesBreakPointItem.label;
    
              if( settings.slidesPerView[responsivKeySetting] !== undefined) {
                swiperOptions.breakpoints[tmpSlidesPerView] = {
                  slidesPerView: settings.slidesPerView[responsivKeySetting],
                  slidesPerGroup: settings.slidesPerGroup[responsivKeySetting],
                  spaceBetween: settings.spaceBetween[responsivKeySetting],
                };
    
                if( responsivKeySetting === 'widescreen' ) {
                  desktopWidth = tmpSlidesPerView;
                  tmpSlidesPerView = devicesBreakPointItem['max_width'];
                  swiperOptions.breakpoints[tmpSlidesPerView] = {
                    slidesPerView: settings.slidesPerView[responsivKeySetting],
                    slidesPerGroup: settings.slidesPerGroup[responsivKeySetting],
                    spaceBetween: settings.spaceBetween[responsivKeySetting],
                  };
                } else {
                  tmpSlidesPerView = parseInt(devicesBreakPointItem['max_width']) + 1;
                  desktopWidth = tmpSlidesPerView;
                }
              }
            }

            swiperOptions.breakpoints[desktopWidth] = {
              slidesPerView: settings.slidesPerView['desktop'],
              slidesPerGroup: settings.slidesPerGroup['desktop'],
              spaceBetween: settings.spaceBetween['desktop'],
            };

        }

        return swiperOptions;
    }

    setupEventListeners() {
        if (this.getSettings("pauseOnHover")) {
            this.elements.carousel.addEventListener("mouseenter", this.pauseSwiper.bind(this));
            this.elements.carousel.addEventListener("mouseleave", this.resumeSwiper.bind(this));
        }
    }

    pauseSwiper(event) {
        this.getSettings("swiperInstance").autoplay.stop();
    }

    resumeSwiper(event) {
        this.getSettings("swiperInstance").autoplay.start();
    }
}

export default OEW_Carousel;
