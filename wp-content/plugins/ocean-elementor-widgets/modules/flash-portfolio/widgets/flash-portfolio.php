<?php
namespace owpElementor\Modules\FlashPortfolio\Widgets;

// Elementor Classes
use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Utils;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Flash_Portfolio extends Widget_Base {

	public function get_name() {
		return 'oew-flash-portfolio';
	}

	public function get_title() {
		return __( 'Flash Portfolio', 'ocean-elementor-widgets' );
	}

	public function get_icon() {
		return 'oew-icon eicon-image-rollover';
	}

	public function get_categories() {
		return array( 'oceanwp-elements' );
	}

	public function get_keywords() {
		return array(
			'portfolio',
			'flash',
			'owp',
		);
	}

	public function get_style_depends() {
		return array( 'oew-flash-portfolio' );
	}

	public function get_script_depends() {
		return array( 'oew-flash-portfolio' );
	}

	protected function register_controls() {

		$this->start_controls_section(
			'section_flash_portfolio',
			array(
				'label' => __( 'Flash Portfolio', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_control(
			'header_text_1',
			array(
				'label'   => __( 'Header Text 1', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'Selected',
			)
		);

		$this->add_control(
			'header_text_2',
			array(
				'label'   => __( 'Header Text 2', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'work',
			)
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'item_image',
			array(
				'label'   => __( 'Image', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::MEDIA,
				'default' => array(
					'url' => Utils::get_placeholder_image_src(),
				),
			)
		);

		$repeater->add_control(
			'item_title',
			array(
				'label'   => __( 'Title', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'Title',
			)
		);

		$repeater->add_control(
			'item_link',
			array(
				'label'   => __( 'Link', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::URL,
				'default' => array(
					'url'         => '#',
					'is_external' => false,
					'nofollow'    => false,
				),
			)
		);

		$this->add_control(
			'portfolio_list',
			array(
				'label'       => __( 'Portfolio Items', 'ocean-elementor-widgets' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => array(),
				'title_field' => '{{{ item_title }}}',
			)
		);
		$this->end_controls_section();

		$this->start_controls_section(
			'section_container',
			array(
				'label' => __( 'Container', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'container_width',
			array(
				'label'      => __( ' Container Width', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 600,
				),
				'selectors'  => array(
					'{{WRAPPER}} .item-content-default' => 'width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'background_color',
			array(
				'label'     => __( 'Background Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#000000',
				'selectors' => array(
					'{{WRAPPER}} .flash-container .flash-wrapper' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'item_spacing',
			[
				'label'     => __( 'Item Spacing', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 1000,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .flash-container .item-description-inner' => 'row-gap: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'left_block_section',
			array(
				'label' => __( 'Left Block', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'left_title_content_typography',
				'label'    => __( 'Typography', 'ocean-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .block-left-title-content .framer-text',
			)
		);

		$this->add_control(
			'left_title_content_color',
			array(
				'label'     => __( 'Text Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => array(
					'{{WRAPPER}} .block-left-title-content .framer-text' => 'color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_numbers_style',
			array(
				'label' => __( 'Numbers', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'item_number_text_typography',
				'selector' => '{{WRAPPER}} .item-number .framer-text',
			)
		);

		$this->add_control(
			'item_number_text_color',
			array(
				'label'     => __( 'Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .item-number .framer-text' => 'color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_item_title_style',
			array(
				'label' => __( 'Item Title', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'           => 'item_title_typography',
				'selector'       => '{{WRAPPER}} .item-title .framer-text',
				'fields_options' => array(
					'font_family'    => array(
						'default' => 'League Gothic',
					),
					'font_size'      => array(
						'default' => array(
							'unit' => 'px',
							'size' => 180,
						),
					),
					'line_height'    => array(
						'default' => array(
							'unit' => 'em',
							'size' => 0.8,
						),
					),
					'letter_spacing' => array(
						'default' => array(
							'unit' => 'px',
							'size' => -4,
						),
					),
				),
			)
		);


		$this->start_controls_tabs( 'tabs_button_style' );

		$this->start_controls_tab(
			'tab_title_normal',
			array(
				'label' => __( 'Normal', 'ocean-ecommerce' ),
			)
		);

		$this->add_control(
			'item_title_color',
			array(
				'label'     => __( 'Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .item-title .framer-text' => 'color: {{VALUE}};',
				),
				'default'   => '#de2a4a',
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_title_hover',
			array(
				'label' => __( 'Hover', 'ocean-ecommerce' ),
			)
		);

		$this->add_control(
			'item_title_color_hover',
			array(
				'label'     => __( 'Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .item-title .framer-text:hover' => 'color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_item_image_style',
			array(
				'label' => __( 'Item Image', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'image_container_width',
			array(
				'label'      => __( 'Image Container Width', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 400,
				),
				'selectors'  => array(
					'{{WRAPPER}} .item-image-container' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}}; left: calc(90.16666666666669% - {{SIZE}}{{UNIT}} / 2); top: calc(140.911111% - {{SIZE}}{{UNIT}} / 2);',
				),
			)
		);

		$this->add_responsive_control(
			'item_image_margin',
			array(
				'label'      => __( 'Margin', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .item-image-container img' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'item_image_padding',
			array(
				'label'      => __( 'Padding', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .item-image-container img' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'     => 'item_image_border',
				'selector' => '{{WRAPPER}} .item-image-container img',
			)
		);

		$this->add_control(
			'item_image_border_radius',
			array(
				'label'      => __( 'Border Radius', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .item-image-container img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'item_image_background_color',
			array(
				'label'     => __( 'Background Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .item-image-container img' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>

		<div class="flash-container">
			<div class="flash-wrapper">
				<div class="flash-container-body">
					<div class="flash-container-inner">
						<div class="block-left">
							<div class="block-left-title">
								<div class="block-left-title-content">
									<h3 class="framer-text"><?php echo esc_html( $settings['header_text_1'] ); ?></h3>
									<h3 class="framer-text"><?php echo esc_html( $settings['header_text_2'] ); ?></h3>
								</div>
							</div>
							<div class="item-description">
								<div class="item-description-inner hidden-tablet hidden-mobile">

									<?php foreach ( $settings['portfolio_list'] as $index => $item ) : ?>
										<div class="item-inner-container">
											<div class="item-content">
												<div class="item-content-default">
													<div class="item-image-container">
														<div class="item-background-image-wrapper">
															<div>
																<img src="<?php echo esc_url( $item['item_image']['url'] ); ?>" alt="<?php echo esc_attr( $item['item_title'] ); ?>">
															</div>
														</div>
													</div>
													<div class="item-content-container">
														<a class="item-container-link" href="<?php echo esc_url( $item['item_link']['url'] ); ?>">
															<div class="item-number">
																<p class="framer-text"><?php echo sprintf( '%02d', $index + 1 ); ?></p>
															</div>
															<div class="item-title">
																<h2 class="framer-text"><?php echo esc_html( $item['item_title'] ); ?></h2>
															</div>
														</a>
													</div>
												</div>
											</div>
										</div>
									<?php endforeach; ?>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<?php
	}

}
