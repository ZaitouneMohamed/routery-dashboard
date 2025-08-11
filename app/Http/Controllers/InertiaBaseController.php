<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

abstract class InertiaBaseController extends Controller
{
    protected $model;

    protected $storeRequestClass;

    protected $updateRequestClass;

    protected $createActionPattern = null;

    protected $updateActionPattern = null;

    protected $deleteActionPattern = null;

    protected $folderPath;

    protected $routeName;

    protected $resourceClass;

    protected $CollectionClass;

    protected function getIndexQuery()
    {
        $query = $this->model::query();

        if (! \request('search')) {
            $query->search(null, null, \request()->all());
        } else {
            $query->search(\request('search'), \request('searchby'), null);
        }

        return $query;
    }

    public function index(Request $request)
    {
        $items = $this->model::getData($request->all());

        return \inertia($this->folderPath.'/Index', [
            'data' => new $this->CollectionClass($items),
            'filters' => \request()->all(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        return Inertia::render($this->folderPath.'/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate((new $this->storeRequestClass)->rules());

        if ($this->createActionPattern) {
            (new $this->createActionPattern)->handle($validatedData);
        } else {
            $this->model::create($validatedData);
        }
        if ($this->routeName) {
            return \redirect()->route($this->routeName)
                ->with('success', 'Data created successfully.');
        }

        return \redirect()->back()
            ->with('success', 'Data Updated successfully.');

    }

    public function show($id)
    {
        try {
            return Inertia::render($this->folderPath.'/Show', [
                'item' => new $this->resourceClass($this->model::findOrFail($id)),
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return \response()->json(['error' => 'data not found'], 404);
        }
    }

    public function edit($id)
    {
        return Inertia::render($this->folderPath.'/Edit', [
            'item' => new $this->resourceClass($this->model::findOrFail($id)),
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = $this->model::findOrFail($id);
        //
        $validatedData = $request->validate((new $this->updateRequestClass)->rules());
        //
        if ($this->updateActionPattern) {
            (new $this->updateActionPattern)->handle($validatedData, $id);
        } else {
            $item->update($validatedData);
        }
        //
        if ($this->routeName) {
            return \redirect()->route($this->routeName)
                ->with('success', 'Data Updated successfully.');
        }

        return \redirect()->back()
            ->with('success', 'Data Updated successfully.');
    }

    public function destroy($id)
    {
        $item = $this->model::findOrFail($id);
        $item->delete();

        if ($this->routeName) {
            return \redirect()->route($this->routeName)
                ->with('success', 'Data deleted successfully.');
        }

        return \redirect()->back()
            ->with('success', 'Data deletedp successfully.');
    }

    protected function validateRequest(Request $request, $requestClass)
    {
        $requestInstance = new $requestClass($request->all());

        return $requestInstance->validate();
    }

    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $result,
        ];

        return \response()->json($response);
    }

    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
            'code' => $code,
        ];

        if (! empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return \response()->json($response, $code);
    }
}
