<?php echo head(array('bodyclass'=>'home')); ?>



<?php if (plugin_is_active('ExhibitBuilder')): ?>
<!-- Featured Exhibit -->
<?php $featuredExhibits = get_records('Exhibit' , array ('featured'=>true));; ?>
<?php if($featuredExhibits): ?>
<div class="slider-pro" id="featured-exhibit">
    <div class="sp-slides">
        <?php foreach($featuredExhibits as $featuredExhibit): ?>

            <div class="sp-slide">
                    <?php $file = $featuredExhibit->getFile(); ?>
                <?php if ($file): ?>
                    <?php $exhibitImage = metadata($file, 'fullsize_uri'); ?>
                    <div id="featured-exhibit-image-container">
                        <img class="sp-image" src="<?php echo $exhibitImage; ?>" alt="featured Exhibit Image" />
                    </div>
                <?php endif; ?>

<!--                 <div class="sp-layer sp-static sp-black sp-padding" data-position="bottomLeft" data-height="20%">
 -->                <div class="featured-text sp-caption">
                        <h3><?php echo exhibit_builder_link_to_exhibit($featuredExhibit); ?></h3>

                    <p><?php echo snippet_by_word_count(metadata($featuredExhibit, 'description', array('no_escape' => true)), 200); ?><?php echo exhibit_builder_link_to_exhibit($featuredExhibit,$text = ' Learn More&rarr;'); ?></p>
                    </div>
                    
<!--                 </div>
 -->
            </div>

        <?php endforeach; ?>
        
    </div>

</div>
<?php endif; ?>

<?php endif; ?>

<?php fire_plugin_hook('public_home', array('view' => $this)); ?>

<?php echo foot(); ?>
