<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public $school = "Mindoro State University Congratulationsssss!";

    public function index()
    {
        $student = "Kyla";
        $message = "Hello, $student";

        return response()->json([
            'student' => $student,
            'message' => $message,
        ]);
    }

    public function read()
    {
        $message = "You are now currently enrolled to $this->school";

        return response()->json([
            'school' => $this->school,
            'message' => $message,
        ]);
    }

    public function greet($name)
    {
        $name = "Kyla Mae";
        $message = "Hello, $name;";

        return response()->json([
            'name' => $name,
            'message' => $message,
        ]);
    }
}
