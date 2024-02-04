<?php
namespace owpElementor\Modules\Toggle\Widgets;

// Elementor Classes
use Elementor\Controls_Manager;
use Elementor\Group_Control_Image_Size;
use Elementor\Utils;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Widget_Base;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Toggle extends Widget_Base {

	public function get_name() {
		return 'oew-toggle';
	}

	public function get_title() {
		return __( 'Switch', 'ocean-elementor-widgets' );
	}

	public function get_icon() {
		return 'oew-icon eicon-dual-button';
	}

	public function get_categories() {
		return array( 'oceanwp-elements' );
	}

	public function get_keywords() {
		return array(
			'tabs',
			'accordion',
			'toggle',
			'owp',
		);
	}

	public function get_script_depends() {
		return array( 'oew-toggle' );
	}

	public function get_style_depends() {
		return array( 'oew-toggle' );
	}

	protected function register_controls() {

		$this->start_controls_section(
			'section_primary',
			array(
				'label' => __( 'Primary', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_control(
			'primary_label',
			array(
				'label'   => __( 'Label', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::TEXT,
				'default' => __( 'Monthly', 'ocean-elementor-widgets' ),
				'dynamic' => array( 'active' => true ),
			)
		);

		$this->add_control(
			'primary_type',
			array(
				'label'   => __( 'Content Type', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'content'  => __( 'Content', 'ocean-elementor-widgets' ),
					'template' => __( 'Template', 'ocean-elementor-widgets' ),
					'image'    => __( 'Image', 'ocean-elementor-widgets' ),
				),
				'default' => 'content',
			)
		);

		$this->add_control(
			'primary_content',
			array(
				'label'     => __( 'Content', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::WYSIWYG,
				'default'   => __( 'Add your content here', 'ocean-elementor-widgets' ),
				'condition' => array(
					'primary_type' => 'content',
				),
				'dynamic'   => array( 'active' => true ),
			)
		);

		$this->add_control(
			'primary_template',
			array(
				'label'     => __( 'Choose Template', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => oew_get_available_templates(),
				'default'   => '0',
				'condition' => array(
					'primary_type' => 'template',
				),
			)
		);

		$this->add_control(
			'primary_image',
			array(
				'label'     => __( 'Image', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::MEDIA,
				'default'   => array(
					'url' => Utils::get_placeholder_image_src(),
				),
				'condition' => array(
					'primary_type' => 'image',
				),
				'dynamic'   => array( 'active' => true ),
			)
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			array(
				'name'      => 'primary_image', // Usage: `{name}_size` and `{name}_custom_dimension`, in this case `image_size` and `image_custom_dimension`.
				'label'     => __( 'Image Size', 'ocean-elementor-widgets' ),
				'default'   => 'large',
				'condition' => array(
					'primary_type' => 'image',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_secondary',
			array(
				'label' => __( 'Secondary', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_control(
			'secondary_label',
			array(
				'label'   => __( 'Label', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::TEXT,
				'default' => __( 'Yearly', 'ocean-elementor-widgets' ),
				'dynamic' => array( 'active' => true ),
			)
		);

		$this->add_control(
			'secondary_type',
			array(
				'label'   => __( 'Content Type', 'ocean-elementor-widgets' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'content'  => __( 'Content', 'ocean-elementor-widgets' ),
					'template' => __( 'Template', 'ocean-elementor-widgets' ),
					'image'    => __( 'Image', 'ocean-elementor-widgets' ),
				),
				'default' => 'content',
			)
		);

		$this->add_control(
			'secondary_content',
			array(
				'label'     => __( 'Content', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::WYSIWYG,
				'default'   => __( 'Add your content here', 'ocean-elementor-widgets' ),
				'condition' => array(
					'secondary_type' => 'content',
				),
				'dynamic'   => array( 'active' => true ),
			)
		);

		$this->add_control(
			'secondary_template',
			array(
				'label'     => __( 'Choose Template', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => oew_get_available_templates(),
				'default'   => '0',
				'condition' => array(
					'secondary_type' => 'template',
				),
			)
		);

		$this->add_control(
			'secondary_image',
			array(
				'label'     => __( 'Image', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::MEDIA,
				'default'   => array(
					'url' => Utils::get_placeholder_image_src(),
				),
				'condition' => array(
					'secondary_type' => 'image',
				),
				'dynamic'   => array( 'active' => true ),
			)
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			array(
				'name'      => 'secondary_image', // Usage: `{name}_size` and `{name}_custom_dimension`, in this case `image_size` and `image_custom_dimension`.
				'label'     => __( 'Image Size', 'ocean-elementor-widgets' ),
				'default'   => 'large',
				'condition' => array(
					'secondary_type' => 'image',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style',
			array(
				'label' => esc_html__( 'Switch', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'switch_align',
			array(
				'label'     => __( 'Alignment', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'flex-start' => array(
						'title' => __( 'Left', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-left',
					),
					'center'     => array(
						'title' => __( 'Center', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-center',
					),
					'flex-end'   => array(
						'title' => __( 'Right', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-right',
					),
				),
				'default'   => 'center',
				'selectors' => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap' => 'display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-justify-content: {{VALUE}}; justify-content: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'switch_size',
			array(
				'label'      => __( 'Size', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::SLIDER,
				'default'    => array(
					'size' => 14,
					'unit' => 'px',
				),
				'range'      => array(
					'px' => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					),
				),
				'size_units' => array( 'px' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch' => 'font-size: {{SIZE}}{{UNIT}}',
				),
			)
		);

		$this->add_responsive_control(
			'switch_labels_spacing',
			array(
				'label'      => __( 'Labels Spacing', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::SLIDER,
				'default'    => array(
					'size' => 25,
					'unit' => 'px',
				),
				'range'      => array(
					'px' => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					),
					'%'  => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					),
				),
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-switch' => 'margin: 0 {{SIZE}}{{UNIT}}',
				),
			)
		);

		$this->add_responsive_control(
			'switch_margin',
			array(
				'label'      => __( 'Margin', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->start_controls_tabs( 'tabs_switch_style' );

		$this->start_controls_tab(
			'tab_switch_normal',
			array(
				'label' => __( 'Normal', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			array(
				'name'     => 'switch_normal_background',
				'types'    => array( 'classic', 'gradient' ),
				'selector' => '{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-switch span:before',
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'     => 'switch_normal_border',
				'label'    => __( 'Border', 'ocean-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-switch span:before',
			)
		);

		$this->add_control(
			'switch_normal_border_radius',
			array(
				'label'      => __( 'Border Radius', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-switch span:before' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_switch_active',
			array(
				'label' => __( 'Active', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			array(
				'name'     => 'switch_activel_background',
				'types'    => array( 'classic', 'gradient' ),
				'selector' => '{{WRAPPER}} .oew-switch-container .oew-switch-wrap.oew-switch-on span:before',
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'     => 'switch_active_border',
				'label'    => __( 'Border', 'ocean-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .oew-switch-container .oew-switch-wrap.oew-switch-on span:before',
			)
		);

		$this->add_control(
			'switch_active_border_radius',
			array(
				'label'      => __( 'Border Radius', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap.oew-switch-on span:before' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'controller_heading',
			array(
				'label'     => __( 'Controller', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			array(
				'name'     => 'controller_background',
				'types'    => array( 'classic', 'gradient' ),
				'selector' => '{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-switch span:after',
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'     => 'controller_border',
				'label'    => __( 'Border', 'ocean-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-switch span:after',
			)
		);

		$this->add_control(
			'controller_border_radius',
			array(
				'label'      => __( 'Border Radius', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-switch span:after' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_labels_style',
			array(
				'label' => __( 'Labels', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'labels_typography',
				'label'    => __( 'Typography', 'ocean-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-text',
			)
		);

		$this->start_controls_tabs( 'tabs_labels_style' );

		$this->start_controls_tab(
			'tab_primary_label',
			array(
				'label' => __( 'Primary', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_control(
			'primary_label_color',
			array(
				'label'     => __( 'Label Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-text.oew-primary' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'active_primary_label_color',
			array(
				'label'     => __( 'Active Label Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap.oew-switch-on .oew-text.oew-primary' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_secondary_label',
			array(
				'label' => __( 'Secondary', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_control(
			'secondary_label_color',
			array(
				'label'     => __( 'Label Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap .oew-text.oew-secondary' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'active_secondary_label_color',
			array(
				'label'     => __( 'Active Label Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .oew-switch-container .oew-switch-wrap.oew-switch-on .oew-text.oew-secondary' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_content_style',
			array(
				'label' => __( 'Content', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'content_style_text',
			array(
				'type' => Controls_Manager::RAW_HTML,
				'raw'  => __( 'If Content type', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_responsive_control(
			'content_align',
			array(
				'label'     => __( 'Alignment', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'left'   => array(
						'title' => __( 'Left', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-left',
					),
					'center' => array(
						'title' => __( 'Center', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-center',
					),
					'right'  => array(
						'title' => __( 'Right', 'ocean-elementor-widgets' ),
						'icon'  => 'eicon-text-align-right',
					),
				),
				'default'   => 'center',
				'selectors' => array(
					'{{WRAPPER}} .oew-switch-container' => 'text-align: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'content_typography',
				'label'    => __( 'Typography', 'ocean-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .oew-switch-container .oew-switch-primary-wrap, {{WRAPPER}} .oew-switch-container .oew-switch-secondary-wrap',
			)
		);

		$this->add_control(
			'content_color',
			array(
				'label'     => __( 'Color', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .oew-switch-container' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_image_style',
			array(
				'label' => __( 'Image', 'ocean-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'image_style_text',
			array(
				'type' => Controls_Manager::RAW_HTML,
				'raw'  => __( 'If Image type', 'ocean-elementor-widgets' ),
			)
		);

		$this->add_responsive_control(
			'image_width',
			array(
				'label'          => __( 'Width', 'ocean-elementor-widgets' ),
				'type'           => Controls_Manager::SLIDER,
				'default'        => array(
					'unit' => '%',
				),
				'tablet_default' => array(
					'unit' => '%',
				),
				'mobile_default' => array(
					'unit' => '%',
				),
				'size_units'     => array( '%', 'px', 'vw' ),
				'range'          => array(
					'%'  => array(
						'min' => 1,
						'max' => 100,
					),
					'px' => array(
						'min' => 1,
						'max' => 1000,
					),
					'vw' => array(
						'min' => 1,
						'max' => 100,
					),
				),
				'selectors'      => array(
					'{{WRAPPER}} .oew-switch-img img' => 'width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'image_space',
			array(
				'label'          => __( 'Max Width', 'ocean-elementor-widgets' ) . ' (%)',
				'type'           => Controls_Manager::SLIDER,
				'default'        => array(
					'unit' => '%',
				),
				'tablet_default' => array(
					'unit' => '%',
				),
				'mobile_default' => array(
					'unit' => '%',
				),
				'size_units'     => array( '%' ),
				'range'          => array(
					'%' => array(
						'min' => 1,
						'max' => 100,
					),
				),
				'selectors'      => array(
					'{{WRAPPER}} .oew-switch-img img' => 'max-width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'image_opacity',
			array(
				'label'     => __( 'Opacity', 'ocean-elementor-widgets' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max'  => 1,
						'min'  => 0.10,
						'step' => 0.01,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .oew-switch-img img' => 'opacity: {{SIZE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'     => 'image_border',
				'selector' => '{{WRAPPER}} .oew-switch-img img',
			)
		);

		$this->add_responsive_control(
			'image_padding',
			array(
				'label'      => __( 'Padding', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch-img img' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'image_margin',
			array(
				'label'      => __( 'Margin', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch-img img' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'image_border_radius',
			array(
				'label'      => __( 'Border Radius', 'ocean-elementor-widgets' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .oew-switch-img img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'     => 'image_box_shadow',
				'selector' => '{{WRAPPER}} .oew-switch-img img',
			)
		);

		$this->end_controls_section();

	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		// Vars
		$primary_type        = $settings['primary_type'];
		$secondary_type      = $settings['secondary_type'];
		$primary_templates   = $settings['primary_template'];
		$secondary_templates = $settings['secondary_template'];

		$this->add_render_attribute( 'primary', 'class', 'oew-switch-primary-wrap show' );
		$this->add_render_attribute( 'secondary', 'class', 'oew-switch-secondary-wrap hide' );

		if ( 'image' == $primary_type ) {
			$this->add_render_attribute( 'primary', 'class', 'oew-switch-img' );
		}

		if ( 'image' == $secondary_type ) {
			$this->add_render_attribute( 'secondary', 'class', 'oew-switch-img' );
		} 
		
		// Generate unique form ID.
		$oew_toggle_for_id = oew_unique_id( 'oew-switch-toggle-' );
		$oew_toggle_name   = oew_unique_id( 'oew-switch-' );
		
		?>

		<div class="oew-switch-container">
			<div class="oew-switch-wrap">
				<?php if ( $settings['primary_label'] ) { ?>
					<div class="oew-text oew-primary">
						<?php echo esc_attr( $settings['primary_label'] ); ?>
					</div>
				<?php } ?>
				<div class="oew-switch">
					<label for="<?php echo esc_attr( $oew_toggle_for_id ); ?>" class="oew-switch-label">
						<span class="screen-reader-text"><?php echo esc_html( oew_lang_strings( 'oew-string-togg-btn' ) ); ?></span>
						<input id="<?php echo esc_attr( $oew_toggle_for_id ); ?>" type="checkbox" name="<?php echo esc_attr( $oew_toggle_name ); ?>">
						<span></span>
					</label>
				</div>
				<?php if ( $settings['secondary_label'] ) { ?>
					<div class="oew-text oew-secondary">
						<?php echo esc_attr( $settings['secondary_label'] ); ?>
					</div>
				<?php } ?>
			</div>

			<div <?php echo $this->get_render_attribute_string( 'primary' ); ?>>
				<?php
				// If content
				if ( 'content' == $primary_type ) {
					echo $this->parse_text_editor( $settings['primary_content'] );
				}

				// If template
				elseif ( 'template' == $primary_type ) {
					if ( '0' != $primary_templates && ! empty( $primary_templates ) ) {
						echo Plugin::instance()->frontend->get_builder_content_for_display( $primary_templates );
					}
				}

				// If image
				elseif ( 'image' == $primary_type ) {
					echo Group_Control_Image_Size::get_attachment_image_html( $settings, 'primary_image' );
				}
				?>
			</div>

			<div <?php echo $this->get_render_attribute_string( 'secondary' ); ?>>
				<?php
				// If content
				if ( 'content' == $secondary_type ) {
					echo $this->parse_text_editor( $settings['secondary_content'] );
				}

				// If template
				elseif ( 'template' == $secondary_type ) {
					if ( '0' != $secondary_templates && ! empty( $secondary_templates ) ) {
						echo Plugin::instance()->frontend->get_builder_content_for_display( $secondary_templates );
					}
				}

				// If image
				elseif ( 'image' == $secondary_type ) {
					echo Group_Control_Image_Size::get_attachment_image_html( $settings, 'secondary_image' );
				}
				?>
			</div>
		</div>

		<?php
	}

}
