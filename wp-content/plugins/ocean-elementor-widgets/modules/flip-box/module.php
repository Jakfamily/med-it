<?php
namespace owpElementor\Modules\FlipBox;

use owpElementor\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Module extends Module_Base {

	public function get_widgets() {
		return [
			'FlipBox',
		];
	}

	public function get_name() {
		return 'oew-flip-box';
	}
}
