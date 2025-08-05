<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\InertiaBaseController;
use App\Http\Requests\Facture\StoreFactureRequest;
use App\Http\Resources\Facture\FactureCollection;
use App\Http\Resources\Facture\FactureResource;
use App\Models\Facture;

final class FactureController extends InertiaBaseController
{
    protected $model = Facture::class;

    protected $resourceClass = FactureResource::class;

    protected $CollectionClass = FactureCollection::class;

    protected $storeRequestClass = StoreFactureRequest::class;

    protected $folderPath = 'Factures';

    protected $routeName = 'factures.index';
}
