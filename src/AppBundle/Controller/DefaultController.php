<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use AppBundler\Dashboard;

class DefaultController extends Controller
{
    /**
    * @Route("/", name="app")
    */
    public function indexAction() {

        //$dashboard = new Dashboard();
        //$dashboard->getValues();
        return $this->render('default/index.html.twig');
    }
}