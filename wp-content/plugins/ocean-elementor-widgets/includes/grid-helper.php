<?php
/**
 * Columns Grid Frame Class.
 *
 * @package owpElementor
 */

namespace owpElementor;

use Elementor\Controls_Manager;

defined( 'ABSPATH' ) || die();

/**
 * Columns Grid Frame class.
 */
class OEW_Grid_Helper {

	/**
	 * Initialize the Columns Grid Frame.
	 */
	public static function init() {
		add_action( 'elementor/documents/register_controls', array( __CLASS__, 'add_controls_section' ), 10, 1 );
	}

	/**
	 * Add controls section to Elementor panel.
	 *
	 * @param \Elementor\Document $element The Elementor document.
	 */
	public static function add_controls_section( $element ) {
		$element->start_controls_section(
			'section_grid_helper',
			array(
				'label' => __( 'Columns Grid Frame', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_SETTINGS,
			)
		);

		self::add_grid_controls( $element );

		$element->end_controls_section();
	}

	/**
	 * Add grid controls to the Elementor panel.
	 *
	 * @param \Elementor\Document $element The Elementor document.
	 */
	private static function add_grid_controls( $element ) {
		$element->add_control(
			'oew_grid',
			array(
				'label'        => __( 'Columns Grid Frame', 'ocean-elementor-widgets' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'On', 'ocean-elementor-widgets' ),
				'label_off'    => __( 'Off', 'ocean-elementor-widgets' ),
				'return_value' => 'yes',
				'default'      => '',
			)
		);

		$element->add_responsive_control(
			'oew_grid_number',
			array(
				'label'           => __( 'Columns', 'ocean-elementor-widgets' ),
				'type'            => Controls_Manager::NUMBER,
				'min'             => 1,
				'max'             => 100,
				'step'            => 1,
				'devices'         => array( 'desktop', 'tablet', 'mobile' ),
				'default'         => 12,
				'desktop_default' => 12,
				'tablet_default'  => 12,
				'mobile_default'  => 12,
				'condition'       => array(
					'oew_grid' => 'yes',
				),
				'render_type'     => 'none',
			)
		);

		$element->add_responsive_control(
			'oew_grid_color',
			array(
				'label'       => __( 'Grid Color', 'ocean-elementor-widgets' ),
				'type'        => Controls_Manager::COLOR,
				'default'     => 'rgba(19, 90, 244, 0.5)',
				'condition'   => array(
					'oew_grid' => 'yes',
				),
				'render_type' => 'ui',
			)
		);

		$element->add_control(
			'oew_grid_zindex',
			array(
				'label'       => __( 'Z-Index', 'ocean-elementor-widgets' ),
				'type'        => Controls_Manager::TEXT,
				'input_type'  => 'number',
				'default'     => '1000',
				'condition'   => array(
					'oew_grid' => 'yes',
				),
				'render_type' => 'none',
			)
		);

		$element->add_responsive_control(
			'oew_grid_max_width',
			array(
				'label'           => __( 'Max Width', 'ocean-elementor-widgets' ),
				'type'            => Controls_Manager::SLIDER,
				'size_units'      => array( 'px', '%' ),
				'default'         => array(
					'size' => 1140,
					'unit' => 'px',
				),
				'range'           => array(
					'px' => array(
						'min'  => 0,
						'max'  => 3000,
						'step' => 1,
					),
					'%'  => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 0.1,
					),
				),
				'devices'         => array( 'desktop', 'tablet', 'mobile' ),
				'desktop_default' => array(
					'size' => self::get_default_grid_value( 'desktop' ),
					'unit' => 'px',
				),
				'tablet_default'  => array(
					'size' => self::get_default_grid_value( 'tablet' ),
					'unit' => 'px',
				),
				'mobile_default'  => array(
					'size' => self::get_default_grid_value( 'mobile' ),
					'unit' => 'px',
				),
				'condition'       => array(
					'oew_grid' => 'yes',
				),
				'render_type'     => 'none',
			)
		);

		$element->add_responsive_control(
			'oew_grid_offset',
			array(
				'label'           => __( 'Offset', 'ocean-elementor-widgets' ),
				'type'            => Controls_Manager::SLIDER,
				'size_units'      => array( 'px', 'em', '%' ),
				'default'         => array(
					'size' => 0,
					'unit' => 'px',
				),
				'range'           => array(
					'px' => array(
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					),
					'em' => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					),
					'%'  => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 0.1,
					),
				),
				'default'         => array(
					'unit' => 'px',
					'size' => 0,
				),
				'devices'         => array( 'desktop', 'tablet', 'mobile' ),
				'desktop_default' => array(
					'size' => 0,
					'unit' => 'px',
				),
				'tablet_default'  => array(
					'size' => 0,
					'unit' => 'px',
				),
				'mobile_default'  => array(
					'size' => 0,
					'unit' => 'px',
				),
				'condition'       => array(
					'oew_grid' => 'yes',
				),
				'render_type'     => 'none',
			)
		);

		$element->add_responsive_control(
			'oew_grid_gutter',
			array(
				'label'           => __( 'Gutter', 'ocean-elementor-widgets' ),
				'type'            => Controls_Manager::SLIDER,
				'size_units'      => array( 'px', 'em', '%' ),
				'default'         => array(
					'size' => 15,
					'unit' => 'px',
				),
				'range'           => array(
					'px' => array(
						'min'  => 0,
						'max'  => 200,
						'step' => 1,
					),
					'em' => array(
						'min'  => 0,
						'max'  => 20,
						'step' => 1,
					),
					'%'  => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 0.1,
					),
				),
				'devices'         => array( 'desktop', 'tablet', 'mobile' ),
				'desktop_default' => array(
					'size' => 15,
					'unit' => 'px',
				),
				'tablet_default'  => array(
					'size' => 10,
					'unit' => 'px',
				),
				'mobile_default'  => array(
					'size' => 8,
					'unit' => 'px',
				),
				'condition'       => array(
					'oew_grid' => 'yes',
				),
				'render_type'     => 'none',
			)
		);

		$element->add_control(
			'oew_grid_on',
			array(
				'label'     => __( 'Columns Grid Frame On', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::HIDDEN,
				'default'   => 'grid-on',
				'condition' => array(
					'oew_grid' => 'yes',
				),
				'selectors' => array(
					'html.elementor-html'                  => 'position: relative;',
					'html.elementor-html::before'          => 'content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin-right: auto; margin-left: auto; pointer-events: none; z-index: {{oew_grid_zindex.VALUE || 1000}}; min-height: 100vh;',
					'(desktop) html.elementor-html::before' => '
					width: calc(100% - (2 * {{oew_grid_offset.SIZE}}{{oew_grid_offset.UNIT}}));
					max-width: {{oew_grid_max_width.SIZE}}{{oew_grid_max_width.UNIT}};
					background-size: calc(100% + {{oew_grid_gutter.SIZE}}{{oew_grid_gutter.UNIT}}) 100%;
					background-image: -webkit-repeating-linear-gradient( left, {{oew_grid_color.VALUE}}, {{oew_grid_color.VALUE}} calc((100% / {{oew_grid_number.VALUE}}) - {{oew_grid_gutter.SIZE}}{{oew_grid_gutter.UNIT}}), transparent calc((100% / {{oew_grid_number.VALUE}}) - {{oew_grid_gutter.SIZE}}{{oew_grid_gutter.UNIT}}), transparent calc(100% / {{oew_grid_number.VALUE}}) );
					background-image: repeating-linear-gradient( to right, {{oew_grid_color.VALUE}}, {{oew_grid_color.VALUE}} calc((100% / {{oew_grid_number.VALUE}}) - {{oew_grid_gutter.SIZE}}{{oew_grid_gutter.UNIT}}), transparent calc((100% / {{oew_grid_number.VALUE}}) - {{oew_grid_gutter.SIZE}}{{oew_grid_gutter.UNIT}}), transparent calc(100% / {{oew_grid_number.VALUE}}) );',
					'(tablet) html.elementor-html::before' => '
					width: calc(100% - (2 * {{oew_grid_offset_tablet.SIZE}}{{oew_grid_offset_tablet.UNIT}}));
					max-width: {{oew_grid_max_width_tablet.SIZE}}{{oew_grid_max_width_tablet.UNIT}};
					background-size: calc(100% + {{oew_grid_gutter_tablet.SIZE}}{{oew_grid_gutter_tablet.UNIT}}) 100%;
					background-image: -webkit-repeating-linear-gradient( left, {{oew_grid_color.VALUE}}, {{oew_grid_color.VALUE}} calc((100% / {{oew_grid_number_tablet.VALUE}}) - {{oew_grid_gutter_tablet.SIZE}}{{oew_grid_gutter_tablet.UNIT}}), transparent calc((100% / {{oew_grid_number_tablet.VALUE}}) - {{oew_grid_gutter_tablet.SIZE}}{{oew_grid_gutter_tablet.UNIT}}), transparent calc(100% / {{oew_grid_number_tablet.VALUE}}) );
					background-image: repeating-linear-gradient( to right, {{oew_grid_color.VALUE}}, {{oew_grid_color.VALUE}} calc((100% / {{oew_grid_number_tablet.VALUE}}) - {{oew_grid_gutter_tablet.SIZE}}{{oew_grid_gutter_tablet.UNIT}}), transparent calc((100% / {{oew_grid_number_tablet.VALUE}}) - {{oew_grid_gutter_tablet.SIZE}}{{oew_grid_gutter_tablet.UNIT}}), transparent calc(100% / {{oew_grid_number_tablet.VALUE}}) );',
					'(mobile) html.elementor-html::before' => '
					width: calc(100% - (2 * {{oew_grid_offset_mobile.SIZE}}{{oew_grid_offset_mobile.UNIT}}));
					max-width: {{oew_grid_max_width_mobile.SIZE}}{{oew_grid_max_width_mobile.UNIT}};
					background-size: calc(100% + {{oew_grid_gutter_mobile.SIZE}}{{oew_grid_gutter_mobile.UNIT}}) 100%;
					background-image: -webkit-repeating-linear-gradient( left, {{oew_grid_color.VALUE}}, {{oew_grid_color.VALUE}} calc((100% / {{oew_grid_number_mobile.VALUE}}) - {{oew_grid_gutter_mobile.SIZE}}{{oew_grid_gutter_mobile.UNIT}}), transparent calc((100% / {{oew_grid_number_mobile.VALUE}}) - {{oew_grid_gutter_mobile.SIZE}}{{oew_grid_gutter_mobile.UNIT}}), transparent calc(100% / {{oew_grid_number_mobile.VALUE}}) );
					background-image: repeating-linear-gradient( to right, {{oew_grid_color.VALUE}}, {{oew_grid_color.VALUE}} calc((100% / {{oew_grid_number_mobile.VALUE}}) - {{oew_grid_gutter_mobile.SIZE}}{{oew_grid_gutter_mobile.UNIT}}), transparent calc((100% / {{oew_grid_number_mobile.VALUE}}) - {{oew_grid_gutter_mobile.SIZE}}{{oew_grid_gutter_mobile.UNIT}}), transparent calc(100% / {{oew_grid_number_mobile.VALUE}}) );',
				),
			)
		);

	}

	public static function get_default_grid_value( $value = '' ) {
		$default = array(
			'desktop' => get_option( 'elementor_container_width', 1140 ),
			'tablet'  => get_option( 'elementor_viewport_lg', 1025 ),
			'mobile'  => get_option( 'elementor_viewport_md', 768 ),
		);

		return $default[ $value ];
	}

}

OEW_Grid_Helper::init();
