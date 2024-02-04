<?php
namespace owpElementor\Modules\Logo\Widgets;

// Elementor Classes
use Elementor\Controls_Manager;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Logo extends Widget_Base {

	public function get_name() {
		return 'oew-logo';
	}

	public function get_title() {
		return __( 'Logo', 'ocean-elementor-widgets' );
	}

	public function get_icon() {
		return 'oew-icon eicon-image-rollover';
	}

	public function get_categories() {
		return [ 'oceanwp-elements' ];
	}

    public function get_keywords() {
        return [
            'logo',
            'icon',
            'owp',
        ];
    }

	protected function register_controls() {

		$this->start_controls_section(
			'section_logo',
			[
				'label' 		=> __( 'Logo', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_responsive_control(
			'position',
			[
				'label' 		=> __( 'Position', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::CHOOSE,
				'options' 		=> [
					'left' => [
						'title' => __( 'Left', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-right',
					],
				],
				'default' 		=> '',
				'selectors' 	=> [
					'{{WRAPPER}} .custom-header-logo' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'max_width',
			[
				'label' 		=> __( 'Max Width', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' 	=> 10,
						'max' 	=> 500,
						'step' 	=> 1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #site-logo #site-logo-inner a img, #site-header.center-header #site-navigation .middle-site-logo a img' => 'max-width: {{SIZE}}px;',
				],
			]
		);

		$this->add_responsive_control(
			'max_height',
			[
				'label' 		=> __( 'Max Height', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' 	=> 10,
						'max' 	=> 500,
						'step' 	=> 1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #site-logo #site-logo-inner a img, #site-header.center-header #site-navigation .middle-site-logo a img' => 'max-height: {{SIZE}}px !important;',
				],
			]
		);

		$this->end_controls_section();

	}

	protected function render() {
		$settings = $this->get_settings(); ?>

		<div class="custom-header-logo clr">

			<?php
			// Logo
			get_template_part( 'partials/header/logo' ); ?>

		</div>

	<?php
	}

}