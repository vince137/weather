<?php
namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Doctrine\ORM\Entity\Repository;

use AppBundle\Entity\Record;

class RecordRestController extends Controller
{
   /**
     * @return array
     * @View()
    */
    public function getRecordsAction()
    {
        $repository = $this->getDoctrine()->getManager()->getRepository('AppBundle:Record');

        // Get all records
        $records = $repository->findBy(array(), array('date' => 'DESC'), 30);

        return $records;
    }
}