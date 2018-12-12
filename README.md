## Install Manual
The steps to undertake are easy to follow and execute. For this manual we assume the user already has intellij installed and running, and has been invited to the git to pull the project. This manual does not explain how to set up a working connection with the database, because this is already configured in the code and since the database is already online, does not require to be configured. We start off by downloading the project from git, once the project has been downloaded it’s time to get some configurations up and running. 

Step one : 
We start off by importing the back-end. To import the back-end click on file and hover over the ‘New’ tab, once hovered the field to the right of it will appear with the option ‘Project from Existing Sources...’, press that. 
![iman1](/uploads/2b7e6633c29a23505be19794bf107de1/iman1.png)

Once pressed navigate to the ‘BackEnd’ folder and select the ‘pom.xml’ file, this will import the back-end using the Maven archetype. 
![iman2](/uploads/e0e94ea5e5e9e4415cc163e2cfedee62/iman2.png)

Keep pressing ‘Next’ until the screen disappear and wait a minute for the back-end to be imported. Once imported you will have access to the back-end and the Maven options 

Step two :
Time to install and configure the Payara server, so that the project can be worked on. To install the Payara server use the following link : https://www.payara.fish/software/downloads/all-downloads/

Once it’s installed it’s time to add the configuration and set it up accordingly. Start by going to ‘Add configuration’ in intellij
![iman3](/uploads/1582c964f30b023e7fdae6247cae6b87/iman3.png)

On the next screen press on the ‘+’ sign and select a local Glassfish server, as Payara is based on Glassfish.
![iman4](/uploads/75e507a68b403a4643fd059990233536/iman4.png)

On the next screen we can configure the server. Set it up according to the next screenshot.
![iman5](/uploads/4d01bf8651829f3ee1a39357f35bd1be/iman5.png)

Select the Payara folder as the Application Server and use ‘domain1’ as the Server Domain. Once that has been filled in it’s time to select the Artifact to be Deployed. Select the ‘Deployment’ tab at the top of the screen. At the right click on the ‘+’ symbol and select Artifact. Select the Wetwinkel:War artifact and finish up by pressing ‘OK’.
![iman6](/uploads/c1b0c4ba57428374e585ea9a9bdad71d/iman6.png)

The server has now been configured.  

