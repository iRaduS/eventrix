<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eveniment extends Model
{
    use HasFactory;

    protected $fillable = [
        'lat', 'long', 'name', 'description', 'started_at', 'ended_at', 'banner_picture', 'organization_id', 'participants', 'type', 'closed'
    ];

    protected $casts = [
        'closed' => 'boolean'
    ];

    public function organization(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function scopeGetUsersForEvent($query, $id) {
        return $query->with('users')->where('id', $id)->paginate();
    }
}
