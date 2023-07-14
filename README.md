# ZenZone: An Application for Tracking Mental Wellness using the Differential Emotional Scale

## <u>Introduction</u>
This project aims to develop an interactive mental wellness platform using the Object-Oriented Analysis and Design (OOAD) paradigm. It addresses the limitations of existing mental wellness applications by incorporating tested assessment tools like the Diagnostic Evaluation of Symptoms (DES) and the Self-Assessment Manikin (SAM). 

The platform provides a safe space for users to express themselves through journals while tracking factors influencing their mental wellness. Using the DES, it analyzes mental wellness and suggests potential negative mental health conditions based on primary emotions. Users can also record daily mental health observations and set medication reminders. 

Extensive research ensures the platform's effectiveness in improving mental well-being. It targets individuals seeking to enhance mental wellness, track emotions, and access support through a user-friendly interface.

Please refer to the project documentation for more information on how to use the platform.

## <u>Technologies</u>
The project is created with:
   
   * Programming Languages: 
      * JavaScript
      * PHP
      
* Front-End Frameworks and Libraries:
   * React-Native
   * HTML
   * Tailwind CSS
   * Bootstrap

* Back-End Frameworks:
   * Laravel (PHP)


* Design Methodology:   
   * Object-Oriented Analysis and Design
    
* Database Management:
     * MySQL

 * Mobile App Devolpment:
    * Expo

* Server-Side Runtime Environment:
   * Node.js

* Additional Tools:
   * ngrok
   * XAMPP
   * Visual Studio Code

## <u> Dependecies</u>
The following dependencies were used:
 ## React Native Dependencies

- React Native
```bash
$ npm install react-native
```
- Axios
```bash
  $ npm install axios
```  
- React Navigation
```bash
  $ npm install @react-navigation/native
  $ npm install @react-navigation/stack
 ```
- Redux
```bash
  $ npm install redux
```
- Redux-Thunk
```bash
  $ npm install redux-thunk
```
- @react-native-async-storage/async-storage
```bash
  $ npm install @react-native-async-storage/async-storage
```
- @react-native-community/masked-view
```bash
  $ npm install @react-native-community/masked-view
 ```
- @react-navigation/native
``` bash
$ npm install @react-navigation/native
```
- @react-navigation/stack
```bash
$ npm install @react-navigation/stack
```
- react-native-gesture-handler
```bash
$ npm install react-native-gesture-handler
```
- react-native-reanimated
```bash
$ npm install react-native-reanimated
```
- react-native-safe-area-context
```bash
$ npm install react-native-safe-area-context
```
- react-native-screens
```bash
$ npm install react-native-screens
```


   * Laravel Dependencies:
  
   1. illuminate/support: Laravel's support package providing utility classes and functions.
      *  Install: Run composer require illuminate/support.
    2. illuminate/validation: Laravel's validation package, responsible for validating incoming requests.
      * Install: Run composer require illuminate/validation.
    3. illuminate/support/facades/Validator: Laravel's facade for its validation system. 
    4. illuminate/support/facades/Hash: Laravel's facade for its hashing system.
    5. illuminate/support/facades/Log: Laravel's facade for its logging system.
    6. illuminate/database/eloquent/Model: Base class for Laravel's Eloquent ORM models.
    7. illuminate/validation/rules/Password: Laravel's rule object for validating password fields.


 ## <u>Setup</u>
To set up the project locally, follow these steps:

   1. Clone the repository to your local machine.  
   2. Install the required dependecies by running `npm install` in the project directory.
   3. Configure the database connection in the `.env` file.
   4. Run the database migrations with the command `php artisan migrate`.
   5. Start the development server using `npm start` or `expo start`.
## <u>Features</u>
The ZenZone app offers the following features:
   * User Registration:    Create an account 
   * Login:   
    Login using email and password  
    Login using fingerprint 
   * Mood Choice:   Choose your mood from a list of mood icons.
   * Journaling: Express yourself through digital journals and save your thoughts, emotions, and experiences.
   * Mental Wellness Assessment: Track and analyze factors influencing your mental wellness using validated assessment tools.
* Data Visualization: Visualize your mental wellness data with clear insights and trends.

## <u>Privacy and Security</u>
We prioritize the privacy and security of our users' information. Here are the measures we have implemented to ensure data protection:

   1. Secure Data Encryption:   
    We use industry-standard encryption techniques to protect user data, including data transmitted over networks (TLS/SSL) and sensitive information stored in databases (symmetric and asymmetric encryption).
   2. Secure Authentication: 
    Our platform implements secure authentication mechanisms, including password hashing and encryption, to ensure that only authorized users can access their accounts. We also offer optional login using fingerprint authentication for an added layer of security.
   3. Anonymity and Confidentiality: 
    We prioritize anonymity and confidentiality by allowing users to use pseudonyms and maintain their privacy while using the platform. Journal entries and personal data are stored securely and are only accessible by the respective user.
   4. User Consent and Control: 
    We respect the autonomy of our users and provide them with full control over their data. Users have the option to choose what information they want to share and can modify or delete their data at any time.
   

## Compliance with Data Protection Regulations</u>
We are committed to complying with applicable data protection regulations, such as the General Data Protection Regulation (GDPR). We ensure the lawful and responsible handling of user data, including the following measures:
1. Consent and Transparency: We obtain explicit consent from users before collecting and processing their personal data. We provide clear information about the purposes and methods of data processing, as well as the rights users have over their data.

2. Data Minimization: We only collect and process the data necessary for the functioning of the ZenZone platform. We do not collect excessive or unnecessary personal information.

3. User Control: We provide users with control over their data. Users can access, modify, and delete their personal information through their account settings.

4. Third-Party Sharing: We do not share user data with third parties without explicit consent,except as required by law. 

5. Data Security: We implement industry-standard security measures to protect user data from unauthorized access, loss, or alteration. This includes encryption and access controls.

6. Data Retention: We retain user data only for as long as necessary to fulfill the purposes for which it was collected, unless otherwise required by law. We have defined data retention periods and regularly review and update them.

By adhering to these data protection regulations, we strive to maintain the privacy and security of user data and ensure a trustworthy and responsible platform for our users.


