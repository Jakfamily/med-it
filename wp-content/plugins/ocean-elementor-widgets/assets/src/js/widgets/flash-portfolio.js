import { registerWidget } from "../lib/utils";

class OEW_Flash_Portfolio extends elementorModules.frontend.handlers.Base {
    getDefaultSettings() {
        return {
            selectors: {
                itemTitle: ".item-title",
                itemImageContainer: ".item-image-container"
            },
        };
    }

    getDefaultElements() {
        const selectors = this.getSettings("selectors");

        return {
            itemTitleElements: document.querySelectorAll(selectors.itemTitle),
            itemImageContainerElements: document.querySelectorAll(selectors.itemImageContainer)
        };
    }

    onInit(...args) {
        super.onInit(...args);

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.elements.itemTitleElements.forEach((hoverElement, index) => {
            const targetElement = this.elements.itemImageContainerElements[index];

            hoverElement.addEventListener('mouseenter', () => {
                targetElement.style.opacity = '1';
                targetElement.style.transform = 'none';
            });

            hoverElement.addEventListener('mouseleave', () => {
                targetElement.style.opacity = '0';
                targetElement.style.transform = 'rotate(-10deg)';
            });
        });
    }
}

registerWidget(OEW_Flash_Portfolio, "oew-flash-portfolio");
