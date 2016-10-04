<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class ReportRestController extends Controller
{
   /**
     * @return array
     * @View()
    */
    public function getReportsAction()
    {
        return array('valid' => true);
    }
}
