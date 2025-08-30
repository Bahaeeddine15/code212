import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/layouts/app-layout-admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Download, 
  Eye, 
  Filter, 
  FileDown, 
  Trash2,
  Users,
  CheckCircle,
  Clock,
  Search
} from 'lucide-react';

interface Certificate {
  id: number;
  code: string;
  student_name: string;
  student_email: string;
  formation_title: string;
  registered_date: string;
  issued_date: string | null;
  is_generated: boolean;
  can_generate: boolean;
  pdf_url: string | null;
  verification_code: string | null;
}

interface Formation {
  id: number;
  title: string;
}

interface Props {
  certificates: {
    data: Certificate[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  formations: Formation[];
  filters: {
    formation_id?: string;
    status?: string;
  };
}

export default function Certificates({ certificates, formations, filters }: Props) {
  const [selectedCertificates, setSelectedCertificates] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState<number | null>(null);

  const handleFilter = (key: string, value: string) => {
    router.get('/admin/certificates', {
      ...filters,
      [key]: value === 'all' ? '' : value,
    }, {
      preserveState: true,
      replace: true
    });
  };

  const handleGenerateCertificate = (certificateId: number) => {
    setIsGenerating(certificateId);
    
    router.post(`/admin/certificates/${certificateId}/generate`, {}, {
      onSuccess: () => {
        setIsGenerating(null);
      },
      onError: () => {
        setIsGenerating(null);
      }
    });
  };

  const handleBulkGenerate = () => {
    if (selectedCertificates.length === 0) return;
    
    router.post('/admin/certificates/bulk-generate', {
      certificate_ids: selectedCertificates
    }, {
      onSuccess: () => {
        setSelectedCertificates([]);
      }
    });
  };

  const handleSelectAll = () => {
    const eligibleCerts = certificates.data
      .filter(cert => cert.can_generate && !cert.is_generated)
      .map(cert => cert.id);
    
    if (selectedCertificates.length === eligibleCerts.length) {
      setSelectedCertificates([]);
    } else {
      setSelectedCertificates(eligibleCerts);
    }
  };

  const filteredCertificates = certificates.data.filter(cert =>
    cert.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.formation_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: certificates.total,
    generated: certificates.data.filter(c => c.is_generated).length,
    pending: certificates.data.filter(c => !c.is_generated).length,
    canGenerate: certificates.data.filter(c => c.can_generate && !c.is_generated).length,
  };

  return (
    <AdminLayout>
      <Head title="Gestion des Certificats" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gestion des Certificats
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez et générez les certificats de formation pour les étudiants
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.total}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Générés
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.generated}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    En attente
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Prêts
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.canGenerate}
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom, formation ou code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Formation Filter */}
              <Select 
                value={filters.formation_id || 'all'} 
                onValueChange={(value) => handleFilter('formation_id', value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Toutes les formations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les formations</SelectItem>
                  {formations.map((formation) => (
                    <SelectItem key={formation.id} value={formation.id.toString()}>
                      {formation.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select 
                value={filters.status || 'all'} 
                onValueChange={(value) => handleFilter('status', value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="generated">Générés</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedCertificates.length > 0 && (
          <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-800 dark:text-purple-200">
                  {selectedCertificates.length} certificat(s) sélectionné(s)
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={handleBulkGenerate}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Générer Sélectionnés
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCertificates([])}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certificates Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Certificats ({filteredCertificates.length})</CardTitle>
              <Button
                variant="outline"
                onClick={handleSelectAll}
                disabled={stats.canGenerate === 0}
              >
                {selectedCertificates.length === stats.canGenerate ? 'Tout désélectionner' : 'Sélectionner tout'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Sélection</th>
                    <th className="text-left p-4 font-medium">Code</th>
                    <th className="text-left p-4 font-medium">Étudiant</th>
                    <th className="text-left p-4 font-medium">Formation</th>
                    <th className="text-left p-4 font-medium">Date inscription</th>
                    <th className="text-left p-4 font-medium">Statut</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCertificates.map((certificate) => (
                    <tr key={certificate.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="p-4">
                        {certificate.can_generate && !certificate.is_generated && (
                          <input
                            type="checkbox"
                            checked={selectedCertificates.includes(certificate.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCertificates([...selectedCertificates, certificate.id]);
                              } else {
                                setSelectedCertificates(selectedCertificates.filter(id => id !== certificate.id));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        )}
                      </td>
                      <td className="p-4 font-mono text-sm">{certificate.code}</td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{certificate.student_name}</div>
                          <div className="text-sm text-gray-500">{certificate.student_email}</div>
                        </div>
                      </td>
                      <td className="p-4">{certificate.formation_title}</td>
                      <td className="p-4 text-sm">{certificate.registered_date}</td>
                      <td className="p-4">
                        {certificate.is_generated ? (
                          <Badge className="bg-green-100 text-green-800">
                            ✓ Généré
                          </Badge>
                        ) : certificate.can_generate ? (
                          <Badge className="bg-blue-100 text-blue-800">
                            🎯 Prêt
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            ⏳ En cours
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {certificate.is_generated ? (
                            <>
                              {certificate.pdf_url && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                >
                                  <a href={certificate.pdf_url} target="_blank" rel="noopener noreferrer">
                                    <Download className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                            </>
                          ) : certificate.can_generate ? (
                            <Button
                              onClick={() => handleGenerateCertificate(certificate.id)}
                              disabled={isGenerating === certificate.id}
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              {isGenerating === certificate.id ? (
                                'Génération...'
                              ) : (
                                <>
                                  <Award className="w-4 h-4 mr-1" />
                                  Générer
                                </>
                              )}
                            </Button>
                          ) : (
                            <span className="text-sm text-gray-500">Formation incomplète</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCertificates.length === 0 && (
              <div className="text-center py-8">
                <Award className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Aucun certificat trouvé</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}