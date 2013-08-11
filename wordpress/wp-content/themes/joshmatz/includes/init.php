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
add_theme_support( 'post-formats', array('gallery', 'link', 'image', 'quote', 'video', 'audio') );


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
			'hierarchical' => false,
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


//* Add custom Resource type with its own taxonomies
add_action( 'init', 'create_resource_type' );
function create_resource_type() {
	register_post_type( 'resource',
		array(
			'labels' => array(
				'name' => 'Resources',
				'singular_name' => 'Resource'
			),
			'public' => true,
			'has_archive' => true,
			'taxonomies' => array('resource'),
			'supports' => array('title', 'thumbnail')
		)
	);

	
	register_taxonomy('use', 
		array('resource'), 
		array(
			'hierarchical' => false,
			'labels' => array(
				'name'              => 'Uses',
				'singular_name'     => 'Use',
				'search_items'      => 'Search Uses',
				'all_items'         => 'All Uses',
				'parent_item'       => 'Parent Use',
				'parent_item_colon' => 'Parent Use:',
				'edit_item'         => 'Edit Use',
				'update_item'       => 'Update Use',
				'add_new_item'      => 'Add New Use',
				'new_item_name'     => 'New Use Name',
				'menu_name'         => 'Use',
			),
			'show_ui' => true,
			'show_admin_column' => true,
			'query_var' => true,
			'rewrite' => array('slug' => 'use')
		)
	);
}

//* Add custom Resource type with its own taxonomies
add_action( 'init', 'create_project_type' );
function create_project_type() {
	register_post_type( 'project',
		array(
			'labels' => array(
				'name' => 'Projects',
				'singular_name' => 'Project'
			),
			'public' => true,
			'has_archive' => true,
			'taxonomies' => array('type'),
			'supports' => array('title', 'thumbnail'),
		)
	);

	
	register_taxonomy('type', 
		array('project'), 
		array(
			'hierarchical' => false,
			'labels' => array(
				'name'              => 'Types',
				'singular_name'     => 'Type',
				'search_items'      => 'Search Types',
				'all_items'         => 'All Types',
				'parent_item'       => 'Parent Type',
				'parent_item_colon' => 'Parent Type:',
				'edit_item'         => 'Edit Type',
				'update_item'       => 'Update Type',
				'add_new_item'      => 'Add New Type',
				'new_item_name'     => 'New Type Name',
				'menu_name'         => 'Type',
			),
			'show_ui' => true,
			'show_admin_column' => true,
			'query_var' => true,
			'rewrite' => array('slug' => 'type')
		)
	);
}

@include_once( get_stylesheet_directory() . '/includes/metaboxes.php' );