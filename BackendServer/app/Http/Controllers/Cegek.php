<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class Cegek extends Controller
{
    public function getCegek(){
        $cegek = DB::select("SELECT * FROM cegadatok");
        return $cegek;
    }
}
