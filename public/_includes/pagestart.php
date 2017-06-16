<!doctype html>
	<html>
		<head>
			<title><?=$config['site_title'].(isset($page_title) && $page_title != ""?$config['title_divider'].$page_title:"")?></title>
			<meta charset="utf-8">
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<meta name="title" content="<?=$config['site_title'].(isset($page_title) && $page_title != ""?$config['title_divider'].$page_title:"")?>" />
			<meta name="description" content="<?=(isset($page_description) && $page_description != ""?$page_description:$config['site_description'])?>">
			<meta name="keywords" content="<?=(isset($page_keywords) && $page_keywords != ""?$page_keywords:$config['site_keywords'])?>" />
			<meta name="author" content="Neoscape, http://www.neoscape.com" />
			<meta name="copyright" content="<?=date("Y")?>" />
			<meta name="language" content="english" />
			<meta name="zipcode" content="<?=$config['zip']?>" />
			<meta name="city" content="<?=$config['city']?>" />
			<meta name="state" content="<?=$config['state']?>" />
			<meta itemprop="name" content="<?=$config['client']?>">
			<meta itemprop="description" content="<?=(isset($page_description) && $page_description != ""?$page_description:$config['site_description'])?>">
			<meta itemprop="image" content="<?=$config['logo_path']?>">
			<meta property="og:locale" content="en_US"/>
			<meta property="og:type" content="article"/>
			<meta property="og:title" content="<?=$config['site_title'].(isset($page_title) && $page_title != ""?$config['title_divider'].$page_title:"")?>"/>
			<meta property="og:description" content="<?=(isset($page_description) && $page_description != ""?$page_description:$config['site_description'])?>"/>
			<meta property="og:url" content="<?=$config['url']?>"/>
			<meta property="og:site_name" content="<?=$config['site_title']?>"/>
			<meta property="article:publisher" content="<?=$config['client']?>"/>
			<meta property="og:image" content="<?=$config['logo_path']?>"/>
			<meta name="twitter:card" content="summary"/>
			<meta name="twitter:site" content="<?=$config['url']?>"/>
			<meta name="twitter:title" content="<?=$config['site_title'].(isset($page_title) && $page_title != ""?$config['title_divider'].$page_title:"")?>" />
			<meta name="twitter:description" content="<?=(isset($page_description) && $page_description != ""?$page_description:$config['site_description'])?>" />
			<meta name="twitter:image:src" content="<?=$config['logo_path']?>" />
			<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,minimal-ui"/>
			<meta name="apple-mobile-web-app-capable" content="yes">
			<meta name="apple-touch-fullscreen" content="yes">
			<meta http-equiv="pragma" content="no-cache" />
			<meta http-equiv="revisit" content="15 days" />
			<meta http-equiv="robots" content="all" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />


			<!-- favicon -->
			<link rel="shortcut icon" href="_ui/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="57x57" href="<?=$_basePath?>_ui/favicon/apple-icon-57x57.png">
      <link rel="apple-touch-icon" sizes="60x60" href="<?=$_basePath?>_ui/favicon/apple-icon-60x60.png">
      <link rel="apple-touch-icon" sizes="72x72" href="<?=$_basePath?>_ui/favicon/apple-icon-72x72.png">
      <link rel="apple-touch-icon" sizes="76x76" href="<?=$_basePath?>_ui/favicon/apple-icon-76x76.png">
      <link rel="apple-touch-icon" sizes="114x114" href="<?=$_basePath?>_ui/favicon/apple-icon-114x114.png">
      <link rel="apple-touch-icon" sizes="120x120" href="<?=$_basePath?>_ui/favicon/apple-icon-120x120.png">
      <link rel="apple-touch-icon" sizes="144x144" href="<?=$_basePath?>_ui/favicon/apple-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="<?=$_basePath?>_ui/favicon/apple-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="<?=$_basePath?>_ui/favicon/apple-icon-180x180.png">
      <link rel="icon" type="image/png" sizes="192x192"  href="<?=$_basePath?>_ui/favicon/android-icon-192x192.png">
			<link rel="icon" type="image/png" sizes="192x192"  href="<?=$_basePath?>_ui/favicon/android-icon-144x144.png">
			<link rel="icon" type="image/png" sizes="192x192"  href="<?=$_basePath?>_ui/favicon/android-icon-96x96.png">
			<link rel="icon" type="image/png" sizes="192x192"  href="<?=$_basePath?>_ui/favicon/android-icon-72x72.png">
			<link rel="icon" type="image/png" sizes="192x192"  href="<?=$_basePath?>_ui/favicon/android-icon-48x48.png">
			<link rel="icon" type="image/png" sizes="192x192"  href="<?=$_basePath?>_ui/favicon/android-icon-36x36.png">
      <link rel="icon" type="image/png" sizes="32x32" href="<?=$_basePath?>_ui/favicon/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="96x96" href="<?=$_basePath?>_ui/favicon/favicon-96x96.png">
      <link rel="icon" type="image/png" sizes="16x16" href="<?=$_basePath?>_ui/favicon/favicon-16x16.png">
      <meta name="msapplication-TileImage" content="<?=$_basePath?>_ui/favicon/ms-icon-144x144.png">
			<meta name="msapplication-TileColor" content="#ffffff">
      <meta name="theme-color" content="#ffffff">


			<!-- include global fonts and css here -->
			<link rel="stylesheet" href="<?=$_basePath?>_css/projectname.css" />
			<link rel="stylesheet" href="<?=$_basePath?>_css/magnific.css" />


			<!-- include global js scripts here -->
      <script src="<?=$_basePath?>_scripts/js/jquery.js"></script>
			<script src="<?=$_basePath?>_scripts/js/magnific.js"></script>
      <script src="<?=$_basePath?>_scripts/js/projectname.js"></script>


			<!-- additional scripts specific to certain pages should be loaded in those pages -->
