<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model {
    use HasFactory;

    // much more convenient to use pokemon # instead of database id
    protected $primaryKey = 'number';
}
