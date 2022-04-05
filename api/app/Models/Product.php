<?php

namespace App\Models;

use App\Traits\HidesPivot;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'is_best_deal' => 'boolean'
    ];

    protected $appends = [
        'average_rating',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    public function getAverageRatingAttribute(): ?float
    {
        $averageRating = $this->reviews()->avg('rating');
        return $averageRating ? floatval($averageRating) : null;
    }
}
