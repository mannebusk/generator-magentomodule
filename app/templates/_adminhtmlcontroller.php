<?php
/**
 * Index Adminhtml Controller
 *
 */
class <%= fullModuleName %>Adminhtml_IndexController extends Mage_Adminhtml_Controller_Action 
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
