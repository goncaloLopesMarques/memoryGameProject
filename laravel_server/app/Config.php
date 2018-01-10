<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
     /* @var array
     */
    protected $table = "config";

    protected $fillable = [
        'platform_email',
    ];
}
