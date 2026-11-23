<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\V1\ProductResource;
use App\Traits\ApiResponses;

class ProductController extends Controller
{
    use ApiResponses;

    /**
     * Display a listing of products.
     */
    public function index()
    {
        $products = Product::with('category')->paginate(10);

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    /**
     * Display a specific product.
     */
    public function show(Product $product)
    {
        $product->load('category');

        return new ProductResource($product);
    }

    /**
     * Queries and calculations.
     */
    public function queries()
    {
        // A. QUERYING TABLES

        $products = Product::select('name', 'price')->get();

        $withCategory = Product::with('category')->get();

        $ordered = Product::select('id', 'name')
            ->orderBy('price', 'asc')
            ->get();

        $limited = Product::limit(5)->get();


        // B. FILTERING DATA

        $priceFilter = Product::where('price', '>=', 3)->get();

        $electronics = Product::whereHas('category', function ($query) {
            $query->where('name', 'Electronics');
        })->get();


        // C. AGGREGATING DATA

        $sum = Product::sum('price');

        $average = Product::avg('price');

        $max = Product::max('price');

        $min = Product::min('price');


        // D. GROUPING, FILTERING, AND SORTING

        // Total price of products per category
        $totalPricePerCategory = Product::join(
            'categories',
            'products.category_id',
            '=',
            'categories.id'
        )
            ->select(
                'categories.name',
                DB::raw('SUM(products.price) as total_price')
            )
            ->groupBy('categories.name')
            ->get();


        // Average price per category
        $averagePricePerCategory = Product::join(
            'categories',
            'products.category_id',
            '=',
            'categories.id'
        )
            ->select(
                'categories.name',
                DB::raw('AVG(products.price) as avg_price')
            )
            ->groupBy('categories.name')
            ->get();


        // Lowest price per category
        $lowestPricePerCategory = Product::join(
            'categories',
            'products.category_id',
            '=',
            'categories.id'
        )
            ->select(
                'categories.name',
                DB::raw('MIN(products.price) as min_price')
            )
            ->groupBy('categories.name')
            ->get();


        // Average price per category, sorted ascending
        $averagePriceSorted = Product::join(
            'categories',
            'products.category_id',
            '=',
            'categories.id'
        )
            ->select(
                'categories.name',
                DB::raw('AVG(products.price) as avg_price')
            )
            ->groupBy('categories.name')
            ->orderBy('avg_price', 'asc')
            ->get();


        // Average price of Electronics and Books
        $electronicsAndBooks = Product::join(
            'categories',
            'products.category_id',
            '=',
            'categories.id'
        )
            ->whereIn('categories.name', ['Electronics', 'Books'])
            ->select(
                'categories.name',
                DB::raw('AVG(products.price) as avg_price')
            )
            ->groupBy('categories.name')
            ->get();


        // Return all query results
        return $this->success(
            'Query results retrieved successfully',
            [
                'name_and_price' => $products,
                'products_with_category' => $withCategory,
                'products_ordered_by_price' => $ordered,
                'first_five_products' => $limited,
                'price_greater_than_or_equal' => $priceFilter,
                'electronics' => $electronics,
                'total_price' => $sum,
                'average_price' => $average,
                'highest_price' => $max,
                'lowest_price' => $min,
                'total_price_per_category' => $totalPricePerCategory,
                'average_price_per_category' => $averagePricePerCategory,
                'lowest_price_per_category' => $lowestPricePerCategory,
                'average_price_sorted' => $averagePriceSorted,
                'electronics_and_books' => $electronicsAndBooks,
            ]
        );
    }

    /**
     * Update an existing product.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    /**
     * Delete a product.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }
}
