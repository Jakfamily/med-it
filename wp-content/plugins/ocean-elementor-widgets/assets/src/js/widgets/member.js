import { registerWidget } from "../lib/utils";

class OEW_Member extends elementorModules.frontend.handlers.Base {
    getDefaultSettings() {
        return {
            selectors: {
                member: ".oew-member-wrap",
                memberSocialIcon: ".oew-member-icon",
            },
            tooltipPosition: "top",
        };
    }

    getDefaultElements() {
        const element = this.$element.get(0);
        const selectors = this.getSettings("selectors");

        return {
            member: element.querySelector(selectors.member),
            memberSocialIcons: element.querySelectorAll(selectors.memberSocialIcon),
        };
    }

    onInit(...args) {
        super.onInit(...args);

        this.setUserSettings();

        if (this.isEnableTooltip()) {
            this.initTippyTooltip();
        }
    }

    initTippyTooltip() {
        const placement = this.getSettings("tooltipPosition");

        tippy(this.elements.memberSocialIcons, {
            allowHTML: true,
            duration: [300, 200],
            content: (reference) => reference.getAttribute("title"),
            placement: placement,
        });
    }

    setUserSettings() {
        const settings = this.getSettings();
        const tooltipPosition = this.elements.memberSocialIcons[0].dataset?.tooltipPosition;

        this.setSettings({
            tooltipPosition: !!tooltipPosition ? tooltipPosition : settings.tooltipPosition,
        });
    }

    isEnableTooltip() {
        return Array.from(this.elements.memberSocialIcons).some(({ classList }) => classList.contains("oew-member-tooltip"));
    }
}

registerWidget(OEW_Member, "oew-member");
