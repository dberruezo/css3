<?php
namespace App\Http\Controllers\Front;

use App\Index;
use App\Http\Controllers\Controller;
use App\Models\Proyecto;

class IndexController extends Controller
{
    private $proyecto;

    /**
    * Show the profile for the given user.
    *
    * @param  int  $id
    * @return Response
    */
    public function show()
    {
        return view('welcome');
    }

    public function index(){
        $this->proyecto = new Proyecto();
        $this->proyecto->getLink();
        return view('pages.home');
    }
}
?>