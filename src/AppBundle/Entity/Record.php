<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Record
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Record
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var type
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

        /**
     * @var \Date
     *
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * @var integer
     *
     * @ORM\Column(name="temperature", type="float", nullable=true)
     */
    private $temperature;

    /**
     * @var integer
     *
     * @ORM\Column(name="humidity", type="float", nullable=true)
     */
    private $humidity;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set Type
     *
     * @param string $type
     *
     * @return Record
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return type
     */
    public function getType()
    {
        return $this->type;
    }


    /**
     * Set date
     *
     * @param \DateTime $date
     * @return Report
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set temperature
     *
     * @param integer $temperature
     * @return Report
     */
    public function setTemperature($temperature)
    {
        $this->temperature = $temperature;

        return $this;
    }

    /**
     * Get temperature
     *
     * @return integer 
     */
    public function getTemperature()
    {
        return $this->temperature;
    }

    /**
     * Set humidity
     *
     * @param integer $humidity
     * @return Report
     */
    public function setHumidity($humidity)
    {
        $this->humidity = $humidity;

        return $this;
    }

    /**
     * Get humidity
     *
     * @return integer 
     */
    public function getHumidity()
    {
        return $this->humidity;
    }

}

