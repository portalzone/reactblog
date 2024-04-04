<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    protected $fillable = [
        'name',
        'body',
        'image',
        'pending',
        'user_id',
        'category_id',
    ];
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
