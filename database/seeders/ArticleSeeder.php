<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first admin user or create one if none exists
        $adminUser = User::where('role', 'admin')->first();
        if (!$adminUser) {
            $adminUser = User::create([
                'name' => 'Admin Code212',
                'email' => 'admin@code212.ma',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);
        }

        $articles = [
            [
                'title' => 'Bienvenue à Code 212 - Votre parcours de formation commence ici',
                'excerpt' => 'Découvrez Code 212, votre nouveau centre de formation en développement web et technologies digitales. Apprenez les technologies les plus demandées du marché.',
                'content' => "Bienvenue dans votre nouveau parcours d'apprentissage chez Code 212 !\n\nCode 212 est un centre de formation spécialisé dans les technologies digitales et le développement web. Notre mission est de vous accompagner dans l'acquisition des compétences techniques les plus recherchées sur le marché du travail.\n\nNos formations couvrent un large éventail de technologies :\n- Développement Front-end (HTML, CSS, JavaScript, React, Vue.js)\n- Développement Back-end (PHP, Laravel, Node.js, Python)\n- Bases de données (MySQL, PostgreSQL, MongoDB)\n- DevOps et déploiement\n- UI/UX Design\n\nQue vous soyez débutant ou que vous souhaitiez perfectionner vos compétences, nos formateurs expérimentés vous guideront à chaque étape de votre apprentissage.\n\nRejoignez-nous dès aujourd'hui et transformez votre passion pour la technologie en opportunités professionnelles concrètes !",
                'category' => 'information',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(7),
            ],
            [
                'title' => 'Guide complet : Comment débuter en développement web en 2024',
                'excerpt' => 'Un guide pratique et détaillé pour tous ceux qui souhaitent commencer leur parcours en développement web. Découvrez les étapes essentielles et les technologies à maîtriser.',
                'content' => "Le développement web est l'une des compétences les plus demandées aujourd'hui. Voici votre feuille de route pour débuter :\n\n**1. Les fondamentaux**\nCommencez par maîtriser les bases :\n- HTML : Structure de vos pages web\n- CSS : Mise en forme et design\n- JavaScript : Interactivité et dynamisme\n\n**2. Choisissez votre spécialisation**\n- Front-end : Interface utilisateur (React, Vue.js, Angular)\n- Back-end : Serveur et bases de données (Laravel, Express.js)\n- Full-stack : Maîtrise des deux aspects\n\n**3. Outils indispensables**\n- Éditeur de code : VS Code, Sublime Text\n- Contrôle de version : Git et GitHub\n- Navigateurs et outils de développement\n\n**4. Pratique et projets**\nCréez des projets personnels pour construire votre portfolio :\n- Site vitrine personnel\n- Application de gestion de tâches\n- E-commerce simple\n\n**5. Formation continue**\nLe secteur évolue rapidement. Restez à jour avec :\n- Documentation officielle\n- Communautés en ligne\n- Formations spécialisées\n\nChez Code 212, nous vous accompagnons dans chacune de ces étapes avec des formations pratiques et des projets concrets !",
                'category' => 'guide',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Nouveaux cours disponibles : React.js et Laravel avancé',
                'excerpt' => 'Nous sommes heureux d\'annoncer le lancement de nos nouveaux modules de formation avancée en React.js et Laravel. Inscriptions ouvertes !',
                'content' => "Excellente nouvelle pour nos étudiants !\n\nNous lançons deux nouveaux modules de formation avancée :\n\n**React.js Avancé**\n- Gestion d'état avec Redux et Context API\n- Hooks personnalisés et optimisation des performances\n- Tests unitaires avec Jest et React Testing Library\n- Déploiement et CI/CD\n- Durée : 6 semaines\n- Prérequis : Connaissances de base en React\n\n**Laravel Avancé**\n- Architecture et patterns avancés\n- API RESTful et GraphQL\n- Sécurité et authentification\n- Performance et optimisation\n- Déploiement en production\n- Durée : 8 semaines\n- Prérequis : Maîtrise des bases de Laravel\n\n**Modalités d'inscription :**\n- Places limitées à 15 étudiants par module\n- Tarif préférentiel pour les anciens étudiants\n- Possibilité de financement\n- Support projet en fin de formation\n\nLes inscriptions sont ouvertes dès maintenant. Contactez notre équipe pédagogique pour plus d'informations et réservez votre place !",
                'category' => 'actualite',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(3),
            ],
            [
                'title' => 'Événement : Hackathon Code 212 - Innovation et Créativité',
                'excerpt' => 'Participez à notre premier hackathon ! 48h pour développer des solutions innovantes en équipe. Inscriptions ouvertes jusqu\'au 30 du mois.',
                'content' => "🚀 HACKATHON CODE 212 - PREMIÈRE ÉDITION\n\nNous organisons notre premier hackathon les 15 et 16 du mois prochain !\n\n**Le concept :**\n48 heures non-stop pour développer des solutions technologiques innovantes en équipe. Que vous soyez développeur, designer, ou porteur d'idées, ce hackathon est fait pour vous !\n\n**Thèmes proposés :**\n- Solutions pour l'éducation digitale\n- Applications pour le développement durable\n- Outils pour améliorer la vie quotidienne\n- Innovation dans le e-commerce\n\n**Équipes et formation :**\n- Équipes de 3 à 5 personnes\n- Formation libre ou assistance pour créer votre équipe\n- Mentors experts disponibles tout le weekend\n- Ressources techniques mises à disposition\n\n**Récompenses :**\n- 1er prix : 2000 DH + formation gratuite\n- 2ème prix : 1200 DH + stage en entreprise partenaire\n- 3ème prix : 800 DH + pack de ressources techniques\n- Prix spéciaux : Créativité, impact social, innovation technique\n\n**Infos pratiques :**\n- Lieu : Campus Code 212\n- Repas et boissons fournis\n- Matériel de développement disponible\n- Espace détente et repos\n\n**Inscription :**\nFormulaire disponible sur notre site jusqu'au 30 du mois. Dépêchez-vous, les places sont limitées !\n\nRejoignez-nous pour un weekend d'innovation, de collaboration et de fun !",
                'category' => 'evenement',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(1),
            ],
            [
                'title' => 'Les métiers du numérique les plus demandés en 2024',
                'excerpt' => 'Analyse du marché de l\'emploi tech au Maroc et dans le monde. Découvrez les compétences et métiers les plus recherchés par les recruteurs.',
                'content' => "Le secteur du numérique continue sa croissance explosive. Voici les métiers les plus demandés :\n\n**1. Développeur Full-Stack**\n- Salaire moyen : 25 000 - 45 000 DH/mois\n- Compétences : JavaScript, React/Vue, Node.js, bases de données\n- Demande très forte dans les startups et PME\n\n**2. Data Scientist / Analyste de données**\n- Salaire moyen : 30 000 - 50 000 DH/mois\n- Compétences : Python, R, SQL, Machine Learning\n- Secteurs porteurs : finance, e-commerce, santé\n\n**3. DevOps Engineer**\n- Salaire moyen : 28 000 - 48 000 DH/mois\n- Compétences : Docker, Kubernetes, AWS/Azure, CI/CD\n- Profil très recherché pour la transformation digitale\n\n**4. UI/UX Designer**\n- Salaire moyen : 20 000 - 35 000 DH/mois\n- Compétences : Figma, Adobe Suite, recherche utilisateur\n- Demande croissante avec l'importance de l'expérience utilisateur\n\n**5. Cybersécurité Specialist**\n- Salaire moyen : 32 000 - 55 000 DH/mois\n- Compétences : Sécurité réseau, tests de pénétration, conformité\n- Secteur en forte expansion avec la digitalisation\n\n**Conseils pour se démarquer :**\n- Multipliez les projets personnels\n- Contribuez à l'open source\n- Obtenez des certifications reconnues\n- Développez vos soft skills\n- Restez à jour avec les nouvelles technologies\n\nChez Code 212, nos formations sont alignées sur ces besoins du marché pour maximiser votre employabilité !",
                'category' => 'information',
                'status' => 'published',
                'published_at' => Carbon::now()->subHours(12),
            ],
            [
                'title' => 'Ressources gratuites pour apprendre la programmation',
                'excerpt' => 'Une compilation des meilleures ressources gratuites disponibles en ligne pour apprendre la programmation et le développement web.',
                'content' => "Voici notre sélection des meilleures ressources gratuites pour apprendre la programmation :\n\n**Plateformes d'apprentissage :**\n- freeCodeCamp : Curriculum complet et certifications\n- Codecademy : Cours interactifs pour débutants\n- Khan Academy : Mathématiques et informatique\n- edX et Coursera : Cours universitaires gratuits\n\n**Documentation et références :**\n- MDN Web Docs : La référence pour le web\n- W3Schools : Tutoriels simples et pratiques\n- DevDocs : Documentation hors ligne\n- Stack Overflow : Communauté de développeurs\n\n**Chaînes YouTube recommandées :**\n- Traversy Media : Projets pratiques\n- The Net Ninja : Tutoriels détaillés\n- Programming with Mosh : Concepts fondamentaux\n- Fireship : Actualités tech et tutoriels rapides\n\n**Outils de pratique :**\n- CodePen : Prototypage front-end\n- JSFiddle : Tests JavaScript rapides\n- GitHub : Hébergement et collaboration\n- Repl.it : IDE en ligne\n\n**Livres gratuits :**\n- \"You Don't Know JS\" série\n- \"Eloquent JavaScript\"\n- \"The Odin Project\"\n- \"Learn Python the Hard Way\"\n\n**Communautés :**\n- Reddit (r/webdev, r/programming)\n- Discord et Slack communities\n- Meetups locaux\n- Groupes Facebook spécialisés\n\n**Conseil important :**\nLa théorie c'est bien, mais la pratique c'est mieux ! Combinez ces ressources avec des projets concrets et n'hésitez pas à rejoindre notre communauté Code 212 pour un accompagnement personnalisé.",
                'category' => 'ressource',
                'status' => 'published',
                'published_at' => Carbon::now()->subHours(6),
            ]
        ];

        foreach ($articles as $articleData) {
            Article::create([
                'title' => $articleData['title'],
                'excerpt' => $articleData['excerpt'],
                'content' => $articleData['content'],
                'slug' => Str::slug($articleData['title']),
                'category' => $articleData['category'],
                'status' => $articleData['status'],
                'views' => rand(15, 250),
                'published_at' => $articleData['published_at'],
                'user_id' => $adminUser->id,
                'featured_image' => null, // You can add images later
            ]);
        }

        // Also create some using factory for more variety
        Article::factory()->count(3)->create(['user_id' => $adminUser->id]);

        $this->command->info('Articles seeded successfully!');
    }
}
