import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppSidebarLayout from '../../layouts/app/app-sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Upload, ArrowLeft } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  slug: string;
}

interface Competition {
  id: number;
  title: string;
  slug: string;
}

interface Props {
  events: Event[];
  competitions: Competition[];
}

export default function MediaCreate({ events, competitions }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    detail: '',
    file: null as File | null,
    folder: '',
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('file', file);
      
      // Créer une preview pour les images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const folderOptions = [
    { value: '', label: 'Sélectionner un dossier', disabled: true },
    { value: 'hackathonevent', label: 'Hackathon Event' },
    { value: 'competition', label: 'Compétitions' },
    { value: 'formation', label: 'Formations' },
    { value: 'general', label: 'Général' },
    ...events.map(event => ({
      value: `event_${event.slug}`,
      label: `Event: ${event.title}`
    })),
    ...competitions.map(competition => ({
      value: `competition_${competition.slug}`,
      label: `Compétition: ${competition.title}`
    }))
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/media');
  };

  return (
    <AppSidebarLayout breadcrumbs={[
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Médiathèque', href: '/media' },
      { title: 'Ajouter un média', href: '/media/create' }
    ]}>
      <Head title="Ajouter un média" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => router.visit('/media')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Ajouter un média</h1>
            <p className="text-gray-600">Ajoutez une photo ou vidéo à la médiathèque</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <Card>
            <CardHeader>
              <CardTitle>Informations du média</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Titre du média"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="detail">Description *</Label>
                  <Textarea
                    id="detail"
                    value={data.detail}
                    onChange={(e) => setData('detail', e.target.value)}
                    placeholder="Description du média"
                    rows={4}
                    className={errors.detail ? 'border-red-500' : ''}
                  />
                  {errors.detail && (
                    <p className="text-red-500 text-sm mt-1">{errors.detail}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="folder">Dossier *</Label>
                  <select
                    id="folder"
                    value={data.folder}
                    onChange={(e) => setData('folder', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md ${errors.folder ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    {folderOptions.map((option) => (
                      <option 
                        key={option.value} 
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.folder && (
                    <p className="text-red-500 text-sm mt-1">{errors.folder}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="file">Fichier *</Label>
                  <div className="mt-1">
                    <input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,video/*"
                      className={`block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        ${errors.file ? 'border-red-500' : ''}`}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Formats acceptés: JPG, PNG, GIF, SVG, MP4, MOV, AVI (max 10MB)
                    </p>
                  </div>
                  {errors.file && (
                    <p className="text-red-500 text-sm mt-1">{errors.file}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.visit('/media')}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={processing}
                    className="flex-1"
                  >
                    {processing ? (
                      'Ajout en cours...'
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Ajouter
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Prévisualisation */}
          <Card>
            <CardHeader>
              <CardTitle>Prévisualisation</CardTitle>
            </CardHeader>
            <CardContent>
              {previewUrl ? (
                <div className="space-y-4">
                  <img
                    src={previewUrl}
                    alt="Prévisualisation"
                    className="w-full max-h-64 object-contain rounded-lg border"
                  />
                  <div className="text-sm text-gray-600">
                    <p><strong>Nom:</strong> {data.file?.name}</p>
                    <p><strong>Taille:</strong> {data.file ? Math.round(data.file.size / 1024) : 0} KB</p>
                    <p><strong>Type:</strong> {data.file?.type}</p>
                  </div>
                </div>
              ) : data.file ? (
                <div className="space-y-4">
                  <div className="w-full h-64 bg-gray-100 rounded-lg border flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">{data.file.name}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Nom:</strong> {data.file.name}</p>
                    <p><strong>Taille:</strong> {Math.round(data.file.size / 1024)} KB</p>
                    <p><strong>Type:</strong> {data.file.type}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Sélectionnez un fichier pour voir la prévisualisation</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppSidebarLayout>
  );
}
