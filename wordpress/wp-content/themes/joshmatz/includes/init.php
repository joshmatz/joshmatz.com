<?php 

//* Child theme (do not remove)
define( 'CHILD_THEME_NAME', 'Genesis Sample Theme' );
define( 'CHILD_THEME_URL', 'http://www.studiopress.com/' );
define( 'CHILD_THEME_VERSION', '2.0.0' );

//* Enqueue Lato Google font
add_action( 'wp_enqueue_scripts', 'genesis_sample_google_fonts' );
function genesis_sample_google_fonts() {
	wp_enqueue_style( 'google-font-lato', '//fonts.googleapis.com/css?family=Lato:700', array(), CHILD_THEME_VERSION );
}

//* Add HTML5 markup structure
add_theme_support( 'html5' );

//* Add viewport meta tag for mobile browsers
add_theme_support( 'genesis-responsive-viewport' );

//* Add support for custom background
add_theme_support( 'custom-background' );

//* Add support for 3-column footer widgets
add_theme_support( 'genesis-footer-widgets', 3 );


//* Add post support for the following
add_theme_support( 'post-formats', array('aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio') );


//* Add custom Book type with its own taxonomies
add_action( 'init', 'create_book_type' );
function create_book_type() {
	register_post_type( 'book',
		array(
			'labels' => array(
				'name' => 'Books',
				'singular_name' => 'Book'
			),
			'public' => true,
			'has_archive' => true,
			'taxonomies' => array('subject'),
			'supports' => array('title', 'thumbnail')
		)
	);

	
	register_taxonomy('subject', 
		array('book'), 
		array(
			'hierarchical' => true,
			'labels' => array(
				'name'              => 'Subjects',
				'singular_name'     => 'Subject',
				'search_items'      => 'Search Subjects',
				'all_items'         => 'All Subjects',
				'parent_item'       => 'Parent Subject',
				'parent_item_colon' => 'Parent Subject:',
				'edit_item'         => 'Edit Subject',
				'update_item'       => 'Update Subject',
				'add_new_item'      => 'Add New Subject',
				'new_item_name'     => 'New Subject Name',
				'menu_name'         => 'Subject',
			),
			'show_ui' => true,
			'show_admin_column' => true,
			'query_var' => true,
			'rewrite' => array('slug' => 'subject')
		)
	);

}

@include_once( get_stylesheet_directory() . '/includes/metaboxes.php' );