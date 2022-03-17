<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function welcome(Request $request)
    {
        return view("welcome");
    }

    public function index(Request $request)
    {
        $user = User::query();

        if ($request->name != null) {
            $user = $user->where("users.name", "like", "%" . $request->name . "%");
        }

        if ($request->company != null) {
            $user = $user->where("users.company", "like", "%" . $request->company . "%");
        }

        $user = $user->select(["users.*"])->latest()->paginate(10);

        $paginate = $user->toArray();

        unset($paginate['data']);

        return response()->json(["code" => 200 ,'data' => $user->items(), 'paginate' => $paginate]);
    }

    public function create(Request $request)
    {

        $validator = \Validator::make($request->all(), [
            'address' => 'required|max:30',
            'company' => 'required',
            'email'   => 'required|email|unique:users,email',
            'name'    => 'required',
            'phone'   => 'required',
            //'photo'   => 'required',
            'surname' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(["code" => 500, "errors" => $validator->errors()]);
        }
        $updateData     = $request->except('photo');
        $user           = new User;
        $user->password = \Hash::make("test_demo_tour");
        $user->fill($updateData);

        if ($user->save()) {
            // started to upload image
            if (!empty($request->get('photo'))) {
                $image_64  = $request->get('photo');
                $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1]; // .jpg .png .pdf
                $replace   = substr($image_64, 0, strpos($image_64, ',') + 1);
                $image     = str_replace($replace, '', $image_64);
                $image     = str_replace(' ', '+', $image);
                $imageName = md5(time()) . '.' . $extension;
                \Storage::disk('public')->put($imageName, base64_decode($image));
                $user->photo = $imageName;
                $user->save();
            }

            return response()->json(["code" => 200, "data" => $user]);
        } else {
            return response()->json(["code" => 500, "message" => 'Some error occured.']);
        }
    }

    public function edit(Request $request, $id)
    {
        $user = User::find($id);

        return response()->json(['data' => $user]);
    }

    public function save(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {

            $validator = \Validator::make($request->all(), [
                'address' => 'required|max:30',
                'company' => 'required',
                'email'   => [
                    'required',
                    Rule::unique('users')->ignore($user->id)
                ],
                'name'    => 'required',
                'phone'   => 'required',
                //'photo'   => 'required',
                'surname' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(["code" => 500, "errors" => $validator->errors()]);
            }

            $user->fill($request->except(["_token", "password", "new_photo"]));

            if (!empty($request->get('new_photo'))) {
                $image_64  = $request->get('new_photo');
                $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1]; // .jpg .png .pdf
                $replace   = substr($image_64, 0, strpos($image_64, ',') + 1);
                $image     = str_replace($replace, '', $image_64);
                $image     = str_replace(' ', '+', $image);
                $imageName = md5(time()) . '.' . $extension;
                \Storage::disk('public')->put($imageName, base64_decode($image));
                $user->photo = $imageName;
                $user->save();
            }

            $user->save();
        }

        return response()->json(["code" => 200,'data' => $user, "message" => "User has been updated successfully"]);
    }

    public function delete(Request $request, $id)
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();
        }

        return response()->json(['data' => [], "message" => "User has been deleted successfully"]);
    }
}
