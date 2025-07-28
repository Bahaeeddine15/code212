Route::get('debug-reservations', function() {
    $reservations = \App\Models\Reservation::all();
    return response()->json([
        'total' => $reservations->count(),
        'reservations' => $reservations->map(function($r) {
            return [
                'id' => $r->id,
                'email' => $r->email,
                'nom' => $r->nom,
                'status' => $r->status,
                'date_reservation' => $r->date_reservation,
                'created_at' => $r->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $r->updated_at->format('Y-m-d H:i:s'),
            ];
        })
    ]);
})->name('debug.reservations');
