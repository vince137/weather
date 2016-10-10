<?php
namespace AppBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Finder\Finder;

use AppBundle\Entity\Report;
use AppBundle\Entity\Record;

class FilesCsvCommand extends ContainerAwareCommand 
{
    protected function configure()
    {
       $this->setName("weather:generateData");
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->write("Search from CSV data...");
        $this->import();
    }

    protected function import() {
        $finder = new Finder();
        $iterator = $finder->files()->in($this->getContainer()->getParameter('csv_folder'));
        foreach ($iterator as $file) {
            $this->readCSV($file->getRealpath());
        }
    }

    protected function readCSV($file) {

        // Read the file
        if (($handle = fopen($file, "r")) !== FALSE) {
            // Get data
            $i = 0;
            while (($data = fgetcsv($handle, null, ";")) !== FALSE) {
                $i++;
                $dataParsed[$i] = explode(",", $data[0]);
            }            
            if (isset($dataParsed)) {
                $paramsData["date"] = (isset($dataParsed[1][1]) ? $dataParsed[1][1] : null);
                $paramsData["temperature"] = (isset($dataParsed[10][1]) ? $dataParsed[10][1] : null);
                $paramsData["humidity"] = (isset($dataParsed[10][2]) ? $dataParsed[10][2] : null);
                $data = $this->insertData($paramsData);
                if ($data === true) {
                    // Define records
                    $this->setRecord();
                }
            }
            fclose($handle);
        }
    }

    /**
     * insertData
     * Insert the data into the database
     * @params: {array} reportData
     * @return: bool
     */
    protected function insertData($reportData) {
        if (isset($reportData["date"]) && !empty($reportData["date"])) {
            $dateParsed = \DateTime::createFromFormat('Y.m.d H:i',$reportData["date"]);

            // Check if we have a record with this date
            $em = $this->getContainer()->get('doctrine')->getEntityManager();
            $report = $em->getRepository('AppBundle:Report')->findOneBy(array('date' => $dateParsed));
            if ($report === null) {
                $report = new Report();
            }
            
            $report->setDate($dateParsed);

            // Set the temperature
            if (isset($reportData["temperature"]) && $reportData["temperature"] !== null) {
                $report->setTemperature($reportData["temperature"]);
            }
            // Set the humidity
            if (isset($reportData["humidity"]) && $reportData["humidity"] !== null) {
                $report->setHumidity($reportData["humidity"]);
            }

            $em->persist($report);
            $em->flush(); 

            return true;
        }
    }


    protected function setRecord () {

        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $repository = $em->getRepository('AppBundle:Report');
        $reports = $repository->findOneBy(array(), array('date' => 'DESC'), 1);

        $recordTypes = $this->getContainer()->getParameter('record_type');

        // Get all records types
        foreach($recordTypes as $recordType) {

            $lastRecord = $em->getRepository('AppBundle:Record')->findOneBy(array('type' => $recordType), array('date' => 'DESC'), 1);
            
            // Prepare champ to insert
            $record = new Record();
            $record->setDate($reports->getDate());
            $record->setType($recordType);

            switch($recordType) {
                case "temperature_min":
                    if ($lastRecord === null) {
                        $record->setTemperature($reports->getTemperature());
                        $em->persist($record);
                        $em->flush(); 
                    } elseif ($reports->getTemperature() < $lastRecord->getTemperature()) {
                        $record->setTemperature($reports->getTemperature());
                        $em->persist($record);
                        $em->flush(); 
                    }
                    break;
                    case "temperature_max":
                        if ($lastRecord === null) {
                            $record->setTemperature($reports->getTemperature());
                            $em->persist($record);
                            $em->flush(); 
                        } elseif ($reports->getTemperature() > $lastRecord->getTemperature()) {
                            $record->setTemperature($reports->getTemperature());
                            $em->persist($record);
                            $em->flush(); 
                        }
                    break;
                    case "humidity_min":
                        if ($lastRecord === null) {
                            $record->setHumidity($reports->getHumidity());
                            $em->persist($record);
                            $em->flush(); 
                        } elseif ($reports->getHumidity() < $lastRecord->getHumidity()) {
                            $record->setHumidity($reports->getHumidity());
                            $em->persist($record);
                            $em->flush(); 
                        }
                    break;
                    case "humidity_max":
                        if ($lastRecord === null) {
                            $record->setHumidity($reports->getHumidity());
                            $em->persist($record);
                            $em->flush(); 
                        } elseif ($reports->getHumidity() > $lastRecord->getHumidity()) {
                           $record->setHumidity($reports->getHumidity());
                           $em->persist($record);
                           $em->flush(); 
                        }
                    break;

            }

  


           
        }        
        return true;
    }

}