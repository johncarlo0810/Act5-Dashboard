<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Address;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Review;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create 5 required categories
        $categories = collect([
            [
                'name' => 'Electronics',
                'description' => 'Electronic devices and gadgets.',
            ],
            [
                'name' => 'Books',
                'description' => 'Educational and reading materials.',
            ],
            [
                'name' => 'Clothing',
                'description' => 'Fashion and apparel products.',
            ],
            [
                'name' => 'Home',
                'description' => 'Home and household products.',
            ],
            [
                'name' => 'Sports',
                'description' => 'Sports and fitness equipment.',
            ],
        ])->map(function ($category) {
            return Category::updateOrCreate(
                ['name' => $category['name']],
                ['description' => $category['description']]
            );
        });

        // 2. Create 2,000 products
        $products = Product::factory()
            ->count(2000)
            ->recycle($categories)
            ->create();

        // 3. Create 20 users
        $users = User::factory()->count(20)->create();

        // 4. Create 1-2 addresses per user
        $users->each(function ($user) {
            Address::factory()
                ->count(rand(1, 2))
                ->for($user)
                ->create();
        });

        // 5. Create 0-5 orders per user
        $orders = $users->flatMap(function ($user) {
            return Order::factory()
                ->count(rand(0, 5))
                ->for($user)
                ->create();
        });

        // 6. Attach 1-4 different products to each order
        $orders->each(function ($order) use ($products) {
            $selectedProducts = $products->random(rand(1, 4));

            foreach ($selectedProducts as $product) {
                OrderProduct::factory()
                    ->for($order)
                    ->for($product)
                    ->create();
            }
        });

        // 7. Create 0-8 reviews per product
        // Each reviewer can review a product only once.
        $products->each(function ($product) use ($users) {
            $reviewers = $users->random(rand(0, 8));

            foreach ($reviewers as $user) {
                Review::factory()
                    ->for($user)
                    ->for($product)
                    ->create();
            }
        });
    }
}