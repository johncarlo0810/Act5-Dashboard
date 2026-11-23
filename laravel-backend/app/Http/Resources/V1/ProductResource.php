<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $attributes = [
            'name' => $this->name,
            'price' => $this->price,
        ];

        // Include description only when showing one product.
        if ($request->routeIs('products.show')) {
            $attributes['description'] = $this->description;
        }

        return [
            'type' => 'products',
            'id' => (string) $this->id,

            'attributes' => $attributes,

            'relationships' => [
                'category' => [
                    'data' => [
                        'type' => 'categories',
                        'id' => (string) $this->category_id,
                    ],
                ],
            ],

            'links' => [
                'self' => url('/api/v1/products/' . $this->id),
            ],
        ];
    }
}