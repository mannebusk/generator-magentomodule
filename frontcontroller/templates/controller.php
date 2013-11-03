<?php
/**
 * Index Controller
 *
 */
class <%= fullModuleName %>_<%= name %> extends Mage_Core_Controller_Front_Action
{
    /**
     * Index Action
     */
    public function indexAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }
}
