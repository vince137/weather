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
        $records = [];
        $repository = $this->getDoctrine()->getManager()->getRepository('AppBundle:Record');

        $recordTypes = $this->container->getParameter('record_type');

        // Get all records types
        foreach($recordTypes as $recordType) {
            $records[$recordType] = $repository->findBy(array('type' => $recordType), array('date' => 'DESC'), 30);
        }

        return $records;
    }
}