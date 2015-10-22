<?php echo head(array('bodyclass'=>'home')); ?>



<?php if (plugin_is_active('ExhibitBuilder')): ?>
<!-- Featured Exhibit -->
<?php $featuredExhibit = exhibit_builder_random_featured_exhibit(1); ?>
<div id="featured-exhibit">
    <h3><?php echo exhibit_builder_link_to_exhibit($featuredExhibit); ?></h3>
        <?php $file = $featuredExhibit->getFile(); ?>
        <?php if ($file): ?>
        <?php $exhibitImage = metadata($file, 'fullsize_uri'); ?>
        <div id="featured-exhibit-image-container">
            <div id="featured-exhibit-image" style="background-image:url(<?php echo $exhibitImage; ?>)"><?php echo exhibit_builder_link_to_exhibit($featuredExhibit,$text = ' '); ?></div>
        </div>

    <?php endif; ?>
    <p><?php echo snippet_by_word_count(metadata($featuredExhibit, 'description', array('no_escape' => true)), 200); ?><?php echo exhibit_builder_link_to_exhibit($featuredExhibit,$text = 'Learn More&rarr;'); ?></p>
</div>

<?php endif; ?>

<?php fire_plugin_hook('public_home', array('view' => $this)); ?>

<?php echo foot(); ?>
