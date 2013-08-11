<?php
/**
 * Include and setup custom metaboxes and fields.
 *
 * @category YourThemeOrPlugin
 * @package  Metaboxes
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress
 */

add_filter( 'cmb_meta_boxes', 'cmb_sample_metaboxes' );
/**
 * Define the metabox and field configurations.
 *
 * @param  array $meta_boxes
 * @return array
 */
function cmb_sample_metaboxes( array $meta_boxes ) {

	// Start with an underscore to hide fields from custom fields list
	$prefix = '_cmb_';

	$meta_boxes[] = array(
		'id'         => 'book',
		'title'      => 'Book',
		'pages'      => array( 'book', ), // Post type
		'context'    => 'normal',
		'priority'   => 'high',
		'show_names' => true, // Show field names on the left
		'fields'     => array(
			array(
				'name'    => 'Summary',
				'id'      => $prefix . 'summary',
				'type'    => 'wysiwyg',
				'options' => array(	'textarea_rows' => 5, ),
			),
			array(
				'name' => 'Author',
				'id'   => $prefix . 'title',
				'type' => 'text',
			),
			array(
				'name' => 'Pages',
				'id'   => $prefix . 'pages',
				'type' => 'text_small',
			),
			array(
				'name' => 'Published',
				'id'   => $prefix . 'published',
				'type' => 'text_date',
			),
			array(
				'name' => 'Link Button Title',
				'id'   => $prefix . 'link_title',
				'type' => 'text',
			),
			array(
				'name' => 'Link',
				'id'   => $prefix . 'link',
				'type' => 'text',
			),
		),
	);

	$meta_boxes[] = array(
		'id'         => 'resource',
		'title'      => 'Resource',
		'pages'      => array( 'resource', ), // Post type
		'context'    => 'normal',
		'priority'   => 'high',
		'show_names' => true, // Show field names on the left
		'fields'     => array(
			array(
				'name'    => 'Summary',
				'id'      => $prefix . 'summary',
				'type'    => 'wysiwyg',
				'options' => array(	'textarea_rows' => 5, ),
			),
			array(
				'name' => 'Link Button Title',
				'id'   => $prefix . 'link_title',
				'type' => 'text',
			),
			array(
				'name' => 'Link',
				'id'   => $prefix . 'link',
				'type' => 'text',
			),
		),
	);

	$meta_boxes[] = array(
		'id'         => 'about_page_metabox',
		'title'      => 'About Page Metabox',
		'pages'      => array( 'page', ), // Post type
		'context'    => 'normal',
		'priority'   => 'high',
		'show_names' => true, // Show field names on the left
		'show_on'    => array( 'key' => 'id', 'value' => array( 2, ), ), // Specific post IDs to display this metabox
		'fields' => array(
			array(
				'name' => 'Test Text',
				'desc' => 'field description (optional)',
				'id'   => $prefix . 'test_text',
				'type' => 'text',
			),
		)
	);

	// Add other metaboxes as needed

	return $meta_boxes;
}

add_action( 'init', 'cmb_initialize_cmb_meta_boxes', 9999 );
/**
 * Initialize the metabox class.
 */
function cmb_initialize_cmb_meta_boxes() {

	if ( ! class_exists( 'cmb_Meta_Box' ) )
		include_once( get_stylesheet_directory() . '/includes/metabox/init.php' );

}