<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubControllerAdmin extends Controller
{
    public function index()
    {
        $clubs = Club::all();
        return Inertia::render('dashboard_admin/clubs/club_index', [
            'clubs' => $clubs,
        ]);
    }

    public function create()
    {
        $schools = [
            'FSSM' => 'Faculté des Sciences Semlalia',
            'FSJES Marrakech' => 'FSJES Marrakech',
            'FLSH Marrakech' => 'FLSH Marrakech',
            'FMPM' => 'Faculté de Médecine',
            'FLAM' => 'Faculté de Langue Arabe',
            'FSTG' => 'FST Marrakech',
            'ENSA Marrakech' => 'ENSA Marrakech',
            'ENCG' => 'ENCG Marrakech',
            'ENS' => 'ENS Marrakech',
            'PED' => 'Pôle Études Doctorales',
            'FPS' => 'Faculté Polydisciplinaire de Safi',
            'ENSA Safi' => 'ENSA Safi',
            'EST Safi' => 'EST Safi',
            'EST Essaouira' => 'EST Essaouira',
            'FSJESK' => 'FSJES El Kelaâ',
            'ESTK' => 'EST El Kelaâ',
        ];

        return Inertia::render('dashboard_admin/clubs/club_create', [
            'schools' => $schools,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255|unique:clubs,email',
            'responsible' => 'required|string|max:255',
            'school' => 'required|string|max:255',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('clubs', 'public');
        }

        Club::create($validated);

        return redirect()->route('admin.clubs.index')->with('success', 'Club créé avec succès.');
    }

    public function edit($id)
    {
        $club = Club::findOrFail($id);
        $schools = [
            'FSSM' => 'Faculté des Sciences Semlalia',
            'FSJES Marrakech' => 'FSJES Marrakech',
            'FLSH Marrakech' => 'FLSH Marrakech',
            'FMPM' => 'Faculté de Médecine',
            'FLAM' => 'Faculté de Langue Arabe',
            'FSTG' => 'FST Marrakech',
            'ENSA Marrakech' => 'ENSA Marrakech',
            'ENCG' => 'ENCG Marrakech',
            'ENS' => 'ENS Marrakech',
            'PED' => 'Pôle Études Doctorales',
            'FPS' => 'Faculté Polydisciplinaire de Safi',
            'ENSA Safi' => 'ENSA Safi',
            'EST Safi' => 'EST Safi',
            'EST Essaouira' => 'EST Essaouira',
            'FSJESK' => 'FSJES El Kelaâ',
            'ESTK' => 'EST El Kelaâ',
        ];

        return Inertia::render('dashboard_admin/clubs/clubs_edit', [
            'club' => $club,
            'schools' => $schools,
        ]);
    }

    public function update(Request $request, $id)
    {
        $club = Club::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255|unique:clubs,email,' . $club->id,
            'responsible' => 'required|string|max:255',
            'school' => 'required|string|max:255',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('clubs', 'public');
        }

        $club->update($validated);

        return redirect()->route('admin.clubs.index')->with('success', 'Club modifié avec succès.');
    }

    public function destroy($id)
    {
        $club = Club::findOrFail($id);
        $club->delete();

        return redirect()->route('admin.clubs.index')->with('success', 'Club supprimé avec succès.');
    }
}
