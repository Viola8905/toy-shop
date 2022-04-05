<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    public const PAY_TYPES = [
        'BY_ARRIVAL',
        'ONLINE',
    ];

    public const PAY_STATUSES = [
        'NOT_PAID',
        'PAID',
    ];

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)
            ->withPivot(['product_count']);
    }
}
