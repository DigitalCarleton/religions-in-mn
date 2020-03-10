<?php function exhibit_builder_page_trees($exhibit = null, $exhibitPage = null)
{
    if (!$exhibit) {
        $exhibit = get_current_record('exhibit');
        echo $exhibit;
    }

    return get_view()->exhibitPageTree($exhibit, $exhibitPage);
} 
function exhibitPageTree($exhibit, $currentPage = null)
    {
        $pages = $exhibit->PagesByParent;
        if (!($pages && isset($pages[0]))) {
            return '';
        }

        $this->_exhibit = $exhibit;
        $this->_pages = $pages;

        $ancestorIds = $this->_getAncestorIds($currentPage);

        $html = $this->_renderListOpening();
        foreach ($pages[0] as $topPage) {
            $html .= $this->_renderPageBranch($topPage, $currentPage, $ancestorIds);
        }
        $html .= '</ul>';
        return $html;
    }

    /**
     * Recursively create the HTML for a "branch" (a page and its descendants)
     * of the tree.
     *
     * @param ExhibitPage $page
     * @param ExhibitPage|null $currentPage
     * @param array $ancestorIds
     * @return string
     */
    function _renderPageBranch($page, $currentPage, $ancestorIds)
    {
        if ($currentPage && $page->id === $currentPage->id) {
            $html = '<li class="currents">';
        } else if ($ancestorIds && isset($ancestorIds[$page->id])) {
            $html = '<li class="parent">';
        } else {
            $html = '<li>';
        }

        $html .= '<a href="' . exhibit_builder_exhibit_uri($this->_exhibit, $page) . '">'
              . metadata($page, 'menu_title') .'</a>';
        if (isset($this->_pages[$page->id])) {
            $html .= '<ul>';
            foreach ($this->_pages[$page->id] as $childPage) {
                $html .= $this->_renderPageBranch($childPage, $currentPage, $ancestorIds);
            }
            $html .= '</ul>';
        }
        $html .= '</li>';
        return $html;
    }