<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model {
	// Variables
	private $link 		 = "";
    private $image_one   = "";
    private $image_two   = "";
    private $image_three = "";
    private $titulo 	 = "";

    /**
     * @return string
     */
    public function getLink()
    {
    	return $this->link;
    }

    /**
     * @param string $link
     */
    public function setLink($link)
    {
        $this->link = $link;
    }

    /**
     * @return string
     */
    public function getImageOne()
    {
        return $this->image_one;
    }

    /**
     * @param string $image_one
     */
    public function setImageOne($image_one)
    {
        $this->image_one = $image_one;
    }

    /**
     * @return string
     */
    public function getImageTwo()
    {
        return $this->image_two;
    }

    /**
     * @param string $image_two
     */
    public function setImageTwo($image_two)
    {
        $this->image_two = $image_two;
    }

    /**
     * @return string
     */
    public function getImageThree()
    {
        return $this->image_three;
    }

    /**
     * @param string $image_three
     */
    public function setImageThree($image_three)
    {
        $this->image_three = $image_three;
    }

    /**
     * @return string
     */
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * @param string $titulo
     */
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;
    }
}
?>
