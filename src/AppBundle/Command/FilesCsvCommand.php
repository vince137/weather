<?php
namespace AppBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Finder\Finder;

use AppBundle\Entity\Report;

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
                $this->insertData($paramsData);
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
            $report = new Report();
            $report->setDate($dateParsed);
            // Set the temperature
            if (isset($reportData["temperature"]) && $reportData["temperature"] !== null) {
                $report->setTemperature($reportData["temperature"]);
            }
            // Set the humidity
            if (isset($reportData["humidity"]) && $reportData["humidity"] !== null) {
                $report->setHumidity($reportData["humidity"]);
            }

            $em = $this->getContainer()->get('doctrine')->getEntityManager();
            $em->persist($report);
            $em->flush(); 
        }
    }
}