<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'name',
        'meta',
        'type',
        'description'
    ];

    protected $casts = [
        'meta' => 'array'
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function eveniments(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Eveniment::class);
    }
}
