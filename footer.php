<section class="resources-section">
    <div class="default-section-header">
        <div class="section-header-number wow fadeInUp">
            <div class="number">/08</div>
            <p class="text"><?php echo get_field('resources_number_title','option');?></p>
        </div>
        <div class="section-header-content wow fadeInUp" data-wow-delay="0.2s">
            <div class="resources-block">
                <div class="column">
                    <h3 class="column-caption"><?php echo get_field('downloads_title','option');?></h3>

                    <ul>
                        <?php if( have_rows('downloads','option') ): ?>
                            <?php
                            $i=0;
                            while( have_rows('downloads','option') ): the_row(); ?>
                                <?php if(!get_sub_field('link')){ ?>
                                    <li><a href="<?php echo get_sub_field('file')['url'];?>" download=""><?php echo get_sub_field('name');?></a></li>
                                <?php }else{ ?>
                                    <li><a href="<?php echo get_sub_field('link');?>" download=""><?php echo get_sub_field('name');?></a></li>
                                <?php } ?>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </ul>
                </div>
                <div class="column">
                    <h3 class="column-caption"><?php echo get_field('links_title');?></h3>

                    <ul>
                        <?php if( have_rows('links') ): ?>
                            <?php
                            $i=0;
                            while( have_rows('links') ): the_row(); ?>
                                <?php if(!get_sub_field('link')){ ?>
                                    <li><a href="<?php echo get_sub_field('file')['url'];?>" download=""><?php echo get_sub_field('name');?></a></li>
                                <?php }else{ ?>
                                    <li><a href="<?php echo get_sub_field('link');?>" download=""><?php echo get_sub_field('name');?></a></li>
                                <?php } ?>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="site-map-section">
    <div class="default-section-header">
        <div class="section-header-number wow fadeInUp">
            <div class="number">/09</div>
            <p class="text">Site map</p>
        </div>
        <div class="section-header-content wow fadeInUp" data-wow-delay="0.2s">
            <div class="sitemap-block">
                <?php
                $args = array(
                    'theme_location'  => '',
                    'menu'            => 'Menu footer',
                    'container'       => '',
                    'container_class' => '',
                    'container_id'    => '',
                    'menu_class'      => 'menu',
                    'menu_id'         => '',
                    'echo'            => true,
                    'fallback_cb'     => 'wp_page_menu',
                    'before'          => '',
                    'after'           => '',
                    'link_before'     => '',
                    'link_after'      => '',
                    'items_wrap'      => '<ul  class="block-nav">%3$s</ul>',
                    'depth'           => 0
                );

                wp_nav_menu(  $args  );
                ?>

                <ul class="socials-list">
                    <?php if( have_rows('social','option') ): ?>
                        <?php
                        $i=0;
                        while( have_rows('social','option') ): the_row(); ?>
                            <li>
                                <a href="<?php echo get_sub_field('link');?>" target="_blank" rel="noopener nofollow" aria-label="<?php echo get_sub_field('icon');?>">
                                    <svg class="link-icon">
                                        <use xlink:href="<?php echo get_template_directory_uri(); ?>/img/icons-sprite.svg#<?php echo get_sub_field('icon');?>"></use>
                                    </svg>
                                </a>
                            </li>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </div>
</section>
<!--<footer class="footer wow fadeInUp" role="contentinfo">-->
<!--    <div class="footer-inner">-->
<!--        <div class="footer-block">-->
<!--            <ul class="socials-list">-->
<!--                --><?php //if( have_rows('social','option') ): ?>
<!--                    --><?php
//                    $i=0;
//                    while( have_rows('social','option') ): the_row(); ?>
<!--                        <li>-->
<!--                            <a href="--><?php //echo get_sub_field('link');?><!--" target="_blank" rel="noopener nofollow" aria-label="--><?php //echo get_sub_field('icon');?><!--">-->
<!--                                <svg class="link-icon">-->
<!--                                    <use xlink:href="--><?php //echo get_template_directory_uri(); ?><!--/img/icons-sprite.svg#--><?php //echo get_sub_field('icon');?><!--"></use>-->
<!--                                </svg>-->
<!--                            </a>-->
<!--                        </li>-->
<!--                    --><?php //endwhile; ?>
<!--                --><?php //endif; ?>
<!--            </ul>-->
<!--        </div>-->
<!--        <div class="footer-block footer-nav-block">-->
<!--                --><?php
//                $args = array(
//                    'theme_location'  => '',
//                    'menu'            => 'Menu footer',
//                    'container'       => '',
//                    'container_class' => '',
//                    'container_id'    => '',
//                    'menu_class'      => 'menu',
//                    'menu_id'         => '',
//                    'echo'            => true,
//                    'fallback_cb'     => 'wp_page_menu',
//                    'before'          => '',
//                    'after'           => '',
//                    'link_before'     => '',
//                    'link_after'      => '',
//                    'items_wrap'      => '<ul  class="footer-nav">%3$s</ul>',
//                    'depth'           => 0
//                );
//
//                wp_nav_menu(  $args  );
//                ?>
<!--        </div>-->
<!--    </div>-->
<!--</footer>-->
</div>

<div class="modal video-modal" id="video-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <button class="modal-close" aria-label="Закрыть попап">
                <svg class="btn-icon">
                    <use xlink:href="<?php echo get_template_directory_uri(); ?>/img/icons-sprite.svg#modal-close"></use>
                </svg>
            </button>
            <div class="modal-video">
                <div id="modal-video-iframe"></div>
            </div>
        </div>
    </div>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="//www.youtube.com/iframe_api"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/slick.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/wow.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/scripts.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/main.js"></script>
<script>
        var ajaxurl = '<?php echo site_url() ?>/wp-admin/admin-ajax.php';
    </script>
<script>
document.addEventListener( 'wpcf7mailsent', function( event ) {
  location = '<?php echo get_permalink(10);?>';
}, false );
<?php if($_GET['ing']){ ?>
   $('html, body').animate({
        scrollTop: $('#ingredients<?php echo $_GET['ing'] ?>').offset().top-100
    }, {
        duration: 370,   // по умолчанию «400»
        easing: "linear" // по умолчанию «swing»
    });
<?php } ?>
<?php if($_GET['app']){?>
    $('.applications input').val('<?php echo get_the_title($_GET['app'])?>');
<?php } ?>

<?php if($_GET['ing']){?>
    $('.ingredients input').val('<?php echo get_the_title($_GET['ing'])?>');
<?php } ?>
</script>
<?php wp_footer(); ?>
</body>
</html>