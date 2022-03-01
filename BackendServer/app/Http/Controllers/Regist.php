<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class Regist extends Controller
{
    public function getRegist(){
        $regist = DB::select("SELECT * FROM reg");
        return $regist;
    }
}
