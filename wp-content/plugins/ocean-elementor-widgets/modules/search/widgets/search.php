<?php
namespace owpElementor\Modules\Search\Widgets;

// Elementor Classes
use Elementor\Controls_Manager;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Search extends Widget_Base {

    public function get_name() {
		return 'oew-search';
	}

	public function get_title() {
		return __( 'Ajax Search', 'ocean-elementor-widgets' );
	}

	public function get_icon() {
		return 'oew-icon eicon-search';
	}

	public function get_categories() {
		return [ 'oceanwp-elements' ];
	}

    public function get_keywords() {
        return [
            'ajax',
            'search',
            'search icon',
            'owp',
        ];
    }

	public function get_script_depends() {
		return [ 'oew-search' ];
	}

	public function get_style_depends() {
		return [ 'oew-search' ];
	}

	protected function register_controls() {

		$this->start_controls_section(
			'section_search',
			[
				'label' 		=> __( 'Search', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_responsive_control(
			'width',
			[
				'label' 		=> __( 'Width', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SLIDER,
				'size_units' 	=> [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
					'size' => 250,
				],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 1000,
					],
					'%' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .oew-search-wrap' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'height',
			[
				'label' 		=> __( 'Height', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SLIDER,
				'size_units' 	=> [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
					'size' => 40,
				],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 1000,
					],
					'%' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .oceanwp-searchform, {{WRAPPER}} .oceanwp-searchform input.field' => 'min-height: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'placeholder',
			[
				'label' 		=> __( 'Placeholder', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::TEXT,
				'default' 		=> __( 'Search', 'ocean-elementor-widgets' ),
				'placeholder' 	=> __( 'Search', 'ocean-elementor-widgets' ),
				'dynamic' 		=> [ 'active' => true ],
			]
		);

		$this->add_control(
			'source',
			[
				'label' 		=> _x( 'Source', 'Posts Type', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SELECT,
				'options' 		=> $this->get_post_types(),
				'default' 		=> 'any',
				'label_block' 	=> true,
			]
		);

		$this->add_control(
			'enable_ajax',
			[
				'label' 		=> __( 'Enable Ajax', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'label_on' 		=> __( 'Show', 'ocean-elementor-widgets' ),
				'label_off' 	=> __( 'Hide', 'ocean-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'default' 		=> 'yes',
			]
		);

		$this->add_responsive_control(
			'align',
			[
				'label' 		=> __( 'Alignment', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::CHOOSE,
				'options' 		=> [
					'left'    => [
						'title' => __( 'Left', 'ocean-elementor-widgets' ),
						'icon' 	=> 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'ocean-elementor-widgets' ),
						'icon' 	=> 'eicon-text-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'ocean-elementor-widgets' ),
						'icon' 	=> 'eicon-text-align-right',
					],
				],
				'default' 		=> '',
				'prefix_class' => 'oew%s-align-',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_input',
			[
				'label' 		=> __( 'Input', 'ocean-elementor-widgets' ),
				'tab' 			=> Controls_Manager::TAB_STYLE,
			]
		);

		$this->start_controls_tabs( 'tabs_input_style' );

		$this->start_controls_tab(
			'tab_input_normal',
			[
				'label' => __( 'Normal', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_control(
			'input_bg',
			[
				'label' 		=> __( 'Background', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'input_color',
			[
				'label' 		=> __( 'Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_input_hover',
			[
				'label' => __( 'Hover', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_control(
			'input_bg_hover',
			[
				'label' 		=> __( 'Background', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field:hover' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'input_color_hover',
			[
				'label' 		=> __( 'Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'input_border_color_hover',
			[
				'label' 		=> __( 'Border Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field:hover' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_input_focus',
			[
				'label' => __( 'Focus', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_control(
			'input_bg_focus',
			[
				'label' 		=> __( 'Background', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field:focus' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'input_color_focus',
			[
				'label' 		=> __( 'Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field:focus' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'input_border_color_focus',
			[
				'label' 		=> __( 'Border Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field:focus' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' 			=> 'input_focus_box_shadow',
				'selector' 		=> '{{WRAPPER}} .oceanwp-searchform input.field:focus',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' 			=> 'input_border',
				'label' 		=> __( 'Border', 'ocean-elementor-widgets' ),
				'placeholder' 	=> '1px',
				'default' 		=> '1px',
				'selector' 		=> '{{WRAPPER}} .oceanwp-searchform input.field',
				'separator' 	=> 'before',
			]
		);

		$this->add_control(
			'input_border_radius',
			[
				'label' 		=> __( 'Border Radius', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', '%' ],
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'input_padding',
			[
				'label' 		=> __( 'Padding', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', 'em', '%' ],
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform input.field' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'newsletter_input',
				'selector' 		=> '{{WRAPPER}} .oceanwp-searchform input.field',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_icon',
			[
				'label' 		=> __( 'Icon Button', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SECTION,
				'tab' 			=> Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'icon_size',
			[
				'label' 		=> __( 'Font Size', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SLIDER,
				'default' => [
					'size' => 12,
				],
				'range' => [
					'min' => 0,
				],
				'selectors' => [
					'{{WRAPPER}} .oceanwp-searchform button' => 'font-size: {{SIZE}}px;',
					'{{WRAPPER}} .oceanwp-searchform button .owp-icon' => 'width: {{SIZE}}px; height: {{SIZE}}px;',
				],
			]
		);

		$this->add_responsive_control(
			'icon_position',
			[
				'label' 		=> __( 'Position', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SLIDER,
				'default' => [
					'size' => 0,
				],
				'range' => [
					'min' => 0,
				],
				'selectors' => [
					'{{WRAPPER}} .oceanwp-searchform button' => is_rtl() ? 'left: {{SIZE}}px;' : 'right: {{SIZE}}px;',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_icon_style' );

		$this->start_controls_tab(
			'tab_button_normal',
			[
				'label' => __( 'Normal', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_control(
			'btn_color',
			[
				'label' 		=> __( 'Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform button' => 'color: {{VALUE}};',
					'{{WRAPPER}} .oceanwp-searchform button .owp-icon use' => 'stroke: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_button_hover',
			[
				'label' => __( 'Hover', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_control(
			'btn_color_hover',
			[
				'label' 		=> __( 'Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oceanwp-searchform button:hover' => 'color: {{VALUE}};',
					'{{WRAPPER}} .oceanwp-searchform button:hover .owp-icon use' => 'stroke: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_search_results',
			[
				'label' 		=> __( 'Search Results', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SECTION,
				'tab' 			=> Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'results_bg',
			[
				'label' 		=> __( 'Background Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_border_radius',
			[
				'label' 		=> __( 'Border Radius', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', '%' ],
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' 	=> 'after',
			]
		);

		$this->start_controls_tabs( 'tabs_results_links_style' );

		$this->start_controls_tab(
			'tab_results_links_normal',
			[
				'label' => __( 'Normal', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_control(
			'results_links_bg',
			[
				'label' 		=> __( 'Links Background', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a.search-result-link' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_links_color',
			[
				'label' 		=> __( 'Links Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a.search-result-link' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_links_border_color',
			[
				'label' 		=> __( 'Links Border Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_icons_color',
			[
				'label' 		=> __( 'Icons Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a i.icon' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_all_links_color',
			[
				'label' 		=> __( 'All Results Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a.all-results' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'results_links_hover',
			[
				'label' => __( 'Hover', 'ocean-elementor-widgets' ),
			]
		);

		$this->add_control(
			'results_links_hover_bg',
			[
				'label' 		=> __( 'Links Background', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a.search-result-link:hover' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_links_hover_color',
			[
				'label' 		=> __( 'Links Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a.search-result-link:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_links_hover_border_color',
			[
				'label' 		=> __( 'Links Border Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a:hover' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_icons_hover_color',
			[
				'label' 		=> __( 'Icons Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a:hover i.icon' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'results_all_links_hover_color',
			[
				'label' 		=> __( 'All Results Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a.all-results:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'results_links_padding',
			[
				'label' => __( 'Links Padding', 'ocean-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'results_search_typo',
				'selector' 		=> '{{WRAPPER}} .oew-search-wrap .oew-search-results ul li a',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_no_search_results',
			[
				'label' 		=> __( 'No Results Found', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::SECTION,
				'tab' 			=> Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'no_results_heading_color',
			[
				'label' 		=> __( 'Heading Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-no-search-results h6' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'no_results_heading_typo',
				'selector' 		=> '{{WRAPPER}} .oew-search-wrap .oew-no-search-results h6',
			]
		);

		$this->add_control(
			'no_results_text_color',
			[
				'label' 		=> __( 'Text Color', 'ocean-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .oew-search-wrap .oew-no-search-results p' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'no_results_text_typo',
				'selector' 		=> '{{WRAPPER}} .oew-search-wrap .oew-no-search-results p',
			]
		);

	}

	private static function get_post_types( $args = [] ) {
		$post_type_args = [
			'show_in_nav_menus' => true,
		];

		if ( ! empty( $args['post_type'] ) ) {
			$post_type_args['name'] = $args['post_type'];
		}

		$_post_types = get_post_types( $post_type_args , 'objects' );

		$post_types  = [];
		$post_types[ 'any' ]  = esc_html__( 'Any', 'ocean-elementor-widgets' );

		foreach ( $_post_types as $post_type => $object ) {
			$post_types[ $post_type ] = $object->label;
		}

		return $post_types;
	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		// Admin ajax, put it in data so that it works in the edit mode of Elementor
		$ajax = admin_url( 'admin-ajax.php' );

		// If ajax
		$classes = 'oceanwp-searchform';
		if ( 'yes' == $settings['enable_ajax'] ) {
			$classes .= ' oew-ajax-search';
		}

		// Placeholder
		$placeholder = '';
		if ( ! empty( $settings['placeholder'] ) ) {
			$placeholder = ' placeholder="'. $settings['placeholder'] .'"';
		}

		$oew_ajaxs_id = oew_unique_id( 'oew-ajaxs-' );
		
		?>

		<div class="oew-search-wrap" data-ajaxurl="<?php echo esc_url( $ajax ); ?>">
			<form method="get" class="<?php echo esc_attr( $classes ); ?>" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<label for="<?php echo esc_attr( $oew_ajaxs_id ); ?>">
					<span class="screen-reader-text"><?php echo esc_html( oew_lang_strings( 'oew-string-ajaxs-label' ) ); ?></span>
					<input type="text" class="field" name="s" id="<?php echo esc_attr( $oew_ajaxs_id ); ?>"<?php echo $placeholder; ?>>
					<button aria-label="<?php echo esc_html( oew_lang_strings( 'oew-string-ajaxs-btn' ) ); ?>" type="submit" class="search-submit" value=""><?php oew_svg_icon( 'search' ); ?></button>
					<?php
					if ( ! empty( $settings['source'] ) && 'any' != $settings['source'] ) { ?>
						<input type="hidden" name="post_type" value="<?php echo esc_attr( $settings['source'] ); ?>">
					<?php
					} ?>
				</label>
			</form>
			<?php
			if ( 'yes' == $settings['enable_ajax'] ) { ?>
				<div class="oew-ajax-loading"></div>
				<div class="oew-search-results"></div>
			<?php
			} ?>
		</div>

	<?php
	}

	// No template because it cause a js error in the edit mode
	protected function content_template() {}

}
