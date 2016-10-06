<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Doctrine\ORM\Entity\Repository;
use AppBundle\Entity\Report;

class ReportRestController extends Controller
{
   /**
     * @return array
     * @View()
    */
    public function getReportsAction()
    {
        $repository = $this->getDoctrine()->getManager()->getRepository('AppBundle:Report');

        // Get all reports
        $reports = $repository->findAll();

        return $reports;
    }
}
