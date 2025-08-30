import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle, Calendar, User, BookOpen, Shield } from 'lucide-react';

interface Certificate {
  code: string;
  student_name: string;
  formation_title: string;
  issued_date: string;
  verification_code: string;
}

interface Props {
  certificate: Certificate;
}

export default function Verify({ certificate }: Props) {
  return (
    <>
      <Head title={`Vérification Certificat ${certificate.code}`} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <Shield className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Certificat Vérifié
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ce certificat a été validé avec succès par Code212 - Université Cadi Ayyad
            </p>
          </div>

          {/* Certificate Details */}
          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Certificat de Formation</h2>
                  <p className="text-green-100">Code212 - Lab d'Innovation</p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Certificate Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Étudiant
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {certificate.student_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Formation
                      </h3>
                      <p className="text-lg text-purple-600 font-medium">
                        {certificate.formation_title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Date d'émission
                      </h3>
                      <p className="text-lg text-green-600 font-medium">
                        {certificate.issued_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Shield className="w-6 h-6 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Code de certificat
                      </h3>
                      <p className="text-lg font-mono text-gray-600 font-medium">
                        {certificate.code}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="space-y-6">
                  <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">
                      Certificat Authentique
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      Ce certificat est valide et a été émis officiellement par Code212.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
                      Informations sur l'institution
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                      <li>• Code212 - Lab d'Innovation</li>
                      <li>• Université Cadi Ayyad</li>
                      <li>• Marrakech, Maroc</li>
                      <li>• Formation certifiante reconnue</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      <strong>Code de vérification :</strong><br/>
                      <code className="font-mono">{certificate.verification_code}</code>
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Ce certificat peut être vérifié à tout moment en visitant cette page avec le code de vérification.
                </p>
                <Button 
                  onClick={() => window.print()} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Imprimer cette vérification
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}